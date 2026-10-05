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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1b31-65Uq7dRre8XCGONji1t0BIMOqvs\"",
		"mtime": "2026-09-19T11:15:11.329Z",
		"size": 6961,
		"path": "../public/favicon.ico"
	},
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"289-bW/UjfYDYpckEAyVZTsIqkqNwM0\"",
		"mtime": "2026-09-19T11:15:11.332Z",
		"size": 649,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"a2d-M3pryDVwgd2HPWki2kHOR1PBDCE\"",
		"mtime": "2026-09-19T10:40:31.356Z",
		"size": 2605,
		"path": "../public/favicon.svg"
	},
	"/assets/about-M1YqiQJj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e34-yn/hQkp/hDaYWAA4Mqj1oDrWSyY\"",
		"mtime": "2026-10-05T17:10:45.873Z",
		"size": 3636,
		"path": "../public/assets/about-M1YqiQJj.js"
	},
	"/assets/account-8LZYajrf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ec-2B0+FVcFxw5naIzCkLu5aAmfr9c\"",
		"mtime": "2026-10-05T17:10:45.873Z",
		"size": 748,
		"path": "../public/assets/account-8LZYajrf.js"
	},
	"/assets/account-CJIrEVl6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66dc-k+GeFM7pxE4qqWm/gn2Sl82Mmgc\"",
		"mtime": "2026-10-05T17:10:45.873Z",
		"size": 26332,
		"path": "../public/assets/account-CJIrEVl6.js"
	},
	"/assets/admin-C9NcRWGW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e863-n8SXKQZWUYYsYkp1ubnTFR5o2Xw\"",
		"mtime": "2026-10-05T17:10:45.884Z",
		"size": 59491,
		"path": "../public/assets/admin-C9NcRWGW.js"
	},
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"289-bW/UjfYDYpckEAyVZTsIqkqNwM0\"",
		"mtime": "2026-09-19T11:15:11.331Z",
		"size": 649,
		"path": "../public/favicon-32x32.png"
	},
	"/assets/arrow-right-CE-2G1u_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-4Um7GnyWHOZ8t9BxLm3fX2Hz1Tw\"",
		"mtime": "2026-10-05T17:10:45.884Z",
		"size": 155,
		"path": "../public/assets/arrow-right-CE-2G1u_.js"
	},
	"/assets/admin-6O1Q8m4F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e87a-f9A+N3SN3ok6dcmLNSGaiugDJp8\"",
		"mtime": "2026-10-05T17:10:45.873Z",
		"size": 125050,
		"path": "../public/assets/admin-6O1Q8m4F.js"
	},
	"/assets/arrow-left-BRerdG-1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-hCAAZ69s6cGfX24gtfbKNNe4LSo\"",
		"mtime": "2026-10-05T17:10:45.884Z",
		"size": 155,
		"path": "../public/assets/arrow-left-BRerdG-1.js"
	},
	"/assets/book-card-BPLdJ41f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"450f-mLALVMdLi/YIQ9JjCd36OhjpSB8\"",
		"mtime": "2026-10-05T17:10:45.884Z",
		"size": 17679,
		"path": "../public/assets/book-card-BPLdJ41f.js"
	},
	"/assets/cart-B4EtUzir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"778-EQD5G4u+HmaHNWIbJgUeJoQtmrc\"",
		"mtime": "2026-10-05T17:10:45.884Z",
		"size": 1912,
		"path": "../public/assets/cart-B4EtUzir.js"
	},
	"/assets/circle-check-9i3opoGM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-YPJ+3BeJt6qswKG8SqUoRhr5BYM\"",
		"mtime": "2026-10-05T17:10:45.888Z",
		"size": 168,
		"path": "../public/assets/circle-check-9i3opoGM.js"
	},
	"/assets/contact-D-RhvI5s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1824-6y6nF24qZ7Q5Co6bNIDdPvvPNtk\"",
		"mtime": "2026-10-05T17:10:45.888Z",
		"size": 6180,
		"path": "../public/assets/contact-D-RhvI5s.js"
	},
	"/assets/button-eg1CtUmL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f389-Jo42t2Bd/NryhtjXfbnL7qXNNRk\"",
		"mtime": "2026-10-05T17:10:45.884Z",
		"size": 62345,
		"path": "../public/assets/button-eg1CtUmL.js"
	},
	"/assets/dialog-zHoTcsXK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"915f-JgTWUzAvP+ABp++6YJPQTThLxnA\"",
		"mtime": "2026-10-05T17:10:45.888Z",
		"size": 37215,
		"path": "../public/assets/dialog-zHoTcsXK.js"
	},
	"/assets/funnel-vZNFbGX8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-he7jTPMvOJP49l9q8uk3iiQIsSc\"",
		"mtime": "2026-10-05T17:10:45.889Z",
		"size": 246,
		"path": "../public/assets/funnel-vZNFbGX8.js"
	},
	"/assets/dist-D1z10tvx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82e7-eM0rgyajCbjGbLakRbpGtjJiGtc\"",
		"mtime": "2026-10-05T17:10:45.889Z",
		"size": 33511,
		"path": "../public/assets/dist-D1z10tvx.js"
	},
	"/assets/heart-CjZdz2NT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d22-+nekPyzlTmhFGl2IZcMW60jmVUQ\"",
		"mtime": "2026-10-05T17:10:45.889Z",
		"size": 3362,
		"path": "../public/assets/heart-CjZdz2NT.js"
	},
	"/assets/link-zdfHnsu1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-dI4Ca24MusuUpEIGQ1JHnaW9VoE\"",
		"mtime": "2026-10-05T17:10:45.889Z",
		"size": 23327,
		"path": "../public/assets/link-zdfHnsu1.js"
	},
	"/assets/login-BxrOyUqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d40-ceFv5YMpnsGjmPsp8U/eXuPBUGw\"",
		"mtime": "2026-10-05T17:10:45.891Z",
		"size": 7488,
		"path": "../public/assets/login-BxrOyUqZ.js"
	},
	"/assets/mail-CVKhvu36.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb-jODaUvjMQ06xThclcwCcWV3g7PA\"",
		"mtime": "2026-10-05T17:10:45.891Z",
		"size": 203,
		"path": "../public/assets/mail-CVKhvu36.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-19T09:08:21.267Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/index-RP9q9n09.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"648cb-xNmkrjnzk4DuIElufqqLj/fsvsk\"",
		"mtime": "2026-10-05T17:10:45.873Z",
		"size": 411851,
		"path": "../public/assets/index-RP9q9n09.js"
	},
	"/assets/pen-DDM1xIXI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-syXGRwObot3v+KMbT7HFmt3sGc4\"",
		"mtime": "2026-10-05T17:10:45.891Z",
		"size": 225,
		"path": "../public/assets/pen-DDM1xIXI.js"
	},
	"/assets/preload-helper-CB6fK14k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1829-HtYfS+9h0wUIKJA5dbF0N/Py/eI\"",
		"mtime": "2026-10-05T17:10:45.891Z",
		"size": 6185,
		"path": "../public/assets/preload-helper-CB6fK14k.js"
	},
	"/assets/phone-CGqh6dK0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-bfcfRkFF9WzYf+s9znsRXlvLh7U\"",
		"mtime": "2026-10-05T17:10:45.891Z",
		"size": 624,
		"path": "../public/assets/phone-CGqh6dK0.js"
	},
	"/assets/search-DA4xPBkA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-nGs4mPyD/bggWIYF+8P22Opi9b8\"",
		"mtime": "2026-10-05T17:10:45.893Z",
		"size": 164,
		"path": "../public/assets/search-DA4xPBkA.js"
	},
	"/assets/send-CY_rBzUl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4-ADfY4p8Eiz8B2PIY8gMeWjSp6js\"",
		"mtime": "2026-10-05T17:10:45.893Z",
		"size": 468,
		"path": "../public/assets/send-CY_rBzUl.js"
	},
	"/assets/routes-uiYDCPLf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2778-8HzzBbBqIvHhVHiHTBZpxTUcAps\"",
		"mtime": "2026-10-05T17:10:45.893Z",
		"size": 10104,
		"path": "../public/assets/routes-uiYDCPLf.js"
	},
	"/assets/shield-check-UZrIa6eG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-5/BB5EGVK5ysAhCkJ5W6Q4jsrYE\"",
		"mtime": "2026-10-05T17:10:45.893Z",
		"size": 310,
		"path": "../public/assets/shield-check-UZrIa6eG.js"
	},
	"/assets/refresh-cw-Y_VmY02L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57f-r5ox6eou/z/r0UCjxOCIQTBlOJI\"",
		"mtime": "2026-10-05T17:10:45.891Z",
		"size": 1407,
		"path": "../public/assets/refresh-cw-Y_VmY02L.js"
	},
	"/assets/shop-CLfu637X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"546-PizuifzKc0KtVHHEFDChiScyMVI\"",
		"mtime": "2026-10-05T17:10:45.893Z",
		"size": 1350,
		"path": "../public/assets/shop-CLfu637X.js"
	},
	"/assets/shop-Crc8u0yF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b97-oCti/6ROcbxyghnWYhI17k0pdHs\"",
		"mtime": "2026-10-05T17:10:45.895Z",
		"size": 7063,
		"path": "../public/assets/shop-Crc8u0yF.js"
	},
	"/assets/star-CeZoVVT4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e-75khgpYUyROoXnaglKPlEN2RV5w\"",
		"mtime": "2026-10-05T17:10:45.895Z",
		"size": 830,
		"path": "../public/assets/star-CeZoVVT4.js"
	},
	"/assets/sparkles-CQCnQPly.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c6-LSN7ukan1f3mVgSNNF4jP7NQqqY\"",
		"mtime": "2026-10-05T17:10:45.895Z",
		"size": 710,
		"path": "../public/assets/sparkles-CQCnQPly.js"
	},
	"/assets/tax-invoice-modal-D0cQ9aVQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ec9-RluVUolSbAwgxBnSB/4fJcAFaQI\"",
		"mtime": "2026-10-05T17:10:45.914Z",
		"size": 11977,
		"path": "../public/assets/tax-invoice-modal-D0cQ9aVQ.js"
	},
	"/assets/truck-CFzmzetT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-0G3PGcyt7du0I0k9V9/t43FqruA\"",
		"mtime": "2026-10-05T17:10:45.914Z",
		"size": 396,
		"path": "../public/assets/truck-CFzmzetT.js"
	},
	"/assets/useNavigate-D5YbKSAV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-P+nBfwbm+nb/s6mRuzQJ2pEQP8k\"",
		"mtime": "2026-10-05T17:10:45.914Z",
		"size": 218,
		"path": "../public/assets/useNavigate-D5YbKSAV.js"
	},
	"/assets/styles-C4hTEYHw.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e85b-x7oRRErO/Onhep03fLT5CQQKbCE\"",
		"mtime": "2026-10-05T17:10:45.914Z",
		"size": 125019,
		"path": "../public/assets/styles-C4hTEYHw.css"
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
