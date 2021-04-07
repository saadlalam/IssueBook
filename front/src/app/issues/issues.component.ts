import { Status } from './../models/issue';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Issue } from '../models/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'environment', 'status', 'creationDate', 'updateDate'];
  dataSource : MatTableDataSource<any[]> | any  = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  @ViewChild(MatSort) sort: MatSort | undefined;
  issues: Partial<Issue>[] = [
    {
      id: '1',
      title: 'First issue',
      environment: 'Python',
      status: Status.OPEN,
      creationDate: new Date(),
      updateDate: undefined

    },
    {
      id: '2',
      title: 'Second issue',
      environment: 'Typescript',
      status: Status.OPEN,
      creationDate: new Date(),
      updateDate: undefined

    },
    {
      id: '1',
      title: 'First issue',
      environment: 'Angular',
      status: Status.OPEN,
      creationDate: new Date(),
      updateDate: undefined

    }
  ];
  loading = false
  constructor() { }

  ngOnInit(): void {
    this.loadIssues();
  }


  loadIssues() {
    this.dataSource = new MatTableDataSource<any>(this.issues);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
