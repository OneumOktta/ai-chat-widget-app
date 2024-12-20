<script setup lang="ts">
  interface Props {
    icon: string
    text: string
    to: string
    roles?: string[] // массив ролей, которым доступна ссылка
  }

  const props = defineProps<Props>()
  const route = useRoute()

  const isActive = computed(() => {
    if (props.to === '/panel') {
      return route.path === '/panel'
    }
    if (props.to === '/panel/support') {
      return route.path.startsWith('/panel/support')
    }
    return route.path.startsWith(props.to)
  })

  // TODO: Добавить проверку роли пользователя
  const userHasAccess = computed(() => true) // временно всегда true
</script>

<template>
  <NuxtLink
    v-if="userHasAccess"
    :to="to"
    class="group relative mx-auto flex h-12 w-12 flex-col items-center justify-center rounded-2xl sm:h-14 sm:w-14 lg:h-[64px] lg:w-[92px] lg:justify-start lg:py-2"
  >
    <div
      class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-lightPink to-lightBlue opacity-0 blur-sm transition-opacity group-hover:opacity-50"
      :class="{ 'opacity-50': isActive }"
    />

    <div
      class="absolute inset-0 rounded-2xl bg-light-panels dark:bg-dark-panels"
    />

    <Icon
      :name="icon"
      class="relative z-10 h-6 w-6 text-light-text transition-colors group-hover:text-lightPink dark:text-dark-text sm:h-7 sm:w-7 lg:mb-1 lg:h-8 lg:w-8"
      :class="{ 'text-lightPink': isActive }"
    />
    <span
      class="relative z-10 hidden text-xs text-light-text dark:text-dark-text lg:block"
    >
      {{ text }}
    </span>
  </NuxtLink>
</template>

<style scoped>
  /* Добавляем стили для активного состояния на мобильных */
  @media (max-width: 1023px) {
    .router-link-active .icon {
      @apply text-lightPink;
    }
  }
</style>
