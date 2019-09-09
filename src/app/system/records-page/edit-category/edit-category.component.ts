import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shares/models/category.model';
import { CategoriesService } from '../../shares/services/categories.service';
import { Message } from 'src/app/shared/model/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sky-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  subscribtion1: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message ('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm){
    let {capacity, name} = form.value;
    if(capacity < 0){
      capacity *= -1;
    }
    const category = new Category(name, capacity, +this.currentCategoryId);

    this.subscribtion1 = this.categoriesService.updateCategory(category).subscribe((category: Category) => {
      this.onCategoryEdit.emit(category);
      this.message.text = 'Категория успешно отредактирована.';
      window.setTimeout(() => this.message.text = '', 5000);
    })
  }

  onCategoryChange(){
    this.currentCategory = this.categories.find((c) => c.id === +this.currentCategoryId);
  }

  ngOnDestroy(){
    if(this.subscribtion1)
      this.subscribtion1.unsubscribe();
  }

}
