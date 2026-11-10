export default function manifest() {
  return {
    name: 'Alessandrovaru',
    short_name: 'Alessandrovaru',
    description: 'Portafolio de arte digital, fotografía y desarrollo de Alessandro Varuzza',
    start_url: '/',
    display: 'standalone',
    background_color: '#e9e9e9',
    theme_color: '#e9e9e9',
    icons: [
      {
        src: '/mandala.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}