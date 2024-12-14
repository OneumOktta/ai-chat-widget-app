export interface ApiKeyStatistics {
  tokenUsed: number
  totalChatsStarted: number
  totalMessagesSent: number
  requestsCount: number
  messages: {
    bot: number
    human: number
    consultant: number
  }
  performance: {
    totalResponseTime: number
    responseCount: number
    averageResponseTime: number
  }
  chats: {
    completed: number
    averageDuration: number
    shortestDuration: number
    longestDuration: number
  }
  activity: {
    mostActiveHour: number
    leastActiveHour: number
  }
  updatedAt: string
}

export interface ApiKeyUser {
  id: string
  email: string
  role: string
  name: string
  companyName: string | null
  isActive: boolean
  createdAt: string
}

export interface ApiKeyUsers {
  owner: ApiKeyUser
  managers: ApiKeyUser[]
  totalCount: number
}

export interface ApiKeyInfo {
  id: string
  owner: string
  title: string
  tokenUsed: number
  tokenLimit: number
  isActive: boolean
  createdAt: string
  expiredAt: string
  lastUsedAt: string
  isExpired: boolean
  daysUntilExpiration: number
  botId?: string
}

export interface HourlyStatsData {
  hour: number
  time: string
  tokenUsed: number
  chatsStarted: number
  messagesSent: number
  messagesFromBot: number
  messagesFromUser: number
  requestsCount: number
}

export interface HourlyStats {
  startTime: string
  endTime: string
  hours: HourlyStatsData[]
  totals: {
    tokenUsed: number
    chatsStarted: number
    messagesSent: number
    messagesFromBot: number
    messagesFromUser: number
    requestsCount: number
  }
}

export interface ApiKeyState {
  isLoading: boolean
  error: string | null
  apiKeyInfo: ApiKeyInfo | null
  users: ApiKeyUsers | null
  statistics: ApiKeyStatistics | null
  hourlyStats: HourlyStats | null
}
