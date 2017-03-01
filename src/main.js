// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

// Vue
// filter
// time
// function
Vue.filter('time', (seconds) => {
  // var min
  // math
  // floor
  // seconds / 60
  const minutes = Math.floor(seconds / 60);
  // seconds
  // math
  // floor
  // seconds / 60
  let mySec = Math.floor(seconds % 60);

  // seconds < 10
  // add leading zero
  if (mySec < 10) {
    mySec = `0${mySec}`;
  }
  // else just return
  return `${minutes} : ${mySec}`;
});

// vue filter
// format
Vue.filter('minutes', (seconds) => {
  const minutes = Math.floor(seconds / 60);
  return minutes;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
