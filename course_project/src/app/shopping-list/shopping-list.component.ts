import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subscription, Observable } from "rxjs";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import * as fromShoppingList from "./store/shopping-list.reducer";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientList: Observable<{ ingredientList: Ingredient[] }>;
  private ingChangeSub: Subscription;

  constructor(
    private store: Store<
      fromShoppingList.AppState
    > /* private loggingService: LoggingService */
  ) {}

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
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.ingChangeSub.unsubscribe();
  }
}
