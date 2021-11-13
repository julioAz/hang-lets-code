<template>
  <div class="product">
    <h2 class="product__title">{{ productName }}</h2>
    <div class="product__price">
      <span class="product__price--discount" v-if="mustShowPrice && hasDiscount && !hasNoStock">
        {{ product.SalesPriceDiscount | money }}
      </span>

      <span class="product__price--current" v-if="mustShowPrice && !hasNoStock">
        {{ product.ListPrice | money }}
      </span>

      <span class="product__price--consult" v-if="!mustShowPrice && !hasNoStock">
        Sob consulta
      </span>

      <span class="product__price--nostock" v-if="hasNoStock">
        Produto indisponível
      </span>
    </div>

    <slot></slot>
  </div>
</template>

<script>
  import { money } from "./shared/vueFilters";

  export default {
    name: "ProductInfo",

    props: {
      product: {
        type: Object,
        required: true
      },

      mustShowPrice: {
        type: Boolean,
        default: false
      },

      balance: {
        type: Number,
        required: true
      }
    },

    filters: {
      money
    },

    computed: {
      productName () {
        return this.product.Name;
      },

      hasDiscount () {
        const {
          salesPrice, salesPriceDiscount
        } = this;

        return salesPriceDiscount < salesPrice;
      },

      salesPrice () {
        return this.product.SalesPrice;
      },

      salesPriceDiscount () {
        return this.product.SalesPriceDiscount;
      },

      hasNoStock () {
        return this.balance < 1;
      }
    }
  }
</script>

<style scoped lang="scss">
  .product {
    position: relative;
    height: calc(100% - 44px);

    &__title {
      margin: 0;
      color: #000;
      font: 400 1.0625rem "Barlow Condensed", sans-serif;
    }
  }
</style>
