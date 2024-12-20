<script setup lang="ts">
  import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <div
    class="font-Roboto relative overflow-hidden bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
  >
    <div
      class="animate-float fixed -right-[200px] -top-[200px] h-[450px] w-[360px] rounded-full bg-primary-gradient blur-[150px]"
    />
    <div
      class="animate-float fixed -bottom-[200px] -left-[200px] h-[450px] w-[450px] rounded-full bg-primary-gradient-alt blur-[150px]"
    />
    <div class="relative z-10">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <SpeedInsights />
    </div>
  </div>
</template>

<style>
  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-10px, 10px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
</style>
