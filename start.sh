#!/bin/bash
# Startup script for WiFi Password Retriever Web App

echo "Starting WiFi Password Retriever Web Application..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install/update dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Set default environment variables if not set
export FLASK_APP=${FLASK_APP:-app.py}
export FLASK_ENV=${FLASK_ENV:-production}
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-5000}

# Check if .env file exists, if not create from example
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please edit .env file with your configuration before running in production!"
fi

# Start the application
if [ "$FLASK_ENV" = "development" ]; then
    echo "Starting in development mode..."
    python app.py
else
    echo "Starting in production mode with Gunicorn..."
    gunicorn --bind $HOST:$PORT --workers 4 --timeout 120 app:app
fi