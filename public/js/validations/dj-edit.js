const djnameEl = document.querySelector("#djname");
const firstnameEl = document.querySelector("#firstname");
const surnameEl = document.querySelector("#surname");
const streetEl = document.querySelector("#street");
const postcodeEl = document.querySelector("#postcode");
const locationEl = document.querySelector("#location");
const countriesEl = document.querySelector("#countries");
const contactnoEl = document.querySelector("#contactno");
// const telephonenoEl = document.querySelector("#telephoneno");
const emailEl = document.querySelector("#email");
const birthdayEl = document.querySelector("#birthday");
const websiteEl = document.querySelector("#website");
const chartsEl = document.querySelector("#charts");
const poolsEl = document.querySelector("#pools");
const musicEl = document.querySelector("#music");

const usernameEl = document.querySelector("#fullname");
const contactEl = document.querySelector("#contact_num");
const countryEl = document.querySelector("#countries");
const addressEl = document.querySelector("#address");

const form = document.querySelector("#dj-register");

const checkDjname = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const djname = djnameEl.value.trim();

  if (!isRequired(djname)) {
    showError(djnameEl, "DJ name cannot be empty.");
  } else if (!isBetween(djname.length, min, max)) {
    showError(
      djnameEl,
      `DJ name must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(djnameEl);
    valid = true;
  }
  return valid;
};

const checkFirstname = () => {
  let valid = false;

  const min = 3,
    max = 10;

  const firstname = firstnameEl.value.trim();

  if (!isRequired(firstname)) {
    showError(firstnameEl, "Fisrt name cannot be empty.");
  } else if (!isBetween(firstname.length, min, max)) {
    showError(
      firstnameEl,
      `First name must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(firstnameEl);
    valid = true;
  }
  return valid;
};

