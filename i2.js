function searchFlights() {
  const fromLocation = document.getElementById("from_location").value;
  const toLocation = document.getElementById("to_location").value;
  const travellers = document.getElementById("travellers").value;
  const departure = document.getElementById("departure").value;
  const returnDate = document.getElementById("return").value;

  const query = {
    from_location: fromLocation,
    to_location: toLocation,
    travellers: travellers,
    departure: departure,
    return: returnDate,
  };

  $.ajax({
    url: "http://localhost:3000/search-flights",
    method: "GET",
    data: query,
    success: function (data) {
      displayFlights(data);
    },
    error: function (error) {
      console.error("Error fetching flights", error);
    },
  });
}

function displayFlights(flights) {
  const flightsGrid = document.getElementById("flightsGrid");
  flightsGrid.innerHTML = "";

  flights.forEach((flight) => {
    const flightCard = document.createElement("div");
    flightCard.className = "flight__card";
    flightCard.innerHTML = `
      <h3>${flight.airline}</h3>
      <p>From: ${flight.from}</p>
      <p>To: ${flight.to}</p>
      <p>Departure: ${flight.departure}</p>
      <p>Price: $${flight.price}</p>
    `;
    flightsGrid.appendChild(flightCard);
  });

  document.getElementById("flightResults").style.display = "block";
}
// i2.js

function searchFlights() {
  const fromLocation = document.getElementById("from_location").value;
  const toLocation = document.getElementById("to_location").value;
  const travellers = document.getElementById("travellers").value;
  const departure = document.getElementById("departure").value;
  const returnDate = document.getElementById("return").value;

  // Make AJAX request to server
  $.ajax({
    type: "POST",
    url: "/searchFlights",
    data: {
      from: fromLocation,
      to: toLocation,
      travellers,
      departure,
      returnDate,
    },
    success: function (flights) {
      // Display flight options
      const flightsGrid = document.getElementById("flightsGrid");
      flightsGrid.innerHTML = "";
      flights.forEach((flight) => {
        const flightCard = `
          <div class="flight__card">
            <h3>${flight.from} to ${flight.to}</h3>
            <p>Price: $${flight.price}</p>
          </div>
        `;
        flightsGrid.innerHTML += flightCard;
      });
      document.getElementById("flightResults").style.display = "block";
    },
    error: function (err) {
      console.error("Error:", err);
    },
  });
}

document
  .getElementById("travelForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      from_location: document.getElementById("from_location").value,
      to_location: document.getElementById("to_location").value,
      travellers: document.getElementById("travellers").value,
      departure: document.getElementById("departure").value,
      return: document.getElementById("return").value,
    };

    const response = await fetch("http://localhost:3000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    alert(result);

    if (response.ok) {
      const ticketsList = document.getElementById("ticketsList");
      const ticketItem = document.createElement("li");
      ticketItem.textContent = `From: ${formData.from_location}, To: ${formData.to_location}, Travellers: ${formData.travellers}, Departure: ${formData.departure}, Return: ${formData.return}`;
      ticketsList.appendChild(ticketItem);
    }
  });
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const ticketsList = document.getElementById("ticketsList");
  const tickets = ticketsList.querySelectorAll("li");

  let y = 10;
  tickets.forEach((ticket, index) => {
    doc.text(ticket.textContent, 10, y);
    y += 10;
  });

  doc.save("booked_tickets.pdf");
}
