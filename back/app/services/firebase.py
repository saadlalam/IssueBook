#!/usr/bin/env python
import json
import logging
import firebase_admin

from firebase_admin import firestore
from firebase_admin import auth

from app.models.issue import Issue
from datetime import datetime
import time
import datetime as dt

from app.config import properties 

cred = firebase_admin.credentials.Certificate('app/config/credentials/firebase_key.json')
default_app = firebase_admin.initialize_app(cred)


class Firestore():
    def __init__(self, *args, **kwargs):
        self.db = firestore.client()

    def generate_custom_token(self, uid, claims):
        custom_token = auth.create_custom_token(uid, claims)
        return custom_token

    def get_issue(self, issueId: str):
        result = self.db.collection(properties.issuesPath).document(issueId).get()
        if result.to_dict() is None:
            return None
        issue = Issue(result.to_dict())
        issue.id = result.id
        return issue


    def create_issue(self,  issue):
        result = self.db.collection(properties.issuesPath).document()
        result.set(issue)
        return result.id


    def delete_issue(self, issue_id):
        result = self.db.collection(properties.issuesPath).document(issue_id).delete()
        return result


    def get_issues(self):
        issues = []
        docs = self.db.collection(properties.issuesPath).stream()
        try:
            for doc in docs:
                issue = doc.to_dict()
                issue["id"] = doc.id
                issues.append(issue)
            return issues[::-1]
        except Exception as e:
            logging.info(e)
            return []
