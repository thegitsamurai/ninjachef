const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/generate-recipes', async (req, res) => {
  const { ingredients, dietaryPreference } = req.body;

  try {
    // Example using Spoonacular API (requires API key)
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: 'YOUR_API_KEY',
        query: ingredients,
        diet: dietaryPreference,
        number: 5, // Return 5 recipe suggestions
      },
    });

    const recipes = response.data.results.map((recipe) => ({
      name: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image,
    }));

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating recipes' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
