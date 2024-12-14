import { z } from 'zod'

export const translateError = (message?: string): string => {
  if (!message) return 'Ошибка при отправке ссылки активации'

  switch (message) {
    case 'User not found':
      return 'Пользователь с таким email не найден'
    case 'User already activated':
      return 'Пользователь уже активирован'
    default:
      return message
  }
}

export const resendActivationSchema = z.object({
  email: z
    .string({
      required_error: 'Email обязателен для заполнения',
    })
    .email('Введите корректный email'),
})
