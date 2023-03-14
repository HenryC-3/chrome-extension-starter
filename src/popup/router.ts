import { createRouter, createWebHashHistory } from "vue-router";
import SettingPage from "./views/SettingPage.vue";
import HomePage from "./views/HomePage.vue";

const routes = [
	{ path: "/", component: HomePage },
	{ path: "/setting", component: SettingPage },
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
