import $ from "jquery";
require('slick-carousel');
import "slick-carousel";
import Vue from "vue";

import { productPatternSlide } from "./common";

import Component from "../components/ProductList";

import "@fancyapps/fancybox/dist/jquery.fancybox.min.css";

export default {
    init() {
      console.log('product.js');

      productPatternSlide($('.vitrine.similares .wd-content ul.list'));
      productPatternSlide($('.vitrine.quemviu .wd-content ul.list'));

      const miniaturas = $('.miniaturas .wd-product-media-selector ul li.image');

      miniaturas.on('click', function (e) {
        e.preventDefault();

        $(this).addClass('selected');

        miniaturas.not(this).removeClass('selected');

        const selectedImage = wd24_MediaSelectorDS[miniaturas.index($(this))];

        $('.mediasproduct .wd-product-medias .wd-product-medias-displayer .zoom .image, .zoom .ezZoom-container .ezZoom-big').attr(
          'src', selectedImage.mediaPath
        );
      });
    },

    finalize() {
      // JavaScript to be fired after page specific JS is fired

      $('.row.variacoes').each(function (e) {
        $('.variation-group.first .options [type="radio"]:eq(0)').trigger('click');
      });

      if (document.querySelector('#prodss')) {
        new Vue({
          name: "ProductList",
          render: h => h(Component)
        }).$mount(document.getElementById("prodss"));
      }
    },
};

