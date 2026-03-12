import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  //integrations: [tailwind()],
  output: 'static',

  // 🔁 replace with your GitHub username
  site: 'https://jamesruntas.github.io',

  vite: {
    plugins: [tailwindcss()]
  }
});