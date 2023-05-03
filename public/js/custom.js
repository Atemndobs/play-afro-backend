(function ($) {
  ("use strict");
  $("#sidebar_menu").metisMenu();
  $("#admin_profile_active").metisMenu();
  $(".open_miniSide").click(function () {
    $(".sidebar").toggleClass("mini_sidebar");
    $(".main_content ").toggleClass("full_main_content");
    $(".footer_part ").toggleClass("full_footer");
  });
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $("#back-top").fadeOut(500);
    } else {
      $("#back-top").fadeIn(500);
    }
  });
  $("#back-top a").on("click", function () {
    $("body,html").animate({ scrollTop: 0 }, 1000);
    return false;
  });
  $("#sidebar_menu").find("a").removeClass("active");
  $("#sidebar_menu").find("li").removeClass("mm-active");
  $("#sidebar_menu").find("li ul").removeClass("mm-show");
  var current = window.location.pathname;
  $("#sidebar_menu >li a").filter(function () {
    var link = $(this).attr("href");
    if (link) {
      if (current.indexOf(link) != -1) {
        $(this)
          .parents()
          .parents()
          .children("ul.mm-collapse")
          .addClass("mm-show")
          .closest("li")
          .addClass("mm-active");
        $(this).addClass("active");
        return false;
      }
    }
  });
  $(".bell_notification_clicker").on("click", function () {
    $(".Menu_NOtification_Wrap").toggleClass("active");
  });
  $(document).click(function (event) {
    if (
      !$(event.target).closest(
        ".bell_notification_clicker ,.Menu_NOtification_Wrap"
      ).length
    ) {
      $("body").find(".Menu_NOtification_Wrap").removeClass("active");
    }
  });
  $(".CHATBOX_open").on("click", function () {
    $(".CHAT_MESSAGE_POPUPBOX").toggleClass("active");
  });
  $(".MSEESAGE_CHATBOX_CLOSE").on("click", function () {
    $(".CHAT_MESSAGE_POPUPBOX").removeClass("active");
  });
  $(document).click(function (event) {
    if (
      !$(event.target).closest(".CHAT_MESSAGE_POPUPBOX, .CHATBOX_open").length
    ) {
      $("body").find(".CHAT_MESSAGE_POPUPBOX").removeClass("active");
    }
  });
  $(".serach_button").on("click", function () {
    $(".serach_field-area ").addClass("active");
  });
  $(document).click(function (event) {
    if (!$(event.target).closest(".serach_button, .serach_field-area").length) {
      $("body").find(".serach_field-area").removeClass("active");
    }
  });
  $(document).ready(function () {
    var proBar = $("#bar1");
    if (proBar.length) {
      proBar.barfiller({ barColor: "#FFBF43", duration: 2000 });
    }
    var proBar = $("#bar2");
    if (proBar.length) {
      proBar.barfiller({ barColor: "#508FF4", duration: 2100 });
    }
    var proBar = $("#bar3");
    if (proBar.length) {
      proBar.barfiller({ barColor: "#4BE69D", duration: 2200 });
    }
    var proBar = $("#bar4");
    if (proBar.length) {
      proBar.barfiller({ barColor: "#3B5DE7", duration: 2200 });
    }
    var proBar = $("#bar5");
    if (proBar.length) {
      proBar.barfiller({ barColor: "#3BE769", duration: 2200 });
    }
    var proBar = $("#bar6");
    if (proBar.length) {
      proBar.barfiller({ barColor: "#3BE7E7", duration: 2200 });
    }
    var proBar = $("#bar7");
    if (proBar.length) {
      proBar.barfiller({ barColor: "#FFB822", duration: 2200 });
    }
  });
  $(".close_icon").click(function () {
    $(this).parents(".hide_content").slideToggle("0");
  });
  var count = $(".counter");
  if (count.length) {
    count.counterUp({ delay: 100, time: 5000 });
  }
  var niceSelect = $(".nice_Select");
  if (niceSelect.length) {
    niceSelect.niceSelect();
  }
  var niceSelect = $(".nice_Select2");
  if (niceSelect.length) {
    niceSelect.niceSelect();
  }
  var niceSelect = $(".default_sel");
  if (niceSelect.length) {
    niceSelect.niceSelect();
  }
  $(document).ready(function () {
    var date_picker = $("#start_datepicker");
    if (date_picker.length) {
      date_picker.datepicker();
    }
    var date_picker = $("#end_datepicker");
    if (date_picker.length) {
      date_picker.datepicker();
    }
  });
  var delay = 500;
  $(".progress-bar").each(function (i) {
    $(this)
      .delay(delay * i)
      .animate({ width: $(this).attr("aria-valuenow") + "%" }, delay);
    $(this)
      .prop("Counter", 0)
      .animate(
        { Counter: $(this).text() },
        {
          duration: delay,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now) + "%");
          },
        }
      );
  });
  $(".sidebar_icon").on("click", function () {
    $(".sidebar").toggleClass("active_sidebar");
  });
  $(".sidebar_close_icon i").on("click", function () {
    $(".sidebar").removeClass("active_sidebar");
  });
  $(".troggle_icon").on("click", function () {
    $(".setting_navbar_bar").toggleClass("active_menu");
  });
  $(".custom_select").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(".custom_select.active").removeClass("active");
      $(this).addClass("active");
    }
  });
  $(document).click(function (event) {
    if (!$(event.target).closest(".custom_select").length) {
      $("body").find(".custom_select").removeClass("active");
    }
  });
  $(document).click(function (event) {
    if (!$(event.target).closest(".sidebar_icon, .sidebar").length) {
      $("body").find(".sidebar").removeClass("active_sidebar");
    }
  });
  $("#checkAll").click(function () {
    $("input:checkbox").not(this).prop("checked", this.checked);
  });
  var summerNote = $("#summernote");
  if (summerNote.length) {
    summerNote.summernote({
      placeholder:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tabsize: 2,
      height: 305,
    });
  }
  var summerNote = $(".lms_summernote");
  if (summerNote.length) {
    summerNote.summernote({
      placeholder:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tabsize: 2,
      height: 305,
    });
  }
  var summerNote = $(".lms_summernote");
  if (summerNote.length) {
    summerNote.summernote({
      placeholder:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tabsize: 2,
      height: 305,
    });
  }
  $(".input-file").each(function () {
    var $input = $(this),
      $label = $input.next(".js-labelFile"),
      labelVal = $label.html();
    $input.on("change", function (element) {
      var fileName = "";
      if (element.target.value)
        fileName = element.target.value.split("\\").pop();
      fileName
        ? $label.addClass("has-file").find(".js-fileName").html(fileName)
        : $label.removeClass("has-file").html(labelVal);
    });
  });
  $(".input-file2").each(function () {
    var $input = $(this),
      $label = $input.next(".js-labelFile1"),
      labelVal = $label.html();
    $input.on("change", function (element) {
      var fileName = "";
      if (element.target.value)
        fileName = element.target.value.split("\\").pop();
      fileName
        ? $label.addClass("has-file").find(".js-fileName1").html(fileName)
        : $label.removeClass("has-file").html(labelVal);
    });
  });
  var bootstrapTag = $("#meta_keywords");
  if (bootstrapTag.length) {
    bootstrapTag.tagsinput();
  }
  if ($(".lms_table_active").length) {
    $(".lms_table_active").DataTable({
      bLengthChange: false,
      bDestroy: true,
      language: {
        search: "<i class='ti-search'></i>",
        searchPlaceholder: "Quick Search",
        paginate: {
          next: "<i class='ti-arrow-right'></i>",
          previous: "<i class='ti-arrow-left'></i>",
        },
      },
      columnDefs: [{ visible: false }],
      responsive: true,
      searching: false,
    });
  }
  if ($(".lms_table_active2").length) {
    $(".lms_table_active2").DataTable({
      bLengthChange: false,
      bDestroy: false,
      language: {
        search: "<i class='ti-search'></i>",
        searchPlaceholder: "Quick Search",
        paginate: {
          next: "<i class='ti-arrow-right'></i>",
          previous: "<i class='ti-arrow-left'></i>",
        },
      },
      columnDefs: [{ visible: false }],
      responsive: true,
      searching: false,
      info: false,
      paging: false,
    });
  }
  if ($(".lms_table_active3").length) {
    $(".lms_table_active3").DataTable({
      bLengthChange: false,
      bDestroy: false,
      language: {
        search: "<i class='ti-search'></i>",
        searchPlaceholder: "Quick Search",
        paginate: {
          next: "<i class='ti-arrow-right'></i>",
          previous: "<i class='ti-arrow-left'></i>",
        },
      },
      columnDefs: [{ visible: false }],
      responsive: true,
      searching: false,
      info: true,
      paging: true,
    });
  }
  $(".layout_style").click(function () {
    if ($(this).hasClass("layout_style_selected")) {
      $(this).removeClass("layout_style_selected");
    } else {
      $(".layout_style.layout_style_selected").removeClass(
        "layout_style_selected"
      );
      $(this).addClass("layout_style_selected");
    }
  });
  $(".switcher_wrap li.Horizontal").click(function () {
    $(".sidebar").addClass("hide_vertical_menu");
    $(".main_content ").addClass("main_content_padding_hide");
    $(".horizontal_menu").addClass("horizontal_menu_active");
    $(".main_content_iner").addClass("main_content_iner_padding");
    $(".footer_part").addClass("pl-0");
  });
  $(".switcher_wrap li.vertical").click(function () {
    $(".sidebar").removeClass("hide_vertical_menu");
    $(".main_content ").removeClass("main_content_padding_hide");
    $(".horizontal_menu").removeClass("horizontal_menu_active");
    $(".main_content_iner").removeClass("main_content_iner_padding");
    $(".footer_part").removeClass("pl-0");
  });
  $(".switcher_wrap li").click(function () {
    $("li").removeClass("active");
    $(this).addClass("active");
  });
  $(".custom_lms_choose li").click(function () {
    $("li").removeClass("selected_lang");
    $(this).addClass("selected_lang");
  });
  $(".spin_icon_clicker").on("click", function (e) {
    $(".switcher_slide_wrapper").toggleClass("swith_show");
    e.preventDefault();
  });
  if ($("#webticker-dark-icons").length) {
    $("#webticker-dark-icons").webTicker({
      height: "auto",
      duplicate: true,
      startEmpty: false,
      rssfrequency: 5,
    });
  }
  if ($("#webticker-dark1").length) {
    $("#webticker-dark1").webTicker({
      height: "auto",
      duplicate: true,
      startEmpty: false,
      rssfrequency: 5,
    });
  }
  if ($("#webticker-dark2").length) {
    $("#webticker-dark2").webTicker({
      height: "auto",
      duplicate: true,
      startEmpty: false,
      rssfrequency: 5,
      direction: "right",
    });
  }
  if ($("#webticker-dark3").length) {
    $("#webticker-dark3").webTicker({
      height: "auto",
      startEmpty: false,
      rssfrequency: 5,
    });
  }
  if ($("#webticker-white1").length) {
    $("#webticker-white1").webTicker({
      height: "auto",
      duplicate: true,
      startEmpty: false,
      rssfrequency: 5,
      direction: "right",
    });
  }
  if ($("#webticker-white-icons").length) {
    $("#webticker-white-icons").webTicker({
      height: "auto",
      duplicate: true,
      startEmpty: false,
      rssfrequency: 5,
    });
  }
  if ($("#webticker-white2").length) {
    $("#webticker-white2").webTicker({
      height: "auto",
      duplicate: true,
      startEmpty: false,
      rssfrequency: 5,
    });
  }
  if ($("#webticker-white3").length) {
    $("#webticker-white3").webTicker({
      height: "auto",
      duplicate: true,
      startEmpty: false,
      rssfrequency: 5,
      direction: "right",
    });
  }
  $(document).ready(function () {
    $(function () {
      "use strict";
      $(".pCard_add").click(function () {
        $(".pCard_card").toggleClass("pCard_on");
        $(".pCard_add i").toggleClass("fa-minus");
      });
    });
  });

  // Register form
})(jQuery);



// -------------------------------------------------------------------------------- //




// 

const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
    "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
);
//credit for song: Adrian kreativaweb@gmail.com

audio.addEventListener(
    "loadeddata",
    () => {
        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
            audio.duration
        );
        audio.volume = .75;
    },
    false
);
// 

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false)

//check audio percentage and update time accordingly
setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
    "click",
    () => {
        if (audio.paused) {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
            audio.play();
        } else {
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
            audio.pause();
        }
    },
    false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.remove("icono-volumeMedium");
        volumeEl.classList.add("icono-volumeMute");
    } else {
        volumeEl.classList.add("icono-volumeMedium");
        volumeEl.classList.remove("icono-volumeMute");
    }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}



// -------------------------------------------