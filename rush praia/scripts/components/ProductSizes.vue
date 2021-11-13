<template>
  <div class="sizes">
    <small class="sizes__label">{{ label }}</small>
    <div class="sizes__items">
      <div
        :key="size.Value"
        v-for="(size, index) in sizes"
        class="sizes__items--item">
        <input
          type="radio"
          :name="productPath"
          :value="size.PropertyPath"
          @change="productSizeChanged()"
          :id="customFieldID(productPath, size.Text)" />
        <label :for="customFieldID(productPath, size.Text)">
          {{ size.Text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductSizes",

    props: {
      label: {
        type: String,
        default: "Tamanho"
      },

      sizeList: {
        type: Object,
        required: true
      },

      productPath: {
        type: String,
        required: true
      }
    },

    mounted () {
      console.log(this.sizes);
    },

    methods: {
      customFieldID (name, index) {
        return `${name}-[${index}]`;
      }
    },

    computed: {
      sizes () {
        const { sizeList } = this;

        return sizeList.Values;
      }
    }
  }
</script>

<style scoped lang="scss">
  .sizes {
    padding: 4px 0;

    &__items {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;

      &--item {
        margin: 4px;
        width: 30px;
        height: 30px;
        flex-basis: 30px;
        display: inline-block;

        label {
          color: #000;
          width: 100%;
          height: 100%;
          cursor: pointer;
          border-radius: 50%;
          border: solid 1px #000;
          font: 400 .75rem Roboto, sans-serif;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        input[type="radio"] {
          display: none;

          &:checked + label {
            font-weight: 700;
            border-width: 4px;
            border-style: double;
            //background-color: yellow;
          }
        }
      }
    }

    &__label {
      color: #000;
      text-transform: uppercase;
      font: 400 .8125rem "Barlow Condensed", sans-serif;
    }
  }
</style>
