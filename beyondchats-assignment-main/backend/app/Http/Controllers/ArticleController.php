<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::latest()->get();
    }

    public function store(Request $request)
{
    $article = Article::create([
        'title' => $request->title,
        'content' => $request->content,
        'source_url' => $request->source_url,
        'is_ai_generated' => $request->is_ai_generated ?? false,
        'references' => $request->references ?? null,
    ]);

    return response()->json($article, 201);
}


    public function show(Article $article)
    {
        return $article;
    }

    public function update(Request $request, Article $article)
    {
        $article->update($request->all());
        return $article;
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
