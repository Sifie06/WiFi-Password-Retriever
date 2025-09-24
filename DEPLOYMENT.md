# Deployment Guide

## Quick Deploy Options

### 1. Docker (Recommended)
```bash
# Clone and run
git clone <repository-url>
cd WiFi-Password-Retriever
docker-compose up --build -d

# Access at http://localhost:5000
```

### 2. Local Server
```bash
# Clone and setup
git clone <repository-url>
cd WiFi-Password-Retriever

# Run startup script
./start.sh

# Or manual setup:
pip install -r requirements.txt
python app.py
```

### 3. Production Server
```bash
# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run with Gunicorn
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
```

### 4. Cloud Deployment

#### Heroku
```bash
# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main
heroku open
```

#### AWS/GCP/Azure
- Use the provided Dockerfile
- Deploy as container service
- Set environment variables in cloud console

## Configuration

### Environment Variables
- `SECRET_KEY`: Flask secret key (required for production)
- `FLASK_ENV`: development/production
- `HOST`: Bind address (default: 0.0.0.0)
- `PORT`: Port number (default: 5000)

### Security Notes
- Change SECRET_KEY in production
- Use HTTPS in production
- Consider using a reverse proxy (nginx)
- Enable firewall rules as needed

## Monitoring

### Health Check
- Endpoint: `GET /`
- Expected: HTTP 200

### Logs
- Application logs via Flask/Gunicorn
- Access logs via reverse proxy
- Error tracking via application monitoring

## Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT in .env
2. **Permission denied**: Check file permissions
3. **Module not found**: Run `pip install -r requirements.txt`
4. **Windows functionality**: Only works on Windows hosts

### Performance
- Use multiple Gunicorn workers for production
- Consider using nginx for static file serving
- Monitor memory usage on Windows systems