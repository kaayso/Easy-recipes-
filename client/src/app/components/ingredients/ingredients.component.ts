import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { api } from '../../ws/api';
import { Ingredient } from 'src/app/interfaces/ingredient';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit {
  ingredients: any = {};
  items: any = {};
  userIngredients: Ingredient[] = [];

  constructor(private genericService: GenericService) {}

  ngOnInit(): void {
    this.genericService.get(api.Ingredient).subscribe(
      (res) => {
        this.ingredients = this.groupByCategory(res.data);
      },
      (err) => console.error(err)
    );
  }

  groupByCategory(ingredientList: Ingredient[]): Object {
    const result = {};
    for (let ing of ingredientList) {
      if (result[ing.category] == undefined) {
        result[ing.category] = [];
      }
      result[ing.category].push(ing);
    }
    return result;
  }

  getIngredientByCategory(name: string): void {
    if (!this.items[name]) {
      this.items[name] = this.ingredients[name];
    }
  }

  selectedItems(selectedIngredients: Ingredient[]): void {
    if (selectedIngredients.length === 0) return;
    const category = selectedIngredients[0].category;
    this.userIngredients = this.userIngredients
      .filter((ing) => ing.category !== category)
      .concat(selectedIngredients);
  }
}
