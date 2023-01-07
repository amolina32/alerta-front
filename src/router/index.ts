import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "@/components/login/LoginPage.vue";
import { SHARED_CONSTANTS } from "@/components/shared/constants/shared.constant";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((element) => element.meta.requiredAuth)) {
    if (localStorage.getItem(SHARED_CONSTANTS.STORAGE_KEYS.TOKEN) == null) {
      next({
        path: "/login",
        query: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
