import { createApp } from 'vue';
import './style.css';
import Single_movie from './Pelicula.vue';


// Sweet alerts
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pagePelicula = createApp(Single_movie);
pagePelicula.use(VueSweetalert2);
pagePelicula.mount('#app');
