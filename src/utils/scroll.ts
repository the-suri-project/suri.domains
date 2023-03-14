import { scroll } from 'quasar';
import getScrollTarget = scroll.getScrollTarget;
import setVerticalScrollPosition = scroll.setVerticalScrollPosition;

export function scrollToElement(el: HTMLElement) {
    const target = getScrollTarget(el);
    const offset = el.offsetTop;
    setVerticalScrollPosition(target, offset, 300);
}
