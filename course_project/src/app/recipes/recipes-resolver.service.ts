import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {}



  resolve(route: ActivatedRoute, state: RouterStateSnapshot) {

    const recipes = this.recipeService.getRecipeList();

    if(recipes.length === 0) {
        return this.dataStorageService.fetchRecipes();
    } else {
        return recipes;
    }
  }
}
