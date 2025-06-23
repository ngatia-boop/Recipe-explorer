# Recipe Explorer

## Project Description

**Recipe Explorer** is a functional, single-page web application that enables users to explore, filter, and interact with a curated collection of recipes. It is built with HTML, CSS, and JavaScript, and uses `json-server` to simulate a backend API. The app demonstrates asynchronous data fetching, dynamic DOM updates, and user interaction with multiple event types.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** JSON Server (mock API using `db.json`)

---

## Features (MVP)

- ✅ View a collection of recipes
- ✅ Filter recipes by category (Breakfast, Lunch, Dinner)
- ✅ Search recipes by name
- ✅ Toggle between light and dark themes
- ✅ Responsive and dynamic layout with event-driven interactivity

---

## Events Implemented

- 🔍 **Search Input** — Filters recipes based on user input
- 📂 **Category Filter** — Filters recipes by selected category
- 🌙 **Dark Mode Toggle** — Switches between light and dark themes

Each event uses `.addEventListener()` with its callback function.

---

## Array Methods Used

- `.forEach()` — To render recipe cards
- `.filter()` — For search and category filtering

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- JSON Server installed globally (or as a dev dependency)

```bash
npm install -g json-server

## Installation
```bash
git clone https://github.com/ngatia-boop/recipe-explorer.git
cd recipe-explorer

Start the JSON Server
```bash
json-server --watch db.json

Open index.html in your browser to view the app.

##File Structure 
```
recipe-explorer/
├──images            #images for the recipes
├── db.json          # Local JSON database
├── index.html       # Main HTML file
├── styles.css       # Styling
├── main.js          # JavaScript logic
└── README.md        # Project documentation
```

##sample data format (in bd.json)
{
  "recipes": [
    {
      "id": 1,
      "name": "Avocado Toast",
      "ingredients": ["Bread", "Avocado", "Lemon", "Salt"],
      "category": "Breakfast",
      "image": "https://via.placeholder.com/150"
    }
  ]
}

##Author 
Ann Ngatia
SDF-FT14B Individual Capstone Project
Moringa School - Software Engineering Program

##License
This project is licensed for educational purposes under the Mornga School guidelines.

yaml

---

Please let me know if you would like this README customized further (e.g., links to a GitHub repository, screenshots, or additional stretch goals, such as "favorite" recipes).




