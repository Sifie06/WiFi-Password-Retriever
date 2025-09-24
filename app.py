#!/usr/bin/env python3
"""
WiFi Password Retriever Web Application
Only extracts passwords for networks already saved on this computer.
Does NOT crack or access unauthorized networks.
"""

import subprocess
import platform
import json
from typing import List, Dict, Tuple
from flask import Flask, render_template, jsonify, request, flash
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

def get_saved_wifi_profiles() -> List[str]:
    """Get list of saved Wi-Fi profiles on Windows"""
    if platform.system() != 'Windows':
        return []
    
    try:
        output = subprocess.check_output(
            ['netsh', 'wlan', 'show', 'profiles'],
            stderr=subprocess.DEVNULL,
            shell=True
        ).decode('utf-8', errors='ignore')
        return [line.split(':')[1].strip() 
                for line in output.split('\n') 
                if 'All User Profile' in line]
    except (subprocess.CalledProcessError, FileNotFoundError):
        return []

def get_wifi_password(profile: str) -> str:
    """Get password for a specific saved Wi-Fi profile"""
    if platform.system() != 'Windows':
        return '<not supported on this platform>'
    
    try:
        output = subprocess.check_output(
            ['netsh', 'wlan', 'show', 'profile', profile, 'key=clear'],
            stderr=subprocess.DEVNULL,
            shell=True
        ).decode('utf-8', errors='ignore')
        return next(
            (line.split(':')[1].strip()
             for line in output.split('\n')
             if 'Key Content' in line),
            '<no password>'
        )
    except subprocess.CalledProcessError:
        return '<error retrieving>'

def get_system_info() -> Dict[str, str]:
    """Get system information"""
    return {
        'platform': platform.system(),
        'version': platform.version(),
        'supported': platform.system() == 'Windows'
    }

@app.route('/')
def index():
    """Main page"""
    system_info = get_system_info()
    return render_template('index.html', system_info=system_info)

@app.route('/api/profiles')
def api_profiles():
    """API endpoint to get WiFi profiles"""
    system_info = get_system_info()
    
    if not system_info['supported']:
        return jsonify({
            'error': 'This application only works on Windows systems',
            'system_info': system_info
        }), 400
    
    try:
        profiles = get_saved_wifi_profiles()
        if not profiles:
            return jsonify({
                'message': 'No saved Wi-Fi profiles found',
                'profiles': [],
                'system_info': system_info
            })
        
        results = []
        for profile in profiles:
            password = get_wifi_password(profile)
            results.append({
                'name': profile,
                'password': password,
                'has_password': password not in ['<no password>', '<error retrieving>']
            })
        
        return jsonify({
            'profiles': results,
            'count': len(results),
            'system_info': system_info
        })
    
    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}',
            'system_info': system_info
        }), 500

@app.route('/api/profile/<profile_name>')
def api_single_profile(profile_name):
    """API endpoint to get a specific WiFi profile password"""
    system_info = get_system_info()
    
    if not system_info['supported']:
        return jsonify({
            'error': 'This application only works on Windows systems',
            'system_info': system_info
        }), 400
    
    try:
        password = get_wifi_password(profile_name)
        return jsonify({
            'name': profile_name,
            'password': password,
            'has_password': password not in ['<no password>', '<error retrieving>'],
            'system_info': system_info
        })
    
    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}',
            'system_info': system_info
        }), 500

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Development server
    app.run(debug=True, host='0.0.0.0', port=5000)