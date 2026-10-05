globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"289-bW/UjfYDYpckEAyVZTsIqkqNwM0\"",
		"mtime": "2026-09-19T11:15:11.332Z",
		"size": 649,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"289-bW/UjfYDYpckEAyVZTsIqkqNwM0\"",
		"mtime": "2026-09-19T11:15:11.331Z",
		"size": 649,
		"path": "../public/favicon-32x32.png"
	},
	"/assets/about-C5BH1Q7A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e34-ud/VZeHyP0YS1K31BzY1hCRAt+8\"",
		"mtime": "2026-10-05T16:57:31.329Z",
		"size": 3636,
		"path": "../public/assets/about-C5BH1Q7A.js"
	},
	"/assets/account-BIc_Al1G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e19-z9KUm191m04Pzh3vrq9/NCKtghQ\"",
		"mtime": "2026-10-05T16:57:31.329Z",
		"size": 11801,
		"path": "../public/assets/account-BIc_Al1G.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1b31-65Uq7dRre8XCGONji1t0BIMOqvs\"",
		"mtime": "2026-09-19T11:15:11.329Z",
		"size": 6961,
		"path": "../public/favicon.ico"
	},
	"/assets/account-Dr05UtAv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66d0-KOcF6Cs3Udx17QPaFKmEkP71L3E\"",
		"mtime": "2026-10-05T16:57:31.329Z",
		"size": 26320,
		"path": "../public/assets/account-Dr05UtAv.js"
	},
	"/assets/admin-BaYJMDrq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e856-AbuEO+m/OC4ShHwZ4kgKHer/fAg\"",
		"mtime": "2026-10-05T16:57:31.337Z",
		"size": 59478,
		"path": "../public/assets/admin-BaYJMDrq.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"a2d-M3pryDVwgd2HPWki2kHOR1PBDCE\"",
		"mtime": "2026-09-19T10:40:31.356Z",
		"size": 2605,
		"path": "../public/favicon.svg"
	},
	"/assets/admin-BQL8CUMZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17adb-ZefBshKjHFDRreH9Uxgag2sIzio\"",
		"mtime": "2026-10-05T16:57:31.331Z",
		"size": 96987,
		"path": "../public/assets/admin-BQL8CUMZ.js"
	},
	"/assets/arrow-left-VEvzFmKF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-9jAoYA5AAQeTcJWiVkus8tWYlSk\"",
		"mtime": "2026-10-05T16:57:31.340Z",
		"size": 155,
		"path": "../public/assets/arrow-left-VEvzFmKF.js"
	},
	"/assets/arrow-right-DXKrQJAq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-fFBDFVYE+rtaBKfPDhGgGlwr1Wc\"",
		"mtime": "2026-10-05T16:57:31.340Z",
		"size": 155,
		"path": "../public/assets/arrow-right-DXKrQJAq.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-19T09:08:21.267Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/book-card-BfmULWmL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4510-fh2KPId1/fmbY2WKynqrpTj7chs\"",
		"mtime": "2026-10-05T16:57:31.340Z",
		"size": 17680,
		"path": "../public/assets/book-card-BfmULWmL.js"
	},
	"/assets/button-detVbUBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"effc-x9cDPkYizJSexFHcg6kLu+IVK/I\"",
		"mtime": "2026-10-05T16:57:31.340Z",
		"size": 61436,
		"path": "../public/assets/button-detVbUBM.js"
	},
	"/assets/cart-BbIW2goZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"778-y8DXvLzAyN5FU4t9rQjHXWh0iHk\"",
		"mtime": "2026-10-05T16:57:31.340Z",
		"size": 1912,
		"path": "../public/assets/cart-BbIW2goZ.js"
	},
	"/assets/circle-check-LPpEUIGu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-0TvYt98HOu/2hosjUcKSD3cTtl8\"",
		"mtime": "2026-10-05T16:57:31.340Z",
		"size": 168,
		"path": "../public/assets/circle-check-LPpEUIGu.js"
	},
	"/assets/contact-C2Uc5Sg4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1824-QI1FUParS42BK8Wrxamf69W/KI8\"",
		"mtime": "2026-10-05T16:57:31.340Z",
		"size": 6180,
		"path": "../public/assets/contact-C2Uc5Sg4.js"
	},
	"/assets/dialog-DUvi54mJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2626-0r2NsACCzlWhBoEtQ+DIBGGEdqA\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 9766,
		"path": "../public/assets/dialog-DUvi54mJ.js"
	},
	"/assets/dist-D114R4b-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82e7-s0wkHohxoUPomp/YAn5GbzHvkIs\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 33511,
		"path": "../public/assets/dist-D114R4b-.js"
	},
	"/assets/es2015-U6JGOdOn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"789e-/m1t0aMA86BcpE/j8HSsIdxj4Z4\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 30878,
		"path": "../public/assets/es2015-U6JGOdOn.js"
	},
	"/assets/funnel-BB-1QoxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-ShR0KiBbfIABgSX3Qh7w/Ht1VlM\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 246,
		"path": "../public/assets/funnel-BB-1QoxY.js"
	},
	"/assets/link-NA_396ht.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-XI0bxHM4s5sbA0x3ZTTCTaZzVRQ\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 23327,
		"path": "../public/assets/link-NA_396ht.js"
	},
	"/assets/login-C2MxQS7q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d40-k30rLMn5MYD1FdZIJ8kiqYbGtE0\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 7488,
		"path": "../public/assets/login-C2MxQS7q.js"
	},
	"/assets/mail-CzoQ2tXa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb-nFlnyRh1yGAtMblRfmlt212KRP8\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 203,
		"path": "../public/assets/mail-CzoQ2tXa.js"
	},
	"/assets/index-zpwD_crW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"648c1-JRZpXZdluRcxDpPnvgJn75//5K8\"",
		"mtime": "2026-10-05T16:57:31.329Z",
		"size": 411841,
		"path": "../public/assets/index-zpwD_crW.js"
	},
	"/assets/pen-BNVFZlzV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-1/l3WJJ9G6LtCXdi9SDiy27YkGE\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 225,
		"path": "../public/assets/pen-BNVFZlzV.js"
	},
	"/assets/phone-iIzBIpwu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-tcYQ+HlEi5EazZyuAvXJ6/QbSpM\"",
		"mtime": "2026-10-05T16:57:31.342Z",
		"size": 624,
		"path": "../public/assets/phone-iIzBIpwu.js"
	},
	"/assets/refresh-cw-CzLlxj8B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57f-Phuj4f2Nr/OTPcLJQ1jDtECcwxA\"",
		"mtime": "2026-10-05T16:57:31.344Z",
		"size": 1407,
		"path": "../public/assets/refresh-cw-CzLlxj8B.js"
	},
	"/assets/preload-helper-DUhjtV5S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1829-YUJ6QQF05vSoHQNk0EVARlNd6Iw\"",
		"mtime": "2026-10-05T16:57:31.344Z",
		"size": 6185,
		"path": "../public/assets/preload-helper-DUhjtV5S.js"
	},
	"/assets/routes-sPIN0VKp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2778-BYT8SO5YyEgzSNh/ql7zaCvnQ8I\"",
		"mtime": "2026-10-05T16:57:31.344Z",
		"size": 10104,
		"path": "../public/assets/routes-sPIN0VKp.js"
	},
	"/assets/search-Ce25ixRO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-X0XRa8uCwQKBiE3KmxtlWWXTUj8\"",
		"mtime": "2026-10-05T16:57:31.344Z",
		"size": 164,
		"path": "../public/assets/search-Ce25ixRO.js"
	},
	"/assets/send-D1ajmTty.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4-wTzSSTecT8otFoivQ4fXG84BlCM\"",
		"mtime": "2026-10-05T16:57:31.344Z",
		"size": 468,
		"path": "../public/assets/send-D1ajmTty.js"
	},
	"/assets/shield-check-DTB4dIw5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-r9QwO+clzX15wT8DGMtyRJCvAiw\"",
		"mtime": "2026-10-05T16:57:31.344Z",
		"size": 310,
		"path": "../public/assets/shield-check-DTB4dIw5.js"
	},
	"/assets/shop-C3KJhB1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"547-McxmHCOuLNheOVo6DejzXg7cLQ8\"",
		"mtime": "2026-10-05T16:57:31.345Z",
		"size": 1351,
		"path": "../public/assets/shop-C3KJhB1g.js"
	},
	"/assets/shop-CXcy5slJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b97-VuwyRcgkwys4R2FxWD89TR4hNJE\"",
		"mtime": "2026-10-05T16:57:31.345Z",
		"size": 7063,
		"path": "../public/assets/shop-CXcy5slJ.js"
	},
	"/assets/sparkles-CC4tXGDv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c6-CkE3m3n+33PdJ0Q2P3tSDLrKOzA\"",
		"mtime": "2026-10-05T16:57:31.345Z",
		"size": 710,
		"path": "../public/assets/sparkles-CC4tXGDv.js"
	},
	"/assets/star-CgaWx6CG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e-zD2GST4kZeIotboQRePyH4/wuUw\"",
		"mtime": "2026-10-05T16:57:31.345Z",
		"size": 830,
		"path": "../public/assets/star-CgaWx6CG.js"
	},
	"/assets/truck-BBl-D8Bv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-9EvR8CsKXs+zmQPROVPpXB+7o7U\"",
		"mtime": "2026-10-05T16:57:31.373Z",
		"size": 396,
		"path": "../public/assets/truck-BBl-D8Bv.js"
	},
	"/assets/useNavigate-xl_SBcxO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-Dp9MYHxwvC5DP08eZqZOiGfghFQ\"",
		"mtime": "2026-10-05T16:57:31.373Z",
		"size": 218,
		"path": "../public/assets/useNavigate-xl_SBcxO.js"
	},
	"/assets/user-B2gh8Ciz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b3-YfjlaIuYvWn9CNt0rPCQVAcfic8\"",
		"mtime": "2026-10-05T16:57:31.375Z",
		"size": 947,
		"path": "../public/assets/user-B2gh8Ciz.js"
	},
	"/assets/styles-B5ogrJB-.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e3f7-vuP7gkNtDhUM/TKswVZb0r+AyfM\"",
		"mtime": "2026-10-05T16:57:31.375Z",
		"size": 123895,
		"path": "../public/assets/styles-B5ogrJB-.css"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_HJUU8B = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_HJUU8B
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
