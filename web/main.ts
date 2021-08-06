import { createApp } from 'vue';
import { Router as router } from './routes';
import { Store, key } from './store/index';
import App from './App.vue';

import './index.css';

const app = createApp(App);

app.use(Store, key);
app.use(router);

app.mount('#app');
