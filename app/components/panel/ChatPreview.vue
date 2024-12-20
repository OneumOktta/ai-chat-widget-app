<script setup lang="ts">
  interface Props {
    customization: {
      greeting: string
      headerTitle: string
      headerColor: string
      headerTextColor: string
      backgroundColor: string
      userColor: string
      userBorderColor: string
      userTextColor: string
      botColor: string
      botBorderColor: string
      botTextColor: string
    }
  }

  defineProps<Props>()

  const messages = [
    { role: 'bot', content: 'Здравствуйте! Чем могу помочь?', time: '10:00' },
    {
      role: 'user',
      content: 'Добрый день! У меня есть вопрос.',
      time: '10:01',
    },
    {
      role: 'bot',
      content: 'Конечно, я готов помочь. Какой у вас вопрос?',
      time: '10:01',
    },
  ]
</script>

<template>
  <div
    class="flex h-[600px] flex-col overflow-hidden rounded-xl"
    :style="{ backgroundColor: customization.backgroundColor }"
  >
    <!-- Header -->
    <div
      class="flex h-16 items-center justify-center px-6"
      :style="{ backgroundColor: customization.headerColor }"
    >
      <div
        class="text-base font-medium"
        :style="{ color: customization.headerTextColor }"
      >
        {{ customization.headerTitle }}
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 space-y-4 overflow-y-auto p-4">
      <div v-for="(message, idx) in messages" :key="idx" class="space-y-1">
        <div class="flex" :class="message.role === 'user' ? 'justify-end' : ''">
          <div
            class="max-w-[80%] rounded-2xl px-4 py-2"
            :style="
              message.role === 'user'
                ? {
                    backgroundColor: customization.userColor,
                    borderColor: customization.userBorderColor,
                    color: customization.userTextColor,
                  }
                : {
                    backgroundColor: customization.botColor,
                    borderColor: customization.botBorderColor,
                    color: customization.botTextColor,
                  }
            "
          >
            {{ message.content }}
          </div>
        </div>
        <div
          class="text-xs text-light-text/40 dark:text-dark-text/40"
          :class="message.role === 'user' ? 'text-right' : 'text-left'"
        >
          {{ message.time }}
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-light-text/5 p-4 dark:border-dark-text/5">
      <div
        class="flex h-10 items-center rounded-xl border border-light-text/10 bg-transparent px-4 dark:border-dark-text/10"
      >
        <input
          type="text"
          placeholder="Введите сообщение..."
          class="w-full bg-transparent text-sm outline-none"
          disabled
        />
      </div>
    </div>
  </div>
</template>
