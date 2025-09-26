import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";

import { getRecipeFromMistral } from "../assets/ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([
        "chicken",
        "all the main spices",
        "corn",
        "heavy cream",
        "pasta",
    ]);
    const [recipe, setRecipe] = React.useState("");

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }


    // function addIngredient(event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget-)
    //     const newIngredient = formData.get("ingredient");
    //     setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    // }

    return (
        <main>
            <form
                // onSubmit={addIngredient}
                action={addIngredient}
                className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && (
                <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
            )}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}
