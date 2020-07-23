import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })
export class RecipeService {
  private recipeList: Recipe[] = [
    new Recipe(
      "Lasagna",
      "Test Recipe 1",
      "https://i.ytimg.com/vi/BFrkRFgHLVk/hqdefault.jpg"
    ),
    new Recipe(
      "Meatballs",
      "Test Recipe 2",
      "https://thedolcediet.com/wp-content/uploads/2016/01/meatball-1.jpg"
    ),
    new Recipe(
      "Hamburger",
      "Test Recipe 3",
      "https://img1.mashed.com/img/gallery/fast-food-hamburgers-ranked-worst-to-best/intro-1540401194.jpg"
    ),
    new Recipe(
      "Pizza",
      "Test Recipe 4",
      "https://media.salon.com/2015/04/shutterstock_84904876.jpg"
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipeList() {
    return this.recipeList.slice();
  }
}
