import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./App.css";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch( 
`https://api.spoonacular.com/recipes/complexSearch?apiKey=c3ae85efb751485fae6617841daf41fd&number=20&addRecipeInformation=true`      );
      const data = await response.json();
      console.log(data);
      setRecipes(data.results || []);
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes
    .filter((r) =>
      r.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) =>
      cuisine === "" || r.cuisines.includes(cuisine)
    );

  const totalRecipes = recipes.length;

  const avgReadyTime =
    recipes.length > 0
      ? recipes.reduce((sum, r) => sum + (r.readyInMinutes || 0), 0) /
        recipes.length
      : 0;

  const vegetarianCount = recipes.filter((r) => r.vegetarian).length;

  // CHART DATA
  const dietData = [
    { name: "Vegetarian", value: vegetarianCount },
    { name: "Non-Veg", value: totalRecipes - vegetarianCount }
  ];

  const timeData = [
    { name: "<30", value: recipes.filter(r => r.readyInMinutes < 30).length },
    { name: "30-60", value: recipes.filter(r => r.readyInMinutes >= 30 && r.readyInMinutes <= 60).length },
    { name: "60+", value: recipes.filter(r => r.readyInMinutes > 60).length }
  ];

  return (
    <div className="App">
      <h1 className="recipe">Recipe Data Dashboard 🍽️</h1>

      <div className="box">

   
        <div className="container">

          <div className="controls">
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
          </div>

          <p>Total Recipes: {totalRecipes}</p>
          <p>Average Ready Time: {avgReadyTime.toFixed(1)} mins</p>
          <p>Vegetarian Recipes: {vegetarianCount}</p>

<div className="chartSection">

            <div className="chart1">
              <h2 className="chartTitle">Diet Restriction</h2>
              <BarChart width={200} height={180} data={dietData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </div>

            <div className="chart2">
              <h2 className="chartTitle">Cooking Time</h2>
              <BarChart width={200} height={180} data={timeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </div>

          </div>

        </div>

   
        <div className="main">

       
          

       
          <div className="list">
            {filteredRecipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <div className="card">
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} alt={recipe.title} width="120" />
                  <p>{recipe.readyInMinutes} mins</p>
                  <p>{recipe.cuisines?.[0] || "N/A"}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;