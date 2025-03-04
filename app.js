import React, { useState } from 'react';

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleGenerate = async () => {
    const response = await fetch('http://your-backend-url.com/generate-recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients, dietaryPreference }),
    });
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <div>
      <h1>Personalized Recipe Generator</h1>
      <input 
        type="text" 
        placeholder="Enter ingredients (comma separated)" 
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <select 
        onChange={(e) => setDietaryPreference(e.target.value)} 
        value={dietaryPreference}
      >
        <option value="">Select Dietary Preference</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="keto">Keto</option>
        <option value="dairy-free">Dairy-Free</option>
      </select>
      <button onClick={handleGenerate}>Generate Recipes</button>

      {recipes.length > 0 && (
        <div>
          <h2>Recipes</h2>
          {recipes.map((recipe, index) => (
            <div key={index}>
              <h3>{recipe.name}</h3>
              <p>{recipe.instructions}</p>
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <img src={recipe.image} alt={recipe.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
