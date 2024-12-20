export interface PanelLink {
  icon: string
  text: string
  to: string
  roles?: string[]
  isDropdown?: boolean
}

export const panelNavigationUp: PanelLink[] = [
  {
    icon: 'lets-icons:shop-light',
    text: 'Главная',
    to: '/panel',
  },
  {
    icon: 'lets-icons:subttasks',
    text: 'Нейросеть',
    to: '/panel/neuronet',
    roles: ['admin', 'business'],
  },
  {
    icon: 'lets-icons:chat-alt-2',
    text: 'Диалоги',
    to: '/panel/chats',
  },
  {
    icon: 'material-symbols-light:graph-5',
    text: 'Интеграции',
    to: '/panel/integrations',
    roles: ['admin', 'business'],
  },
  {
    icon: 'lets-icons:waterfall',
    text: 'Аналитика',
    to: '/panel/analytics',
    roles: ['admin', 'business'],
  },
  // {
  //   icon: 'ri:admin-line',
  //   text: 'Админка',
  //   to: '/panel/administration',
  //   roles: ['admin'],
  // },
]

export const panelNavigationDown: PanelLink[] = [
  {
    icon: 'lets-icons:ring-light',
    text: 'Уведомления',
    to: '/panel/notifications',
  },
  {
    icon: 'lets-icons:headphones-fill-light',
    text: 'Поддержка',
    to: '/panel/support',
    isDropdown: true,
  },
  {
    icon: 'lets-icons:setting-line',
    text: 'Настройки',
    to: '/panel/settings',
  },
]

export const panelNavigationMobile: PanelLink[] = [
  {
    icon: 'lets-icons:shop-light',
    text: 'Главная',
    to: '/panel',
  },
  {
    icon: 'lets-icons:subttasks',
    text: 'Нейросеть',
    to: '/panel/neuronet',
    roles: ['admin', 'business'],
  },
  {
    icon: 'lets-icons:chat-alt-2',
    text: 'Диалоги',
    to: '/panel/chats',
  },
  {
    icon: 'lets-icons:ring-light',
    text: 'Уведомления',
    to: '/panel/notifications',
  },
  {
    icon: 'lets-icons:setting-line',
    text: 'Настройки',
    to: '/panel/settings',
  },
]
