import { Component, OnInit, Input, ViewEncapsulation, SimpleChanges, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //None, Native, Emulated ;
})

export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild{

  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;

  constructor() {
    console.log('constructor called');
  }

  // A lifecycle hook that is called when any data-bound property of a directive changes
  ngOnChanges(changes: SimpleChanges ) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  // A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    console.log('ngOnInit called');
    //console.log(this.header.nativeElement);
  }

  //The default change-detection algorithm looks for differences by comparing bound-property values by reference across change detection runs.
  //You can use this hook to check for and respond to changes by some other means.
  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  // A lifecycle hook that is called after Angular has fully initialized all content of a directive.
  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }

  // A lifecycle hook that is called after the default change detector has completed checking all content of a directive.
  ngAfterContentChecked() {
    console.log('ngAfterContentCheck called');
  }

  // A lifecycle hook that is called after Angular has fully initialized a component's view.
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    console.log(this.header.nativeElement.textContent);
  }

  // A lifecycle hook that is called after the default change detector has completed checking a component's view for changes.
  ngAfterViewChecked() {
    console.log('ngAfterViewCheck called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
}
