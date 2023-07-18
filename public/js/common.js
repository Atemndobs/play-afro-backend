$(window).scroll(function () {
  var sticky = $(".register-header"),
    scroll = $(window).scrollTop();

  if (scroll >= 10) sticky.addClass("fixed");
  else sticky.removeClass("fixed");
});

$(window).scroll(function () {
  var sticky = $(".header-main"),
    scroll = $(window).scrollTop();

  if (scroll >= 100) sticky.addClass("fixed");
  else sticky.removeClass("fixed");
});

// Input Eye script

$(function () {
  $("#eye").click(function () {
    if ($(this).hasClass("fa-eye-slash")) {
      $(this).removeClass("fa-eye-slash");

      $(this).addClass("fa-eye");

      $("#password").attr("type", "text");
    } else {
      $(this).removeClass("fa-eye");

      $(this).addClass("fa-eye-slash");

      $("#password").attr("type", "password");
    }
  });
});

$(function () {
  $("#eye_confirm").click(function () {
    if ($(this).hasClass("fa-eye-slash")) {
      $(this).removeClass("fa-eye-slash");

      $(this).addClass("fa-eye");

      $("#confirm_password").attr("type", "text");
    } else {
      $(this).removeClass("fa-eye");

      $(this).addClass("fa-eye-slash");

      $("#confirm_password").attr("type", "password");
    }
  });
});

// $(function () {

//     $('#eye_login').click(function () {

//         if ($(this).hasClass('fa-eye-slash')) {

//             $(this).removeClass('fa-eye-slash');

//             $(this).addClass('fa-eye');

//             $('#confirm_password').attr('type', 'text');

//         } else {

//             $(this).removeClass('fa-eye');

//             $(this).addClass('fa-eye-slash');

//             $('#confirm_password').attr('type', 'password');
//         }
//     });
// });

// -----------------------------------------------------------------------------------//

// Question Ans Popup

$(".download-link").click(function () {
  $(".download-popup").fadeIn();
  $(".back-drop").fadeIn();
  $("html").css("overflow", "hidden");
});

$(".reviews-link").click(function () {
  $(".reviews-body").fadeIn();
  $(".back-drop").fadeIn();
  $(".download-popup").fadeOut();
  $("html").css("overflow", "hidden");
});

$(".modal-close").click(function () {
  $(".download-popup").fadeOut();
  $(".back-drop").fadeOut();
  $(".reviews-body").fadeOut();
  $("html").css("overflow", "auto");
});

// --------------------------------------------

// Upload Files

var dropFileForm = document.getElementById("dropFileForm");
var fileLabelText = document.getElementById("fileLabelText");
var uploadStatus = document.getElementById("uploadStatus");
var fileInput = document.getElementById("fileInput");
var droppedFiles;

function overrideDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

function fileHover() {
  dropFileForm.classList.add("fileHover");
}

function fileHoverEnd() {
  dropFileForm.classList.remove("fileHover");
}

function addFiles(event) {
  droppedFiles = event.target.files || event.dataTransfer.files;
  showFiles(droppedFiles);
}

function showFiles(files) {
  if (files.length > 1) {
    fileLabelText.innerText = files.length + " files selected";
  } else {
    fileLabelText.innerText = files[0].name;
  }
}

