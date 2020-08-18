import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  ingredientListChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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

  getIngredient(index: number) {
    return this.ingredientList[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredientList.push(ingredient);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredientList.push(...ingredients);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredientList[index] = newIngredient;
    this.ingredientListChanged.next(this.ingredientList.slice());
  }

  deleteIngredient(index: number) {
    this.ingredientList.splice(index, 1);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }
}
