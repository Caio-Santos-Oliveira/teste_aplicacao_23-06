import preset from '@torq/token/preset'
import {safelist} from '@torq/ds/safelist'
 
/** @type {import('tailwindcss').Config} */
export default {
    presets: [preset],
    content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
    safelist,

}