// Define the fields to fetch and their corresponding fields to paste
const fieldsMapping = {
  "#contactInformation input[name='first_name']": "#main input[name='firstName']",
  "#contactInformation input[name='last_name']": "#main input[name=lastName']",
  "#contactInformation input[name='phone']": ".col-xs-12 input[name='phoneNumber']",
  "#contactInformation input[name='address']": ".col-xs-12 input[name='streetAddress']",
  "#contactInformation input[name='city']": ".col-xs-12 input[name='city']",
  "#contactInformation select[name='state']": "#main input[name='coverageState']",
  "#contactInformation input[name='zipcode']": ".col-xs-12 input[name='zipCode']",
  "#contactInformation input[name='email']" : ".col-xs-12 input[name='email']",
  "#contactInformation input[name='dob']": "#main input[name='dateOfBirth']",
 // "#contactInformation select[type='gender']" : "healthsherpaField10",
  "#financialInformation input[name='occupation']": ".col-xs-12 input[name='job[employerName]']",
  "#financialInformation input[type='annual_income']": ".col-xs-12 input[name='job[amount]']",
  "#legalInformation input[name='ssn']": ".col-xs-12 input[name='managedPeople[0][ssn]']",
  //"#legalInformation select[name='tax_filing_id']": "healthsherpaField14",
  //"#legalInformation select[name='legal_status_id']": "healthsherpaField15",
};

function fetchDataFromBBG() {
  let data = {};
  for (let bbgField in fieldsMapping) {
    const firstNameInput = document.querySelector('#contactInformation input[name="first_name"]');
    const lastNameInput = document.querySelector('#contactInformation input[name="last_name"]');
    const phoneNumberInput = document.querySelector('#contactInformation input[name="phone"]');
    const streetAddressInput = document.querySelector('#contactInformation input[name="address"]');
    const cityInput = document.querySelector('#contactInformation input[name="city"]');
    const stateInput = document.querySelector('#contactInformation select[name="state"]');
    const zipcodeInput = document.querySelector('#contactInformation input[name="zipcode"]');
    const emailInput = document.querySelector('#contactInformation input[name="email"]'); 
    const dobInput = document.querySelector('#contactInformation input[name="dob"]');
    const genderInput = document.querySelector('#contactInformation select[type="gender"]');
    const occupationInput = document.querySelector('#financialInformation input[name="occupation"]');
    const incomeInput = document.querySelector('#financialInformation input[type="annual_income"]');
    const ssnInput = document.querySelector('#legalInformation input[name="ssn"]');
    const taxFilingInput = document.querySelector('#legalInformation select[name="tax_filing_id"]');
    const legalStatusInput = document.querySelector('#legalInformation select[name="legal_status_id"]'); 

    if (element) {
      data[fieldsMapping[bbgField]] = element.value;
    }
  }
  chrome.storage.local.set({ data: data }, () => {
    console.log("Data saved", data);
  });
}

function pasteDataToHealthsherpa() {
  chrome.storage.local.get(['data'], (result) => {
    let data = result.data;
    for (let healthsherpaField in data) {
      const hsFirstName = "#main input[name='firstName']";
      const hsLastName = "#main input[name=lastName']";
      const hsPhoneNumber = ".col-xs-12 input[name='phoneNumber']";
      const hsStreetAddress = ".col-xs-12 input[name='streetAddress']";
      const hsCity = ".col-xs-12 input[name='city']";
      const hsCoverageState = "#main input[name='coverageState']";
      const hsZipCode = ".col-xs-12 input[name='zipCode']";
      const hsEmail = ".col-xs-12 input[name='email']";
      const hsDateOfBirth = "#main input[name='dateOfBirth']";
      const hsEmployerName = "#main input[name='job[employerName]']";
      const hsAmount = ".col-xs-12 input[name='job[amount]']";
      const hsSSN = ".col-xs-12 input[name='managedPeople[0][ssn]']";
      if (element) {
        element.value = data[healthsherpaField];
      }
    }
  });
}

if (window.location.href.includes("bbg.tldcrm.com")) {
  fetchDataFromBBG();
} else if (window.location.href.includes("healthsherpa.com")) {
  pasteDataToHealthsherpa();
}