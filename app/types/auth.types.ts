// Основные типы данных пользователя
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  isActive: boolean
  companyName: string | null
  phone: string | null
  telegram: string | null
  apiKeyIds: string[]
}

// Роли пользователей
export type UserRole = 'administrator' | 'business' | 'manager'

// Данные для входа
export interface LoginCredentials {
  email: string
  password: string
}

// Данные для регистрации
export interface RegisterCredentials {
  email: string
  password: string
  passwordConfirm: string
  name: string
}

// Токены аутентификации
export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

// Ответ от сервера при аутентификации
export interface AuthResponse {
  success: boolean
  data: {
    user: User
    tokens: AuthTokens
  }
}

// Ответ от сервера при регистрации
export interface RegisterResponse {
  success: boolean
  data: User
}

// Состояние аутентификации
export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  loading: boolean
  error: string | null
}

// Ошибки аутентификации
export interface AuthError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

// Данные для обновления профиля
export interface UpdateProfileData {
  name?: string
  email?: string
  currentPassword?: string
  newPassword?: string
}

// Данные для сброса пароля
export interface ResetPasswordData {
  email: string
  code: string
  newPassword: string
}

// Добавляем интерфейс для API ключа
export interface ApiKey {
  id: string
  title: string
}

// Обновляем ответ от сервера для /me endpoint
export interface MeResponse {
  success: boolean
  data: {
    user: User
    apiKeys: ApiKey[]
  }
}
