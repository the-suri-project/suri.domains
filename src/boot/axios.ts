import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { API_URL } from 'src/constant';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

const api = axios.create({ baseURL: API_URL });

export default boot(({ app }) => {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$api = api;
});

export { api };
