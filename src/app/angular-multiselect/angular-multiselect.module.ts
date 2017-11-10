import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AngularMultiselectComponent } from "./angular-multiselect.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AngularMultiselectComponent
  ],
  exports: [
    AngularMultiselectComponent
  ]
})
export class AngularMultiselectModule { }