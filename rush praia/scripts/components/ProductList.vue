<template>
  <div
    class="productsbundle row">
    <div
      v-for="(product, index) in productList"
      class="productsbundle__bundle row col-12"
      :class="{ removed: isProductRemoved(product.SKU) }">

      <div class="productsbundle__bundle--toggle toggle col-12">
        <input
          type="checkbox"
          class="toggle__input"
          v-model="product.checked"
          :id="customElementIdentifier(product.ProductPath)" />
        <label
          class="toggle__label"
          :for="customElementIdentifier(product.ProductPath)">
          Não quero
        </label>
      </div>

      <ProductImage
        :product="product.Name"
        :image="mediaList[index]"
        :baseSource="baseSourceURL" />

      <div class="col col-9">
        <ProductInfo
          :product="product"
          :mustShowPrice="mustShowPrice"
          :balance="product.StockBalance">

          <ProductSizes
            :sizeList="getSizeList(product)"
            :productPath="product.ProductPath" />
        </ProductInfo>
      </div>
    </div>

    <div class="col col-12 productsbundle__bottom">
      <form
        v-on:submit="submitPurchaseForm"
        class="productsbundle__bottom--form form row">
        <div class="form__counter">
          <div class="form__counter--quantity">&minus;</div>
          <input
            type="text"
            :maxlength="2"
            v-model="quantity" />
          <div class="form__counter--quantity">&plus;</div>
        </div>
        <button class="form__submit" type="submit">
          COMPRAR
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import ProductInfo from "./ProductInfo";
  import ProductImage from "./ProductImage";
  import ProductSizes from "./ProductSizes";

  export default {
    name: "ProductList",

    data () {
      return {
        quantity: 1,
        avoidBuyItems: [],
        products: window.product,
        baseSourceURL: "https://d1sv0st90vh661.cloudfront.net"
      }
    },

    components: {
      ProductInfo,
      ProductImage,
      ProductSizes
    },

    watch: {
      quantity (value) {
        const { lowestProductBalanceAvailable } = this;

        if (value > this.lowestProductBalanceAvailable || value < 1) {
          this.quantity = Math.max(1, Math.min(value, lowestProductBalanceAvailable));
        }
      }
    },

    methods: {
      getSizeList (singleProduct) {
        return singleProduct.Options.find( option => option.PropertyName === 'tamanho' );
      },

      submitPurchaseForm (e) {
        e.preventDefault();
      },

      customElementIdentifier (e) {
        return `${e}-remover`;
      },

      isProductRemoved (SKU) {
        return !this.purchaseTokenInfo.find(product => product.SkuID === SKU);
      },

      getProductMediasByPath (path) {
        const { mediaList } = this;

        return mediaList.filter();
      },
    },

    computed: {
      productList () {
        return this.products.Items[0].Items
          .sort((a, b) => b.Name.localeCompare(a.Name));
      },

      mediaGroups () {
        return this.products.MediaGroups;
      },

      mediaList () {
        const { productList, mediaGroups } = this;

        return mediaGroups.filter(media => {
          return productList.some(product => product.ProductPath === media.ProductPath);
        });
      },

      mustShowPrice () {
        return this.products.DisplayPrice === 'Y';
      },

      lowestProductBalanceAvailable () {
        const { purchaseTokenProducts } = this;

        return purchaseTokenProducts
          .map(product => product.StockBalance)
          .sort((a, b) => b - a).pop();
      },

      purchaseTokenProducts () {
        return this.productList.filter(prod => !prod.checked);
      },

      purchaseTokenInfo () {
        const { avoidBuyItems } = this;

        return this.purchaseTokenProducts
          .filter(product => !avoidBuyItems.includes(product.ProductPath))
          .map(product => ({
            Quantity: 1,
            SkuID: product.SKU,
            ProductID: product.ProductID
          }));
      }
    }
  }
</script>

<style scoped lang="scss">
  .productsbundle {
    width: 100%;

    &__bundle {
      width: 100%;
      height: 144px;
      transition: .3s ease-in-out;

      & + & {
        margin: 30px 0 0;

        &:before {
          left: 0;
          top: -5px;
          content: "";
          width: 100%;
          height: 1px;
          position: absolute;
          background-color: #ddd;
        }
      }

      &.removed {
        opacity: .6;
        filter: grayscale(100%);
      }

      &--toggle {
        padding: 12px 0;
        cursor: pointer;
        text-align: right;
        text-transform: uppercase;

        .toggle {
          &__input {
            width: 20px;
            height: 20px;
            accent-color: yellow;
            -webkit-accent-color: yellow;

            &:checked + label {
              text-decoration: none;
            }
          }

          &__label {
            cursor: pointer;
            padding: 8px 6px;
            text-transform: uppercase;
            text-decoration: underline;
            font: 400 1rem 'Barlow Condensed', sans-serif;
          }
        }
      }
    }

    &__bottom {
      padding: 15px;
    }
  }
</style>
