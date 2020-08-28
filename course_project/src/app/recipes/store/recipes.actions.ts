import { Recipe } from "../recipe.model";
import { Action } from "@ngrx/store";

export const SET_RECIPES = "[Recipes] Set Recipes";

export type RecipesActions = SetRecipes;

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}
