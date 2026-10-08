import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CpwqGkyy.js
var $$splitComponentImporter = () => import("./shop-C3XZpKPi.mjs");
var Route = createFileRoute("/shop")({
	validateSearch: (search) => ({
		category: typeof search.category === "string" ? search.category : void 0,
		subCategory: typeof search.subCategory === "string" ? search.subCategory : void 0,
		q: typeof search.q === "string" ? search.q : void 0
	}),
	head: () => ({ meta: [
		{ title: "Shop All Books — Success Book Hub" },
		{
			name: "description",
			content: "Browse our complete catalogue of curated literature, bestsellers, academic essentials, and special editions. Order online or on WhatsApp."
		},
		{
			property: "og:title",
			content: "Shop All Books — Success Book Hub"
		},
		{
			property: "og:description",
			content: "The complete Success Book Hub catalogue, ready to order with instant booking & WhatsApp confirmation."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
