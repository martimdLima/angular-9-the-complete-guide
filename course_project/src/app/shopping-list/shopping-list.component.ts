import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription, Observable } from "rxjs";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientList: Observable<{ ingredientList: Ingredient[] }>;
  private ingChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredientList: Ingredient[] } }>
  ) /* private loggingService: LoggingService */
  {}

  ngOnInit() {
    this.ingredientList = this.store.select("shoppingList");
    /*     this.ingredientList = this.shoppingListService.getIngredientList();
    this.ingChangeSub = this.shoppingListService.ingredientListChanged.subscribe(
      (newIngredientList: Ingredient[]) => {
        this.ingredientList = newIngredientList;
      }
    ); */

    // this.loggingService.printlog("Test Error Message from ShoppingListComponent NgOnInit");
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // this.ingChangeSub.unsubscribe();
  }
}
