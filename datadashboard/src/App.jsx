import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=81a7bea000c2439b975f7e952ef604cc&number=20&addRecipeInformation=true`
      );
      const data = await response.json();
      setRecipes(data.results);
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (recipe) =>
        cuisine === "" || recipe.cuisines.includes(cuisine)
    );

  const totalRecipes = recipes.length;

  const avgReadyTime =
    recipes.length > 0
      ? recipes.reduce((sum, r) => sum + r.readyInMinutes, 0) /
        recipes.length
      : 0;

  const vegetarianCount = recipes.filter(
    (r) => r.vegetarian
  ).length;

  return (
    <div className="App">
      <h1>Recipe Data Dashboard ⟡🍽️₊˚⊹♡</h1>


      
      <div className="stats">
        <p>Total Recipes: {totalRecipes}</p>
        <p>Average Ready Time: {avgReadyTime.toFixed(1)} mins</p>
        <p>Vegetarian Recipes: {vegetarianCount}</p>
      </div>

     
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setCuisine(e.target.value)}>
        <option value="">All</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="American">American</option>
      </select>

      <div className="list">
        {filteredRecipes.map((recipe) => (
          <div className="card" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="120" />
            <p>Ready in: {recipe.readyInMinutes} mins</p>
            <p>
              Cuisine: {recipe.cuisines[0] || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;