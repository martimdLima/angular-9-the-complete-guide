import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipes.actions";

import { map, tap } from "rxjs/operators";

import { Store } from "@ngrx/store";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipeList();
    this.http
      .put(
        "https://ng-course-recipe-book-4d4d5.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://ng-course-recipe-book-4d4d5.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredientList: recipe.ingredientList
                ? recipe.ingredientList
                : [],
            };
          });
        }),
        tap((recipes) => {
          //this.recipeService.setRecipeList(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
  }
}
