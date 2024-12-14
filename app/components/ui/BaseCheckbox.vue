<script setup lang="ts">
  interface Props {
    modelValue: boolean
    label?: string
    required?: boolean
  }

  defineProps<Props>()
  defineEmits<{
    'update:modelValue': [value: boolean]
  }>()

  const input = ref<HTMLInputElement>()
</script>

<template>
  <label class="flex cursor-pointer select-none items-start gap-3">
    <input
      ref="input"
      :value="modelValue"
      type="checkbox"
      class="h-5 w-5 cursor-pointer rounded border-2 border-light-text/10 accent-lightBlue transition-colors dark:border-dark-text/10"
      style="margin-top: 4px"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <span class="text-lg text-light-text/60 dark:text-dark-text/60">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>
