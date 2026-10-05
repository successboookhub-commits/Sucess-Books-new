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
	"/assets/about-4XzaFRGe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e39-eImwHWQaZniyty4MsXX2zc0u5KU\"",
		"mtime": "2026-10-05T16:43:12.813Z",
		"size": 3641,
		"path": "../public/assets/about-4XzaFRGe.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1b31-65Uq7dRre8XCGONji1t0BIMOqvs\"",
		"mtime": "2026-09-19T11:15:11.329Z",
		"size": 6961,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-BKgtbuA_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3544-evQ4SD7JLvbu+soBhWlHCDy+R8Y\"",
		"mtime": "2026-10-05T16:43:12.813Z",
		"size": 13636,
		"path": "../public/assets/admin-BKgtbuA_.js"
	},
	"/assets/admin-kuR5KGIP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23155-M2MRqHyCqrXyQck9nv1JC/F9ofA\"",
		"mtime": "2026-10-05T16:43:12.813Z",
		"size": 143701,
		"path": "../public/assets/admin-kuR5KGIP.js"
	},
	"/assets/arrow-left-gx2IfuRd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-R7N+wZ5rxBrUaaA52skpmI3a124\"",
		"mtime": "2026-10-05T16:43:12.813Z",
		"size": 155,
		"path": "../public/assets/arrow-left-gx2IfuRd.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"a2d-M3pryDVwgd2HPWki2kHOR1PBDCE\"",
		"mtime": "2026-09-19T10:40:31.356Z",
		"size": 2605,
		"path": "../public/favicon.svg"
	},
	"/assets/arrow-right-DlFY1o1q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-2Av6Yd4LUi2QNrsnonI01hvfKSs\"",
		"mtime": "2026-10-05T16:43:12.825Z",
		"size": 155,
		"path": "../public/assets/arrow-right-DlFY1o1q.js"
	},
	"/assets/book-open-_tu6Fr6G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-aL46adMJ/Upscnz/Iprhp+bAA2Y\"",
		"mtime": "2026-10-05T16:43:12.827Z",
		"size": 269,
		"path": "../public/assets/book-open-_tu6Fr6G.js"
	},
	"/assets/book-card-zB1WyH1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"408a-18HKutAtxXRg7XpGxleMYDvIY5Q\"",
		"mtime": "2026-10-05T16:43:12.827Z",
		"size": 16522,
		"path": "../public/assets/book-card-zB1WyH1g.js"
	},
	"/assets/circle-check-B_fAX__X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-yj4uw6zSFdoAVGex3D5pM7dxwlg\"",
		"mtime": "2026-10-05T16:43:12.827Z",
		"size": 168,
		"path": "../public/assets/circle-check-B_fAX__X.js"
	},
	"/assets/button-_-DP0W4Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e417-WmvkA+HPRnhAWMm+bGtBC9jyiXY\"",
		"mtime": "2026-10-05T16:43:12.827Z",
		"size": 58391,
		"path": "../public/assets/button-_-DP0W4Y.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-19T09:08:21.267Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/contact-CrugBTye.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1824-xbJerUKwc0uJUK3LmSl0anZHBis\"",
		"mtime": "2026-10-05T16:43:12.827Z",
		"size": 6180,
		"path": "../public/assets/contact-CrugBTye.js"
	},
	"/assets/dialog-DoT9tY3R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1941-3YNRudPtP7WOm0eki2NhcohrLeI\"",
		"mtime": "2026-10-05T16:43:12.829Z",
		"size": 6465,
		"path": "../public/assets/dialog-DoT9tY3R.js"
	},
	"/assets/funnel-CRQZexRb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-jXL7KDKGEixRaSudvKwOcUn3Ncs\"",
		"mtime": "2026-10-05T16:43:12.830Z",
		"size": 246,
		"path": "../public/assets/funnel-CRQZexRb.js"
	},
	"/assets/dist-BK8VhJnK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82e7-XcPtrgirenK5ouRQcbTgCNjON68\"",
		"mtime": "2026-10-05T16:43:12.829Z",
		"size": 33511,
		"path": "../public/assets/dist-BK8VhJnK.js"
	},
	"/assets/es2015-BOgABWTt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"789e-LvH8uPwTaeo+2FEp7j2k/bOxmYc\"",
		"mtime": "2026-10-05T16:43:12.829Z",
		"size": 30878,
		"path": "../public/assets/es2015-BOgABWTt.js"
	},
	"/assets/link-JFmMSCPm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-ccZc7fvr7XX9dWsvVIj9foPcjd8\"",
		"mtime": "2026-10-05T16:43:12.830Z",
		"size": 23327,
		"path": "../public/assets/link-JFmMSCPm.js"
	},
	"/assets/login-QY8qTHlC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d65-LCnDgvZyGV+dabCjzlyEO16JFiA\"",
		"mtime": "2026-10-05T16:43:12.830Z",
		"size": 7525,
		"path": "../public/assets/login-QY8qTHlC.js"
	},
	"/assets/preload-helper-DLHikSGH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18a4-KTcU5Gg7PUkzXUt1MuFez1m6ZVQ\"",
		"mtime": "2026-10-05T16:43:12.832Z",
		"size": 6308,
		"path": "../public/assets/preload-helper-DLHikSGH.js"
	},
	"/assets/phone-g6G8rxBV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-pAdKDdhuYNWc5s0JRnbRt/HFxjY\"",
		"mtime": "2026-10-05T16:43:12.832Z",
		"size": 624,
		"path": "../public/assets/phone-g6G8rxBV.js"
	},
	"/assets/mail-C_Z3cDxq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb-98X92NrQSakSO7zxA4eNuoRpuUc\"",
		"mtime": "2026-10-05T16:43:12.830Z",
		"size": 203,
		"path": "../public/assets/mail-C_Z3cDxq.js"
	},
	"/assets/index-DOUme3GN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e407-ok0S4GFa6H1jYicbWBr2D91Go0g\"",
		"mtime": "2026-10-05T16:43:12.813Z",
		"size": 386055,
		"path": "../public/assets/index-DOUme3GN.js"
	},
	"/assets/refresh-cw-DYbsf949.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57f-qPGlEEQGRVXBA6+c/pwLKHYlqJw\"",
		"mtime": "2026-10-05T16:43:12.832Z",
		"size": 1407,
		"path": "../public/assets/refresh-cw-DYbsf949.js"
	},
	"/assets/shield-check-u9j8xM8r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-qpU/4uKezzWaQeQEW18+bE5Fwko\"",
		"mtime": "2026-10-05T16:43:12.834Z",
		"size": 310,
		"path": "../public/assets/shield-check-u9j8xM8r.js"
	},
	"/assets/shop-BUQ5fuDT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"595-mC3C9RftZfTijce4kYxTWzJ5mSU\"",
		"mtime": "2026-10-05T16:43:12.836Z",
		"size": 1429,
		"path": "../public/assets/shop-BUQ5fuDT.js"
	},
	"/assets/send-znNUethN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4-Ddx4ZJZhL00v21XFPd3qayqkuLE\"",
		"mtime": "2026-10-05T16:43:12.834Z",
		"size": 468,
		"path": "../public/assets/send-znNUethN.js"
	},
	"/assets/shop-Cz3iLskN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc5-urPjopTL5cIOeUDRdPsvyWUM0XE\"",
		"mtime": "2026-10-05T16:43:12.836Z",
		"size": 7109,
		"path": "../public/assets/shop-Cz3iLskN.js"
	},
	"/assets/routes-B4rf0zAS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2758-2QvkFX7WsrxLRjab/tp4Rakqwi4\"",
		"mtime": "2026-10-05T16:43:12.832Z",
		"size": 10072,
		"path": "../public/assets/routes-B4rf0zAS.js"
	},
	"/assets/sparkles-DNbak5eu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-e2j3qbOQFkjPzhzey2aRGf3nO4A\"",
		"mtime": "2026-10-05T16:43:12.849Z",
		"size": 484,
		"path": "../public/assets/sparkles-DNbak5eu.js"
	},
	"/assets/useNavigate-C6thsSt-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-jg1TV5wcs4szsoYYFCuBWBR+LPw\"",
		"mtime": "2026-10-05T16:43:12.954Z",
		"size": 218,
		"path": "../public/assets/useNavigate-C6thsSt-.js"
	},
	"/assets/truck-BTZ7vvop.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"703-wCv5UA6CS/u1E+20ejHVm4/WW0w\"",
		"mtime": "2026-10-05T16:43:12.943Z",
		"size": 1795,
		"path": "../public/assets/truck-BTZ7vvop.js"
	},
	"/assets/star-CgDNPkzh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33e-oi55DFNIsxwVyy0qfCZgIA+0Hyc\"",
		"mtime": "2026-10-05T16:43:12.903Z",
		"size": 830,
		"path": "../public/assets/star-CgDNPkzh.js"
	},
	"/assets/styles-DEwqnfSt.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1bb62-rymbLNSFLxZAGTH9i6drmCl3heY\"",
		"mtime": "2026-10-05T16:43:12.955Z",
		"size": 113506,
		"path": "../public/assets/styles-DEwqnfSt.css"
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
