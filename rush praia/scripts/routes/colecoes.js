import $ from "jquery";
import "slick-carousel";
//import Vue from "vue";

export default {
  init() {
    console.log('colecoes.js');

    $('.singlecategory .wd-content ul.list').slick({
      dots: false,
      arrows: true,
      slidesToShow: 3,
      infinite: true,
      variableWidth: true,
      swipeToSlide: true,

      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }]
    });
  },

  finalize() {
    // JavaScript to be fired after page specific JS is fired
  },
};
