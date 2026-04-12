import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function More() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
`https://api.spoonacular.com/recipes/${id}/information?apiKey=c3ae85efb751485fae6617841daf41fd`);

      const data = await res.json();
      console.log(data);
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="App">
      <button className="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{recipe.title}</h1>

      <img src={recipe.image} width="250" />

      <p>Ready in: {recipe.readyInMinutes}</p>
      <p>Servings: {recipe.servings}</p>
      <p>Vegetarian: {recipe.vegetarian ? "Yes" : "No"}</p>

      <p>Health Score: {recipe.healthScore}</p>
      <p>Price: {recipe.pricePerServing}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.extendedIngredients?.map((i) => (
          <li key={i.id}>{i.original}</li>
        ))}
      </ul>
    </div>
  );
}

export default More;