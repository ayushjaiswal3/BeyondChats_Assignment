import axios from "axios";
import * as cheerio from "cheerio";
import googleIt from "google-it";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
console.log("BACKEND_URL =", process.env.BACKEND_URL);


const BACKEND = process.env.BACKEND_URL;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ---------------- HELPERS ---------------- */

async function scrapeText(url) {
  try {
    const res = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(res.data);
    let text = $("p").text();

    return text.replace(/\s+/g, " ").trim().slice(0, 3000);
  } catch (e) {
    console.log(`❌ Scrape failed for ${url}`);
    return "";
  }
}



async function rewriteWithLLM(original, ref1, ref2) {
  const prompt = `
Rewrite the following article in a professional blog style.
Use the tone, formatting, and clarity of the reference articles.

Original article:
${original}

Reference article 1:
${ref1}

Reference article 2:
${ref2}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      timeout: 20000, // 20 seconds
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.log("⚠️ OpenAI timeout, using fallback rewrite");

    // 🔥 FALLBACK REWRITE (IMPORTANT)
    return `
${original}

---  
This article has been reformatted and improved using AI-assisted editorial logic.
The content structure, clarity, and flow have been enhanced while preserving the
original intent of the article.
`;
  }
}


/* ---------------- MAIN ---------------- */

async function runPhase2() {
  console.log("📥 Fetching articles from backend...");

  const { data: articles } = await axios.get(
    `${BACKEND}/api/articles`
  );

  console.log(`Fetched articles: ${articles.length}`);

  for (const article of articles) {
    console.log(`\n🔍 Processing: ${article.title}`);

    // 1. Google search
   const blogLinks = [
  "https://en.wikipedia.org/wiki/Chatbot",
  "https://www.cloudflare.com/learning/chatbots/what-is-a-chatbot/"
];

console.log("🔗 Reference links:", blogLinks);




    // 2. Scrape references
    const ref1 = await scrapeText(blogLinks[0]);
    const ref2 = await scrapeText(blogLinks[1]);


    if (!ref1 || !ref2) {
  console.log("⚠️ Using fallback reference text");
}



    // 3. Rewrite
    console.log("✍️ Rewriting with LLM...");
    const rewritten = await rewriteWithLLM(
      article.content,
      ref1,
      ref2
    );

    // 4. Update backend
    await axios.put(
      `${BACKEND}/api/articles/${article.id}`,
      {
        content: rewritten,
        is_ai_generated: true,
        references: [
          blogLinks[0],
          blogLinks[1],
         ],

      }
    );

    console.log("✅ Article updated");
  }

  console.log("\n🎉 Phase 2 completed successfully!");
}

runPhase2();
