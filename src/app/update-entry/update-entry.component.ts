import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntryService } from '../entry.service';
import { Type } from '../Interfaces/Type';
@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})
export class UpdateEntryComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  types: Type[] = [
    { value: true, display: 'Expenses' },
    { value: false, display: 'Income' }
  ]
  constructor(private fb: FormBuilder, private service: EntryService,private router:Router,
    private dialogRef: MatDialogRef<UpdateEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      description: string
      , isExpenses: boolean, value: number, Id: number
    }) {

    this.id = data.Id;
    this.form = fb.group({
      description: [data.description, Validators.required],
      isExpenses: [data.isExpenses, Validators.required],
      value: [data.value, Validators.required]
    })

  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.form.value.id=this.id;
    console.log(this.id, this.form.value);
    this.service.updateEntry(this.id, this.form.value).subscribe((data)=>{
      console.log('Data',data);
      //this.dialogRef.close();
      //this.router.navigate(['/entries']);
      this.reloadPage();
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
