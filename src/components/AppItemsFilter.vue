<template>
  <div class="filter__wrapper">
    <div class="filter__form filter-form">
      <div class="filter-form__item filter-item">
        <label for="price" class="filter-item__lable">Сортировать по:</label>
        <select name="" id="price" class="filter-item__select filter-select" v-model="filterPrice">
          <option value="" disabled hidden>Цена по возрастанию</option>
          <option value="up" class="filter-select__option">Цена по возрастанию</option>
          <option value="down" class="filter-select__option">Цена по убыванию</option>
        </select>
      </div>
      <div class="filter-form__item filter-item">
        <label for="material" class="filter-item__lable">Материал:</label>
        <select name="" id="material" class="filter-item__select filter-select" v-model="material"
                v-if="materials.filterItemsArray">
          <option value="" disabled hidden>{{materials.filterItemsArray[0].name}}</option>
          <option :value="item.id" class="filter-select__option" v-for="item in materials.filterItemsArray"
                  :key="item.id">{{item.name}}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useFilterStore } from '../store/FilterStore'
import { useProductStore } from '../store/ProductStore'

export default {

  setup (_, { emit }) {
    const materials = useFilterStore()
    const product = useProductStore()
    const material = ref('')
    const filterPrice = ref('')
    materials.getFilterItemsFromJson()
    if (materials.filterItemsArray) {
      watch([filterPrice, material], values => {
        product.sortProducts({
          price: values[0],
          material: values[1]
        })
      })
    }

    return {
      materials,
      material,
      filterPrice,
      product
    }
  }

}
</script>

<style scoped>

</style>
