// import { Component, OnInit } from '@angular/core';
// import {ThemePalette} from "@angular/material/core";
//
// export interface Task {
//   name: string;
//   completed: boolean;
//   color: ThemePalette;
//   subtasks?: Task[];
// }
//
// @Component({
//   selector: 'app-list-drag',
//   templateUrl: './list-drag.component.html',
//   styleUrls: ['./list-drag.component.css']
// })
// export class ListDragComponent implements OnInit {
//
//   choices: string[] = [];
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//   choices: string[] = [];
//   options = [
//     {name:'OptionA', value:'1', checked:false},
//     {name:'OptionB', value:'2', checked:false},
//     {name:'OptionC', value:'3', checked:false}
//   ]
//
//   selectedOptions() { // right now: ['1','3']
//     return this.options
//       .filter(opt => opt.checked)
//       .map(opt => opt.value)
//   }
//
//   submit(){
//     this.choices= this.selectedOptions();
//   }
//
//
// }
