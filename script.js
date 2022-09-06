'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const input = document.querySelector('.myInput');
const button = document.querySelector('button');
const errorText = document.getElementById('errorText');
input.value = '';

///////////////////////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    try {
      const [data] = JSON.parse(this.responseText);
      const html = `
          <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
          </div>
          </article>
        `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
      errorText.innerText = '';
    } catch {
      console.error('something went wrong');
    }
  });
};
const loadCountry = e => {
  e.preventDefault();
  const isButton = e.target === button;
  if (isButton) {
    if (getCountryData(input.value)) return;
    errorText.innerText = 'Country name is wrong !';
    if (input.value !== '') return;
    errorText.innerText = "Input couldn't be empty!";
  }
};
document.addEventListener('click', loadCountry);
input.addEventListener('keypress', function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Trigger the button element with a click
    button.click();
  }
});
input.value = '';
