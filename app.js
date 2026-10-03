// 1. Select the elements from the DOM
const toggleButton = document.querySelector('#toggle-btn');
const secretText = document.querySelector('#secret-text');

// 2. Initialize the text as hidden
secretText.hidden = true;

// 3. Add a click event listener to the button
toggleButton.addEventListener('click', () => {
    // 4. Toggle the hidden property (true becomes false, false becomes true)
    secretText.hidden = !secretText.hidden;
});