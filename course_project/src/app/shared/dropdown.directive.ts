import {
  HostListener,
  HostBinding,
  Directive,
  ElementRef,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropDownDirective {
  @HostBinding("class.open") isDisplayed = false;

  @HostListener("document:click", ["$event"]) displayDropDown(event: Event) {
    this.isDisplayed = this.elRef.nativeElement.contains(event.target)
      ? !this.isDisplayed
      : false;
  }

  constructor(private elRef: ElementRef) {}
}
