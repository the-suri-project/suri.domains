import { Directive, nextTick } from 'vue';

export const FixedHeightDirective: Directive = {
    mounted(el) {
        nextTick(() => {
            el.style.height = el.getBoundingClientRect().height + 'px';
        });
    },
};
