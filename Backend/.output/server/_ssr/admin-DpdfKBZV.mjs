import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DpdfKBZV.js
var $$splitComponentImporter = () => import("./admin-BoNKzLN6.mjs");
var Route = createFileRoute("/admin")({
	validateSearch: (search) => ({ tab: typeof search.tab === "string" ? search.tab : void 0 }),
	head: () => ({ meta: [
		{ title: "Admin Portal — Success Book Hub" },
		{
			name: "description",
			content: "Comprehensive bookstore control panel, inventory, sales, and analytics."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
