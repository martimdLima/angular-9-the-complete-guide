import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipeList = recipes;
    });
    this.recipeList = this.recipeService.getRecipeList();
  }

  onNewRecipe() {
    // using a relative route, for this activatedRoute is needed
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
