import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredientList: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
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
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function ShoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredientList: [...state.ingredientList, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredientList: [...state.ingredientList, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredientList[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      const updatedIngredientList = [...state.ingredientList];
      updatedIngredientList[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredientList: updatedIngredientList,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredientList: state.ingredientList.filter((ingredient, index) => {
          console.log(action.payload);
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
