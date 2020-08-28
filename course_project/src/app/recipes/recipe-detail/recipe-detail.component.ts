import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { map, switchMap } from "rxjs/operators";
import * as RecipesActions from "../store/recipes.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    //const id = this.route.snapshot.params['id'];

    // Using an Observable Chain
    this.route.params
      .pipe(
        map((params) => {
          return +params["id"];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select("recipes");
        }),
        map((recipeState) =>
          recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        )
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });

    /*
      // Using multiple Observables
      this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      //this.recipe = this.recipeService.getRecipe(this.id);
      this.store
        .select("recipes")
        .pipe(
          map((recipesState) =>
            recipesState.recipes.find((recipe, index) => {
              return index === this.id;
            })
          )
        )
        .subscribe((recipe) => {
          this.recipe = recipe;
        });
    }); */
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredientList);
  }

  onEditRecipe() {
    // navigation using relative paths
    this.router.navigate(["edit"], { relativeTo: this.route });

    // navigation using absolute paths
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }
}
