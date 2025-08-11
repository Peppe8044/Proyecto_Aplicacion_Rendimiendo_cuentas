// Auth Handler para GastoÁgil
// Maneja la autenticación y redirecciones entre landing page y dashboard

class AuthHandler {
    constructor() {
        this.dashboardUrl = 'http://localhost:3000';
        this.checkAuthStatus();
    }

    // Verificar si el usuario está autenticado
    checkAuthStatus() {
        const user = localStorage.getItem('gastoagil_user');
        if (user) {
            // Si hay usuario en localStorage, redirigir al dashboard
            this.redirectToDashboard();
        }
    }

    // Redirigir al dashboard
    redirectToDashboard() {
        window.location.href = this.dashboardUrl;
    }

    // Limpiar autenticación (para logout)
    clearAuth() {
        localStorage.removeItem('gastoagil_user');
        // Redirigir a la landing page
        window.location.href = '/';
    }

    // Verificar si viene del dashboard (logout)
    checkLogoutRedirect() {
        const urlParams = new URLSearchParams(window.location.search);
        const logout = urlParams.get('logout');
        
        if (logout === 'true') {
            this.clearAuth();
        }
    }

    // Inicializar el handler
    init() {
        this.checkLogoutRedirect();
        
        // Agregar listeners a los botones de login
        const loginButtons = document.querySelectorAll('a[href*="localhost:3000"]');
        loginButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.redirectToDashboard();
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const authHandler = new AuthHandler();
    authHandler.init();
});

// Función global para logout (llamada desde el dashboard)
window.gastoagilLogout = function() {
    const authHandler = new AuthHandler();
    authHandler.clearAuth();
};
