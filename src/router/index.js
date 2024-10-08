import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home/HomeIndex.vue");
const Feedbacks = () => import("../views/Feedbacks/FeedbacksIndex.vue");
const Credentials = () => import("../views/Credentials/CredentialsIndex.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/credentials", // Corrigido para começar com "/"
    name: "Credentials",
    component: Credentials,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*", // se cair em uma rota que nao existe, redireciona para home
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
