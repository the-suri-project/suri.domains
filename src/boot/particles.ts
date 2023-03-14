import * as particlesJS from '../lib/particles.js';
import { boot } from 'quasar/wrappers';
import particleConfig from '../assets/particlesjs-config.json';
import particleConfigMobile from '../assets/particlesjs-config-mobile.json';
import { useGlobalStore } from 'stores/global';

declare global {
    interface Window {
        particlesJS: (tag: string, config: any) => void;
    }
}

export default boot(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = particlesJS;
});

export function initParticles(id: string) {
    if (useGlobalStore().isMobile) {
        window.particlesJS(id, particleConfigMobile);
    } else {
        window.particlesJS(id, particleConfig);
    }
}
