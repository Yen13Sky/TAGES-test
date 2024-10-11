<template>
  <ul class="breadcrumbs__list breadcrumbs-list">
    <li class="breadcrumbs-list__item">
      <a href="#" class="breadcrumbs-list__link">Главная</a>
    </li>
    <li class="breadcrumbs-list__item">
      <a href="#" class="breadcrumbs-list__link">Системы хранения</a>
    </li>
    <li class="breadcrumbs-list__item">
      <router-link to="/" class="breadcrumbs-list__link">Комплексы стеллажных систем</router-link>
    </li>
    <slot name="favorites"></slot>
    <slot name="cart"></slot>
  </ul>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
