<script setup lang="ts">
  import { ref } from 'vue'
  import type { PanelLink } from '~/constants/panel-navigation'
  import {
    panelNavigationDown,
    panelNavigationMobile,
    panelNavigationUp,
  } from '~/constants/panel-navigation'
  // Состояние для выпадающего списка "Поддержка"
  const isSupportDropdownOpen = ref(false)
  // Функция для переключения состояния выпадающего списка
  const handleLinkClick = (event: Event, link: PanelLink) => {
    if (link.isDropdown) {
      event.preventDefault()
      isSupportDropdownOpen.value = !isSupportDropdownOpen.value
    }
  }
</script>

<template>
  <aside
    class="fixed bottom-2 left-2 right-2 z-50 h-16 rounded-2xl bg-light-panels dark:bg-dark-panels sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 lg:static lg:h-full lg:w-[100px]"
  >
    <div
      class="flex h-full flex-row justify-around px-2 sm:px-4 md:px-6 lg:flex-col lg:justify-start lg:px-0 lg:py-4"
    >
      <nav class="hidden lg:flex lg:flex-col lg:gap-4">
        <SidebarLink
          v-for="link in panelNavigationUp"
          :key="link.to"
          v-bind="link"
        />
      </nav>

      <nav
        class="flex flex-row items-center justify-between gap-2 sm:gap-4 lg:hidden"
      >
        <SidebarLink
          v-for="link in panelNavigationMobile"
          :key="link.to"
          v-bind="link"
          @click="(e) => handleLinkClick(e, link)"
        />
      </nav>

      <div class="hidden flex-1 lg:block"></div>

      <nav class="hidden lg:flex lg:flex-col lg:gap-4">
        <SidebarLink
          v-for="link in panelNavigationDown"
          :key="link.to"
          v-bind="link"
          @click="(e) => handleLinkClick(e, link)"
        />

        <div
          v-if="isSupportDropdownOpen"
          class="absolute bottom-0 left-[115px] h-[276px] w-[448px] rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
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
  /* Состояниее "включено" */
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
