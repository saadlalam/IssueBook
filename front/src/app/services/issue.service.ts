import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Issue } from '../models/issue';
import { DocumentReference } from '@firebase/firestore-types';



@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient, private db: AngularFirestore) { }



  async addIssue(issue: Partial<Issue>): Promise<DocumentReference> {
    const docRef: DocumentReference<any> = await this.db.collection(environment.issuesPath).add(issue);
    return docRef;
  }


  async getIssues(): Promise<Issue[]> {
    const querySnap = await this.db
    .collection(environment.issuesPath)
    .get().toPromise();

  const listIssues: Issue[] = [];
  querySnap.docs.forEach((value: any) => {
    const data = value.data();
    data.id = value.id;
    listIssues.push(data);
    listIssues.sort();
  });

  return listIssues;
  }

}
