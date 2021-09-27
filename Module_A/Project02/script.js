// Get DOM Elements

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const selectMovie = document.querySelector('#movie');

// Get the ticket prices from the selectMovie dropdown
let ticketPrice = +selectMovie.value; // + sign convert the string into number

// Call the update UI function - get data from local storage and update the UI
updateUI();


// Function to update counts
function updateCount() {
    // Calculate how many seats are selected
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    // Create an array using node list
    const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
    // Get the number of selected seats
    const selectedSeatsCount = selectedSeats.length;
    // Update DOM with the count
    count.innerText = selectedSeatsCount;
    // Update DOM with the total price
    total.innerText = selectedSeatsCount * ticketPrice;
    // Save data to local storage
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));
};

// Function to save the movie data in local storage
function saveMovieData(movieIndex, moviePrice) {
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
    
};

// Function to get data from localstorage and update the UI
function updateUI() {

    // Get selected seats from the local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // Check if there are any selected seats
    if (selectedSeats !== null && selectedSeats.length > 0 ) {
        // Loop ove all the seats in the theater
        seats.forEach((seat, index) => {
            // If the index of seat is contained inside selectedSeats array
            if ( selectedSeats.indexOf(index) > -1 ) {
                seat.classList.add('selected');
                // Add selected class to the seat
                seat.classList.add('selected');
            }
        })
            
    }

    // Get the selected movie from the local storage
    const movieIndex = localStorage.getItem('movieIndex');
    // Check if there is a movie index
    if ( movieIndex !== null ) {
        // Use the movieIndex from local storage to update the movie from dropdown
        selectMovie.selectedIndex = movieIndex;
    }
         // Get the movie price from local storage
    const moviePrice = localStorage.getItem('moviePrice');
     // Check if there is a movie price
    if (moviePrice !== null) {
        // Use the movie price from the local storage to update the movie price of total
        ticketPrice = +moviePrice;
    }

    // Update the counts
    updateCount();

};

// Event Listeners
// 1. Listen on click container
container.addEventListener('click', e => {
    // Check if target has a class of seat and also is not occupied
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // Add or remove the selected class on click
        e.target.classList.toggle('selected');
        // Update the count of selected seats
        updateCount();
    }
});

// 2. Listen for change in movie selection
selectMovie.addEventListener('change', e => {
    // Update ticket price to the selected movie
    ticketPrice = +e.target.value;
    // Update the count in DOM
    updateCount();
    // Save the movie data to local storage
    saveMovieData(e.target.selectedIndex, e.target.value);
});