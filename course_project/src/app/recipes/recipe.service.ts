import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecipeService {
  private recipeList: Recipe[] = [
    new Recipe(
      "Lasagna",
      "Test Recipe 1",
      "https://i.ytimg.com/vi/BFrkRFgHLVk/hqdefault.jpg",
      [
        new Ingredient("Meat", 2),
        new Ingredient("Pasta", 5),
        new Ingredient("Tomato Sauce", 2),
        new Ingredient("Tomato Paste", 2),
        new Ingredient("Parsley", 1),
        new Ingredient("Oregano", 1),
      ]
    ),
    new Recipe(
      "Meatballs",
      "Test Recipe 2",
      "https://thedolcediet.com/wp-content/uploads/2016/01/meatball-1.jpg",
      [
        new Ingredient("Meat", 2),
        new Ingredient("Tomato Sauce", 2),
        new Ingredient("Tomato Paste", 2),
        new Ingredient("Parsley", 1),
        new Ingredient("Oregano", 1),
        new Ingredient("Bacon", 1),
        new Ingredient("Chorizo", 1),
      ]
    ),
    new Recipe(
      "Hamburger",
      "Test Recipe 3",
      "https://img1.mashed.com/img/gallery/fast-food-hamburgers-ranked-worst-to-best/intro-1540401194.jpg",
      [
        new Ingredient("Meat", 2),
        new Ingredient("Bread", 2),
        new Ingredient("Lettuce", 2),
        new Ingredient("Tomato", 2),
        new Ingredient("Bacon", 2),
        new Ingredient("Cheese", 5),
        new Ingredient("Ketchup", 2),
        new Ingredient("Mayo", 2),
      ]
    ),
    new Recipe(
      "Pizza",
      "Test Recipe 4",
      "https://media.salon.com/2015/04/shutterstock_84904876.jpg",
      [
        new Ingredient("Meat", 2),
        new Ingredient("Dough", 5),
        new Ingredient("Tomato Sauce", 2),
        new Ingredient("Tomato Paste", 2),
        new Ingredient("Bacon", 2),
        new Ingredient("Chorizo", 2),
        new Ingredient("Cheese", 5),
        new Ingredient("Bell Peppers", 2),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipeList() {
    return this.recipeList.slice();
  }

  getRecipe(id: number) {
    return this.recipeList[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
