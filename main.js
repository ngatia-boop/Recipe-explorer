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
      <h2>${recipe.name}</h2>
      <img src="${recipe.image}" alt="${recipe.name}" />
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
    `;
    recipeContainer.appendChild(card);
  });
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

fetchRecipes();
