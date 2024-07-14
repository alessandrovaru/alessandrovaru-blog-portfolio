export default function manifest() {
  return {
    name: 'Alessandrovaru Blog Portfolio',
    short_name: 'Alessandrovaru',
    description: 'Web portfolio and blog of Alessandro Varuzza',
    start_url: '/',
    display: 'standalone',
    background_color: '#e9e9e9 ',
    theme_color: '#e9e9e9',
    icons: [
      {
        src: '/public/mandala.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}