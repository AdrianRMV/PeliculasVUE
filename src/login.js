import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Sweet alerts
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const appNew = createApp(App);
appNew.use(VueSweetalert2);
appNew.mount('#app');