import { ScreenshotComponent } from './../popups/screenshot/screenshot.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../models/issue';
import { IssueService } from '../services/issue.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { DocumentData, DocumentReference } from '@firebase/firestore-types';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit, OnChanges {
  issueData: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    reporter: [''],
    environment: ['', Validators.required],
    shot: [''],
    tags: [[]],
    creationDate: [''],
    updateDate: [''],
    status: ['', Validators.required],
    description: [''],
  });
  statusOptions: Status[] = [
    Status.OPEN,
    Status.RESOLVED,
    Status.CLOSED
  ];
  tags: string[] = [];
  isSaving = false;
  loading = false;
  hasScreenShot = false;
  currentIssueRef: DocumentReference<DocumentData> | undefined;
  screenshot: SafeResourceUrl = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private issueService: IssueService) { }

  ngOnInit(): void {
  }


  ngOnChanges() {
    if (this.issueData.controls.shot.value) {
      this.screenshot = this._sanitizer.bypassSecurityTrustResourceUrl(this.issueData.controls.shot.value);
      this.hasScreenShot = true;
    }
  }


  attachScreenShot(event: any) {
    this.getBase64ImageFromEvent(event);
  }


  getBase64ImageFromEvent(e: any) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    const uploadedShot = reader.result;
    this.screenshot = this._sanitizer.bypassSecurityTrustResourceUrl(uploadedShot);
    this.issueData.controls.shot.setValue(uploadedShot);
    this.hasScreenShot = true;
  }

  removeScreenShot() {
    this.issueData.controls.shot.setValue('');
    this.screenshot = '';
    this.hasScreenShot = false;
  }

  openScreenShot(event: any) {
    console.log("event ?", event)
    const url = this.issueData.controls.shot.value;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      url
    }
    this.dialog.open(ScreenshotComponent, dialogConfig);
  }


  setDescription(description: any) {
    console.log(description);
    console.log(this.issueData.getRawValue());
  }


  saveIssue() {
    this.loading = true;
    console.log(this.issueData.getRawValue());
    const issue = this.issueData.getRawValue()
    this.issueService.addIssue(issue).then(ref => {
      this.currentIssueRef = ref;
      this.loading = false;
      this.navigateToIssue(this.currentIssueRef)
      issue.creationDate = new Date();
      this.currentIssueRef.update(issue);
    })

  }

  navigateToIssue(issueRef: DocumentReference<DocumentData>) {
    const issueId = issueRef.id;
    const state = issueRef;
    this.router.navigate(['issue/' + issueId], {state});
  }

  clearForm() {
    this.removeScreenShot();
    this.issueData.reset();
  }


  add(event: MatChipInputEvent): void {
    console.log("event ?", event)
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
      this.issueData.controls.tags.setValue(this.tags)
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.issueData.controls.tags.setValue(this.tags)
    }
  }

}
