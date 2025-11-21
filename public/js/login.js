// public/js/login.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    loginForm.addEventListener("submit", async function(e){
        e.preventDefault(); // Evita recarga de página

        // Limpiar mensaje de error
        errorMsg.textContent = "";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if(!email || !password){
            errorMsg.textContent = "Por favor ingresa email y contraseña";
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if(data.success){
                // Guardar sesión y redirigir
                sessionStorage.setItem("loggedIn", "true");
                window.location.href = "/factura";
            } else {
                errorMsg.textContent = data.message;
            }
        } catch (err) {
            console.error("Error en login:", err);
            errorMsg.textContent = "Error en el servidor, intenta de nuevo";
        }
    });
});

