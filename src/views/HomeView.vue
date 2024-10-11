<template>
  <div class="home">
    <div class="home__wrapper container">
      <div class="home__items home-item">
        <div class="home-item__header header">
          <div class="header__row header-row">
            <div class="header-row__breadcrumbs breadcrumbs">
              <breadcrumbs></breadcrumbs>
            </div>
            <div class="header-row__actions actions">
              <div class="actions__row">
                <router-link to="/cart" class="actions__cart _icon-cart"></router-link>
                <router-link to="/favorites" class="actions__heart _icon-heart"></router-link>
              </div>
            </div>
          </div>
          <div class="header__title main-title"><h1>Комплексы стеллажных систем</h1></div>
        </div>
        <div class="home-item__loader loader" v-if="productsStore.loading"></div>
        <div class="home-item__wrapper" v-else>
          <div class="home-item__filter filter">
            <items-filter></items-filter>
          </div>
          <div class="home-item__cards cards">
            <item-card></item-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useProductStore } from '../store/ProductStore'
import { onMounted } from 'vue'
import AppBreadcrumbs from '../components/AppBreadcrumbs'
import AppItemsFilter from '../components/AppItemsFilter'
import AppItemCard from '../components/AppItemCard'

export default {
  setup () {
    const productsStore = useProductStore()

    onMounted(async () => {
      await productsStore.getProductsFromJson()
    })
    return {
      productsStore
    }
  },

  components: {
    breadcrumbs: AppBreadcrumbs,
    'items-filter': AppItemsFilter,
    'item-card': AppItemCard
  }

}
</script>

<style scoped>

</style>
