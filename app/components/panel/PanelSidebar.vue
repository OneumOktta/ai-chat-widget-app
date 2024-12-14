<script setup lang="ts">
  import { ref } from 'vue'
  import {
    panelNavigationDown,
    panelNavigationUp,
  } from '~/constants/panel-navigation'
  // Состояние для выпадающего списка "Поддержка"
  const isSupportDropdownOpen = ref(false)
  // Функция для переключения состояния выпадающего списка
  const toggleSupportDropdown = () => {
    isSupportDropdownOpen.value = !isSupportDropdownOpen.value
  }
</script>

<template>
  <aside class="h-full w-[100px]">
    <div class="h-full rounded-2xl bg-light-panels dark:bg-dark-panels">
      <div class="flex h-full flex-col py-4">
        <!-- Верхние ссылки -->
        <nav class="flex flex-none flex-col gap-4">
          <SidebarLink
            v-for="link in panelNavigationUp"
            :key="link.to"
            v-bind="link"
          />
        </nav>

        <div class="flex-1"></div>

        <!-- Нижние ссылки -->
        <nav class="relative flex flex-none flex-col gap-4">
          <SidebarLink
            v-for="link in panelNavigationDown"
            :key="link.to"
            v-bind="link"
            @click="link.to === '/panel/support' && toggleSupportDropdown()"
          />

          <!-- Выпадающий список для "Поддержка" -->
          <div
            v-if="isSupportDropdownOpen"
            class="absolute bottom-0 left-[115px] z-10 h-[276px] w-[448px] rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <ul class="flex h-full flex-col justify-between gap-2">
              <li
                class="w-full px-4 py-2 hover:rounded-lg hover:border hover:border-purple-300 hover:bg-purple-200"
              >
                <NuxtLink
                  to="/panel/support"
                  class="text-lg text-gray-700 dark:text-gray-300"
                >
                  Справочный центр
                </NuxtLink>
              </li>
              <li
                class="w-full px-4 py-2 hover:rounded-lg hover:border hover:border-purple-300 hover:bg-purple-200"
              >
                <a href="#" class="text-lg text-gray-700 dark:text-gray-300">
                  Общение в чате
                </a>
              </li>
              <li
                class="flex w-full justify-between px-4 py-2 hover:rounded-lg hover:border hover:border-purple-300 hover:bg-purple-200"
              >
                <a href="#" class="text-lg text-gray-700 dark:text-gray-300">
                  Виджет поддержки
                </a>
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="slider"></span>
                </label>
              </li>
              <li
                class="w-full px-4 py-2 hover:rounded-lg hover:border hover:border-purple-300 hover:bg-purple-200"
              >
                <a href="#" class="text-lg text-gray-700 dark:text-gray-300">
                  Поделиться отзывом
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </aside>
</template>

<style scoped>
  /* Контейнер переключателя */
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
  }
  /* Скрываем стандартный чекбокс */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  /* Стили для переключателя */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #e5e5e5; /* Серый фон для выключенного состояния */
    border-radius: 25px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
    transition: background 0.4s;
  }
  /* Круглый ползунок */
  .slider::before {
    content: '';
    position: absolute;
    height: 19px;
    width: 19px;
    left: 3px;
    bottom: 3px;
    background: radial-gradient(circle, #ffffff, #d4cbfa, #c3aaf7);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(190, 160, 255, 0.6); /* Свечение вокруг ползунка */
    transition:
      transform 0.4s,
      box-shadow 0.4s;
  }
  /* Состояние "включено" */
  input:checked + .slider {
    background: linear-gradient(90deg, #a393fc, #cbb2ff); /* Цветной фон */
  }
  input:checked + .slider::before {
    transform: translateX(25px); /* Перемещение вправо */
    background: radial-gradient(
      circle,
      #ffffff,
      #cbb2ff,
      #a393fc
    ); /* Цветной градиент */
    box-shadow: 0 0 20px rgba(140, 110, 240, 0.8); /* Цветное свечение */
  }
</style>
