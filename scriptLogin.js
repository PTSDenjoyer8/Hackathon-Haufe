document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#loginForm');


    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const name = loginForm.name.value;
        const password = loginForm.password.value; 

        if (name && password) {
            fetch('http://127.0.0.1:5000/login', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Login successful!');
                    localStorage.setItem('nume', name)
                    window.location.href = 'loggedin.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Please fill in both fields.');
        }
    });
});
