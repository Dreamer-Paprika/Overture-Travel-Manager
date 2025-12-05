import Notiflix from 'notiflix';
import { findPlaces } from './places-api.js';
import { createApiKey } from './theauthapi.js';
import { getImages } from './images-api.js';

import Countries from './countries_sorted_alphabetical.json';


import accommodationCategories from './accomodationCategories.json';
import activeLifeCategories from './activeLife.json';
import artsAndEntertainmentCategories from './artsAndEntertainment.json';
import attractionsAndActivitiesCategories from './attractionsAndActivitiesCategories.json';
import automotiveCategories from './automotive.json';
import beautyAndSpaCategories from './beauty_and_spa.json';
import businessToBusinessCategories from './business_to_business.json';
import eatAndDrinkCategories from './eat_and_drink.json';
import educationCategories from './education.json';
import financialServiceCategories from './financial_service.json';
import healthAndMedicalCategories from './health_and_medical.json';
import homeServiceCategories from './home_service.json';
import massMediaCategories from './mass_media.json';
import petCategories from './pets.json';
import privateCorporationsCategories from './private_establishments_and_corporates.json';
import professionalServicesCategories from './professional_services.json';
import realEstateCategories from './real_estate.json';
import religiousOrganizationCategories from './religious_organization.json';
import retailCategories from './retail.json';
import publicServiceAndGovernmentCategories from './public_service_and_government.json';
import travelCategories from './travel.json';
import Countries from './countries_sorted_alphabetical.json';



const accommodationSelector = document.querySelector('.accomodation-select');
const activeLifeSelector = document.querySelector('.activeLife-select');
const artsAndEntertainmentSelector = document.querySelector('.artsAndEntertainment-select');
const attractionsAndActivitiesSelector = document.querySelector('.attractionsAndActivities-select');
const automotiveSelector = document.querySelector('.automotive-select');
const beautyAndSpaSelector = document.querySelector('.beautyAndSpa-select');
const businessToBusinessSelector = document.querySelector('.businessToBusiness-select');
const eatAndDrinkSelector = document.querySelector('.eatAndDrink-select');
const educationSelector = document.querySelector('.education-select');
const financialServiceSelector = document.querySelector('.financialService-select');
const healthAndMedicalSelector = document.querySelector('.healthAndMedical-select');
const homeServiceSelector = document.querySelector('.homeService-select');
const massMediaSelector = document.querySelector('.massMedia-select');
const petSelector = document.querySelector('.pet-select');
const privateCorporationsSelector = document.querySelector('.privateCorporations-select');
const professionalServicesSelector = document.querySelector('.professionalServices-select');
const realEstateSelector = document.querySelector('.realEstate-select');
const religiousOrganizationSelector = document.querySelector('.religiousOrganization-select');
const retailSelector = document.querySelector('.retail-select');
const publicServiceAndGovernmentSelector = document.querySelector('.publicServiceAndGovernment-select');
const travelSelector = document.querySelector('.travel-select');
const countrySelector = document.querySelector('.country-select');





  function renderCategoryOptions(selector, categories, categoryName) {
    //selector.innerHTML = '';

    const placeholder = document.createElement('option');
    const navLink = document.createElement('a');
    navLink.setAttribute('href', '#placeInfo');
    placeholder.setAttribute('disabled', '');
    placeholder.setAttribute('selected', 'selected');
    placeholder.setAttribute('value', '');
    placeholder.textContent = categoryName;
    placeholder.style.fontWeight = 'bold';
    selector.append(placeholder);

    categories.forEach(category => {
      const option = document.createElement('option');
      option.setAttribute('value', category.value);
      option.textContent = category.label;
      option.style.fontWeight = '700';
      selector.append(option);
    });
}
   function renderCountryOptions(selector, countries, Instruction) {
     //selector.innerHTML = '';

     const placeholder = document.createElement('option');
     placeholder.setAttribute('disabled', '');
     placeholder.setAttribute('selected', 'selected');
     placeholder.setAttribute('value', '');
     placeholder.textContent = Instruction;
     placeholder.style.fontWeight = 'bold';
     selector.append(placeholder);

     countries.forEach(country => {
       const option = document.createElement('option');
       option.setAttribute('value', country.alpha_2);
       option.textContent = country.name;
       option.style.fontWeight = '700';
       selector.append(option);
     });
}
   
renderCountryOptions(countrySelector, Countries, "Choose a country" );

