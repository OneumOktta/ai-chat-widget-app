<script setup lang="ts">
  useHead({
    script: [
      {
        src: 'https://chat-api.esoraine.online/widget.js',
        tagPosition: 'bodyClose',
      },
      {
        children:
          "ChatWidget.init({ apiKey: 'sk_trial_ZVT9iBs4vB7rYhJdf_BEkBi0LRFAmdsE' })",
        tagPosition: 'bodyClose',
      },
    ],
  })
</script>

<template>
  <main class="container">
    <ThemeToggle />
    <Header />
    <slot />
    <Prices />
    <OrderForm />
    <Footer />
  </main>
</template>
