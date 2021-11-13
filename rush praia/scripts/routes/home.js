import $ from "jquery";
import "slick-carousel";
import { productPatternSlide } from "./common";

export default {
  init() {
    console.log("Home: You are here");

    $('.biquinis-maios__body .maitab ul.list').on('init', function() {
      // hide second tab after slick load
      setTimeout(() => {
        $('.biquinis-maios__body .maitab').removeClass('visibletab');
      }, 1000);
    });

    $('#cardlist_colecoes > [class*="group_0_"]').slick({
      dots: !1,
      arrows: !0,
      speed: 600,
      autoplay: !0,
      lazyLoad: false,
      slidesToShow: 4,
      infinite: !0,
      swipeToSlide: !0,
      variableWidth: !0,
      prevArrow: $('.colecoes__slidebox-arrowleft'),
      nextArrow: $('.colecoes__slidebox-arrowright'),

      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: !1,
          slidesToShow: 2,
          variableWidth: !0,
        }
      }]
    });

    document.querySelector('.mosaico-1 [class*="group_"]').insertAdjacentHTML(
      'beforeend',
      `
          <div class="navigation">
            <div class="navigation__arrow-left"></div>
            <div class="navigation__dots"></div>
            <div class="navigation__arrow-right"></div>
          </div>
        `
    );

    // captura os banners do mosaico-1 para exibição em slider
    $('.mosaico-1 .wd-marketing-banner').slick({
      dots: true,
      arrows: true,
      autoplay: true,
      infinite: true,
      swipeToSlide: 1,
      slidesToShow: 1,
      autoplaySpeed: 5000,
      dotsClass: 'navigation__dots-list',
      appendDots: $('.mosaico-1 .navigation__dots'),
      prevArrow: $('.mosaico-1 .navigation__arrow-left'),
      nextArrow: $('.mosaico-1 .navigation__arrow-right')
    });

    $('.mosaico-1 .wd-marketing-banner').slick('slickRemove', 0);
  },

  finalize() {
    // JavaScript to be fired after page specific JS is fired
    console.log('fired');

    productPatternSlide($('.biquinis-maios__body .maitab ul.list')); // Maiôs TAB

    productPatternSlide($('.biquinis-maios__body .biqtab ul.list')); // Biquinis TAB

    $('[data-hastab] a').click(function (e) {
      e.preventDefault();

      let tab = e.target, tabValue = null;

      while (tab.tagName !== "DIV" && !tab.classList.contains('col')) {
        tab = tab.parentNode;

        tabValue = tab.tagName === 'A' ? tab.dataset.tab : tabValue;
      }

      if (tabValue) {
        $('[data-hastab] div.col').removeClass('visibletab');

        tab.classList.toggle('visibletab', tab.classList.contains(tabValue));

        $('.biquinis-maios__body [data-hastabview]').each(function () {
          let tabID = this.dataset.hastabview;

          $(this).toggleClass('visibletab', tabID === tabValue);
        });
      }
    });
  },
};
