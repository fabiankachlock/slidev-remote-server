import { createApp } from 'vue';
import App from './App.vue';
import { Store, key } from './store/index';

const app = createApp(App);

app.use(Store, key);

app.mount('#app');
