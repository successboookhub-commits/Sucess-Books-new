import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DZ46FU94.js
var $$splitComponentImporter = () => import("./account-BktL_VFr.mjs");
var Route = createFileRoute("/account")({
	validateSearch: (search) => {
		return { tab: search.tab || "orders" };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
