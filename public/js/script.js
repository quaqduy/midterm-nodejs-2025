// public/js/script.js

// Form validation
document.addEventListener('DOMContentLoaded', function () {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s';
            alert.style.opacity = '0';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 500);
        }, 5000);
    });

    // API testing functionality
    const apiTestButtons = document.querySelectorAll('.api-test-btn');
    apiTestButtons.forEach(btn => {
        btn.addEventListener('click', async function () {
            const endpoint = this.dataset.endpoint;
            const method = this.dataset.method || 'GET';
            const testResult = document.getElementById('test-result');

            try {
                const response = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                testResult.innerHTML = `
                    <div class="alert alert-${response.ok ? 'success' : 'danger'}">
                        <strong>${method} ${endpoint}</strong><br>
                        Status: ${response.status} ${response.statusText}<br>
                        Response: <pre>${JSON.stringify(data, null, 2)}</pre>
                    </div>
                `;

            } catch (error) {
                testResult.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Error:</strong> ${error.message}
                    </div>
                `;
            }
        });
    });

    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const code = this.previousElementSibling.textContent;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.classList.add('btn-success');

                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('btn-success');
                }, 2000);
            });
        });
    });

    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // User search functionality
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.users-table tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Form auto-save (demo)
    const forms = document.querySelectorAll('.user-form');
    forms.forEach(form => {
        const formData = {};

        form.addEventListener('input', function (e) {
            if (e.target.name) {
                formData[e.target.name] = e.target.value;
                localStorage.setItem('formDraft', JSON.stringify(formData));
            }
        });

        // Load saved draft
        const savedDraft = localStorage.getItem('formDraft');
        if (savedDraft && !form.querySelector('input').value) {
            const draft = JSON.parse(savedDraft);
            Object.keys(draft).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) input.value = draft[key];
            });
        }

        // Clear draft on submit
        form.addEventListener('submit', function () {
            localStorage.removeItem('formDraft');
        });
    });

    // Toast notifications
    window.showToast = function (message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        });
    };

    // Add toast styles
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 1000;
            transition: opacity 0.3s;
        }
        .toast-success {
            border-left: 4px solid #48bb78;
        }
        .toast-error {
            border-left: 4px solid #f56565;
        }
        .toast-info {
            border-left: 4px solid #4299e1;
        }
        .toast-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #718096;
            margin-left: 1rem;
        }
    `;
    document.head.appendChild(toastStyles);
});