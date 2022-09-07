'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const input = document.querySelector('.myInput');
const button = document.querySelector('button');
const errorText = document.getElementById('errorText');
input.value = '';

///////////////////////////////////////
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
  countriesContainer.style.opacity = 1;
};

// Ajax Call
const ajaxCall = () => {};

// Get Country And neighbour
const getCountryAndNeighbour = function (country) {
  // AJAX call country (1)
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // render country (1)
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country (2)
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      // render country (2)
      renderCountry(data2, 'neighbour');
    });
  });
};

// Click Handler
document.addEventListener('click', e => {
  e.preventDefault();
  const isButton = e.target === button;
  if (isButton) {
    getCountryAndNeighbour(input.value);
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
