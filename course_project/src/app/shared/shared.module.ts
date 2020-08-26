import { NgModule } from "@angular/core";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { AlertComponent } from "./alert/alert.component";
import { CommonModule } from "@angular/common";
import { LoggingService } from "../logging.service";

@NgModule({
  declarations: [
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule,
  ],
  entryComponents: [AlertComponent],
  // providers: [LoggingService]
})
export class SharedModule {}
