// Get DOM Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

// Function to search the meal using the API
function searchMeal(e) {
    // Prevent the form submission and redirect
    e.preventDefault();
    // Clear previous search details for search details
    selectedMeal.innerHTML = '';
    // Get the value from the search input field
    const searchText = search.value;
    // Check if search input field is empty
    if (searchText.trim()) {
        // Fetch data from API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => {
            // Update results heading
            resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`
            // Check if any meals returned from API
            if (data.meals  === null) {
            resultsHeading.innerHTML = `<h2>No results found for ${searchText}</h2>`
            } else {
                meals.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `)
                .join('')
            };
            // Clear the search text after search
            search.value = ''
        })
    } else {
        // If search text does not exist, raise an alert asking user to enter text
        alert('Please enter search keyword');
    };
};

// Function to get the full details of a meal using  it's ID
function getFullDetails(mealID) {
    // Use fetch API to get the full details
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        // Add the meal to the DOM
        renderMeal(meal);
    })
};

// Function to render the selected meal in the DOM
function renderMeal(meal) {
    // Hide the search results heading
    resultsHeading.innerHTML = '';
    // Hide the search results
    meals.innerHTML = '';
    // Initialize array for ingredients
    const ingredients = [];
    // Loop over the 20 ingredients
    for (i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            // If ingredient exists,push the ingredient and measurement to the ingredients array
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `)
        } else {
            // If the ingredient does not exist, exit the loop
            break;
        }
    };
    // Add the data to the DOM
    selectedMeal.innerHTML = `
        <div class="selected-meal-details">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt = "${meal.strMeal}" />
            <div class = "selected-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class = "selected-meal-instructions">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>

    `;
};

function randomMeal() {
    // Use fetch API to get the full details
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
         // Add the meal to the DOM
        renderMeal(meal);
    })
};

// Event Listeners
// 1. Listen for form submit 
submit.addEventListener('submit', searchMeal);

// 2. Listen for the click on the meals element
meals.addEventListener('click', e => {
    // Get all items clicked
    const mealInfo = e.path.find(item => {
        // Get only the elements with class = meal-info
        if (item.classList ) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }

    });
    // Check if the mealInfo has the valid data
    if ( mealInfo) {
        // Get the value from the data-mealID attribute
        const mealID = mealInfo.getAttribute('data-mealID');
        // Use the mealID to get the full details of the meal
        getFullDetails(mealID);
    }
});

// Listen for click on generate button
generate.addEventListener('click', randomMeal)