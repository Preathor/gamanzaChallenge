import Vue from "vue";
import Router from "vue-router";
import NotFound from "@/pages/NotFound";
import Game from "@/pages/Game";

Vue.use(Router);

let routerObject = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Game, meta: { requiresAuth: true } },
    { path: "*", component: NotFound },
  ],
});

routerObject.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let username = JSON.parse(localStorage.getItem("username"));
    if (to.matched.some((record) => record.meta.is_admin)) {
      if (username.is_admin === 1) {
        next();
      } else {
        next({ name: "home" });
      }
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    next();
  } else {
    next();
  }
});

export default routerObject;
