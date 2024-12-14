<script setup lang="ts">
  interface Props {
    cols?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    cols: 1,
  })

  const colSpanClass = computed(() => {
    const spans = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
    }
    return spans[props.cols as keyof typeof spans] || 'col-span-1'
  })
</script>

<template>
  <div
    class="rounded-2xl bg-light-panels p-6 dark:bg-dark-panels"
    :class="colSpanClass"
  >
    <slot />
  </div>
</template>
