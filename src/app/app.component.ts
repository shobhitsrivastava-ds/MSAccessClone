import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DataServiceService} from "./data-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MSAccessClone';
  tid: any[] = [];
  selectedDocument: any = 0;
  columnsChecked: any[]= [];
  choices: string[] = [];
  temp = 0;  tableData= `
        <input type="text" size="9.5"/>
        <input type="text" size="9.5"/>
        <input type="text" size="9.5"/>
        <input type="text" size="9.5"/><br>
  `
  totalOptions = [
    [
      {name: 'Profession', value: '1', checked: false},
      {name: 'Name', value: '2', checked: false},
      {name: 'Patients', value: '3', checked: false}
    ],
    [
      {name: 'Name', value: '4', checked: false},
      {name: 'Disease', value: '5', checked: false},
      {name: 'Provider', value: '6', checked: false}
    ],
    [
      {name: 'ClaimId', value: '7', checked: false},
      {name: 'Amount', value: '8', checked: false},
      {name: 'Date', value: '9', checked: false}
    ]
  ]
  desc = [{id: 0, name: 'ProviderData'},
    {id: 1, name: 'PatientData'},
    {id: 2, name: 'EncounterData'}]

  constructor(private _dataService: DataServiceService) {}

  selectedOptions(k:any) { // right now: ['1','3']
    this.selectedDocument= k;
    return this.totalOptions[k]
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }
  returnNameWithId(k:any, n:any) { // right now: ['1','3']
    return this.totalOptions[k]
      .filter(opt => opt.value==n)
      .map(opt => opt.name)
  }

  submit(n: any) {
    this.choices = this.selectedOptions(n);
    this._dataService.enroll(this.choices)
      .subscribe(
        data => console.log("Success!", data),
        error => console.error("Error!", error)
      )
  }
  //
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  // }

  dropArea(event: CdkDragDrop<any[]>) {
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    console.log(event);
  }

  addColumns(id: any)
  {
    this.columnsChecked= this.selectedOptions(id);
    this.temp+=1;
    let cl= '';
    if(this.temp==1)
    {
      cl= ".add-row1";
    }
    else {
      cl= ".add-row2";
    }
    console.log(this.columnsChecked);

    let doc= <HTMLElement> document.querySelector(cl)
    let fullName;
    for (let column of this.columnsChecked) {
      fullName = this.returnNameWithId(this.selectedDocument, column)
      console.log("Printing the name ",fullName);

      doc.innerHTML += `<label style="width: 100px">${fullName}</label>`+this.tableData;
    }
  }
}
