import { HostListener, HostBinding, Directive } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropDownDirective {

  @HostBinding('class.open') isDisplayed = false;

  @HostListener('click') displayDropDown() {
    this.isDisplayed = !this.isDisplayed;
  }

}
