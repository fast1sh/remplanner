$(".js-range-slider").ionRangeSlider();

$('.works__slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  dotsClass: 'works__slider-dots slick-dots',
  prevArrow: '<button type="button" class="slick-prev works__slider-arrow">Previous</button>',
  nextArrow: '<button type="button" class="slick-next works__slider-arrow">Previous</button>'
});
$('.works__left-slider-top').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.works__left-slider-bot'
});
$('.works__left-slider-bot').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.works__left-slider-top',
  dots: false,
  arrows: false,
  focusOnSelect: true
});

$(".twentytwenty-container").twentytwenty({
  default_offset_pct: 0.25, // How much of the before image is visible when the page loads
  no_overlay: true, //Do not show the overlay with before and after
  move_slider_on_hover: true, // Move slider on mouse hover?
  move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement. 
  click_to_move: false 
});

$('.reports__slider-top').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  asNavFor: '.reports__slider-bot',
  prevArrow: '<button type="button" class="slick-prev works__slider-arrow reports__slider-arrow">Previous</button>',
  nextArrow: '<button type="button" class="slick-next works__slider-arrow reports__slider-arrow">Previous</button>',
  appendArrows: '.reports__slider-top-wrapper'
});

$('.reports__slider-bot').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.reports__slider-top',
  arrows: false,
  focusOnSelect: true
});

var number = 0;
var maxNumber = $(".quiz__item").length;
var $element = $(".quiz__item").find("input, select, textarea");
var btnPrev = $(".quiz__btn--prev");
var btnNext = $('.quiz__btn--next');
var btnSemifinal = $('.quiz__semifinal-btn');
var isValid;
var dataBlock;
var activeSlide = [];
var qw21num = $('#qw2-1-num');
var qw21slider = $('#qw2-1-slider');
var qw22num = $('#qw2-2-num');
var qw22slider = $('#qw2-2-slider');

qw21slider.on('change', function() {
  qw21num.val(qw21slider.val());
});

qw22slider.on('change', function () {
  qw22num.val(qw22slider.val());
});

for (var i = 0; i < maxNumber; i++) {
  activeSlide[i] = false;
}

$(".test-num-current").text(number + 1);
$(".test-num-all").text(maxNumber);



$element.on('change input', function (e) {
  var value = $(this).val().trim();
  isValid = value !== "";
  btnActive(!isValid);
});

function btnActive(isValid) {

  if (number === 0) {
    btnPrev.prop('disabled', 'false');
    btnNext.prop('disabled', isValid);
  } else {
    btnPrev.prop('disabled', false);
    if (activeSlide[number] === true || isValid === false) {
      btnNext.prop('disabled', false);
    } else {
      btnNext.prop('disabled', true);
    }
  }

  //   if ($('#qw-s').hasClass('acts')) {

  //     if ($("input[name='semifinal-phone").val()) {
  //       btnSemifinal.prop('disabled', false);
  //       console.log('VAL TRUE');
  //     } else {
  //       btnSemifinal.prop('disabled', true);
  //       console.log('VAL FALSE');
  //     }
  //   }
}

$("input[name='social']").on('change, input', function () {

  if ($(this).hasClass('viber')) {
    $('#semifinal-email').hide();
    $('#semifinal-phone').attr('placeholder', 'Ваш телефон в Viber');
    $('#semifinal-email').attr('required', false);
  } else if ($(this).hasClass('telegram')) {
    $('#semifinal-email').hide();
    $('#semifinal-phone').attr('placeholder', 'Ваш телефон в Telegram');
    $('#semifinal-email').attr('required', false);
  } else if ($(this).hasClass('whatsapp')) {
    $('#semifinal-email').hide();
    $('#semifinal-phone').attr('placeholder', 'Ваш телефон в WhatsApp');
    $('#semifinal-email').attr('required', false);
  } else if ($(this).hasClass('email')) {
    $('#semifinal-email').show();
    $('#semifinal-email').attr('required', true);
  }

});

// sidebar

function progress(num) {
  $('.quiz__progress-item').eq(num).addClass('active');
  $('.quiz__progress-item').eq(num + 1).removeClass('active');
}
progress(0);

