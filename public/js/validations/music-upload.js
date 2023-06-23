function validateForm(){
  var title = $("#title").val();
  var label = $("#label").val();
  var fileInput = $("#fileInput").val();
  var filevalidate = document.getElementById("fileInput");

  var filePath = filevalidate.value;

  // Allowing file type
  var allowedExtensions = /(\.wav|\.aif|\.mp3|\.mid)$/i;

  if (!allowedExtensions.exec(filePath)) {
    $(".file_upload small").text("Please upload a valid music file");
    validated = 0;
    $("#fileLabelText").text("");
    filevalidate.value = "";
  } else {
    if (fileInput.trim() == "") {
      $(".file_upload small").text("Please upload a music");
      validated = 0;
    } else {
      $(".file_upload small").text("");
    }
  }
  var artist = $("#artist").val();
  var feature = $("#feature").val();
  var bpm = $("#bpm").val();
  var key = $("#key").val();
  var scale = $("#scale").val();
  var genre = $("#genre").val();
  var publish_date = $("#publish_date").val();
  var release_date = $("#release_date").val();
  var song_type = $("input[type='radio'][name='song_type']:checked").val();

  var validated = 1;
  if (title.trim() == "") {
    $(".title_section small").text("Please add a title");
    validated = 0;
  } else {
    $(".title_section small").text("");
  }
  if (label.trim() == "") {
    $(".company_label small").text("Label is required");
    validated = 0;
  } else {
    $(".company_label small").text("");
  }

  if (artist.trim() == "") {
    $(".artist_performer small").text("Artist field is required");
    validated = 0;
  } else {
    $(".artist_performer small").text("");
  }
  // if (feature.trim() == "") {
  //   $(".feature_artist small").text("Featured field is required");
  //   validated = 0;
  // } else {
  //   $(".feature_artist small").text("");
  // }
  // if (bpm.trim() == "") {
  //   $(".bpm_check small").text("BPM field is required");
  //   validated = 0;
  // } else {
  //   $(".bpm_check small").text("");
  // }
  // if (key.trim() == "") {
  //   $(".key_check small").text("KEY field is required");
  //   validated = 0;
  // } else {
  //   $(".key_check small").text("");
  // }
  // if (scale == "Scale" || scale == null || scale=='') {
  //   $(".scale_check small").text("Please select a scale");
  //   validated = 0;
  // } else {
  //   $(".scale_check small").text("");
  // }
  if (genre == "Genre" || genre == null || genre == "") {
    $(".genre_check small").text("Please select a scale");
    validated = 0;
  }else if(genre.length>3){
    $(".genre_check small").text("Maximum three genre is allowed to select");
    validated = 0;
  } else {
    $(".genre_check small").text("");
  }
  if (publish_date.trim() == "") {
    $(".publish_date_check small").text("Please select a publish date");
    validated = 0;
  } else {
    $(".publish_date_check small").text("");
  }
  // if (release_date.trim() == "") {
  //   $(".release_date_check small").text("Please select a release date");
  //   validated = 0;
  // } else {
  //   $(".release_date_check small").text("");
  // }
  if (!song_type && song_type != 0) {
    $(".song_type_check small").text("Please select a song type");
    validated = 0;
  } else {
    $(".song_type_check small").text("");
  }
  if (validated == 0) {
    return false;
  } else {
    progressIncrease();
  }
}

function validateThumb(){
    var fileInput = $("#imgInp").val();
    var filevalidate = document.getElementById("imgInp");

    var filePath = filevalidate.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg|\.gif)$/i;

    if (!allowedExtensions.exec(filePath)) {
      $(".file_upload small").text("Please upload a valid music file");
      validated = 0;
      $("#fileLabelText").text("");
      filevalidate.value = "";
    } else {
      if (fileInput.trim() == "") {
        $(".file_upload small").text("Please upload a music");
        validated = 0;
      } else {
        progressIncrease();
      }
    }
    // progressIncrease();
}


function ValidateCreditCardNumber(){
  var payment_mode = $("#payment_mode").val();
  if (payment_mode == 0) {
    return true;
  }
  var ccNum = document.getElementById("card_number").value;
  var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  var amexpRegEx = /^(?:3[47][0-9]{13})$/;
  var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  var isValid = false;

  if (visaRegEx.test(ccNum)) {
    isValid = true;
  } else if (mastercardRegEx.test(ccNum)) {
    isValid = true;
  } else if (amexpRegEx.test(ccNum)) {
    isValid = true;
  } else if (discovRegEx.test(ccNum)) {
    isValid = true;
  }

  if (isValid) {
    // alert("Thank You!");
    $("#card_number_error").text('');
  } else {
    $("#card_number_error").text("Please provide a valid card number!");
    return false;
  }

  var exp = $("#expiry_date").val();
  var today, someday;
  var exMonth = exp.split("/")[0];
  var exYear = exp.split("/")[1];
  today = new Date();
  someday = new Date();
  someday.setFullYear(exYear, exMonth, 1);

  if (someday < today) {
    $("#card_expiry_error").text("Card expired!");
    return false;
  }else{
    $("#card_expiry_error").text("");
  }
  var cvv = $("#cvv").val();
  if(cvv.trim()==''){
     $("#card_cvv_error").text("CVV can't be empty");
     return false;
  }else{
    $("#card_cvv_error").text("");
  }

  var zipcode = $("#zipcode").val();
  if (zipcode.trim() == "") {
    $("#card_zip_error").text("ZIPCODE can't be empty");
    return false;
  } else {
    $("#card_zip_error").text("");
  }

  var address = $("#address").val();
  if (address.trim() == "") {
    $("#card_address_error").text("Address can't be empty");
    return false;
  } else {
    $("#card_address_error").text("");
  }
  return true;
}