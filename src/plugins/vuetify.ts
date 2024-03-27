/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#0ce84f',
          secondary: '#c6f1d3',
          accent: '#dc3140',
          background: '#D3CCD1',
          text: '#000000',
          surface: '#B9B9B9',
        },
      },
      dark: {
        colors: {
          primary: '#37E16A',
          secondary: '#0E391B',
          accent: '#B32B38',
          background: '#1B1919',
          text: '#D3CCD1',
        },
      },
    },
  },
})
