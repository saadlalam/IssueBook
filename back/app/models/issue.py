#!/usr/bin/env python
import logging 

from enum import Enum

class Status(Enum):
    OPEN = 'Open'
    RESOLVED = 'Resolved'
    CLOSED = 'Closed'


class Issue(object):
    def __init__(self, kwargs={}):
        self.id = None
        self.title = None
        self.creationDate = None
        self.status = None
        self.updateDate = None
        self.tags = None
        self.environment = None
        self.description = None 
        self.reporter = None
        self.shot = None

        if kwargs is not None:
            for key in kwargs:
                if hasattr(self, key):
                    if key == 'status' and kwargs[key] != "":
                        self.status = Status(kwargs[key])
                        continue
                    setattr(self, key, kwargs[key])



    def to_dict(self, remove_nulls=False, remove_id=False) -> dict:
        if remove_nulls:
            res = vars(self)
            for x in list(res.keys()):
                if res[x] is None:
                    res.pop(x)
        else:
            res = vars(self)

        if remove_id:
            res.pop('id')
        if 'status' in res and res['status'] != '':
            res['status'] = res['status'].value
        return res


