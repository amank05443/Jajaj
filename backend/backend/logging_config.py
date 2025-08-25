#Added by Abhishek Singh,LAM
# Purpose :- For better debugging and its logging in the terminal
import logging
from venv import logger

from django.utils.deprecation import MiddlewareMixin
from django.db import connection
from django.conf import settings

#Custom filter to add request info
class RequestContextFilter(logging.Filter):
    def filter(self, record):
        record.request_method = getattr(record, 'request_method', "-")
        record.request_path = getattr(record, 'request_path', "-")
        return True

#Middleware to attach request info into logs
class RequestContextMiddleware(MiddlewareMixin):
    def process_request(self, request):
        logging.LoggerAdapter(logging.getLogger(),{
            "request_method":request.method,
            "request_path":request.path,
        })
        return None

#Middleware to log SQL queries (dev only)
class SQLDebugMiddleware:
    def __init__(self,get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if settings.DEBUG and connection.queries and response.status_code >= 400:
            logger = logging.getLogger('django.db.backends')
            logger.error(
                "SQL queries executed for %s %s:",request.method,request.path
            )
            for q in connection.queries:
                logger.error("  (%.3f) %s", float(q.get("time",0)),q["sql"])

        return response

#Logging Configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        "detailed":{
            "format":(
                "[{levelname}] {asctime} {name}:{lineno} - {message}"
                "(method={request_method} path={request_path})"
            ),
            "style":"{",
        },
    },
        "filters":{
            "request_context":{
                "()":RequestContextFilter,
            },
        },
        "handlers":{
            "console":{
                "level":"DEBUG",
                "class":"logging.StreamHandler",
                "formatter":"detailed",
                "filters":["request_context"],
            },
            "file":{
                "level":"DEBUG",
                "class":"logging.FileHandler",
                "filename":"backend.log",
                "formatter":"detailed",
                "filters":["request_context"],
            },
        },
        "loggers":{
            "django":{
                "handlers":["console","file"],
                "level":"INFO",
                "propagate":True,
            },
            "django.request":{
                "handlers":["console","file"],
                "level":"ERROR",
                "propagate":False,
            },
            "django.db.backends":{
                "handlers":["console","file"],
                "level":"DEBUG" if settings.DEBUG else "INFO",
                "propagate":False,
            },
            "userprofile":{
                "handlers":["console","file"],
                "level":"DEBUG",
                "propagate":False,
            },
        },
    }