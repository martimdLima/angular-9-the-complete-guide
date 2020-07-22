import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 10),
    new Ingredient("Onions", 5),
    new Ingredient("Basil", 2),
    new Ingredient("Bell Peppers", 4),
    new Ingredient("lettuce", 10),
    new Ingredient("Potatoes", 5),
    new Ingredient("Pasta", 5),
    new Ingredient("Cheese", 4),
    new Ingredient("Meat", 10),
  ];

  constructor() {}

  ngOnInit(): void {}

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
