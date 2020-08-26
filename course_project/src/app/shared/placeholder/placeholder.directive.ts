import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
    
    /* this automatically gives access to the reference, to a pointer at the place where this directive is then used.
       So this will allow you to get information about the place where you use the directive */

    constructor(public viewContainerRef: ViewContainerRef){}

}