<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Article::truncate();

        Article::create([
            'title' => 'BeyondChats Launches AI Blog Engine',
            'content' => 'This is the original article explaining the launch of BeyondChats AI-powered blog system.',
            'source_url' => 'https://beyondchats.com/blogs',
            'is_ai_generated' => false,
        ]);

        Article::create([
            'title' => 'AI Enhanced: BeyondChats Blog Engine',
            'content' => 'This article has been rewritten and enhanced using AI based on top-ranking sources.',
            'source_url' => 'https://beyondchats.com/blogs',
            'is_ai_generated' => true,
        ]);
    }
}
