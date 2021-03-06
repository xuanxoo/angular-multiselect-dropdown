import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectableData } from "./models/SelectableData";

@Component({
  selector: 'app-angular-multiselect',
  templateUrl: './angular-multiselect.component.html',
  styleUrls: ['./angular-multiselect.component.css'],
  host: {
    '(document:click)': 'closePopupIfMouseClickFiresOutside($event)',
  }
})
export class AngularMultiselectComponent implements OnChanges {

  @Input()
  public availableData: Array<any> = [];

  @Input()
  public selectedData: Array<any> = [];

  @Input()
  public isFilterable: boolean;

  @Input()
  public customFilter: (data: Array<SelectableData>, filterText: string) => void;

  @Input()
  public displayField: string;

  @Input()
  public valueField: string;

  @Input()
  public updateSelectedDataOnClose: boolean;

  @Output()
  public selectedDataChange: EventEmitter<Array<any>> = new EventEmitter();

  public dataContainer: Array<SelectableData> = []; 
  public searchText: string;
  public isPopupOpen: boolean;
  public areAllItemsSelected: boolean;
  public isSearchInputFocused: boolean;

  private _isDirty: boolean;

  constructor(private _elemetReference: ElementRef) {
    console.log("ini");
  }

  public ngOnInit() {
    console.log("ini2");
    
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log("change");
    if (changes["availableData"]) {
        
                  this.dataContainer = this.availableData.map(data => new SelectableData(data));
                  this.areAllItemsSelected = false;
                  this.selectedData = [];
              }
      
  }

  public filterDataItems(): void {

      if (this.customFilter) {
          
          this.customFilter(this.dataContainer, this.searchText);
      }
      else {
          this.dataContainer.forEach(item => this.updateFilterStatus(item));
      }
  }

  public togglePopup():void {

      if (this.isPopupOpen) {
          this.closePopup();
      } else {
          this.openPopup();
      }
  }

  public openPopup(): void {
      this.isPopupOpen = true;
  }

  public closePopup(): void {
      this.isPopupOpen = false;
      
      if (this.updateSelectedDataOnClose && this._isDirty) {

          this.selectedDataChange.emit(this.selectedData);
      }

      this.searchText = "";
      this._isDirty = false;
      this.filterDataItems();
  }

  public closePopupIfMouseClickFiresOutside(event: any):void {

      let isClickedElementInside = this._elemetReference.nativeElement.contains(event.target);
      
      if (!isClickedElementInside && this.isPopupOpen) {
          this.closePopup();
      }
  } 

  public toggleItemSelection(item: SelectableData) {

      item.isSelected = !item.isSelected;
      this.selectedData = this.dataContainer
                              .filter(item => item.isSelected);
                              //.map(item => this.valueField ? item.model[this.valueField] : item.model);
      
      if (!this.updateSelectedDataOnClose) {
          this.selectedDataChange.emit(this.selectedData);
      }
      
      this.areAllItemsSelected = this.dataContainer.find(item => !item.isSelected) == undefined;
      this._isDirty = true;
  }

  public selectAllItems() {

      this.dataContainer.forEach(item => item.isSelected = true);
      this.selectedData = this.dataContainer;//this.availableData.slice(0).map(item => item.model);//this.valueField ? item[this.valueField] : item);;
      this.selectedDataChange.emit(this.selectedData);
      this.areAllItemsSelected = true;
  }

  public deselectAllItems() {

    this.dataContainer.forEach(item => item.isSelected = false);
      this.selectedData = [];
      this.selectedDataChange.emit(this.selectedData);
      this.areAllItemsSelected = false;
  }

  private updateFilterStatus(dataItem: SelectableData) {
      
      let itemText = dataItem.model.toString().toLowerCase();
      dataItem.isFiltered = !itemText.includes(this.searchText.toLowerCase());
  }

}
