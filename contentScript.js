// Define the fields to fetch and their corresponding fields to paste
const fieldsMapping = {
  "#contactInformation input[name='first_name']": "firstName",
  "#contactInformation input[name='last_name']": "lastName",
  "#contactInformation input[name='phone']": "phoneNumber",
  "#contactInformation input[name='address']": "streetAddress",
  "#contactInformation input[name='city']": "city",
  "#contactInformation select[name='state']": "coverageState",
  "#contactInformation input[name='zipcode']": "zipCode",
  "#contactInformation input[name='email']" : "email",
  "#contactInformation input[name='dob']": "dateOfBirth",
 // "#contactInformation select[type='gender']" : "healthsherpaField10",
  "#financialInformation input[name='occupation']": "job[employerName]",
  "#financialInformation input[type='annual_income']": "job[amount]",
  "#legalInformation input[name='ssn']": "primaryManagedPerson[ssn]",
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
      const hsFirstName = name="firstName";
      const hsLastName = name="lastName";
      const hsPhoneNumber = name="phoneNumber";
      const hsStreetAddress = name="streetAddress";
      const hsCity = name="city";
      const hsCoverageState = name="coverageState";
      const hsZipCode = name="zipCode";
      const hsEmail = name="email";
      const hsDateOfBirth = name="dateOfBirth";
      const hsEmployerName = name="job[employerName]";
      const hsAmount = name="job[amount]";
      const hsSSN = name="primaryManagedPerson[ssn]";
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