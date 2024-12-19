export interface Notification {
  id: number
  text: string
  date: string
  isNew: boolean
}

export const groupedNotifications = {
  today: [
    {
      id: 1,
      text: 'Плановые технические работы 25 марта',
      date: '14:30',
      isNew: true,
    },
    {
      id: 2,
      text: 'Достигнут лимит токенов за день',
      date: '11:15',
      isNew: true,
    },
  ],
  yesterday: [
    {
      id: 3,
      text: 'Успешная интеграция с Telegram',
      date: '18:45',
      isNew: false,
    },
    {
      id: 4,
      text: 'Обновление системы до версии 2.4.0',
      date: '12:20',
      isNew: false,
    },
  ],
  week: [
    {
      id: 5,
      text: 'Новый пользователь присоединился к команде',
      date: 'На этой неделе',
      isNew: false,
    },
    {
      id: 6,
      text: 'Изменения в политике конфиденциальности',
      date: 'На этой неделе',
      isNew: false,
    },
  ],
}
