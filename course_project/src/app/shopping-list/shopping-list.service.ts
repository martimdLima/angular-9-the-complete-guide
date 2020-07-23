import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  ingredientListChanged = new EventEmitter<Ingredient[]>();

  private ingredientList: Ingredient[] = [
    new Ingredient("Tomatoes", 10),
    new Ingredient("Onions", 5),
    new Ingredient("Basil", 2),
    new Ingredient("Bell Peppers", 4),
    new Ingredient("lettuce", 10),
    new Ingredient("Potatoes", 5),
    new Ingredient("Pasta", 5),
    new Ingredient("Cheese", 4),
    new Ingredient("Meat", 10),
  ];

  getIngredientList() {
    return this.ingredientList.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredientList.push(ingredient);
    this.ingredientListChanged.emit(this.ingredientList.slice());
  }
}
