function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("nameSignup").value;
  const email = document.getElementById("emailSignup").value;
  const password = document.getElementById("passwordSignup").value;

  const userData = {
      name: name,
      email: email,
      password: password
  };

  fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === "User saved successfully") {
          window.location.href = "index.html";
      } else {
          alert("Error registering user.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Failed to register user.");
  });
}
