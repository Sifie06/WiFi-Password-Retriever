// Main JavaScript functionality for WiFi Password Retriever

// Utility functions
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Password copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showNotification('Failed to copy password', 'danger');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Password copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy: ', err);
            showNotification('Failed to copy password', 'danger');
        }
        document.body.removeChild(textArea);
    }
}

// Add copy functionality to password fields
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('copy-password')) {
        const password = e.target.getAttribute('data-password');
        copyToClipboard(password);
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+R or F5 to refresh
    if ((e.ctrlKey && e.key === 'r') || e.key === 'F5') {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn && !refreshBtn.disabled) {
            e.preventDefault();
            refreshBtn.click();
        }
    }
    
    // Escape to hide all passwords
    if (e.key === 'Escape') {
        const visiblePasswords = document.querySelectorAll('.password-field code');
        visiblePasswords.forEach(field => {
            const toggleBtn = field.closest('tr').querySelector('.toggle-password');
            if (toggleBtn) {
                toggleBtn.click();
            }
        });
    }
});

// Enhanced table functionality
function enhanceTable() {
    const table = document.querySelector('#wifiTable');
    if (table) {
        // Add row hover effects
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
            });
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }
}

// Auto-refresh functionality
let autoRefreshInterval = null;

function startAutoRefresh(intervalMinutes = 5) {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(() => {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn && !refreshBtn.disabled) {
            console.log('Auto-refreshing WiFi profiles...');
            refreshBtn.click();
        }
    }, intervalMinutes * 60 * 1000);
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[type="button"]');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalHtml = this.innerHTML;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
            this.disabled = true;
            
            // Re-enable after 3 seconds (fallback)
            setTimeout(() => {
                this.innerHTML = originalHtml;
                this.disabled = false;
            }, 3000);
        });
    });
});

// Export functions for external use
window.WifiPasswordRetriever = {
    showNotification,
    copyToClipboard,
    enhanceTable,
    startAutoRefresh,
    stopAutoRefresh
};