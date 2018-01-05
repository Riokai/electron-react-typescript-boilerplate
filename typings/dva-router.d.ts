declare module 'dva/router' {
  import * as routerRedux from 'react-router-redux';

  export * from 'react-router';
  export * from 'react-router-dom';
  export { routerRedux };
}