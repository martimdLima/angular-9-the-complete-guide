import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ADD_INGREDIENT } from "../store/shopping-list.actions";

const initialState = {
  ingredientList: [
    new Ingredient("Tomatoes", 10),
    new Ingredient("Onions", 5),
    new Ingredient("Basil", 2),
    new Ingredient("Bell Peppers", 4),
    new Ingredient("lettuce", 10),
    new Ingredient("Potatoes", 5),
    new Ingredient("Pasta", 5),
    new Ingredient("Cheese", 4),
    new Ingredient("Meat", 10),
  ],
};

export function ShoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredientList: [...state.ingredientList, action],
      };
  }
}
