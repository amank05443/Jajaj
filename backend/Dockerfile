# Use official Python image as base image
FROM python:3.10-slim

# Set working directory in the container
WORKDIR /app

# Copy Django project files to the container and requirement file
COPY . /app/

# Install system dependencies for psycopg2
RUN apt-get update && apt-get install -y libpq-dev gcc

RUN pip install --no-cache-dir -r requirements.txt

# Expose port for the app
EXPOSE 8000

# Set default command to run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]