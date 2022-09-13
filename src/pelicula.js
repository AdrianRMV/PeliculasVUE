import { createApp } from 'vue';
import './style.css';
import Single_movie from './Pelicula.vue';


const pagePelicula = createApp(Single_movie);
pagePelicula.mount('#app');
