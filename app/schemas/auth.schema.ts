import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: 'Имя пользователя обязательно для заполнения',
      })
      .min(2, 'Имя пользователя должно содержать минимум 2 символа'),
    email: z
      .string({
        required_error: 'Email обязателен для заполнения',
      })
      .email('Введите корректный email'),
    password: z
      .string({
        required_error: 'Пароль обязателен для заполнения',
      })
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    passwordConfirm: z.string({
      required_error: 'Подтвердите пароль',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Па��оли не совпадают',
    path: ['passwordConfirm'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

export const translateError = (message?: string): string => {
  if (!message) return 'Произошла ошибка'

  switch (message) {
    // Ошибки аутентификации
    case 'Invalid credentials':
      return 'Неверный email или пароль'
    case 'Account is not activated':
      return 'Аккаунт не активирован'

    // Ошибки регистрации
    case 'User with this email already exists':
      return 'Пользователь с таким email уже существует'
    case 'User not found':
      return 'Пользователь не найден'

    default:
      return message
  }
}

export const resetPasswordSchema = z.object({
  newPassword: z
    .string({
      required_error: 'Пароль обязателен для заполнения',
    })
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
  passwordConfirm: z.string({
    required_error: 'Подтвердите пароль',
  }),
})
