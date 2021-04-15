import { Status } from './../models/issue';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'environment', 'status', 'creationDate', 'updateDate', 'actions'];
  dataSource : MatTableDataSource<any[]> | any  = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  @ViewChild(MatSort) sort: MatSort | undefined;
  issues: Partial<Issue>[] = [];
  loading = false
  constructor(private issueService: IssueService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadIssues();
  }


  loadIssues() {
    this.loading = true;
    this.issueService.loadIssues().subscribe((res: Partial<Issue>[] | any) => {
      if (res) {
        this.issues = res;
        this.dataSource = new MatTableDataSource<any>(this.issues);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
    });
  }

}
