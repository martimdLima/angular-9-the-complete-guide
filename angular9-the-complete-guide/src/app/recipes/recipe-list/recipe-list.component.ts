import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe[] = [
    new Recipe("Test Recipe 1","Test Recipe 1","https://i.ytimg.com/vi/BFrkRFgHLVk/hqdefault.jpg"),
    new Recipe("Test Recipe 2","Test Recipe 2","https://thedolcediet.com/wp-content/uploads/2016/01/meatball-1.jpg"),
    new Recipe("Test Recipe 3","Test Recipe 3","https://img1.mashed.com/img/gallery/fast-food-hamburgers-ranked-worst-to-best/intro-1540401194.jpg"),
    new Recipe("Test Recipe 4","Test Recipe 4","https://media.salon.com/2015/04/shutterstock_84904876.jpg"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
