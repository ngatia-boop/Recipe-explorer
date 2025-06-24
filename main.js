const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const themeToggle = document.getElementById("themeToggle");

let allRecipes = [];

function fetchRecipes() {
  fetch("http://localhost:3000/recipes")
    .then((res) => res.json())
    .then((data) => {
      allRecipes = data;
      displayRecipes(data);
    });
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";
  recipes.forEach((recipe) => {
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
    `;
    recipeContainer.appendChild(card);
  });
}

function heartHTML(isFav) {
   return `<i class="fa-solid fa-heart heart ${isFav ? "favorited" : ""}"></i>`;
}

function toggleFavorite(recipeName, heartEl) {
  const recipe = allRecipes.find((r) => r.name === recipeName);
  if (!recipe) return;
  recipe.isFavorite = !recipe.isFavorite;
  heartEl.classList.toggle("favorited");
  fetch(`http://localhost:3000/recipes/${recipe.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isFavorite: recipe.isFavorite }),
  }).catch((err) => console.error("Could not save favorite state:", err));
}


searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allRecipes.filter((r) =>
    r.name.toLowerCase().includes(searchTerm)
  );
  displayRecipes(filtered);
});

categoryFilter.addEventListener("change", () => {
  const selected = categoryFilter.value;
  const filtered =
    selected === "All"
      ? allRecipes
      : allRecipes.filter((r) => r.category === selected);
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


fetchRecipes();