// btn
function btnClick() {
  btnPrev.on('click', function (event) {
    event.preventDefault();
    --number;
    $(".quiz__item").hide();
    $(".quiz__item").eq(number).fadeIn();
    btnActive(!isValid);
    if (number === 0) {
      btnPrev.hide();
    }
    progress(number);

    animateTop();
  });


  btnNext.on('click', function (event) {
    event.preventDefault();
    activeSlide[number] = true;
    ++number;
    $(".quiz__item").hide();
    $(".quiz__item").eq(number).fadeIn(1000);
    btnActive(!isValid);

    if (activeSlide[number] === true) {
      btnNext.prop('disabled', false);
    } else {
      btnNext.prop('disabled', true);
    }

    if (number > 0) {
      btnPrev.show();
    }

    if (number === 6) {
      $(".quiz__left").hide();
      $(".quiz__right").hide();
      $(".quiz__loading").fadeIn(1000);
      setTimeout(function () { 
        $(".quiz__left").fadeIn(1000);
        $(".quiz__left--start").hide();
        $(".quiz__left--finish").fadeIn(1000);
        $(".quiz__content").addClass('quiz__content--bg');
        $(".quiz__right").fadeIn(1000);
        $(".quiz__loading").hide();
        $(".quiz__btns").hide();
       }, 3000);
    }

    progress(number);

    animateTop();
  });

  //   btnSemifinal.on('click', function (event) {
  //     activeSlide[number] = true;
  //     ++number;
  //     btnActive();
  //      $(".quiz__item").hide().removeClass('acts');
  //      $("#qw-f").fadeIn(1000).addClass('acts');
  //   })
}
btnClick();

function animateTop(eq) {
  var elem = $('.quiz__wrapper');
  var top = elem.offset().top - 15;
  $('body,html').animate({ scrollTop: top }, 400);
}


$.fn.hasAttr = function (name) {
  return this.attr(name) !== undefined;
};

$('.tabs__nav').on('click', function () {
  $('.tabs__nav').removeClass('tabs__nav--active');
  $(this).addClass('tabs__nav--active');
  $('.tabs__item').hide();
  $('.tabs__item').eq($(this).index()).fadeIn(1000);
});

$('.header__burger').on('click', function () {
  $('.nav').addClass('nav--active');
});
$('.nav__close').on('click', function () {
  $('.nav').removeClass('nav--active');
});
$('.nav__link').on('click', function () {
  $('.nav').removeClass('nav--active');
});

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).scroll(function () {
  $('.words__item').each(function () {
    if (isScrolledIntoView(this) === true) {
      $(this).addClass('active');
    }

  });
});

$('.fancy-class, .works__left-slider-top-item, .review__play').fancybox({
  buttons: [
    'slideShow',
    'zoom',
    'fullScreen',
    'close'
  ],
  animationEffect: "zoom-in-out",
  animationDuration: 600,
  transitionEffect: "circular",
  transitionDuration: 420,

});

$('.js-btn').on('click', function () {
  event.preventDefault();
  $('html').addClass('stop');
  var href = $(this).attr('href');
  $(href).fadeIn(500);
});

$('.modal__close').on('click', function () {
  event.preventDefault();
  $('html').removeClass('stop');
  $('.modal-overlay').fadeOut(500);
});

$('.modal-overlay').mouseup(function (e) {
  var container = $('.modal');
  if (container.has(e.target).length === 0 && !container.is(e.target)) {
    $('html').removeClass('stop');
    $('.modal-overlay').fadeOut();
  }
});

var cookiesTest2 = get_cookie("test2");
if (cookiesTest2 !== '' && cookiesTest2 !== null) {
  // return false;
} else {
  var closeMod = false;
  $(document).mouseleave(function (event) {
    event = event || window.event;
    if (event.clientY < 0 || event.clientY < 3) {
      if (!closeMod) {

        $('html').addClass('stop');
        $('#modal-wait').fadeIn();


        closeMod = true;


        var date2 = new Date();
        date2.setDate(date2.getDate() + 7);
        date2 = date2.toUTCString();
        document.cookie = "test2=1;expires=" + date2;
      }

    }
  });

}

function get_cookie(cookie_name) {
  var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

  if (results)
    return (unescape(results[2]));
  else
    return null;
}

new WOW().init();

$('input[name="phone"]').mask('+7(999) 999-9999');