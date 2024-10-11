<template>
  <div class="favorites__wrapper container">
    <breadcrumbs>
      <template v-slot:favorites>
        <li class="breadcrumbs-list__item">
          <a href="#" class="breadcrumbs-list__link">Избранное</a>
        </li>
      </template>
    </breadcrumbs>
    <div class="favorites__title main-title"><h1>Избранное</h1></div>
    <div class="favorites__wrapper favorites-item" v-if="favorites.length > 0">
      <h2 class="favorites-item__subtitle subtitle">В избранном: {{ favorites.length }}</h2>
      <div class="favorites-item__row favorites-card" v-for="(product, index) in favorites" :key="product.id">
        <article class="favorites-card__item favorites-card-item">
          <img :src="product.image.url" alt="" class="favorites-card-item__img">
          <div class="favorites-card-item__content card-item-content">
            <p class="card-item-content__name card-name">{{product.name}}</p>
            <p class="card-item-content__old-price old-price" v-if="product.price.old_price">
              {{product.price.old_price}}₽</p>
            <p class="card-item-content__current-price current-price">{{product.price.current_price}}₽</p>
          </div>
          <div class="favorites-card-item__actions card-item-action">
            <div class="card-item-action__checked _icon-circle-checked checked" v-if="getClassCart(product.id)"></div>
            <div class="card-item-action__cart _icon-cart" @click="addToCart(product.id)" v-else></div>
            <div class="card-item-action__delete _icon-delete delete" @click="deleteFavorite(index)"></div>
          </div>
        </article>
      </div>
    </div>

    <div class="favorites__wrapper" v-else>
      <h2 class="favorites__subtitle subtitle">У Вас нет избранных товаров</h2>
      <router-link to="/" class="favorites__btn button">каталог</router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useFavoriteStore } from '../store/FavoritesStore'
import { useCartStore } from '../store/CartStore'
import AppBreadcrumbs from '../components/AppBreadcrumbs'

export default {
  setup () {
    const favoritesStore = useFavoriteStore()
    const favorites = computed(() => favoritesStore.favoriteArr)
    const cartStore = useCartStore()
    const cart = cartStore.cartArr

    function deleteFavorite (id) {
      favoritesStore.deleteFavorite(id)
    }

    function addToCart (id) {
      cartStore.addToCart(id)
    }

    function getClassCart (id) {
      const cartArr = cart.find(item => item.id === id)
      if (typeof cartArr !== 'undefined') {
        return true
      }
      return false
    }

    return {
      favorites,
      deleteFavorite,
      addToCart,
      getClassCart
    }
  },
  components: {
    breadcrumbs: AppBreadcrumbs
  }
}
</script>

<style scoped>

</style>
