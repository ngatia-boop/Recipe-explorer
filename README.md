# Recipe Explorer

## Project Description

**Recipe Explorer** is a functional, single-page web application that enables users to explore, filter, and interact with a curated collection of recipes. It is built with HTML, CSS, and JavaScript, and uses `json-server` to simulate a backend API. The app demonstrates asynchronous data fetching, dynamic DOM updates, and user interaction with multiple event types.

---

| Live site | Live API |
|-----------|----------|
| **Frontend:** https://ngatia-boop.github.io/Recipe-explorer/ | **Backend:** https://recipe-explorer-ue0r.onrender.com/recipes |

> The Render service hibernates after ~15 min of inactivity.  
The first request can take 10-30 seconds; subsequent calls are instant.

---

## Features (MVP)

- ✅ View a collection of recipes
- ✅ Filter recipes by category (Breakfast, Lunch, Dinner)
- ✅ Search recipes by name
- ✅ Toggle between light and dark themes
- ✅ Responsive and dynamic layout with event-driven interactivity
- ✅ Toggle over favorite meals
- ✅ Add new recipes and categorize them
- ✅ View details of the dish on a pop-up
---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | **HTML • CSS • Vanilla JavaScript** |
| Backend | **json-server @ 0.17** (hosted on Render) |
| Hosting | GitHub Pages (frontend) • Render (backend) |

---

## Events Implemented

- 🔍 **Search Input** — Filters recipes based on user input
- 📂 **Category Filter** — Filters recipes by selected category
- 🌙 **Dark Mode Toggle** — Switches between light and dark themes
- ❤️ **Favourite Toggle** - Switches between favourite and default mode
- ❌ **Delete button** - Deletes a recipe permanently
- 📝 **Detail pop-up** -Gives details about the recipes
- ➕ **Add Recipe Input** -Allows one to add a new recipe, including the  image and the category of the dish
  
Each event uses `.addEventListener()` with its callback function.

---
🗄️ API Endpoints
All live endpoints are under
https://recipe-explorer-ue0r.onrender.com/recipes

Method	Endpoint	   Action
GET   	/recipes	    lists all recipes
GET	    /recipes/:id	single recipe
POST	  /recipes	    add recipe
PATCH	  /recipes/:id	partial update
DELETE	/recipes/:id	remove recipe

---

## Array Methods Used

- `.forEach()` — To render recipe cards
- `.filter()` — For search and category filtering

---
🛠 Main JavaScript Concepts
fetch API for async requests

Promise chaining & async/await

Event delegation (addEventListener)

Array methods: .forEach, .filter

Dynamic DOM creation/updates

Local state caching (allRecipes array)

---
## 🚀 Quick Start

### 1 · Clone & run the frontend only (no server required)

```bash
git clone https://github.com/ngatia-boop/Recipe-explorer.git
cd Recipe-explorer
# open index.html in Live Server or any static server

```
##File Structure 
```
recipe-explorer/
├──package.json
├──images            #images for the recipes and recipe cover 
├── db.json          # Local JSON database
├── index.html       # Main HTML file
├── styles.css       # Styling
├── main.js          # JavaScript logic
└── README.md        # Project documentation
```

---
(OPTIONAL) Run your local API
If you want to hack on the data without touching production:

bash
npm install           # installs json-server locally
npm start             # json-server --watch db.json --port 3000

Then change one line in main.js:

 js

// for local dev only
const BASE_URL = "http://localhost:3000/recipes";

---

##sample data format (in bd.json)
{
  "recipes": [
    {
      "id": 1,
      "name": "Avocado Toast",
      "ingredients": ["Bread", "Avocado", "Lemon", "Salt"],
      "instructions": "Toast bread, mash avocado, mix with lemon and salt, spread and serve.",
      "category": "Breakfast",
      "image": "images/avocado-toast.jpg",
      "isFavourite": "false"
    }
  ]
}

---

##Author 
Ann Ngatia
SDF-FT14B Individual Capstone Project
Moringa School - Software Engineering Program

---
##License
This project is licensed for educational purposes under the Mornga School guidelines.

Copy-paste this over your existing `README.md`, commit, and push:

```bash
git add README.md
git commit -m "Docs: update for Render API & live links"
git push