function uploadFiles(event) {
  event.preventDefault();
  changeStatus("Uploading...");

  var formData = new FormData();

  for (var i = 0, file; (file = droppedFiles[i]); i++) {
    formData.append(fileInput.name, file, file.name);
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (data) {
    //handle server response and change status of
    //upload process via changeStatus(text)
    console.log(xhr.response);
  };
  xhr.open(dropFileForm.method, dropFileForm.action, true);
  xhr.send(formData);
}

function changeStatus(text) {
  uploadStatus.innerText = text;
}

// -----------------------------------------------

// Company Name Hide Show

$(document).ready(function () {
  //click on Lable
  $("#paypal").on("click", function () {
    check = $(this).prop("checked");
    $(".visacard").fadeOut();
  });
  //click on Solo
  $("#credit").on("click", function () {
    check = $(this).prop("checked");
    $(".visacard").fadeIn();
  });
});

// ---------------------------------------------------

// Company Name Hide Show

$(document).ready(function () {
  //click on Lable
  $("#lableselect").on("click", function () {
    check = $(this).prop("checked");
    $(".companys-name").fadeIn();
    $(".contact-person").fadeIn();
    $(".companys-website").fadeIn();
    $("#fullname").siblings("label").children('b').text('');
  });
  //click on Solo
  $("#soloselect").on("click", function () {
    check = $(this).prop("checked");
    $("#fullname").siblings("label").children("b").text("*");
    $(".companys-name").fadeOut();
    $(".contact-person").fadeOut();
    $(".companys-website").fadeOut();
  });
});

// ---------------------------------------------------

// Artist & Dj's Radio Button Select
$(".submit-form").click(function () {
  const radio = $('input[name="flexRadioDefault"]:checked').val();
  console.log("radio", radio);
  if (radio == "artistmusic") {
    window.location.href = "/register";
  } else {
    window.location.href = "/dj/register";
  }
});
// ----------------------------------

// Register Popup
$(".register-btn").click(function () {
  $(".back-drop").fadeIn();
  $(".register-popup").fadeIn();
  $("html").css("overflow", "hidden");
});

$(".modal-close").click(function () {
  $(".back-drop").fadeOut();
  $(".register-popup").fadeOut();
  $("html").css("overflow", "auto");
});

// -----------------

// Payment Successfull

// $(".confirm_payment").click(function () {
//   $(".payment-popup").fadeIn();
//   $(".back-drop").fadeIn();
//   $("html").css("overflow", "hidden");
// });

$(".submit-form").click(function () {
  $(".payment-popup").fadeOut();
  $(".back-drop").fadeOut();
  $("html").css("overflow", "auto");
});

// ---------------------------------

// Logout

$(".logout_btn").click(function () {
  $(".back-drop").fadeIn();
  $(".log_out").fadeIn();
  $("html").css("overflow", "hidden");
});
$(".close-log").click(function () {
  $(".log_out").fadeOut();
  $(".back-drop").fadeOut();
  $("html").css("overflow", "auto");
});

// -------------------------------------------------------------------------

// ------------- Progressbar Script --------------- //
function progressIncrease() {
  var currentStepNum = $("#checkout-progress").data("current-step");
  var nextStepNum = currentStepNum + 1;
  var currentStep = $(".step.step-" + currentStepNum);
  var nextStep = $(".step.step-" + nextStepNum);
  var progressBar = $("#checkout-progress");
  $(".btn-prev").removeClass("disabled");
  $("#section" + currentStepNum).toggle();
  $("#section" + nextStepNum).toggle();
  if (nextStepNum == 5) {
    $(this).toggle();
    $(".btn-submit").toggle();
  }
  /*if(nextStepNum == 5){
        $(this).addClass('disabled');
    }*/
  $(".checkout-progress")
    .removeClass(".step-" + currentStepNum)
    .addClass(".step-" + (currentStepNum + 1));

  currentStep.removeClass("active").addClass("valid");
  currentStep.find("span").addClass("opaque");
  currentStep.find(".fa.fa-check").removeClass("opaque");

  nextStep.addClass("active");
  if (progressBar.hasClass("progress-four")){
    progressBar
      .removeAttr("class")
      .addClass("step-" + nextStepNum)
      .addClass("progress-four")
      .data("current-step", nextStepNum);
  }else{
    progressBar
      .removeAttr("class")
      .addClass("step-" + nextStepNum)
      .data("current-step", nextStepNum);
  }
    
}
function progressDecrease() {
  var currentStepNum = $("#checkout-progress").data("current-step");
  var prevStepNum = currentStepNum - 1;
  var currentStep = $(".step.step-" + currentStepNum);
  var prevStep = $(".step.step-" + prevStepNum);
  var progressBar = $("#checkout-progress");
  $(".btn-next").removeClass("disabled");
  $("#section" + currentStepNum).toggle();
  $("#section" + prevStepNum).toggle();
  if (currentStepNum == 5) {
    $(".btn-submit").toggle();
    $(".btn-next").toggle();
  }
  if (currentStepNum == 1) {
    return false;
  }
  if (prevStepNum == 1) {
    $(this).addClass("disabled");
  }
  $(".checkout-progress")
    .removeClass(".step-" + currentStepNum)
    .addClass(".step-" + prevStepNum);

  currentStep.removeClass("active");
  prevStep.find("span").removeClass("opaque");
  prevStep.find(".fa.fa-check").addClass("opaque");

  prevStep.addClass("active").removeClass("valid");
  if (progressBar.hasClass("progress-four")) {
    progressBar
    .removeAttr("class")
    .addClass("step-" + prevStepNum)
    .addClass("progress-four")
    .data("current-step", prevStepNum);
  } else {
    progressBar
    .removeAttr("class")
    .addClass("step-" + prevStepNum)
    .data("current-step", prevStepNum);
  }
}
// $(".btn-next").on("click", function () {
//   var currentStepNum = $("#checkout-progress").data("current-step");
//   var nextStepNum = currentStepNum + 1;
//   var currentStep = $(".step.step-" + currentStepNum);
//   var nextStep = $(".step.step-" + nextStepNum);
//   var progressBar = $("#checkout-progress");
//   $(".btn-prev").removeClass("disabled");
//   $("#section" + currentStepNum).toggle();
//   $("#section" + nextStepNum).toggle();
//   if (nextStepNum == 5) {
//     $(this).toggle();
//     $(".btn-submit").toggle();
//   }
//   /*if(nextStepNum == 5){
//         $(this).addClass('disabled');
//     }*/
//   $(".checkout-progress")
//     .removeClass(".step-" + currentStepNum)
//     .addClass(".step-" + (currentStepNum + 1));

//   currentStep.removeClass("active").addClass("valid");
//   currentStep.find("span").addClass("opaque");
//   currentStep.find(".fa.fa-check").removeClass("opaque");

//   nextStep.addClass("active");
//   progressBar
//     .removeAttr("class")
//     .addClass("step-" + nextStepNum)
//     .data("current-step", nextStepNum);
// });

$(".btn-submit").on("click", function () {
  // $('.btn-submit').toggle('disabled');
  // $('.btn-prev').toggle();
  var currentStepNum = $("#checkout-progress").data("current-step");
  var currentStep = $(".step.step-" + currentStepNum);
  currentStep.removeClass("active").addClass("valid");
  currentStep.find(".fa.fa-check").removeClass("opaque");
});

$(".btn-prev").on("click", function () {
  var currentStepNum = $("#checkout-progress").data("current-step");
  var prevStepNum = currentStepNum - 1;
  var currentStep = $(".step.step-" + currentStepNum);
  var prevStep = $(".step.step-" + prevStepNum);
  var progressBar = $("#checkout-progress");
  $(".btn-next").removeClass("disabled");
  $("#section" + currentStepNum).toggle();
  $("#section" + prevStepNum).toggle();
  if (currentStepNum == 5) {
    $(".btn-submit").toggle();
    $(".btn-next").toggle();
  }
  if (currentStepNum == 1) {
    return false;
  }
  if (prevStepNum == 1) {
    $(this).addClass("disabled");
  }
  $(".checkout-progress")
    .removeClass(".step-" + currentStepNum)
    .addClass(".step-" + prevStepNum);

  currentStep.removeClass("active");
  prevStep.find("span").removeClass("opaque");
  prevStep.find(".fa.fa-check").addClass("opaque");

  prevStep.addClass("active").removeClass("valid");

  if (progressBar.hasClass("progress-four")) {
    progressBar
      .removeAttr("class")
      .addClass("step-" + prevStepNum)
      .addClass("progress-four")
      .data("current-step", prevStepNum);
  } else {
    progressBar
      .removeAttr("class")
      .addClass("step-" + prevStepNum)
      .data("current-step", prevStepNum);
  }
});

$(".register-btn").click(function () {
  $(".back-drop").fadeIn();
  $(".register-popup").fadeIn();
  $("html").css("overflow", "hidden");
});

// -------------------------------------------------------------------------------- //

// $('#continue-popup').click(function(){
// 	$('.choose-payment').fadeIn();
// 	$('.back-drop').fadeIn();
// })

// Image Upload

// imgInp.onchange = evt => {
//     const [file] = imgInp.files
//     if (file) {
//         blah.src = URL.createObjectURL(file)
//     }
// }

// -----------------------------------------------------------------------------//

// Input Eye script

// $(function () {

//     $('#eye').click(function () {

//         if ($(this).hasClass('fa-eye-slash')) {

//             $(this).removeClass('fa-eye-slash');

//             $(this).addClass('fa-eye');

//             $('#password').attr('type', 'text');

//         } else {

//             $(this).removeClass('fa-eye');

//             $(this).addClass('fa-eye-slash');

//             $('#password').attr('type', 'password');
//         }
//     });
// });

// -----------------------------------------------------------------------------------//

$(document).ready(function () {
  $("#example_table").DataTable({
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, "All"],
    ],
    bFilter: false,
    columnDefs: [
      {
        targets: [1, 4, 5, 10] /* column index [0,1,2,3]*/,
        orderable: false /* true or false */,
      },
      { targets: "no-sort", orderable: false },
    ],
    bPaginate: false,
    bInfo: false,
  });
  // $('#example').DataTable();
});
