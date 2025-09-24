#!/usr/bin/env python3
"""
WSGI entry point for production deployment
"""

import os
from app import app

if __name__ == "__main__":
    # Production configuration
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    
    app.run(host=host, port=port, debug=False)