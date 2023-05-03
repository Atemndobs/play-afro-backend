const usernameEl = document.querySelector("#fullname");
const companynameEl = document.querySelector("#companyname");
const contactpersonEl = document.querySelector("#contactperson");
const companywebsiteEl = document.querySelector("#companywebsite");
const emailEl = document.querySelector("#email");
const contactEl = document.querySelector("#contact_num");
const countryEl = document.querySelector("#countries");
const addressEl = document.querySelector("#address");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm_password");
const instaLinkEl = document.querySelector("#instagram_link");
const isLabelChaked = $("#lableselect").prop("checked");
const contactPersonEl = document.querySelector("#contactperson");
$("#contact_num").keypress(function (event) {
  if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
    event.preventDefault(); //stop character from entering input
    showError(this, "Only number allowed.");
  }
});

$("#companycontact").keypress(function (event) {
  if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
    event.preventDefault(); //stop character from entering input
    showError(this, "Only number allowed.");
  }
});
const form = document.querySelector("#signup");

const checkCountry = () => {
  let valid = false;
  const country = countryEl.value.trim();
  if (!isRequired(country) || country == "Select Country") {
    showError(countryEl, "Please select the country.");
  } else {
    showSuccess(countryEl);
    valid = true;
  }
  return valid;
};

const checkAddress = () => {
  let valid = false;
  const address = addressEl.value.trim();
  if (!isRequired(address)) {
    showError(addressEl, "Please Fill the address detail.");
  } else {
    showSuccess(addressEl);
    valid = true;
  }
  return valid;
};

const checkInstaLink = () => {
  let valid = false;
  const instaLink = instaLinkEl.value.trim();
  if (!isRequired(instaLink)) {
    showError(instaLinkEl, "Please enter the instagram link.");
  } else {
    showSuccess(instaLinkEl);
    valid = true;
  }
  return valid;
};

// const checkContactPerson = () => {
//   let valid = true;
//   if (isLabelChaked) {
//     const contactPerson = contactPersonEl.value.trim();
//     if (!isRequired(contactPerson)) {
//       showError(contactPersonEl, "Contact person cannot be blank.");
//       valid = false;
//     } else {
//       showSuccess(contactPersonEl);
//       valid = true;
//     }
//   }
//   return valid;
// };

const checkConatctNumber = () => {
  let valid = false;
  const conatct = contactEl.value.trim();
  var pattern = /^\d+\.?\d*$/;
  let contactlen = 8,
    contactmax = 10;
  if (!isRequired(conatct)) {
    showError(contactEl, "Contact number cannot be blank.");
  } else if (!isBetween(conatct.length, contactlen, contactmax)) {
    showError(
      contactEl,
      `Contact number must be between ${contactlen} and ${contactmax} characters.`
    );
  } else if (!pattern.test(conatct)) {
    showError(contactnoEl, `Only numbers are allowed.`);
  } else {
    showSuccess(contactEl);
    valid = true;
  }
  return valid;
};

const checkUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();


  const companyname = companynameEl.value.trim();
  const contactperson = contactpersonEl.value.trim();
  const companywebsite = companywebsiteEl.value.trim();
  if (!isRequired(companyname)) {
    showError(companynameEl, "Company Name cannot be blank.");
    valid = false;
  } else {
    showSuccess(companynameEl);
    valid = true;
  }

  if (!isRequired(contactperson)) {
    showError(contactpersonEl, "Contact person cannot be blank.");
    valid = false;
  } else {
    showSuccess(contactpersonEl);
    valid = true;
  }

  if (!isRequired(companywebsite)) {
    showError(companywebsiteEl, "Compnay website cannot be blank.");
    valid = false;
  } else {
    showSuccess(companywebsiteEl);
    valid = true;
  }

  if (!isRequired(username)) {
    showError(usernameEl, "Name cannot be blank.");
    valid = false;
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
    valid = false;
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!checkConfirmPassword()) {
    showError(passwordEl, "Confirm password not matched.");
  }

  // else if (!isPasswordSecure(password)) {
  //   showError(
  //     passwordEl,
  //     "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
  //   );
  // }
  else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

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

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isContactValid = checkConatctNumber(),
    isCountryValid = checkCountry(),
    isAddressValid = checkAddress(),
    isConfirmPasswordValid = checkConfirmPassword(),
    isInstaLinkValid = checkInstaLink();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isContactValid &&
    isCountryValid &&
    isAddressValid &&
    isConfirmPasswordValid &&
    isInstaLinkValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    form.submit();
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
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "contact_num":
        checkConatctNumber();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
