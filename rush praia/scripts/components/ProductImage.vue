<template>
  <figure class="col col-3 productsbundle__photo">
    <img
      :alt="product"
      :src="imagePath"
      class="productsbundle__photo--image" />
  </figure>
</template>

<script>
  export default {
    name: "ProductImage",

    props: {
      // image: {
      //   type: Object,
      //   required: true
      // },
      image: {
        type: Array,
        required: true
      },

      product: {
        type: String,
        required: true
      },

      baseSource: {
        type: String,
        required: true,
        default: 'https://d1sv0st90vh661.cloudfront.net'
      }
    },

    computed: {
      imagePath () {
        const { baseSource } = this;

        const sourceImage = this.image.Medium || this.image.Small || this.image.Thumbnail;

        return `${baseSource}${sourceImage.MediaPath}`;
      }
    }
  }
</script>

<style scoped lang="scss">
  .productsbundle__photo {
    padding: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    height: calc(100% - 44px);

    &--image {
      width: 100%;
      object-fit: cover;
    }
  }
</style>
