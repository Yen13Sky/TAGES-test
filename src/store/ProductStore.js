import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('ProductStore', () => {
  const productsArray = ref(null)
  const loading = ref(false)
  const sortItem = ref({})
  const productsItems = ref(null)
  const getProductsFromJson = () => {
    try {
      loading.value = true
      setTimeout(async () => {
        const response = await fetch(process.env.VUE_APP_URL + '/items.json')
        const data = await response.json()
        productsArray.value = data
        productsItems.value = data
        loading.value = false
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }
  const sortProducts = (filterObj) => {
    sortItem.value = filterObj
    if (sortItem.value.price || sortItem.value.material) {
      if (sortItem.value.price === 'up') {
        productsArray.value.sort((a, b) => a.price.current_price - b.price.current_price)
        if (sortItem.value.material) {
          productsItems.value = productsArray.value.filter(item => item.material === +sortItem.value.material)
        }
      } else if (sortItem.value.price === 'down') {
        productsItems.value = productsArray.value.sort((a, b) => b.price.current_price - a.price.current_price)
        if (sortItem.value.material) {
          productsItems.value = productsArray.value.filter(item => item.material === +sortItem.value.material)
        }
      } else if (sortItem.value.material) {
        productsItems.value = productsArray.value.filter(item => item.material === +sortItem.value.material)
      }
    }
  }
  return {
    productsItems,
    productsArray,
    loading,
    getProductsFromJson,
    sortProducts
  }
})
