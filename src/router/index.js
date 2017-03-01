// import Vue
import Vue from 'vue';

// import vue-router
import Router from 'vue-router';

import Main from '@/components/Main';

// vue use router
Vue.use(Router);

// export
// default
// new
// Router
export default new Router({
  // obj
  // routes
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
  ],
});
