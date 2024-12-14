<script setup lang="ts">
  import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <div
    class="relative overflow-hidden bg-light-background font-ttnorms text-light-text dark:bg-dark-background dark:text-dark-text"
  >
    <div
      class="animate-float fixed -right-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-primary-gradient opacity-30 blur-[120px]"
    />
    <div
      class="animate-float fixed -bottom-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary-gradient-alt opacity-30 blur-[120px]"
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
