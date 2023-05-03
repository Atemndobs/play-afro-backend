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

const form = document.querySelector("#dj-company");

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
  var pattern = /^\d+\.?\d*$/;
  const companycontact = companycontactEl.value.trim();
  let contactlen = 8,
    contactmax = 10;
  if (!isRequired(companycontact)) {
    showError(companycontactEl, "Contact number cannot be empty.");
  } else if (!isBetween(companycontact.length, contactlen, contactmax)) {
    showError(
      companycontactEl,
      `Contact number must be between ${contactlen} and ${contactmax} characters.`
    );
  } else if (!pattern.test(companycontact)) {
    showError(contactnoEl, `Only numbers are allowed.`);
  } else {
    showSuccess(companycontactEl);
    valid = true;
  }
  return valid;
};

const checkComapnybooker = () => {
  let valid = false;
  const comapnybooker = comapnybookerEl.value.trim();
  if (!isRequired(comapnybooker)) {
    showError(comapnybookerEl, "Booker cannot be empty.");
  } else {
    showSuccess(comapnybookerEl);
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

const checkComapnydirector = () => {
  let valid = false;
  const comapnydirector = comapnydirectorEl.value.trim();
  if (!isRequired(comapnydirector)) {
    showError(comapnydirectorEl, "Website cannot be empty.");
  } else {
    showSuccess(comapnydirectorEl);
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

// const checkComapnyday = () => {
//   let valid = false;
//   const companyday = $("input[name='companyday']").serializeArray();
//   if (companyday.length === 0) {
//     document.getElementById("error-companyday").innerHTML =
//       "Please select at least one checkbox";
//   } else {
//     document.getElementById("error-companyday").innerHTML = "";
//     valid = true;
//   }
//   return valid;
// };

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
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

form.addEventListener("submit", function (e) {
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
    isCompanybookerValid = checkComapnybooker(),
    isCompanypersonValid = checkComapnycontactperson(),
    isCompanydirectorValid = checkComapnydirector(),
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
    isCompanybookerValid &&
    isCompanypersonValid &&
    isCompanydirectorValid &&
    isComapnyagency &&
    isCompanyday;

  // submit to the server if the form is valid
  if (isFormValid) {
    console.log("hello done");
    // $("#company_register").fadeIn();
    // $("#register_form").fadeOut();
    // form.submit();
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

form.addEventListener(
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
