import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    /* loadChildren: "./recipes/recipes.module#RecipesModule", */
    loadChildren: () =>
      import("./recipes/recipes.module").then((model) => model.RecipesModule),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        (model) => model.ShoppingListModule
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((model) => model.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
