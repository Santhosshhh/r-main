document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name && email && subject && message) {
      alert("Form submitted successfully!");

      // Clear form
      document.getElementById("contactForm").reset();

      // Add success animation
      document.querySelector(".container").classList.add("success");
      setTimeout(() => {
        document.querySelector(".container").classList.remove("success");
      }, 2000);
    } else {
      alert("Please fill in all fields.");
    }
  });
