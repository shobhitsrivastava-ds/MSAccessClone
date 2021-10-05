import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DataServiceService} from "./data-service.service";
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  currentUser: any
  result: any[] = [];

  //query: QueryRef<any> | undefined;
  //query: QueryRef<any>;

  title = 'MSAccessClone';
  tid: any[] = [];
  selectedDocument: any = 0;
  columnsChecked: any[]= [];
  indexChecked: any[]= [];
  choices: string[] = [];
  temp = 0;
  // tableData= `
  //       <input type="text" size="9.5"/>
  //       <input type="text" size="9.5"/>
  //       <input type="text" size="9.5"/>
  //       <input type="text" size="9.5"/><br>
  //`
  totalOptions = [
    [
      {name: 'ClaimId', index:0, value: '1', checked: false, data: ''},
      {name: 'ProviderName', index:1, value: '2', checked: false, data: ''},
      {name: 'PatientName',  index:2, value: '3', checked: false, data: ''},
      {name: 'ClaimAmount',index:3, value: '4', checked: false, data:''},
      {name: 'ClaimStatus',  index:4, value: '5', checked: false, data:''}
    ],
    [
      {name: 'PatientName', index:0, value: '6', checked: false, data:''},
      {name: 'GenderCode', index:1, value: '7', checked: false, data:''},
      {name: 'PatientPostalCode',  index:2, value: '8', checked: false, data:''}
    ],
    [
      {name: 'ProviderName', index:0, value: '9', checked: false, data:''},
      {name: 'Organization', index:1, value: '10', checked: false, data:''},
      {name: 'LastOrganization', index:2, value: '11', checked: false, data:''},
      {name: 'LicenseNumber', index:3, value: '12', checked: false, data:''},
      {name: 'WorkExperience', index:4, value: '13', checked: false, data:''}
    ]
  ]
  desc = [{id: 0, name: 'ClaimData'},
    {id: 1, name: 'PatientData'},
    {id: 2, name: 'ProviderData'}]

  constructor(private apollo: Apollo, private _dataService: DataServiceService) {}

  ngOnInit() {

  }

  selectedOptions(k:any) { // right now: ['1','3']
    this.selectedDocument= k;
    return this.totalOptions[k]
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }
  selectedIndex(k:any) { // right now: ['1','3']
    this.selectedDocument= k;
    return this.totalOptions[k]
      .filter(opt => opt.checked)
      .map(opt => opt.index)
  }
  returnNameWithId(k:any, n:any) { // right now: ['1','3']
    return this.totalOptions[k]
      .filter(opt => opt.value==n)
      .map(opt => opt.name)
  }

  returnColumns(k:any, n: any) { // right now: ['1','3']
    let arr = []
    for(let k1 of n)
    {
      for(let i of this.totalOptions[k])
      {
        if(i.value==k1)
        {
          arr.push(i.name);
        }
      };
    }
    return (arr)
  }

  getFormValue(id:any)
  {
    console.log("VALUE OF K=",id);
    let tableData= `
        <input type="text" id= "${id}" name="control" size="9.5"/>
        <input type="text" size="9.5"/>
        <input type="text" size="9.5"/>
        <input type="text" size="9.5"/><br>
  `
    console.log(tableData);
    return(tableData)
  }
  // FUNCTION FOR GENERATING QUERIES FOR THE CLAIM DATA
  queryClaims() {
    const QUERY1 = gql`
      query getClaims($claimId_checked: Boolean!, $provider_checked: Boolean!, $patient_checked: Boolean!, $amount_checked: Boolean!, $status_checked: Boolean!, $claimId: String!, $providerName: String!, $patientName: String!, $claimAmount: String, $claimStatus: String)
      {
        getAllClaims(ClaimId: $claimId, ProviderName: $providerName, PatientName: $patientName, ClaimAmount: $claimAmount, ClaimStatus: $ClaimStatus){
          ClaimId @skip(if: $claimId_checked)
          ProviderName @skip(if: $provider_checked)
          PatientName @skip(if: $patient_checked)
          ClaimAmount @skip(if: $amount_checked)
          ClaimStatus @skip(if: $status_checked)
        }
      }
    `;
    console.log("Query= ",QUERY1);
    const query = this.apollo.watchQuery({
      query: QUERY1,
      variables: {claimId_checked: !this.totalOptions[0][0].checked, provider_checked: !this.totalOptions[0][1].checked, patient_checked: !this.totalOptions[0][2].checked, amount_checked: !this.totalOptions[0][3].checked, status_checked:!this.totalOptions[0][4].checked, claimId: this.totalOptions[0][0].data, providerName: this.totalOptions[0][1].data, patientName: this.totalOptions[0][2].data, claimAmount: this.totalOptions[0][3].data, claimStatus: this.totalOptions[0][0].data}
    });

    query.valueChanges.subscribe(result1 => {
      console.log("Result1= ", result1);
      this.currentUser = result1.data;
    });
    console.log("MYDATA= ",this.currentUser);
  }

  queryPatient() {
    const QUERY2 = gql`
      query getPatients($name_checked: Boolean!, $genderCode_checked: Boolean!, $postalCode_checked: Boolean!)
      {
        getAllPatients{
          PatientName @skip(if: $name_checked)
          GenderCode @skip(if: $genderCode_checked)
          PostalCode @skip(if: $postalCode_checked)
        }
      }
    `;
    console.log("Query= ",QUERY2);
    const query = this.apollo.watchQuery({
      query: QUERY2,
      variables: {name_checked: !this.totalOptions[1][0].checked, genderCode_checked: !this.totalOptions[1][1].checked, postalCode_checked: !this.totalOptions[1][2].checked}
    });

    query.valueChanges.subscribe(result1 => {
      console.log("Result1= ", result1);
      this.currentUser = result1.data;
    });
    console.log("MYDATA= ",this.currentUser);
  }

  queryProvider() {
    const QUERY3 = gql`
      query getProviders($name_checked: Boolean!, $organization_checked: Boolean!, $lastOrganization_checked: Boolean!, $licenseNumber_checked: Boolean!, $workexp_checked: Boolean!)
      {
        getAllProviders{
          ProviderName @skip(if: $name_checked)
          ProviderOrganization @skip(if: $organization_checked)
          ProviderLastOrganization @skip(if: $lastOrganization_checked)
          LicenseNumber @skip(if: $licenseNumber_checked)
          ProviderWorkExperience @skip(if: $workexp_checked)
        }
      }
    `;
    console.log("Query= ",QUERY3);
    const query = this.apollo.watchQuery({
      query: QUERY3,
      variables: {name_checked: !this.totalOptions[2][0].checked, organization_checked: !this.totalOptions[2][1].checked, lastOrganization_checked: !this.totalOptions[2][2].checked, licenseNumber_checked: !this.totalOptions[2][3].checked, workexp_checked: !this.totalOptions[2][3].checked}
    });
    //let result: any[] = [];
    query.valueChanges.subscribe(result1 => {
      console.log("Result1= ", result1);
      this.currentUser = result1.data;
    });
    console.log("MYDATA= ",this.currentUser);
  }


  submit(n: any) {
    if(n==2) {
      this.queryProvider();
    }
    else if(n==1)
    {
      console.log(n);
      this.queryPatient();
    }
    else if(n==0)
    {
      console.log(n);
      this.indexChecked = this.selectedIndex(n)
      this.columnsChecked = this.selectedOptions(n);
      let fullName;
      for (let _i = 0; _i < this.columnsChecked.length; _i++) {
        fullName = this.returnNameWithId(n, this.columnsChecked[_i])
        console.log("FullName= ", fullName);
        let k1 = (<HTMLInputElement>document.getElementById(fullName[0])).value
        console.log("K1====",k1);

        this.totalOptions[n][_i].data= k1;
      }
      console.log(n);
      // TestCode
      //document.getElementById('textbox_id').value
      this.queryClaims();
    }
    console.log("TOTAL OPTIONS= ",this.totalOptions);
    // console.log(n);
    // this.queryEncounter();
  }

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
    let id1= '#form1';
    if(this.temp==1)
    {
      cl= ".add-row1";
    }
    else {
      cl= ".add-row2";
      id1= "#form2";
    }
    console.log(this.columnsChecked);
    // #const formData = new FormData(document.querySelector(id1));
    // #console.log(FormData);
    let doc= <HTMLElement> document.querySelector(cl)
    let fullName;
    for (let column of this.columnsChecked) {
      fullName = this.returnNameWithId(this.selectedDocument, column)
      console.log("Printing the name ",fullName);
      doc.innerHTML += `<label style="width: 100px">${fullName}</label>`+this.getFormValue(fullName);
    }
  }
}



