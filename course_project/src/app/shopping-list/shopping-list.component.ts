import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientList: Ingredient[] = [];
  private ingChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientList = this.shoppingListService.getIngredientList();

    this.ingChangeSub = this.shoppingListService.ingredientListChanged.subscribe(
      (newIngredientList: Ingredient[]) => {
        this.ingredientList = newIngredientList;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingChangeSub.unsubscribe();
  }
}
