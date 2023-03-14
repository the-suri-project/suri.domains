import { FixedHeightDirective } from 'src/directives/FixedHeight';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
    app.directive('fixedHeight', FixedHeightDirective);
});
