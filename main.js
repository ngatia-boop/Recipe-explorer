const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const themeToggle = document.getElementById("themeToggle");

const modal          = document.getElementById("recipeModal");
const modalTitle     = document.getElementById("modalTitle");
const modalImage     = document.getElementById("modalImage");
const modalCategory  = document.getElementById("modalCategory");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const closeButton    = document.querySelector(".close-button");

function openRecipeModal(recipe) {
  modalTitle.textContent        = recipe.name;
  modalImage.src                = recipe.image;
  modalCategory.textContent     = recipe.category || "—";
  modalIngredients.textContent  = recipe.ingredients.join(", ");
  modalInstructions.textContent = recipe.instructions;
  modal.classList.remove("hidden");
}

closeButton.addEventListener("click", () => modal.classList.add("hidden"));

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

let allRecipes = [];

const BASE_URL = "https://recipe-explorer-ue0r.onrender.com/recipes";  

async function loadRecipes() {
  try {
    const res = await fetch(API_URL, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const recipes = await res.json();
    recipes.forEach(displayRecipe);
  } catch (err) {
    console.error("Initial GET error:", err);
  }
}



const form        = document.getElementById("recipeForm");
const recipesBox  = document.getElementById("recipesContainer");
const newTitle    = document.getElementById("newTitle");
const newImage    = document.getElementById("newImage");
const newIngr     = document.getElementById("newIngredients");
const newInstr    = document.getElementById("newInstructions");


fetchRecipes();


   function fetchRecipes() {
     fetch(BASE_URL)
       .then(r => r.json())
       .then(data => {
         allRecipes = data; 
         console.log("Fetched Recipes:", allRecipes); 
         recipesBox.innerHTML = "";          
         data.forEach(renderRecipe);
       })
       .catch(console.error);
      }

function renderRecipe(recipe) {
  const name  = recipe.name  || recipe.title || "Untitled Recipe";   
  const image = recipe.image || "https://via.placeholder.com/300x200?text=No+Image";

  const card = document.createElement("article");
  card.className = "recipe-card";
  card.innerHTML = `
    <div class="card-header">                                    
      <h2>${name}</h2>                                           
      ${heartHTML(recipe.isFavorite)}                            
    </div>                                                       

    <img src="${image}" alt="${name}">

    <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
   
    <button class="view-btn">View Details</button>
    <button class="delete-btn">Delete</button>
  `;

   // --- VIEW DETAILS (opens modal) ---
  card.querySelector(".view-btn").addEventListener("click", () => {
    openRecipeModal(recipe);
  });

  // ---------- DELETE ----------
  card.querySelector(".delete-btn").addEventListener("click", () => {
    fetch(`${BASE_URL}/${recipe.id}`, { method: "DELETE" })
      .then(() => card.remove())
      .catch(console.error);
  });

  // ---------- FAVORITE / HEART ----------
  const heartEl = card.querySelector(".heart");              
  heartEl.addEventListener("click", () => {                   
    toggleFavorite(name, heartEl);                              
  });                                                            

  recipesBox.prepend(card);
}


// ==== DOM refs ====
const newCategory = document.getElementById("newCategory");  
// ==== FORM SUBMIT – add a new recipe ====
form.addEventListener("submit", e => {
  e.preventDefault();

  const recipeObj = {
    name: newTitle.value.trim(),
    image: newImage.value.trim() ||
           "https://via.placeholder.com/300x200?text=No+Image",
    category: newCategory.value.trim().toLowerCase(),
    ingredients: newIngr.value
                  .split(",")
                  .map(i => i.trim())
                  .filter(i => i),
    instructions: newInstr.value.trim(),
    isFavorite: false
  };

  // POST to the server
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeObj)
  })
    .then(r => r.json())
    .then(( newRecipe) => {
       allRecipes.push(newRecipe);        
       renderRecipe(newRecipe);
    })
    .then(() => form.reset())
    .catch(console.error);
});

function displayRecipes(recipes) {
  recipesBox.innerHTML = ""; 
  recipes.forEach((recipe) => {
    const recipeList = document.getElementById("recipe-list"); // Make sure this div exists in HTML
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <div class="card-header">
        <h2>${recipe.name}</h2>
        ${heartHTML(recipe.isFavorite)}
      </div>
      <img src="${recipe.image}" alt="${recipe.name}" />
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>

       <button class="view-btn">View Details</button>
    `;

      // --- VIEW DETAILS (opens modal) ---
    card.querySelector(".view-btn").addEventListener("click", () => {
      openRecipeModal(recipe);
    });

    recipesBox.appendChild(card);
  });
}


function heartHTML(isFav) {
   return `<i class="fa-solid fa-heart heart ${isFav ? "favorited" : ""}"></i>`;
}
   function toggleFavorite(recipeName, heartEl) {
     const recipe = allRecipes.find((r) => r.name === recipeName);
     if (!recipe) {
       console.warn("Recipe not found in allRecipes:", recipeName);
       return;
     }

     recipe.isFavorite = !recipe.isFavorite;
     heartEl.classList.toggle("favorited");
     console.log("Toggled favorite:", recipe.name, recipe.isFavorite);

     // Update the allRecipes array
     const index = allRecipes.findIndex(r => r.id === recipe.id);
     if (index !== -1) {
       allRecipes[index] = recipe; // Update the recipe in the array
     }

     fetch(`${BASE_URL}/${recipe.id}`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ isFavorite: recipe.isFavorite }),
     }).catch((err) =>
       console.error("Could not save favorite state:", err)
     );
   }
   

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allRecipes.filter((r) =>
    r.name.toLowerCase().includes(searchTerm)
  );
  displayRecipes(filtered);
});

categoryFilter.addEventListener("change", () => {
  // always work in lowercase
  const selected = categoryFilter.value.toLowerCase();   // "all", "breakfast", ...

  const filtered = selected === "all"
    ? allRecipes
    : allRecipes.filter(r =>
        (r.category || "").trim().toLowerCase() === selected
      );
      console.clear();
      console.log("Selected:", selected);
      console.log("All Recipes:", allRecipes);
      console.log("Filtered Recipes:", filtered);
      
  displayRecipes(filtered);
});


themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

recipeContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("heart")) {
    const card = e.target.closest(".recipe-card");
    const title = card.querySelector("h2").textContent;
    toggleFavorite(title, e.target);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }
});

fetchRecipes();

