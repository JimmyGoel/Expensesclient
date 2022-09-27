import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry.service';
import { EntryElement } from '../Interfaces/EntryElement';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.css']
})
export class DeleteEntryComponent implements OnInit {

  id: any;
  entry: EntryElement = { Description: '', Value: 0, IsExpenses: false,entryDate:'' }
  constructor(private route: ActivatedRoute, private router: Router,
    private services: EntryService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.services.getEntrybyId(this.id).subscribe((data: any) => {
      console.log('data', data);
      debugger;
      this.entry.Description = data.description;
      this.entry.Value = data.value;
      this.entry.IsExpenses = data.isExpenses;
    })
  }
  cancle() {
    this.router.navigate(['/entries']);
  }
  confirm() {
    this.services.deleteEntry(this.id).subscribe((data) => {
      console.log('data', data);
      this.router.navigate(['/entries']);
    });
  }
}
