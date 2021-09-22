const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// All Functions
// Function to show error
function showerror(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Funtion to show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Function to check if email is valid
function isValidEmail(email,message) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// This is event listner for the form on submission
form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    
    if( username.value === '' ) {
    showerror(username,'username is required');
    }
    else {
    showSuccess(username)
    }

    if( email.value === '' ) {
    showerror(email,'email is required');
    }
    else if (!isValidEmail(email.value)) {
        showerror(email,'Email is invalid');
    }
    else {
    showSuccess(email);
    }

    if( password.value === '' ) {
    showerror(password,'password is required');
    }
    else {
    showSuccess(password);
    }

    if( password2.value === '' ) {
    showerror(password2,'password2 is required');
    }
    else {
    showSuccess(password2);
    }
});