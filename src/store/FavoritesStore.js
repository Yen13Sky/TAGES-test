import { defineStore } from 'pinia'
import { useProductStore } from '../store/ProductStore'
import { ref, computed, watch } from '@vue/reactivity'

export const useFavoriteStore = defineStore('FavoriteStore', () => {
  const productStore = useProductStore()
  const productArr = computed(() => productStore.productsItems)
  const favoriteArr = ref([])
  const favoriteArrInLocalStorage = localStorage.getItem('favoriteArr')

  if (favoriteArrInLocalStorage) {
    favoriteArr.value = JSON.parse(favoriteArrInLocalStorage)
  }
  const addToFavorites = id => {
    const find = ref([])
    const product = productArr.value.filter(item => item.id === id)

    if (favoriteArr.value.length === 0) {
      favoriteArr.value.push(product[0])
    } else {
      for (let i = 0; i < favoriteArr.value.length; i++) {
        const findId = favoriteArr.value.find(item => item.id === id)
        if (typeof findId !== 'undefined') {
          find.value.push(findId)
        }
      }
      if (find.value.length < 1) {
        favoriteArr.value.push(product[0])
      }
    }
  }
  const deleteFavorite = index => {
    favoriteArr.value.splice(index, 1)
  }

  watch(() => favoriteArr.value, (state) => {
    localStorage.setItem('favoriteArr', JSON.stringify(state))
  }, { deep: true })

  return {
    addToFavorites,
    favoriteArr,
    deleteFavorite
  }
})
