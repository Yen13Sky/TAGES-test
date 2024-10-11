<template>
  <div class="cart__row container">
    <breadcrumbs>
      <template v-slot:cart>
        <li class="breadcrumbs-list__item">
          <a href="#" class="breadcrumbs-list__link">Корзина</a>
        </li>
      </template>
    </breadcrumbs>
    <div class="cart__title main-title"><h1>Корзина</h1></div>
    <div class="cart__wrapper cart-items" v-if="cart.length > 0">
      <h2 class="cart-items__subtitle subtitle">В корзине: {{ cart.length}}</h2>
      <article class="cart-items__row cart-product-card" v-for="(item, index) in cart" :key="item.id">
        <img class="cart-product-card__img" :src="item.image.url" alt="cart product image">
        <div class="cart-product-card__content cart-content">
          <div class="cart-content__name">{{ item.name }}</div>
          <div class="cart-content__old-price old-price" v-if="item.price.old_price">{{item.price.old_price}}₽</div>
          <div class="cart-content__current-price">{{ item.price.current_price }}₽</div>
          <div class="cart-content__amount">Общее количество: {{ item.counter}}</div>
          <div class="cart-content__cart-sum">Общая стоимость: {{ item.price.current_price * item.counter}}₽</div>
        </div>
        <div class="cart-product-card__actions cart-action">
          <div class="cart-action__favorites _icon-heart heart" :class="{'card-heart-active': getClassHeart(item.id)}"
               @click="addToFavorites(item.id)"></div>
          <div class="cart-action__delete _icon-delete delete" @click="deleteCartItem(index)"></div>
        </div>
      </article>
    </div>
    <div class="cart__wrapper" v-else>
      <div class="cart__subtitle subtitle">Корзина пуста :(</div>
      <router-link to="/" class="cart__button button">Каталог</router-link>
    </div>
  </div>
</template>

<script>
import AppBreadcrumbs from '../components/AppBreadcrumbs'
import { useCartStore } from '../store/CartStore'
import { useFavoriteStore } from '../store/FavoritesStore'

export default {
  setup () {
    const cartStore = useCartStore()
    const favoritesStore = useFavoriteStore()
    const cart = cartStore.cartArr
    const favorites = favoritesStore.favoriteArr

    function deleteCartItem (index) {
      cartStore.deleteCartItem(index)
    }

    function addToFavorites (id) {
      favoritesStore.addToFavorites(id)
    }

    function getClassHeart (id) {
      const favArr = favorites.find(item => item.id === id)
      if (typeof favArr !== 'undefined') {
        return true
      }
      return false
    }

    return {
      cart,
      deleteCartItem,
      addToFavorites,
      getClassHeart
    }
  },
  components: {
    breadcrumbs: AppBreadcrumbs
  }

}
</script>

<style scoped>

</style>
