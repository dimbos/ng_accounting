import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[skyDropdown]'
})

export class DropdoenDirective{
   @HostBinding('class.open') isOpnen = false;

   @HostListener('click') onclick() {
       this.isOpnen = !this.isOpnen;
   }
}