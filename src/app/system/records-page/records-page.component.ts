import { Component, OnInit } from '@angular/core';
import { Category } from '../shares/models/category.model';
import { CategoriesService } from '../shares/services/categories.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {
  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService,
    private title: Title
    ) { 
      title.setTitle('Создание записи');
    }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.isLoaded = true;
    })
  }

  load() {
    this.categoriesService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.isLoaded = true;
    })
  }

  newCategoryAdded(category: Category){
      this.categories.push(category);
      this.load();
  }

  categoryWasEdited(category: Category){
    const index = this.categories.findIndex((c) => c.id === category.id);
    this.categories[index] = category;
    this.load();
  }

}
