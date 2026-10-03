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
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"289-bW/UjfYDYpckEAyVZTsIqkqNwM0\"",
		"mtime": "2026-09-19T11:15:11.331Z",
		"size": 649,
		"path": "../public/favicon-32x32.png"
	},
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
	"/assets/about-CWq3MIdg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e39-Y0aPNeBc2vp59rit5WdKAfrmQxs\"",
		"mtime": "2026-10-03T12:50:25.719Z",
		"size": 3641,
		"path": "../public/assets/about-CWq3MIdg.js"
	},
	"/assets/admin-CAtzDrlj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3514-qnnLtkfjB+D+F+KQRYmNzb2V5wE\"",
		"mtime": "2026-10-03T12:50:25.719Z",
		"size": 13588,
		"path": "../public/assets/admin-CAtzDrlj.js"
	},
	"/assets/arrow-right-C7nzHhBZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-qCoE0AIHMZ8DjW06O47KsuMvpFA\"",
		"mtime": "2026-10-03T12:50:25.719Z",
		"size": 155,
		"path": "../public/assets/arrow-right-C7nzHhBZ.js"
	},
	"/assets/book-card-7-Fe2G0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e68-57M1sJ+vZXBIqWkVW3k8Q8m29Gc\"",
		"mtime": "2026-10-03T12:50:25.719Z",
		"size": 11880,
		"path": "../public/assets/book-card-7-Fe2G0Y.js"
	},
	"/assets/book-open-BIrEPnyr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-e11N3GUqvcHJGSi60waDwNxWkxw\"",
		"mtime": "2026-10-03T12:50:25.719Z",
		"size": 269,
		"path": "../public/assets/book-open-BIrEPnyr.js"
	},
	"/assets/admin-KFBL23BZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2052a-/p7X8WM19+aQLK7dLPSJJNHFOHs\"",
		"mtime": "2026-10-03T12:50:25.719Z",
		"size": 132394,
		"path": "../public/assets/admin-KFBL23BZ.js"
	},
	"/assets/button-osBlMnZr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de06-GjHDQ+Y/AfaHF4JFtkXj7v167Io\"",
		"mtime": "2026-10-03T12:50:25.731Z",
		"size": 56838,
		"path": "../public/assets/button-osBlMnZr.js"
	},
	"/assets/circle-check-XKCfMsXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-WIL5LbrNyJ7QPtbB2EE8Trlsy5U\"",
		"mtime": "2026-10-03T12:50:25.731Z",
		"size": 168,
		"path": "../public/assets/circle-check-XKCfMsXd.js"
	},
	"/assets/contact-Cvpof30H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1804-JwlbD+/+oQadAF7eRF1tSl1nUx0\"",
		"mtime": "2026-10-03T12:50:25.731Z",
		"size": 6148,
		"path": "../public/assets/contact-Cvpof30H.js"
	},
	"/assets/dialog-1XXIVYXI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1941-eJ7G93pqgJsRBbQYsnm7r6QL9bc\"",
		"mtime": "2026-10-03T12:50:25.731Z",
		"size": 6465,
		"path": "../public/assets/dialog-1XXIVYXI.js"
	},
	"/assets/es2015-uwuazLbJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79a0-RzBLqWGCw8nXb/0YoGa17rzvpo0\"",
		"mtime": "2026-10-03T12:50:25.733Z",
		"size": 31136,
		"path": "../public/assets/es2015-uwuazLbJ.js"
	},
	"/assets/dist-CIi3n7w1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82e7-Av5w4D+upvlK2asdIMpD6sa2qdk\"",
		"mtime": "2026-10-03T12:50:25.731Z",
		"size": 33511,
		"path": "../public/assets/dist-CIi3n7w1.js"
	},
	"/assets/link-DIcKIA8K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-HT2cKowkVRDjSowU4sV/ozRG1Xg\"",
		"mtime": "2026-10-03T12:50:25.733Z",
		"size": 23327,
		"path": "../public/assets/link-DIcKIA8K.js"
	},
	"/assets/index-BloPaMl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5de2f-kPtODyOr5k4O8t7E+wbpEzNpKDs\"",
		"mtime": "2026-10-03T12:50:25.719Z",
		"size": 384559,
		"path": "../public/assets/index-BloPaMl4.js"
	},
	"/assets/phone-DEe0S6oK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"310-jW5CBuzykK/8DUqjhrnLDSS9V74\"",
		"mtime": "2026-10-03T12:50:25.733Z",
		"size": 784,
		"path": "../public/assets/phone-DEe0S6oK.js"
	},
	"/assets/preload-helper-DSosWCtT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18e2-IVupPlHEMOJoR5C8w27txI4oGZ4\"",
		"mtime": "2026-10-03T12:50:25.740Z",
		"size": 6370,
		"path": "../public/assets/preload-helper-DSosWCtT.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-19T09:08:21.267Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/routes-C5C_YdWf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2730-dw7ZDeSBscGm/hbd8lU4ngi9u5E\"",
		"mtime": "2026-10-03T12:50:25.740Z",
		"size": 10032,
		"path": "../public/assets/routes-C5C_YdWf.js"
	},
	"/assets/send-DIjZnROh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4-uHYC7GErYSoK3AjEnMBt+Zh/IXk\"",
		"mtime": "2026-10-03T12:50:25.741Z",
		"size": 468,
		"path": "../public/assets/send-DIjZnROh.js"
	},
	"/assets/shop-Cb71U3Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1110-E9Kf1G5NnRN1xr9Ka0xcudjDfys\"",
		"mtime": "2026-10-03T12:50:25.741Z",
		"size": 4368,
		"path": "../public/assets/shop-Cb71U3Vt.js"
	},
	"/assets/shop-DVG9nosS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ed-IlLJFtdXC/qgpb11Sx6I693+xp8\"",
		"mtime": "2026-10-03T12:50:25.741Z",
		"size": 1261,
		"path": "../public/assets/shop-DVG9nosS.js"
	},
	"/assets/sparkles-CIwjN3VA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-5ccsgMYNyDjjPn67jxOcXwwGUo8\"",
		"mtime": "2026-10-03T12:50:25.741Z",
		"size": 484,
		"path": "../public/assets/sparkles-CIwjN3VA.js"
	},
	"/assets/star-Bfhf-J_Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce-59SxX05C3rX0DwFG+bAFHBjxD8E\"",
		"mtime": "2026-10-03T12:50:25.741Z",
		"size": 462,
		"path": "../public/assets/star-Bfhf-J_Q.js"
	},
	"/assets/truck-jhIrcLx1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"703-PReT7a4HniiHhJo79mqNAssFkBI\"",
		"mtime": "2026-10-03T12:50:25.743Z",
		"size": 1795,
		"path": "../public/assets/truck-jhIrcLx1.js"
	},
	"/assets/styles-BKSpHtNf.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1a163-FClW9dVzZ7YGVrj0TUEyqKd9GOQ\"",
		"mtime": "2026-10-03T12:50:25.758Z",
		"size": 106851,
		"path": "../public/assets/styles-BKSpHtNf.css"
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
