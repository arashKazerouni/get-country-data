'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const input = document.querySelector('.myInput');
const button = document.querySelector('button');
const errorText = document.getElementById('errorText');
input.value = '';

// Render Country From Data
const renderCountry = function (data, ClassName = '') {
  const html = `
  <article class="country ${ClassName}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
  </article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const renderError = msg => {
  errorText.insertAdjacentHTML('beforeend', msg);

};
///////////////////////////////////////

const getCountryData = country => {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    // by this catch, we'll handle all errors of chain in the end of chain.
    .catch(err => {
      console.error(`${err} Something went wrong `);
      renderError(`Something went wrong .${err.message}. Try again .`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
  errorText.innerHTML = '';

};

// Click Handler
document.addEventListener('click', e => {
  e.preventDefault();
  const isButton = e.target === button;
  if (isButton) {
    getCountryData(input.value);
    input.value = '';
  }
});

// Enter Handler
input.addEventListener('keypress', function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Trigger the button element with a click
    button.click();
  }
});
