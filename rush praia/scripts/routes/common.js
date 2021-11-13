import $ from "jquery";
//import Vue from "vue";
// import Headroom from "headroom.js";


const _getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function productPatternSlide (element, positions) {
  let pos = [4, 3, 2, 1];

  element.slick({
    dots: false,
    arrows: true,
    slidesToShow: pos[0],
    autoplay: false,
    swipeToSlide: true,

    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: pos[1]
      }
    }, {
      breakpoint: 890,
      settings: {
        slidesToShow: pos[2]
      }
    }, {
      breakpoint: 540,
      settings: {
        slidesToShow: pos[3],
        variableWidth: true
      }
    }]
  });
}

export default {
  init() {
    // JavaScript to be fired on all pages
    console.log('common.js');

    const searchBar = $('#header .searchbar');

    $(document).ready(function () {
      const overlay = $('.overlay'),
        sideMenu = $('#header .main-menu'),
        trocaFacil = $('#trocafacil');

      // substitui a class 'far' pela 'fas' no icone user, para que o mesmo tenha preenchimento
      document.querySelectorAll(".icons-resume .fa-user").forEach(user => {
        user.classList.replace(
          'far', 'fas'
        );
      });

      function toggleCustomModal (modal, toggleClass, force) {
        force
          ? modal.toggleClass(toggleClass, force)
          : modal.toggleClass(toggleClass);
      }

      const hamburgerToggleButton = $('#hamburger-toggle');

      function menuOpened () {
        return sideMenu.hasClass('opened');
      }

      function toggleMenu () {
        sideMenu.toggleClass('opened');
      }

      function isOverlayVisible () {
        return overlay.hasClass('visible');
      }

      function toggleOverlay (condition) {
        overlay.toggleClass('visible', condition);
      }

      hamburgerToggleButton.click(function (e) {
        e.stopPropagation();

        toggleMenu();
      });

      overlay.click(function () {
        trocaFacil.hasClass('visible') && toggleCustomModal(trocaFacil, 'visible');

        isOverlayVisible() && toggleOverlay(); // se visível, esconde o overlay
      });

      trocaFacil.find('#trocafacil-closer').click(function () {
        toggleOverlay(false);

        toggleCustomModal(trocaFacil, 'visible', false);
      });

      $('body').on('click', '#footer .trocafacil-footer', function () {
        toggleOverlay(true);

        toggleCustomModal(trocaFacil, 'visible');
      });

      $('#headersearchtoggle').click(function (e) {
        e.preventDefault();

        if (searchBar.hasClass('d-none')) {
          window.scrollTo(0, 0);
        }

        searchBar.toggleClass('d-none');
      });

      $(document).click(function (e) {
        if (!$(e.target).not($('#hamburger-toggle, .overlaymenu, .sidemenucloser, .sidemenucloser__text')).closest('.main-menu').length) {
          sideMenu.removeClass('opened');
        }
      });

      // remove o input hidden do conjunto de slides
      const hiddenInput = document.querySelector(
        '.mosaico-1 .wd-marketing-banner input[type="hidden"]'
      );
      hiddenInput && hiddenInput.parentNode.removeChild(hiddenInput);

      $('.advantages__slider').slick({
        mobileFirst: true,

        dots: false,
        arrows: false,
        infinite: true,
        initialSlide: 0,
        slidesToShow: 1,
        slideToSwap: true,
        variableWidth: true,
        centerMode: true,
        centerPadding: '80px',

        responsive: [{
          breakpoint: 1000,
          settings: 'unslick'
        }]
      });

      productPatternSlide($('.outletProducts ul.list')); // OUTLET Products

      productPatternSlide($('.bestSellerProducts .wd-content ul.list')); // best seller products
    });

  },
  finalize() {
    const sideMenu = $('#header .main-menu');
    // JavaScript to be fired on all pages, after page specific JS is fired

    // atualizar contador do carrinho
    const
      URLMatches = [
        '/carrinho/remover-produto',
        '/carrinho/adicionar-produto',
        '/carrinho/alterar-quantidade'
      ],
      headers = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

    function getBasketItem () {
      const baseURL = `${window.location.origin}/resumo-carrinho`;

      return fetch(baseURL, headers)
        .then(async response => await response.json())
        .catch(error => console.log('ERRO => ', error));
    }

    async function updateBasketMarker () {
      const query = await getBasketItem();

      const carrinhoCount = query.Basket.Items.reduce((acc, cur) =>
        acc + parseInt(cur.Quantity), 0
      );

      $('.cart-count').text(carrinhoCount);
    }

    window.$(document).bind("ajaxComplete", function (e, jqxhr, settings) {
      if (URLMatches.includes(settings.url)) {
        updateBasketMarker();
      }
    });

    updateBasketMarker();

    const moveSize = { x: 0, y: 0 };

    document.addEventListener('touchstart', function (e) {
      const xStart = e.touches[0].clientX || e.touches[0].pageX,
            yStart = e.touches[0].clientY || e.touches[0].pageY;

      [moveSize.x, moveSize.y] = [xStart, yStart];
    });

    document.addEventListener('touchend', function (e) {
      const xEnd = e.changedTouches[0].clientX || e.changedTouches[0].pageX,
            yEnd = e.changedTouches[0].clientY || e.changedTouches[0].pageY;

      if (Math.abs(xEnd - moveSize.x) > Math.abs(yEnd - moveSize.y)) {
        // horizontal move
        if (xEnd < moveSize.x && sideMenu.hasClass('opened')) {
          // from right to left
          sideMenu.removeClass('opened');
        }
      }
    });
  },
};
