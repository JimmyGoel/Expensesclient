import { Component, OnInit, ViewChild } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement } from '../Interfaces/EntryElement';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Description', 'IsExpenses', 'Value','Date', 'Actions']
  dataSource: any;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) matPaginator?: MatPaginator;
  
  constructor(private service: EntryService, private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.service.getAll().subscribe((data) => {
      console.log('Result - ', data);
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[])
      this.dataSource.paginator=this.matPaginator
    })
  }

  updateEntry(element: any) {
    console.log('Result - ', element);
    this.dialog.open(UpdateEntryComponent, {
      data: {
        description: element.description,
        isExpenses: element.isExpenses,
        value: element.value,
        Id: element.id
      }
    })
  }
  deletEntry(element: any) {

  }
  applyfilter(filtervalue: any) {
    console.log(filtervalue.value);
    this.dataSource.filter = filtervalue.value.trim();
  }
}