const checkSurname = () => {
  let valid = false;

  const min = 3,
    max = 10;

  const surname = surnameEl.value.trim();

  if (!isRequired(surname)) {
    showError(surnameEl, "Surname cannot be empty.");
  } else if (!isBetween(surname.length, min, max)) {
    showError(
      surnameEl,
      `Surname must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(surnameEl);
    valid = true;
  }
  return valid;
};

const checkStreet = () => {
  let valid = false;
  const street = streetEl.value.trim();
  if (!isRequired(street)) {
    showError(streetEl, "Please Fill the street detail.");
  } else {
    showSuccess(streetEl);
    valid = true;
  }
  return valid;
};

const checkPostcode = () => {
  let valid = false;
  const postcode = postcodeEl.value.trim();
  if (!isRequired(postcode)) {
    showError(postcodeEl, "Please Fill the postcode.");
  } else {
    showSuccess(postcodeEl);
    valid = true;
  }
  return valid;
};

const checkLocation = () => {
  let valid = false;
  const location = locationEl.value.trim();
  if (!isRequired(location)) {
    showError(locationEl, "Please Fill your location details.");
  } else {
    showSuccess(locationEl);
    valid = true;
  }
  return valid;
};

const checkBirthdate = () => {
  let valid = false;
  const birthday = birthdayEl.value.trim();
  if (!isRequired(birthday)) {
    showError(birthdayEl, "Please Fill your location details.");
  } else {
    showSuccess(birthdayEl);
    valid = true;
  }
  return valid;
};

const checkCountry = () => {
  let valid = false;
  const countries = countriesEl.value.trim();
  if (!isRequired(countries) || countries == "Select Country") {
    showError(countriesEl, "Please select the country.");
  } else {
    showSuccess(countriesEl);
    valid = true;
  }
  return valid;
};

const checkConatctNumber = () => {
  let valid = false;
  const conatct = contactnoEl.value.trim();
  let contactlen = 8,
    contactmax = 15;
  if (!isRequired(conatct)) {
    showError(contactnoEl, "Contact number cannot be empty.");
  } else if (!isBetween(conatct.length, contactlen, contactmax)) {
    showError(
      contactnoEl,
      `Contact number must be between ${contactlen} and ${contactmax} characters.`
    );
  } else {
    showSuccess(contactnoEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be empty.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkWebsite = () => {
  let valid = false;
  const website = websiteEl.value.trim();
  if (!isRequired(website)) {
    showError(websiteEl, "Website cannot be empty.");
  } else {
    showSuccess(websiteEl);
    valid = true;
  }
  return valid;
};

const checkCharts = () => {
  let valid = false;
  const chart = $("input[name='charts']").serializeArray();
  console.log("chart", $("input[name='charts']"));
  if (chart.length === 0) {
    document.getElementById("error-chart").innerHTML =
      "Please select at least one checkbox";
  } else {
    document.getElementById("error-chart").innerHTML = "";
    valid = true;
  }
  return valid;
};

const checkPools = () => {
  let valid = false;
  const pool = $("input[name='pools']").serializeArray();
  if (pool.length === 0) {
    document.getElementById("error-pool").innerHTML =
      "Please select at least one checkbox";
  } else {
    document.getElementById("error-pool").innerHTML = "";
    valid = true;
  }
  return valid;
};

const checkMusic = () => {
  let valid = false;
  const music = $("input[name='music']").serializeArray();
  if (music.length === 0) {
    document.getElementById("error-music").innerHTML =
      "Please select at least one checkbox";
  } else {
    document.getElementById("error-music").innerHTML = "";
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  if (!error) {
    console.log("inut", input);
  }
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isDjnameValid = checkDjname(),
    isFirstnameValis = checkFirstname(),
    isSurnameValid = checkSurname(),
    isStreetValid = checkStreet(),
    isPostcodeValid = checkPostcode(),
    isLocationValid = checkLocation(),
    isCountryValid = checkCountry(),
    isContactnumberValid = checkConatctNumber(),
    isEmailValid = checkEmail(),
    isWebsiteValid = checkWebsite(),
    isChartValid = checkCharts(),
    isPoolValid = checkPools(),
    isMusicValid = checkMusic(),
    isBirthdateValid = checkBirthdate()

  let isFormValid =
    isDjnameValid &&
    isFirstnameValis &&
    isSurnameValid &&
    isStreetValid &&
    isPostcodeValid &&
    isLocationValid &&
    isCountryValid &&
    isContactnumberValid &&
    isEmailValid &&
    isWebsiteValid &&
    isChartValid &&
    isPoolValid &&
    isMusicValid &&
    isBirthdateValid ;

  // submit to the server if the form is valid
  if (isFormValid) {
    $("#dj-register").submit();
  //  var formData1 = $("#dj-register").serialize();
  //  var formData2 = $("#dj-company").serializeArray();
  //   console.log(formData1)
  //  $.ajax({
  //    type: "POST",
  //    url: "/dj/edit-perosnal-detail",
  //       // contentType: false,
  //       // processData: false,
  //    data: $("#dj-register").serialize(),
  //  }).then((res) => {
  //    if (res) {
  //      location.reload();
  //    }
  //  });
  }
});

//``````````````````````````````````````````````````````````````````` company dj ```````````````````````````````````````````````````````````````

const copmanynameEl = document.querySelector("#copmanyname");
const companystreetEl = document.querySelector("#companystreet");
const companypostcodeEl = document.querySelector("#companypostcode");
const companylocationEl = document.querySelector("#companylocation");
const companycountryE1 = document.querySelector("#companycountry");
const companycontactEl = document.querySelector("#companycontact");
const comapnytelephoneEl = document.querySelector("#comapnytelephone");
const comapnybookerEl = document.querySelector("#comapnybooker");
const comapnycontactpersonE1 = document.querySelector("#comapnycontactperson");

const comapnyemailEl = document.querySelector("#comapnyemail");
const comapnydirectorEl = document.querySelector("#comapnydirector");
const companydayEl = document.querySelector("#companyday");

const form2 = document.querySelector("#dj-company");

const checkCompanyname = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const copmanyname = copmanynameEl.value.trim();

  if (!isRequired(copmanyname)) {
    showError(copmanynameEl, "Company name cannot be empty.");
  } else if (!isBetween(copmanyname.length, min, max)) {
    showError(
      copmanynameEl,
      `Company name must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(copmanynameEl);
    valid = true;
  }
  return valid;
};

const checkComanystreet = () => {
  let valid = false;
  const companystreet = companystreetEl.value.trim();
  if (!isRequired(companystreet)) {
    showError(companystreetEl, "Please Fill the street detail.");
  } else {
    showSuccess(companystreetEl);
    valid = true;
  }
  return valid;
};

const companyCompanypostcode = () => {
  let valid = false;
  const companypostcode = companypostcodeEl.value.trim();
  if (!isRequired(companypostcode)) {
    showError(companypostcodeEl, "Please Fill the street detail.");
  } else {
    showSuccess(companypostcodeEl);
    valid = true;
  }
  return valid;
};

const checkCompanylocation = () => {
  let valid = false;
  const companylocation = companylocationEl.value.trim();
  if (!isRequired(companylocation)) {
    showError(companylocationEl, "Please Fill your location details.");
  } else {
    showSuccess(companylocationEl);
    valid = true;
  }
  return valid;
};

const checkComapanycountry = () => {
  let valid = false;
  const comapnycountry = companycountryE1.value.trim();
  if (!isRequired(comapnycountry) || comapnycountry == "Select Country") {
    showError(companycountryE1, "Please select the country.");
  } else {
    showSuccess(companycountryE1);
    valid = true;
  }
  return valid;
};

const checkCompanyConatctNumber = () => {
  let valid = false;
  const companycontact = companycontactEl.value.trim();
  let contactlen = 8,
    contactmax = 15;
  if (!isRequired(companycontact)) {
    showError(companycontactEl, "Contact number cannot be empty.");
  } else if (!isBetween(companycontact.length, contactlen, contactmax)) {
    showError(
      companycontactEl,
      `Contact number must be between ${contactlen} and ${contactmax} characters.`
    );
  } else {
    showSuccess(companycontactEl);
    valid = true;
  }
  return valid;
};

const checkComapnycontactperson = () => {
  let valid = false;
  const comapnycontactperson = comapnycontactpersonE1.value.trim();
  if (!isRequired(comapnycontactperson)) {
    showError(comapnycontactpersonE1, "Contact person cannot be empty.");
  } else {
    showSuccess(comapnycontactpersonE1);
    valid = true;
  }
  return valid;
};

const checkCompanyemail = () => {
  let valid = false;
  const comapnyemail = comapnyemailEl.value.trim();
  if (!isRequired(comapnyemail)) {
    showError(comapnyemailEl, "Email cannot be empty.");
  } else if (!isEmailValid(comapnyemail)) {
    showError(comapnyemailEl, "Email is not valid.");
  } else {
    showSuccess(comapnyemailEl);
    valid = true;
  }
  return valid;
};

const checkComapnyagency = () => {
  let valid = false;
  const agency = $("input[name='agency']").serializeArray();
  if (agency.length === 0) {
    document.getElementById("error-agency").innerHTML =
      "Please select at least one checkbox";
  } else {
    document.getElementById("error-agency").innerHTML = "";
    valid = true;
  }
  return valid;
};

const checkCompanyday = () => {
  let valid = false;
  const companyday = $("input[name='companyday']").serializeArray();
  if (companyday.length === 0) {
    document.getElementById("error-companyday").innerHTML =
      "Please select at least one checkbox";
  } else {
    document.getElementById("error-companyday").innerHTML = "";
    valid = true;
  }
  return valid;
};

form2.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isCompanynameValid = checkCompanyname(),
    isCompanystreetValid = checkComanystreet(),
    isCompanypostcodeValid = companyCompanypostcode(),
    isCompanylocationValid = checkCompanylocation(),
    isCompanycountryValid = checkComapanycountry(),
    isCompanycontactnumberValid = checkCompanyConatctNumber(),
    isCompanyemailValid = checkCompanyemail(),
    // isCompanybookerValid = checkComapnybooker(),
    isCompanypersonValid = checkComapnycontactperson(),
    // isCompanydirectorValid = checkComapnydirector(),
    isComapnyagency = checkComapnyagency(),
    isCompanyday = checkCompanyday();

  let isFormValid =
    isCompanynameValid &&
    isCompanystreetValid &&
    isCompanypostcodeValid &&
    isCompanylocationValid &&
    isCompanycountryValid &&
    isCompanycontactnumberValid &&
    isCompanyemailValid &&
    // isCompanybookerValid &&
    isCompanypersonValid &&
    // isCompanydirectorValid &&
    isComapnyagency &&
    isCompanyday;

  // submit to the server if the form is valid
  if (isFormValid) {

    var formData1 = $("#dj-register").serialize();
    var formData2 = $("#dj-company").serializeArray();

    var filterdata = [];
    filterdata.push(formData1, formData2);

        $.ajax({
          type: "POST",
          url: `/dj/edit-company-detail`,
          data: $("#dj-company").serialize(),
        }).then((res) => {
          window.location.reload();
        });
      
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form2.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "djname":
        checkDjname();
        break;
      // case "email":
      //   checkEmail();
      //   break;
      // case "password":
      //   checkPassword();
      //   break;
      // case "contact_num":
      //   checkConatctNumber();
      //   break;
      // case "confirm-password":
      //   checkConfirmPassword();
      //   break;
    }
  })
);
