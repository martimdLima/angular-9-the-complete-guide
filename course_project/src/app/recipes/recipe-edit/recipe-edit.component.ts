import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { map } from "rxjs/operators";
import * as RecipesActions from "../store/recipes.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  private storeSubscription: Subscription;

  get controls() {
    //return (this.recipeForm.get("ingredients") as FormArray).controls;
    return (<FormArray>this.recipeForm.get("ingredientList")).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // the object stored in this.recipeForm.value should have a valid format to fit the recipes, hence there's no need to instanciate a new recipe
    // const newRecipe = new Recipe(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["ingredients"]
    // );

    if (this.editMode) {
      //this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this.id,
          newRecipe: this.recipeForm.value,
        })
      );
    } else {
      //this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSubscription = this.store
        .select("recipes")
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imgPath;
          recipeDescription = recipe.description;
          if (recipe.ingredientList) {
            for (let ingredient of recipe.ingredientList) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9][0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imgPath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredientList: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredientList")).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredientList")).removeAt(index);
  }

  onDeleteAllIngredients() {
    (<FormArray>this.recipeForm.get("ingredientList")).clear();
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