renderCategoryOptions(accommodationSelector, accommodationCategories, "Accomodation");
renderCategoryOptions(activeLifeSelector, activeLifeCategories, 'Active Life');
renderCategoryOptions(artsAndEntertainmentSelector, artsAndEntertainmentCategories, 'Arts and Entertainment');
renderCategoryOptions(attractionsAndActivitiesSelector, attractionsAndActivitiesCategories, 'Attraction and Activities');
renderCategoryOptions(automotiveSelector, automotiveCategories, 'Automotive');
renderCategoryOptions(beautyAndSpaSelector, beautyAndSpaCategories, 'Beauty and Spa');
renderCategoryOptions(businessToBusinessSelector, businessToBusinessCategories, 'Business To Business');
renderCategoryOptions(eatAndDrinkSelector, eatAndDrinkCategories, 'Eat and Drink');
renderCategoryOptions(educationSelector, educationCategories, 'Education');
renderCategoryOptions(financialServiceSelector, financialServiceCategories, 'Financial Services');
renderCategoryOptions(healthAndMedicalSelector, healthAndMedicalCategories, 'Health and Medical');
renderCategoryOptions(homeServiceSelector, homeServiceCategories, 'Home Services');
renderCategoryOptions(massMediaSelector, massMediaCategories, 'Mass Media');
renderCategoryOptions(petSelector, petCategories, 'Pet');
renderCategoryOptions(privateCorporationsSelector, privateCorporationsCategories, 'Private Corporations');
renderCategoryOptions(professionalServicesSelector, professionalServicesCategories, 'Professional Services');
renderCategoryOptions(publicServiceAndGovernmentSelector, publicServiceAndGovernmentCategories, 'Public/Government Services');
renderCategoryOptions(realEstateSelector, realEstateCategories, 'Real Estate');
renderCategoryOptions(religiousOrganizationSelector, religiousOrganizationCategories, 'Religious Organizations');
renderCategoryOptions(retailSelector, retailCategories, 'Retail');
renderCategoryOptions(travelSelector, travelCategories, 'Travel');







const altLink = document.querySelector('.place-alt-link');
const detailsArea = document.querySelector('.place-details');

const placeTable = document.createElement('table');
const placeTableHead = document.createElement('thead');
placeTableHead.innerHTML = `<tr>
<th style="color: #0F4C75; text-align: center; border: 1px solid #ffff; font-weight: 700;"><h3>Place Name</h3></th>
<th style="color: #0F4C75; text-align: center; border: 1px solid #ffff; font-weight: 700;"><h3>Social Link</h3></th>
</tr>`;
const placeTableBody = document.createElement('tbody');
const placeDetails = document.createElement('div');

placeTable.style.display = 'none';


const innerContr = document.querySelector('.pet-bio');

const placeInnerContr = document.querySelector('.place-table-wrapper');


placeInnerContr.append(placeTable);
placeTable.append(placeTableHead);
placeTable.append(placeTableBody);
placeInnerContr.append(placeDetails);


let dogBreeds;
let selectedPlace;

const apiGenTable = document.querySelector('.api-gen-table-wrapper');

const apiViewTable = document.querySelector('.api-view-table-wrapper');

const apiUseTable = document.querySelector('.api-use-table-wrapper');

apiUseTable.style.display = "none";


const keySideEffects = () => {
  if (JSON.parse(localStorage.getItem('myApiKey'))) {
    const keyDetails = JSON.parse(localStorage.getItem('myApiKey'));
    apiGenTable.style.display = 'none';

    const userLocale = navigator.language; // e.g., "en-US" or "fr-FR"
    const myDate = new Date(keyDetails.createdAt);

    const formatter = new Intl.DateTimeFormat(userLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', // Optional: include seconds
      hour12: true, // Optional: use 12-hour clock (set to false for 24-hour clock)
    });
    const createdDate = formatter.format(myDate);

    apiViewTable.innerHTML = `
     <table class="api-view-table" style="border-collapse: collapse;">
              <caption style="color: #8B0000; border: 1px solid #8B0000; font-weight: 700; font-size: 20px;">View your API Details</caption>
              <tr>
                <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;">API KEY NAME:</th>
                <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${keyDetails.name}</td>
              </tr>
              <tr>
                <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;">API KEY:</th>
                <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${keyDetails.key}</td>
              </tr>
              <tr>
                <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;">CUSTOM ACCOUNT ID:</th>
                <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${keyDetails.customAccountId}</td>
              </tr>

              <tr>
                <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;">CUSTOM METADATA:</th>
                <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${keyDetails.customMetaData.metadata_val}</td>
              </tr>

              <tr>
                <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;">CREATED AT:</th>
                <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${createdDate}</td>
              </tr>
            </table>
  `;
    
apiUseTable.style.display = 'flex';
  }
}

keySideEffects();

/*if (localStorage.getItem('hasKey') === null) {
  apiViewTable.style.display = 'none';
}*/

const keyName = document.querySelector('.keyName');
const keyId = document.querySelector('.keyId');
const keyMetaData = document.querySelector('.keyMetaData');

const apiGenTableButton = document.querySelector('.api-gen-table-wrapper-button');

const apiUseTableButton = document.querySelector(".api-use-table-wrapper-button");

const keyValue = document.querySelector('.keyValue');

const imageGallery = document.querySelector('.image-gallery');

const apiDetailsArea = document.querySelector('.api-details');

let selectedCountry = null;

countrySelector.addEventListener('change', event => {
  selectedCountry = event.target.value;
  console.log(selectedCountry);
});

