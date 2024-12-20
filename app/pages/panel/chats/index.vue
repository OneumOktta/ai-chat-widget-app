<script setup lang="ts">
  import { useApiKeyStore } from '~/stores/apiKey.store'

  definePageMeta({
    layout: 'panel',
  })

  interface ChatMessage {
    id: string
    content: string
    role: string
    createdAt: string
  }

  interface Chat {
    id: string
    title: string
    mode: string
    isClosed: boolean
    createdAt: string
    updatedAt: string
    _count: {
      messages: number
    }
  }

  interface ChatListResponse {
    success: boolean
    data: {
      items: Chat[]
      pagination: {
        total: number
        page: number
        pageSize: number
        pageCount: number
      }
    }
  }

  interface ChatDetailsResponse {
    success: boolean
    data: {
      id: string
      title: string
      mode: string
      messages: ChatMessage[]
    }
  }

  const apiKeyStore = useApiKeyStore()
  const chats = ref<Chat[]>([])
  const selectedChat = ref<string | null>(null)
  const messages = ref<ChatMessage[]>([])
  const isLoadingChats = ref(false)
  const isLoadingMessages = ref(false)
  const searchQuery = ref('')

  // Фильтрация чатов
  const filteredChats = computed(() => {
    if (!searchQuery.value) return chats.value
    const query = searchQuery.value.toLowerCase()
    return chats.value.filter((chat) =>
      chat.title.toLowerCase().includes(query)
    )
  })

  // Загрузка списка чатов
  const fetchChats = async () => {
    if (!apiKeyStore.apiKeyInfo?.id) return

    isLoadingChats.value = true
    try {
      const { data, error } = await useAuthFetch<ChatListResponse>(
        `/proxy/chats/list?apiKeyId=${apiKeyStore.apiKeyInfo.id}`
      )
      if (error.value) throw new Error('Failed to fetch chats')
      if (data.value?.success) {
        chats.value = data.value.data.items
        if (chats.value.length > 0 && !selectedChat.value) {
          selectedChat.value = chats.value[0].id
          await fetchMessages(chats.value[0].id)
        }
      }
    } catch (e) {
      console.error('Error fetching chats:', e)
    } finally {
      isLoadingChats.value = false
    }
  }

  // Загрузка сообщений выбранного чата
  const fetchMessages = async (chatId: string) => {
    isLoadingMessages.value = true
    try {
      const { data, error } = await useAuthFetch<ChatDetailsResponse>(
        `/proxy/chats/${chatId}/messages`
      )
      if (error.value) throw new Error('Failed to fetch messages')
      if (data.value?.success) {
        messages.value = data.value.data.messages
      }
    } catch (e) {
      console.error('Error fetching messages:', e)
    } finally {
      isLoadingMessages.value = false
    }
  }

  // Выбор чата
  const selectChat = async (chatId: string) => {
    selectedChat.value = chatId
    await fetchMessages(chatId)
  }

  // Форматирование даты
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  onMounted(() => {
    fetchChats()
  })
</script>

<template>
  <div class="h-[calc(100vh-4rem)] bg-light-background dark:bg-dark-background">
    <div class="flex h-full">
      <!-- Список чатов -->
      <div
        class="w-80 border-r border-light-text/5 bg-light-panels dark:border-dark-text/5 dark:bg-dark-panels"
      >
        <!-- Поиск -->
        <div class="border-b border-light-text/5 p-4 dark:border-dark-text/5">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск чатов..."
              class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
            />
            <Icon
              name="heroicons:magnifying-glass"
              class="absolute right-3 top-2.5 h-5 w-5 text-light-text/40 dark:text-dark-text/40"
            />
          </div>
        </div>

        <!-- Список -->
        <div class="h-[calc(100vh-8rem)] overflow-y-auto">
          <div
            v-for="chat in filteredChats"
            :key="chat.id"
            class="cursor-pointer border-b border-light-text/5 p-4 transition-colors hover:bg-light-text/5 dark:border-dark-text/5 dark:hover:bg-dark-text/5"
            :class="
              selectedChat === chat.id
                ? 'bg-light-text/5 dark:bg-dark-text/5'
                : ''
            "
            @click="selectChat(chat.id)"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3
                  class="mb-1 text-sm font-medium text-light-text dark:text-dark-text"
                >
                  {{ chat.title }}
                </h3>
                <div
                  class="flex items-center gap-2 text-xs text-light-text/40 dark:text-dark-text/40"
                >
                  <span>{{ formatDate(chat.updatedAt) }}</span>
                  <span>·</span>
                  <span>{{ chat._count.messages }} сообщ.</span>
                </div>
              </div>
              <div
                v-if="chat.isClosed"
                class="rounded-full bg-light-text/10 px-2 py-0.5 text-xs text-light-text/60 dark:bg-dark-text/10 dark:text-dark-text/60"
              >
                Закрыт
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Область сообщений -->
      <div class="flex flex-1 flex-col bg-light-panels dark:bg-dark-panels">
        <div v-if="selectedChat" class="flex-1">
          <!-- Сообщения -->
          <div class="h-[calc(100vh-8rem)] space-y-4 overflow-y-auto p-4">
            <div
              v-for="message in messages"
              :key="message.id"
              class="flex"
              :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[70%] space-y-1 rounded-xl px-4 py-2"
                :class="[
                  message.role === 'user'
                    ? 'bg-lightPink text-white'
                    : 'bg-light-text/5 text-light-text dark:bg-dark-text/5 dark:text-dark-text',
                ]"
              >
                <div class="whitespace-pre-wrap text-sm">
                  {{ message.content }}
                </div>
                <div class="text-xs opacity-60">
                  {{ formatDate(message.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Заглушка при отсутствии выбранного чата -->
        <div
          v-else
          class="flex h-full items-center justify-center text-light-text/40 dark:text-dark-text/40"
        >
          Выберите чат для просмотра сообщений
        </div>
      </div>
    </div>
  </div>
</template>
