function fetchEvents() {
  const year = document.getElementById("year-input").value;
  if (!year) {
    alert("Please enter a year!");
    return;
  }

  document.getElementById("selected-year").textContent = year;

  const apiUrl = `/search?year=${year}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        const events = data.query.search;
        displayEvents(events);
      }
    })
    .catch(err => {
      console.error("Error fetching events:", err);
    });
}


function displayEvents(events) {
  const eventsContainer = document.getElementById("events-container");
  eventsContainer.innerHTML = ""; // Clear any previous results

  if (events.length === 0) {
    eventsContainer.innerHTML = "<p>No events found for this year.</p>";
    return;
  }

  events.forEach(event => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item");
    eventItem.innerHTML = `
      <h3><a href="https://en.wikipedia.org/?curid=${event.pageid}" target="_blank">${event.title}</a></h3>
      <p>${event.snippet}...</p>
    `;
    eventsContainer.appendChild(eventItem);
  });
}
