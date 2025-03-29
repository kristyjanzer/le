// Burger Menu
const body = document.querySelector("body");
const header = document.querySelector(".header");
const burgerMenu = document.querySelector(".header .header-button-menu");
const burgerBody = document.querySelector(".header .header-button-menu__body");


burgerMenu.addEventListener("click", (e) => {
  header.classList.toggle("header-menu-open");
  burgerBody.classList.toggle("active");
  body.classList.toggle("lock");
  e.stopPropagation();
});


$(".main-menu").clone().appendTo(".header-button-menu__body");




// Range Slider
const rangeInput = document.querySelector('.rangeslider__input');
const	rangeCount = document.querySelector('.info-banner__count');
let isRTL = document.documentElement.dir === 'rtl';

rangeInput.addEventListener('input', () => {
  rangeCount.textContent = rangeInput.value;

  const min = rangeInput.min
  const max = rangeInput.max
  const val = rangeInput.value
  let percentage = (val - min) * 100 / (max - min)
  if (isRTL) {
    percentage = (max - val) 
  }
  rangeInput.style.backgroundSize = percentage + '% 100%'
});



// Slider Default
$('.uni-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  infinite: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1100,
        settings: {
          dots: false,
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          adaptiveHeight: true
        },
    },
    {
      breakpoint: 700,
        settings: {
          dots: false,
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true
        },
    }
  ]
});



// Phone Mask
$.each($('input#phone'), function (index, val) {
  $(this).focus(function () {
    $(this).inputmask('+7 (999) 999-99-99', {
      clearMaskOnLostFocus: true, showMaskOnHover: false
    });
  });
});

$.each($('input#tin'), function (index, val) {
  $(this).inputmask('999999999999', {
    clearMaskOnLostFocus: true, showMaskOnHover: false
  });
});


// Validate Form
$('.form').validate({
  rules: {
    tin: {
      required: true,
      minlength: 12,
      maxlength: 12,
      number: true
    },
    phone: {
      required: true,
      minlength: 18,
      maxlength: 18,
    }
  },
  messages: {
    tin: {
      number: "Пожалуйста, введите полностью ИИН",
      required: "Пожалуйста, введите полностью ИИН"
    },
    phone: {
      required: "Пожалуйста, введите полностью номер"
    },
    surname: {
      required: "Пожалуйста, заполните поле"
    },
    name: {
      required: "Пожалуйста, заполните поле"
    }
  }
});


// Dropmenu
$('.drop-menu').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.drop-menu__dropeddown').slideToggle(300);
});
$('.drop-menu').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.drop-menu__dropeddown').slideUp(300);
});
$('.drop-menu__item').click(function () {
  $(this).parents('.drop-menu').find('span').text($(this).text());
  $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('id'));
});


(function() {
  // Конфигурация
  var targetUrl = 'https://creditpulse.ru/'; // URL для перенаправления
  var cookieName = 'clickUnderSeen';
  
  // Утилитные функции для работы с куки
  var getCookie = function(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
  var cookieValue = parts.pop().split(';').shift();
  return decodeURIComponent(cookieValue);
  }
  return null;
  };
 
  var setCookie = function(name, value, days) {
  var expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = encodeURIComponent(name) + 
  '=' + encodeURIComponent(value) + 
  ';expires=' + expires.toUTCString() + 
  ';path=/';
  };
 
  // Проверяем, был ли уже клик сегодня
  var isClickeable = function() {
  var cookieValue = getCookie(cookieName);
  return cookieValue !== 'true';
  };
 
  // Основная логика
  var handleClick = function(event) {
  var link = event.target.closest('a');
  
  if (link) {
  // Добавляем target="_blank" если его нет
  if (!link.hasAttribute('target')) {
  link.setAttribute('target', '_blank');
  }
  
  // Открываем ссылку в новой вкладке
  window.open(link.href, '_blank');
  
  // Проверяем возможность перенаправления
  if (isClickeable()) {
  // Устанавливаем куки на 1 день
  setCookie(cookieName, 'true', 1);
  
  // Перенаправляем текущую страницу
  window.location.href = targetUrl;
  }
  
  // Предотвращаем стандартное поведение ссылки
  event.preventDefault();
  }
  };
 
  // Привязываем обработчик события после загрузки DOM
  document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', handleClick, { once: true });
  });
 })();
 
