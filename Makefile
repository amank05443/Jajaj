SHELL := /bin/bash
.PHONY: frontend backend run

backend:
	cd backend && source venv/bin/activate && python3 manage.py runserver

frontend:
	cd frontend && npm start


run:
	@echo "Application started..."
	cd backend && source venv/bin/activate && python3 manage.py runserver & \
	cd frontend && npm start & \
	wait