function categoryEventListener(selector) {
  
  selector.addEventListener('change', event => {
    if (selectedCountry === null) {
      Notiflix.Notify.failure('Choose a country first');
      event.target.value = '';
      return;
    }
    detailsArea.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // or 'center', 'end', 'nearest'
    });
    console.log('click');
    Notiflix.Loading.hourglass('Loading data, please wait...');
    findPlaces(event.target.value, selectedCountry)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
    Notiflix.Loading.remove();
        //console.log(res);
    altLink.style.display = 'none';
    detailsArea.style.height = "fit-content";
    placeTable.style.display = 'block';
        placeTable.style.borderCollapse = 'collapse';
        placeTable.style.border = '3px solid #ffff';
        placeTable.style.padding = '10px';
        placeTable.style.borderRadius = '10px';
        placeTable.style.backgroundColor = '#FFD369';
        placeTable.style.color = '#49e2e6';
        placeInnerContr.style.alignItems = 'start';
        placeInnerContr.style.justifyContent = 'space-between';
        placeTable.style.height = '300px';
        placeTable.style.overflowX = 'auto';
        placeTable.style.overflowY = 'auto';
        placeDetails.style.width = '100px';
        placeDetails.style.height = '100px';
        placeDetails.style.backgroundColor = '#ffff';
        
    const foundPlaces = res.map((place) => {
      if (place.properties.socials[0]) {
        return `
      <tr>
                    <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff; max-width: 400px;">${place.properties.names.primary}</td>
                    <td style="color: #0F4C75; text-align: left; border: 1px solid #ffff;"><a href=${place.properties.socials[0]} target='_'>CLICK HERE</a></td>
      </tr>
                  `;};
    }).join('');
    if (foundPlaces.length !== 0) {
      placeTableBody.innerHTML = foundPlaces;
    }
    else {
      placeTableBody.innerHTML = `<tr>
                                  <td style="color: #49e2e6; text-align: center; border: 1px solid #ffff;">Null</td>
                                  <td style="color: #49e2e6; text-align: center; border: 1px solid #ffff;">Null</td>
                                  </tr>
      `;
    }
  })
      .catch(error => {
        //loaderMsg.classList.add('hide');
        //errorMsg.classList.remove('hide');
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );

        console.error(`Error message ${error}`);
      });
  });
}

categoryEventListener(accommodationSelector);
categoryEventListener(activeLifeSelector);
categoryEventListener(artsAndEntertainmentSelector);
categoryEventListener(attractionsAndActivitiesSelector);
categoryEventListener(automotiveSelector);
categoryEventListener(beautyAndSpaSelector);
categoryEventListener(businessToBusinessSelector);
categoryEventListener(eatAndDrinkSelector);
categoryEventListener(educationSelector);
categoryEventListener(financialServiceSelector);
categoryEventListener(healthAndMedicalSelector);
categoryEventListener(homeServiceSelector);
categoryEventListener(massMediaSelector);
categoryEventListener(petSelector);
categoryEventListener(privateCorporationsSelector);
categoryEventListener(professionalServicesSelector);
categoryEventListener(publicServiceAndGovernmentSelector);
categoryEventListener(realEstateSelector);
categoryEventListener(religiousOrganizationSelector);
categoryEventListener(retailSelector);
categoryEventListener(travelSelector);

apiGenTableButton.addEventListener("click", async () => {
  if ((keyName.value.trim() === "" || keyId.value.trim() === "" || keyMetaData.value.trim() === "")) {
    Notiflix.Notify.warning('All feilds are required!');
    return
  }
  Notiflix.Loading.hourglass('Creating Api Key, please wait...');
  try {
    const key = await createApiKey(
      keyName.value.trim(),
      keyId.value.trim(),
      keyMetaData.value.trim()
    );
    localStorage.setItem('myApiKey', JSON.stringify(key));
    Notiflix.Loading.remove();
    Notiflix.Notify.success('API Key created and stored successfully!');
    keySideEffects();
  } catch (error) {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure('Failed to create API Key');
    console.error('Error creating API key:', error);
  }
});


apiUseTableButton.addEventListener("click", async() => { 
  if (keyValue.value.trim() === "") {
   Notiflix.Notify.warning('Enter Api Key!');
   return;
  }
  Notiflix.Loading.hourglass('Getting Images, please wait...');
  
 try {
    const Images = await getImages(keyValue.value.trim());
    console.log('Images aquired:', Images);
   apiDetailsArea.style.height = "fit-content";
    const myImages = Images
      .map(Image => {
        return `
        <li><img src=${Image.link} style="width: 200px; height: 200px; border: 1px solid #721111;"/></li>
        `;
      })
     .join('');
   
   imageGallery.style.border = '1px solid #721111';
   imageGallery.style.padding = '20px';
   imageGallery.style.borderRadius = '20px';
   imageGallery.innerHTML = myImages;

    Notiflix.Loading.remove();
    Notiflix.Notify.success('View response in your browser console!');
  } catch (error) {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure('Failed to get Images');
    console.error('Error getting Images:', error);
  }

});




  


