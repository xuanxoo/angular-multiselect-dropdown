import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  public primitiveData: Array<string> = [
      "Item A",
      "Item B",
      "Item C",
      "Item D",
      "Item E",
  ];

  public complexData: Array<any> = [
      {id: 0, name: "Complex A"},
      {id: 1, name: "Complex B"},
      {id: 2, name: "Complex C"},
  ];

  public selectedPrimitives: Array<string> = [];

  public selectedObjects: Array<any> = [];

  public printJsonPretty(object: any):string {

      return JSON.stringify(object, null, 4);
  }
}
