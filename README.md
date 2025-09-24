
# WiFi Password Retriever Web Application

## Project Overview
The **WiFi Password Retriever** is a web application designed to extract and display passwords for Wi-Fi networks that are already saved on your Windows computer. This tool only extracts passwords for networks you have previously connected to and does not attempt to crack or access unauthorized networks.

**🌐 Now Available as a Web Application!** - Deploy on any server for easy access through a web browser.

## Features
- 🌐 **Modern Web Interface** - Clean, responsive design with Bootstrap
- 🔒 **Secure & Legal** - Only retrieves saved passwords from the local system
- 📱 **Mobile Friendly** - Works on desktop, tablet, and mobile devices
- 🎯 **Real-time Results** - AJAX-powered interface with instant feedback
- 📊 **Export Functionality** - Download results as JSON for backup
- 🔄 **Auto-refresh** - Optional automatic updates of WiFi profiles
- 🐳 **Docker Ready** - Easy deployment with Docker containers
- 🚀 **Production Ready** - Configured for deployment with Gunicorn and Nginx

## Quick Start

### Method 1: Docker (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd WiFi-Password-Retriever

# Run with Docker Compose
docker-compose up --build

# Access the application at http://localhost:5000
```

### Method 2: Local Installation
```bash
# Clone the repository
git clone <repository-url>
cd WiFi-Password-Retriever

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py

# Access the application at http://localhost:5000
```

### Method 3: Production Deployment
```bash
# Clone and setup
git clone <repository-url>
cd WiFi-Password-Retriever

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your settings

# Run with Gunicorn
gunicorn --bind 0.0.0.0:5000 app:app
```

## Web Interface

The web application provides:

- **Dashboard**: Overview of system compatibility and quick access to WiFi retrieval
- **Results Table**: Interactive table showing WiFi networks and passwords
- **Password Visibility Toggle**: Click to show/hide individual passwords
- **Export Feature**: Download results as JSON file
- **Responsive Design**: Works on all device sizes
- **Error Handling**: Clear feedback for system compatibility and errors

## API Endpoints

The application also provides REST API endpoints:

- `GET /` - Main web interface
- `GET /api/profiles` - Get all WiFi profiles and passwords (JSON)
- `GET /api/profile/<name>` - Get specific WiFi profile password (JSON)

Example API response:
```json
{
  "profiles": [
    {
      "name": "MyWiFiNetwork",
      "password": "mypassword123",
      "has_password": true
    }
  ],
  "count": 1,
  "system_info": {
    "platform": "Windows",
    "supported": true
  }
}
```

## Project Structure
```
.
├── app.py                 # Main Flask application
├── wsgi.py               # WSGI entry point for production
├── requirements.txt      # Python dependencies
├── Dockerfile           # Docker container configuration
├── docker-compose.yml   # Docker Compose setup
├── .env.example         # Environment variables template
├── templates/           # HTML templates
│   ├── base.html        # Base template
│   ├── index.html       # Main page
│   ├── 404.html         # Not found page
│   └── 500.html         # Error page
├── static/              # Static assets
│   ├── css/style.css    # Custom styles
│   └── js/app.js        # JavaScript functionality
└── wifi_password_retriever.py  # Original CLI script (legacy)
```

## System Requirements

- **Operating System**: Windows (for WiFi password retrieval functionality)
- **Python**: 3.8 or higher
- **Browser**: Any modern web browser
- **Network**: Access to the server running the application

**Note**: While the web application can run on any operating system, the actual WiFi password retrieval functionality only works on Windows systems using the `netsh` command.

## Deployment Options

### Docker Deployment
The application includes full Docker support:
- `Dockerfile` for containerization
- `docker-compose.yml` for easy deployment
- Health checks and proper logging
- Production-ready configuration

### Traditional Server Deployment
- WSGI-compatible (works with Gunicorn, uWSGI, etc.)
- Environment variable configuration
- Static file serving support
- SSL/HTTPS ready

### Cloud Deployment
Ready for deployment on:
- Heroku
- AWS (EC2, ECS, Lambda)
- Google Cloud Platform
- Microsoft Azure
- DigitalOcean
- Any VPS or cloud provider

## Security Considerations

- **Local Access Only**: Only retrieves passwords saved on the local computer
- **No External Communication**: Passwords are not transmitted or stored externally
- **Session Security**: Configurable session security for production use
- **Environment Variables**: Sensitive configuration via environment variables
- **Input Validation**: Proper validation and sanitization of all inputs

## Configuration

Copy `.env.example` to `.env` and modify:

```bash
# Flask secret key (change this in production!)
SECRET_KEY=your-super-secret-key-change-this-in-production

# Flask environment
FLASK_ENV=production

# Server settings
HOST=0.0.0.0
PORT=5000
```

## Legal Notice
This tool is intended for **recreational and educational purposes only**. It only retrieves passwords for WiFi networks that are already saved on your own computer. Ensure you comply with local laws and regulations regarding network access and privacy.

**What this tool does:**
- ✅ Retrieves passwords for networks you've previously connected to
- ✅ Accesses only locally stored credentials
- ✅ Works with your own saved WiFi profiles

**What this tool does NOT do:**
- ❌ Crack or hack WiFi passwords
- ❌ Access unauthorized networks
- ❌ Store or transmit passwords externally
- ❌ Work on networks you haven't connected to before

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.