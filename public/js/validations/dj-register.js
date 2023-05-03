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
const passwordEl = document.querySelector("#password");
const confirmpasswordEl = document.querySelector("#confirmpassword");

const usernameEl = document.querySelector("#fullname");
const contactEl = document.querySelector("#contact_num");
const countryEl = document.querySelector("#countries");
const addressEl = document.querySelector("#address");
const instaLinkEl = document.querySelector("#instagram_link");
$("#contactno").keypress(function (event) {
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

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be empty.");
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
  const confirmPassword = confirmpasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmpasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmpasswordEl, "The password does not match");
  } else {
    showSuccess(confirmpasswordEl);
    valid = true;
  }

  return valid;
};

// const checkConatctNumber = () => {
//   let valid = false;
//   const conatct = contactEl.value.trim();
//   let contactlen = 8,
//     contactmax = 10;
//   if (!isRequired(conatct)) {
//     showError(contactEl, "Contact number cannot be empty.");
//   } else if (!isBetween(conatct.length, contactlen, contactmax)) {
//     showError(
//       contactEl,
//       `Contact number must be between ${contactlen} and ${contactmax} characters.`
//     );
//   } else {
//     showSuccess(contactEl);
//     valid = true;
//   }
//   return valid;
// };

// const checkUsername = () => {
//   let valid = false;

//   const min = 3,
//     max = 25;

//   const username = usernameEl.value.trim();

//   if (!isRequired(username)) {
//     showError(usernameEl, "Name cannot be empty.");
//   } else if (!isBetween(username.length, min, max)) {
//     showError(
//       usernameEl,
//       `Username must be between ${min} and ${max} characters.`
//     );
//   } else {
//     showSuccess(usernameEl);
//     valid = true;
//   }
//   return valid;
// };

// const checkEmail = () => {
//   let valid = false;
//   const email = emailEl.value.trim();
//   if (!isRequired(email)) {
//     showError(emailEl, "Email cannot be empty.");
//   } else if (!isEmailValid(email)) {
//     showError(emailEl, "Email is not valid.");
//   } else {
//     showSuccess(emailEl);
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
    isChartValid = checkCharts(),
    isPoolValid = checkPools(),
    isMusicValid = checkMusic(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword(),
    isInstaLinkValid = checkInstaLink();

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
    isChartValid &&
    isPoolValid &&
    isMusicValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isInstaLinkValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    console.log("hello done");
    $("#company_register").fadeIn();
    $("#register_form").fadeOut();
    // form.submit();
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
const companyInstaLinkEl = document.querySelector("#company_instagram_link");

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

const companyCheckInstaLink = () => {
  let valid = false;
  const companyInstaLink = companyInstaLinkEl.value.trim();
  if (!isRequired(companyInstaLink)) {
    showError(companyInstaLinkEl, "Please enter the instagram link.");
  } else {
    showSuccess(companyInstaLinkEl);
    valid = true;
  }
  return valid;
};

// const checkComapnybooker = () => {
//   let valid = false;
//   const comapnybooker = comapnybookerEl.value.trim();
//   if (!isRequired(comapnybooker)) {
//     showError(comapnybookerEl, "Booker cannot be empty.");
//   } else {
//     showSuccess(comapnybookerEl);
//     valid = true;
//   }
//   return valid;
// };

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

// const checkComapnydirector = () => {
//   let valid = false;
//   const comapnydirector = comapnydirectorEl.value.trim();
//   if (!isRequired(comapnydirector)) {
//     showError(comapnydirectorEl, "Website cannot be empty.");
//   } else {
//     showSuccess(comapnydirectorEl);
//     valid = true;
//   }
//   return valid;
// };

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

const checkReferenceClubs = () => {
  let valid = false;

  const referenceClubs = [];
  const referenceEvent = [];

  $(".list-2 .item-close").each(function () {
    referenceEvent.push($(this).text());
  });

  $(".list .item-close").each(function () {
    referenceClubs.push($(this).text());
  });

  if (referenceClubs.length == 0 && referenceEvent.length == 0) {
    document.getElementById("club-error").innerHTML =
      "Please select at least one option and enter the details";
  } else {
    document.getElementById("club-error").innerHTML = "";
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
    isCompanyCheckInstaLinkValid = companyCheckInstaLink(),
    // isCompanydirectorValid = checkComapnydirector(),
    isCheckReferenceClubs = checkReferenceClubs(),
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
    isCompanyCheckInstaLinkValid &&
    // isCompanybookerValid &&
    isCompanypersonValid &&
    isCheckReferenceClubs &&
    // isCompanydirectorValid &&
    isComapnyagency &&
    isCompanyday;

  // submit to the server if the form is valid
  if (isFormValid) {
    var formData1 = $("#dj-register").serialize();
    var formData2 = $("#dj-company").serializeArray();

    $(".list-3 .item-close").each(function () {
      $("#dj-company").append(
        `<input type="hidden" name="residenceClub" value="${$(this).text()}" />`
      );
    });

    $(".list-2 .item-close").each(function () {
      $("#dj-company").append(
        `<input type="hidden" name="referenceEvent" value="${$(
          this
        ).text()}" />`
      );
    });

    $(".list .item-close").each(function () {
      $("#dj-company").append(
        `<input type="hidden" name="referenceClub" value="${$(this).text()}" />`
      );
    });

    var filterdata = [];
    filterdata.push(formData1, formData2);

    $.ajax({
      type: "POST",
      url: "/dj/register?type=1",
      data: $("#dj-register").serialize(),
    }).then((res) => {
      if (res.djId) {
        $.ajax({
          type: "POST",
          url: `/dj/register?type=2&djId=${res.djId}`,
          data: $("#dj-company").serialize(),
        }).then((res) => {
          window.location.replace("/login");
        });
      }
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
