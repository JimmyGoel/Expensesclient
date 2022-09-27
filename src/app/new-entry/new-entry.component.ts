import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntryService } from '../entry.service';
import { EntryElement } from '../Interfaces/EntryElement';
import { Type } from '../Interfaces/Type';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent {

  types: Type[] = [
    { value: true, display: 'Expenses' },
    { value: false, display: 'Income' }
  ]

  constructor(private entryServcie:EntryService, private router:Router) { }

  entryForm = new FormGroup({
    description: new FormControl('',Validators.required),
    isExpenses: new FormControl('',Validators.required),
    value: new FormControl('',[Validators.required,Validators.pattern('\\d+\\.?\\d*')]),
    entryDate: new FormControl('',[Validators.required])
  })
  onSubmit(){
    console.log(this.entryForm.value);
    this.entryServcie.createEntry(this.entryForm.value as EntryElement)
    .subscribe((data)=>{
      debugger;
      console.log('Result - ',data);
      this.router.navigate(['/entries']);
    });
  }

}
