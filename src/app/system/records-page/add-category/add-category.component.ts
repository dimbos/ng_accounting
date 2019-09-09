import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shares/services/categories.service';
import { Category } from '../../shares/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sky-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  subscribe1: Subscription;

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }


  onSubmit(form: NgForm){
    let {name, capacity} = form.value;
    
    if(capacity <  0 ){
      capacity *= -1;
    }
      const category = new Category(name, capacity);

      this.subscribe1 = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
      });
  }

  ngOnDestroy(){
    if(this.subscribe1){
      this.subscribe1.unsubscribe();
    }
  }

}
