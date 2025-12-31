# BeyondChats Internship Assignment

This repository contains the complete solution for the BeyondChats Full Stack Web Developer Intern assignment.

The project is divided into phases:
- Phase 1: Scraping articles, storing them in a database, and creating CRUD APIs
- Phase 2: Enhancing articles using Google Search and an LLM
- Phase 3: Frontend (API-based verification)

---

## Tech Stack

Backend:
- Laravel 12
- PHP 8+
- SQLite

Scraping & Automation:
- Node.js
- Axios
- Cheerio
- google-it

LLM:
- OpenAI API (GPT-4o-mini)

Frontend:
- React.js (optional / bonus)

---

## Project Structure

beyondchats-assignment/
├── backend/        (Laravel backend + APIs)
├── scraper/        (Phase 1 scraper)
├── phase2/         (Phase 2 rewrite script)
├── frontend/       (React frontend – optional)
└── README.md

---

# Phase 1 – Scraping & CRUD APIs

## Objective
- Scrape the 5 oldest articles from https://beyondchats.com/blogs/
- Store them in a database
- Expose CRUD APIs for articles

---

## Local Setup – Phase 1

### 1. Clone Repository

git clone <your-github-repo-url>  
cd beyondchats-assignment

---

### 2. Backend Setup

cd backend  
composer install  
copy .env.example .env  
php artisan key:generate  

Create SQLite database:

php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"

Update .env:

DB_CONNECTION=sqlite  
DB_DATABASE=database/database.sqlite  

Run migrations:

php artisan migrate  

Start server:

php artisan serve  

Backend runs at:

http://127.0.0.1:8000

---

### 3. Article APIs

GET    /api/articles  
POST   /api/articles  
GET    /api/articles/{id}  
PUT    /api/articles/{id}  
DELETE /api/articles/{id}  

---

### 4. Phase 1 Scraper

cd scraper  
npm install  
node scrape.js  

This script:
- Navigates to the last pages of BeyondChats blogs
- Extracts the 5 oldest articles
- Stores them via backend APIs

---

# Phase 2 – AI Article Enhancement

## Objective
For each article:
- Search the article title on Google
- Fetch 2 external blog articles
- Scrape their content
- Rewrite the original article using an LLM
- Update the article in the backend

---

## Local Setup – Phase 2

### 1. Environment Variables

Create phase2/.env:

BACKEND_URL=http://127.0.0.1:8000  
OPENAI_API_KEY=your_openai_api_key_here  

---

### 2. Install Dependencies

cd phase2  
npm install  

---

### 3. Run Phase 2 Script

node rewrite.js  

This script:
- Fetches articles from backend
- Searches Google for reference articles
- Uses fallback references if Google blocks results
- Scrapes reference content
- Calls OpenAI to rewrite the article
- Updates the article via API

---

# Architecture Diagram

BeyondChats Blog Website  
        ↓  
Phase 1 Scraper (Node.js)  
        ↓  
Laravel Backend API (SQLite)  
        ↓  
Phase 2 Script (Node.js)  
  - Google Search  
  - Reference Scraping  
  - OpenAI LLM  
        ↓  
Updated Articles Stored in Database  

---

# Data Flow Diagram

User / Script  
     ↓  
Scraper (Phase 1)  
     ↓  
POST /api/articles  
     ↓  
SQLite Database  
     ↓  
GET /api/articles  
     ↓  
Phase 2 Script  
     ↓  
Google Search + Scraping  
     ↓  
OpenAI API  
     ↓  
PUT /api/articles/{id}  

---

# Live Link / Verification

Backend API (local):

http://127.0.0.1:8000/api/articles  

This endpoint shows:
- Original articles
- AI-enhanced articles
- Reference links
- AI-generated flag

Frontend (optional):
- React frontend can consume the same API endpoint

---

## Notes

- Some websites block scraping (Cloudflare protection)
- Fallback reference articles are used when scraping fails
- OpenAI requests may timeout depending on API limits

---

## Status

Phase 1: Completed  
Phase 2: Completed  
Documentation: Completed  

---

## Author

Prince Agrawal  
B.Tech CSE (3rd Year)
