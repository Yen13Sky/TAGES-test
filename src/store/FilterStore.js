import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('FilterStore', () => {
  const filterItemsArray = ref(null)
  const getFilterItemsFromJson = async () => {
    try {
      const response = await fetch('http://localhost:8080/data/materials.json')
      const data = await response.json()
      filterItemsArray.value = data
    } catch (error) {
      console.log(error)
    }
  }
  return {
    filterItemsArray,
    getFilterItemsFromJson

  }
})
