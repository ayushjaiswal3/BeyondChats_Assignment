<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::create([
            'title' => 'BeyondChats Original Blog',
            'content' => 'This is the original scraped article content.',
            'is_ai_generated' => false,
            'source_url' => 'https://beyondchats.com/blogs'
        ]);

        Article::create([
            'title' => 'AI Enhanced Version of BeyondChats Blog',
            'content' => 'This article was rewritten using AI to improve clarity and SEO.',
            'is_ai_generated' => true,
            'source_url' => 'https://beyondchats.com/blogs'
        ]);
    }
}
