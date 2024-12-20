<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    title: String,
    options: Array,
  })
  const isOpen = ref(false) // Открытие/закрытие списка
  const selectedOption = ref(props.options[0]) // По умолчанию первый вариант
  function selectOption(option) {
    selectedOption.value = option
    isOpen.value = false
  }
</script>

<template>
  <div class="relative inline-block w-[400px]">
    <!-- Кнопка -->
    <button
      class="flex w-full items-center justify-between gap-2 rounded-xl border border-purple-300 bg-light-panels px-4 py-2 hover:border-[#3F00A2] hover:shadow focus:outline-none dark:bg-dark-panels"
      @click="isOpen = !isOpen"
    >
      <span>{{ title }}: {{ selectedOption }}</span>
      <span :class="{ 'rotate-180': isOpen }" class="transition-transform">
        <Icon name="heroicons:chevron-down" class="h-6 w-6" />
      </span>
    </button>

    <!-- Выпадающий список -->
    <div
      v-if="isOpen"
      class="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-purple-300 bg-light-panels shadow-lg hover:border-[#3F00A2] dark:bg-dark-panels"
    >
      <ul>
        <li
          v-for="option in options"
          :key="option"
          class="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100"
          @click="selectOption(option)"
        >
          <span>{{ option }}</span>
          <input
            type="radio"
            :checked="selectedOption === option"
            class="form-radio mr-2 text-purple-500"
            readonly
          />
        </li>
      </ul>
    </div>
  </div>
</template>
