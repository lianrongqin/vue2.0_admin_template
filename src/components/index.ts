import { getInstaller } from '@/utils';
import Header from './src/GlobalLayout/Header.vue';
import Menu from './src/GlobalLayout/Menu.vue';
import TjDrawer from './src/TjDrawer';
import TjStatus from './src/TjStatus';
import TjLazy from './src/TjLazy';
import TjBreadcrumb from './src/TjBreadcrumb';
import TjEditor from './src/TjEditor';
import TjUpload from './src/TjUpload';
import TjImage from './src/TjImage';
import TjFormTitle from './src/TjFormTitle';

export {
  Header,
  Menu,
  TjDrawer,
  TjLazy,
  TjBreadcrumb,
  TjEditor,
  TjUpload,
  TjImage,
  TjFormTitle
};

// 全局注册
const components = { Header, Menu, TjStatus, TjBreadcrumb };

export default getInstaller('component', components);
