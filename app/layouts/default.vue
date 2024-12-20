<script setup lang="ts">
  // useHead({
  //   script: [
  //     {
  //       src: 'https://chat-api.esoraine.online/widget.js',
  //       tagPosition: 'bodyClose',
  //     },
  //     {
  //       children:
  //         "ChatWidget.init({ apiKey: 'sk_trial_ZVT9iBs4vB7rYhJdf_BEkBi0LRFAmdsE' })",
  //       tagPosition: 'bodyClose',
  //     },
  //   ],
  // })
</script>

<template>
  <main class="flex min-h-screen p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6">
    <ThemeToggle />
    <div
      class="flex w-full flex-col rounded-lg bg-light-panels dark:bg-dark-panels sm:rounded-xl md:rounded-2xl lg:rounded-3xl xl:rounded-[32px]"
    >
      <NuxtLink
        to="/"
        class="ml-3 mt-3 inline-block h-16 sm:ml-4 sm:mt-4 sm:h-20 md:ml-6 md:mt-5 md:h-24 lg:ml-7 lg:mt-6 lg:h-28 xl:ml-8 xl:mt-7 xl:h-32"
      >
        <NuxtImg
          src="type=light.svg"
          alt="Logo"
          class="block h-full w-auto dark:hidden"
        />
        <NuxtImg
          src="type=dark.svg"
          alt="Logo"
          class="hidden h-full w-auto dark:block"
        />
      </NuxtLink>
      <div
        class="flex flex-1 items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10"
      >
        <slot />
      </div>
    </div>
  </main>
</template>
