from app.services.firebase import Firestore
from app.models.issue import Issue
import logging
from flask import Blueprint, request, jsonify, make_response


issues = Blueprint('issues', __name__)
firestore_service = Firestore()

@issues.route('/new', methods=['POST'])
def new_issue():
    try:
        data = request.get_json()
        if "issue" in data:  
            issue = Issue(data["issue"]).to_dict(remove_id=True)
            issue_ref = firestore_service.create_issue(issue)
            resp =  make_response(jsonify({"id": issue_ref}), 200)
        else:
            resp =  make_response(jsonify({"error": "not enough args"}), 400) 
        return resp
    except Exception as e:
        logging.info("Creating issue triggered the below error :")
        logging.info(e)
        resp = make_response(jsonify({}), 500)
        return resp





@issues.route('/<issue_id>', methods=['DELETE'])
def delete(issue_id):
    try:
        firestore_service.delete_issue(issue_id)
        resp =  make_response(jsonify({"Deleted issue : ": issue_id}), 200)
        return resp
    except Exception as e:
        logging.info("An error occurred while trying to delete the issue !")
        logging.info(e)
        return make_response(jsonify({"message": 'Internal error'}), 500)
    
    
@issues.route('/', methods=['GET'])
def get_issues():
    try:
        issues = firestore_service.get_issues()
        resp =  make_response(jsonify(issues), 200)
        return resp
    except Exception as e:
        logging.info("Loading issues triggered the below error :")
        logging.info(e)
        return make_response(jsonify([]), 500)
    
    
    
@issues.route('/<issue_id>', methods=['GET'])
def get_issue(issue_id):
    try:
        issue = firestore_service.get_issue(issue_id).to_dict()
        if issue:
            resp =  make_response(jsonify(issue), 200)
        else:
            resp =  make_response(jsonify({}), 404)
        return resp
    except Exception as e:
        logging.info("Loading issue triggered the below error :")
        logging.info(e)
        return make_response(jsonify({}), 500)