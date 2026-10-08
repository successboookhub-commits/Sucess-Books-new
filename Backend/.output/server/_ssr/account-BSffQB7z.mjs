import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-BSffQB7z.js
var $$splitComponentImporter = () => import("./account-CDhrFdp2.mjs");
var Route = createFileRoute("/account")({
	validateSearch: (search) => {
		return { tab: search.tab || "orders" };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
