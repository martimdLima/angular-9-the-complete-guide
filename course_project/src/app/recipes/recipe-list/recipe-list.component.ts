import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../../recipes/store/recipes.actions";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: Recipe[];
  recipeChangedSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.recipeChangedSubscription = this.store
      .select("recipes")
      .pipe(map((recipeState) => recipeState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipeList = recipes;
      });
  }

  onNewRecipe() {
    // using a relative route, for this activatedRoute is needed
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeChangedSubscription.unsubscribe();
  }
}
