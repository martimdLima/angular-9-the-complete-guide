import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[];

  @Output() featuredRecipe = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeList = this.recipeService.getRecipeList();
  }

  onRecipeSelected(recipe: Recipe) {
    this.featuredRecipe.emit(recipe);
  }
}
