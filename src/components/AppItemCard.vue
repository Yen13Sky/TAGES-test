<template>
  <div class="cards__wrapper">
    <article class="cards__item card-item" v-for="(product) in products" :key="product.id">
      <div class="card-item__img">
        <img :src="product.image.url" alt="card image">
      </div>
      <div class="card-item__footer card-footer">
        <div class="card-footer__code" v-if="product.code"><p>{{ product.code }}</p></div>
        <div class="card-footer__name card-name" :class="{'card-non-code': !product.code}"><p>{{ product.name }}</p></div>
        <div class="card-footer__row">
          <div class="card-footer__prices footer-price">
            <div class="footer-price__old old-price" v-if="product.price.old_price"><p>{{product.price.old_price}}₽</p>
            </div>
            <div class="footer-price__current"><p>{{product.price.current_price}}₽</p></div>
          </div>
          <div class="card-footer__icons footer-icon">
            <div class="footer-icon__checked _icon-circle-checked checked" v-if="getClassCart(product.id) && product.code"></div>
            <div class="footer-icon__cart _icon-cart cart" @click="addToCart(product.id)" v-else-if="product.code"></div>
            <div class="footer-icon__heart _icon-heart heart" :class="{'card-heart-active': getClassHeart(product.id)}"
                 @click="addToFavorites(product.id)"></div>
          </div>
        </div>
      </div>
      <div class="card-item__discount" v-if="product.price.old_price"><p>Скидка</p></div>
    </article>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useProductStore } from '../store/ProductStore'
import { useFavoriteStore } from '../store/FavoritesStore'
import { useCartStore } from '../store/CartStore'

export default {
  setup () {
    const productStore = useProductStore()
    const products = computed(() => productStore.productsItems)
    const favoritesStore = useFavoriteStore()
    const favorites = favoritesStore.favoriteArr
    const cartStore = useCartStore()
    const cart = cartStore.cartArr
    const isLike = ref(false)

    function addToCart (id) {
      cartStore.addToCart(id)
    }

    function addToFavorites (id) {
      favoritesStore.addToFavorites(id)
    }

    function getClassHeart (productId) {
      const favArr = favorites.find(item => item.id === productId)
      if (typeof favArr !== 'undefined') {
        return true
      }
      return false
    }

    function getClassCart (id) {
      const cartArr = cart.find(item => item.id === id)
      if (typeof cartArr !== 'undefined') {
        return true
      }
      return false
    }

    return {
      productStore,
      products,
      addToCart,
      addToFavorites,
      favorites,
      isLike,
      getClassHeart,
      getClassCart
    }
  }

}
</script>

<style scoped lang="scss">

</style>
