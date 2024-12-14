<script setup lang="ts">
  defineProps<{
    to?: string
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
  }>()

  defineEmits<{
    click: []
  }>()
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :type="type || 'button'"
    class="group relative cursor-pointer rounded-2xl bg-gradient-to-r from-lightPink to-lightBlue px-6 py-4 text-dark-text shadow-lg transition-all duration-300 hover:opacity-100 hover:shadow-xl"
    @click="$emit('click')"
  >
    <span class="relative z-10">
      <slot />
    </span>
    <div
      class="absolute -bottom-3 -left-3 -right-3 z-0 h-12 rounded-full bg-gradient-to-r from-lightPink to-lightBlue opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
    />
  </component>
</template>
