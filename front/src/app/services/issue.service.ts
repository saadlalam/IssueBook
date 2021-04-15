import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Issue } from '../models/issue';



@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient, private db: AngularFirestore) { }


addIssue(issue: Partial<Issue>): Observable<object> {
  return this.http.post(environment.rest + '/issues/new', {issue});
}


loadIssues(): Observable<object> {
  return this.http.get(environment.rest + '/issues');
}


removeIssue(issueId: string): Observable<object>{
  return this.http.delete(environment.rest + '/issues/delete' + issueId);
}

getIssueById(issueId: string): Observable<object>{
  return this.http.get(environment.rest + '/issues/' + issueId);
}


}
