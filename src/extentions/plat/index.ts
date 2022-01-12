import TjForm from './src/TjForm/Main.vue';
import TjToolbar from './src/TjToolbar/Main.vue';
import TjPagination from './src/TjPagination/Main.vue';
import TjTable from './src/TjTable/Main.vue';
import TjTablePage from './src/TjTablePage/Main.vue';
import { initConfig } from './src/utils/platConfig';


export {
  TjForm,
  TjToolbar,
  TjPagination,
  TjTable,
  TjTablePage
};

const Plat = {
  installed: false,
  install(Vue, option) {
    if (Plat.installed) {
      return;
    }

    if (!option || option.globalInstall !== false) {
      Vue.component('TjForm', TjForm);
      Vue.component('TjToolbar', TjToolbar);
      Vue.component('TjPagination', TjPagination);
      Vue.component('TjTable', TjTable);
      Vue.component('TjTablePage', TjTablePage);
    }

    if (option) {
      initConfig(option);
    }
  }
};

export default Plat;