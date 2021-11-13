import $ from "jquery";
import "slick-carousel";
//import Vue from "vue";

import { productPatternSlide } from "./common";

export default {
  init() {
    console.log('category.js');

    const anchors = document.querySelectorAll('.singlecategory__title a');

    anchors.forEach(normalizeAnchorText);

    function normalizeAnchorText (element) {
      const href = element.getAttribute('href')
        .replace(/\.+/g, '')
        .replace(/\s+/g, '-');

      element.setAttribute('href', href.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }
  },

  finalize() {
    // JavaScript to be fired after page specific JS is fired

    $('.list.categoryslider').slick({
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 2,
      mobileFirst: true,
      variableWidth: true,
      responsive: [{
        breakpoint: 520,
        settings: {
          arrows: true,
          slidesToShow: 3,
        }
      }]
    });
  },
};
