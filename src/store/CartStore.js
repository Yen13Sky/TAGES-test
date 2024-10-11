import { defineStore } from 'pinia'
import { useProductStore } from '../store/ProductStore'
import { ref, computed, watch } from '@vue/reactivity'

export const useCartStore = defineStore('CartStore', () => {
  const productStore = useProductStore()
  const productArr = computed(() => productStore.productsItems)
  const cartArr = ref([])
  const cartInLocalStorage = localStorage.getItem('cartArr')
  if (cartInLocalStorage) {
    console.log(cartArr.value)
    cartArr.value = JSON.parse(cartInLocalStorage)
  }
  const addToCart = id => {
    const find = ref([])
    const product = productArr.value.filter(item => item.id === id)
    if (cartArr.value.length === 0) {
      cartArr.value.push(product[0])
      cartArr.value[0].counter = 1
    } else {
      const findId = cartArr.value.find(item => item.id === id)
      for (let i = 0; i < cartArr.value.length; i++) {
        if (typeof findId !== 'undefined') {
          find.value.push(findId)
        }
      }
      if (find.value.length < 1) {
        product[0].counter = 1
        cartArr.value.push(product[0])
      } else {
        const num = ref(product[0].counter + 1)
        product[0].counter = num.value
      }
    }
  }
  const deleteCartItem = (index) => {
    cartArr.value.splice(index, 1)
  }
  watch(() => cartArr.value, (state) => {
    localStorage.setItem('cartArr', JSON.stringify(state))
  }, { deep: true })

  return {
    cartArr,
    addToCart,
    deleteCartItem

  }
})
