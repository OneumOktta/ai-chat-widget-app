import { z } from 'zod'

export const orderFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Введите имя')
    .max(50, 'Имя не должно превышать 50 символов'),
  email: z.string().email('Введите корректный email'),
  companyName: z
    .string()
    .min(2, 'Введите название компании')
    .max(100, 'Название компании не должно превышать 100 символов'),
  phone: z
    .string()
    .regex(
      /^\+7|7|8\s?[489][0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/,
      'Некорректный формат телефона'
    )
    .or(z.literal('')),
})

export type OrderFormData = z.infer<typeof orderFormSchema>
