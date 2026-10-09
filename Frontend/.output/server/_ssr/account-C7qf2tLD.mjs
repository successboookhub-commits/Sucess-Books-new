import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-C7qf2tLD.js
var $$splitComponentImporter = () => import("./account-i9AIkthk.mjs");
var Route = createFileRoute("/account")({
	validateSearch: (search) => {
		return { tab: typeof search["tab"] === "string" ? search["tab"] : void 0 };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
