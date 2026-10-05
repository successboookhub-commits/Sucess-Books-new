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
	"/assets/about-CyjOPsED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e39-YwYDgYircOOc0RhxkPDk9hZ2yJM\"",
		"mtime": "2026-10-05T15:03:51.291Z",
		"size": 3641,
		"path": "../public/assets/about-CyjOPsED.js"
	},
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"289-bW/UjfYDYpckEAyVZTsIqkqNwM0\"",
		"mtime": "2026-09-19T11:15:11.332Z",
		"size": 649,
		"path": "../public/apple-touch-icon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-19T09:08:21.267Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"a2d-M3pryDVwgd2HPWki2kHOR1PBDCE\"",
		"mtime": "2026-09-19T10:40:31.356Z",
		"size": 2605,
		"path": "../public/favicon.svg"
	},
	"/assets/admin-7Gi_9yOF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20c9a-nJDd5g1rnLTClfHGwzcsov9X86c\"",
		"mtime": "2026-10-05T15:03:51.291Z",
		"size": 134298,
		"path": "../public/assets/admin-7Gi_9yOF.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1b31-65Uq7dRre8XCGONji1t0BIMOqvs\"",
		"mtime": "2026-09-19T11:15:11.329Z",
		"size": 6961,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-C-b_-_tq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3525-QViT56ZIlUMKaSr29FTZyGKkeas\"",
		"mtime": "2026-10-05T15:03:51.291Z",
		"size": 13605,
		"path": "../public/assets/admin-C-b_-_tq.js"
	},
	"/assets/arrow-left-CjQC-CYl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-OPXg+4iYVa+uR9dGAE6XSnl/QXY\"",
		"mtime": "2026-10-05T15:03:51.291Z",
		"size": 155,
		"path": "../public/assets/arrow-left-CjQC-CYl.js"
	},
	"/assets/arrow-right-SSEeFwD_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-IGI+AIRDBuYQegF+I6tjJ6X4Bgw\"",
		"mtime": "2026-10-05T15:03:51.304Z",
		"size": 155,
		"path": "../public/assets/arrow-right-SSEeFwD_.js"
	},
	"/assets/book-card-BUWTDbVL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e90-Xan0/nAzR5tlv/zqADz4P66yJ1o\"",
		"mtime": "2026-10-05T15:03:51.305Z",
		"size": 11920,
		"path": "../public/assets/book-card-BUWTDbVL.js"
	},
	"/assets/book-open-DbdjzW56.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-fPZZObkZJxtbYFcCqJoSa5qdyTc\"",
		"mtime": "2026-10-05T15:03:51.305Z",
		"size": 269,
		"path": "../public/assets/book-open-DbdjzW56.js"
	},
	"/assets/circle-check-D9qe0Ef6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-z1Bc8eyCfznlb/7Km/nCPmlNbK0\"",
		"mtime": "2026-10-05T15:03:51.305Z",
		"size": 168,
		"path": "../public/assets/circle-check-D9qe0Ef6.js"
	},
	"/assets/contact-BkRNac7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1824-NZlo+M5AajNMjHKaDoChIQQ8Tbw\"",
		"mtime": "2026-10-05T15:03:51.306Z",
		"size": 6180,
		"path": "../public/assets/contact-BkRNac7F.js"
	},
	"/assets/dialog-Z24WeM2J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1941-x1cINWn9Asq32Cii0oYRkSgoUxI\"",
		"mtime": "2026-10-05T15:03:51.306Z",
		"size": 6465,
		"path": "../public/assets/dialog-Z24WeM2J.js"
	},
	"/assets/button-Bby7zys5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e22a-1QcwFUUsv6LFQ2qTVUS2ectCiQg\"",
		"mtime": "2026-10-05T15:03:51.305Z",
		"size": 57898,
		"path": "../public/assets/button-Bby7zys5.js"
	},
	"/assets/dist-ycjj4OZx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82e7-vx3CDyWKcKWe0hNOsY8QjiqBXmk\"",
		"mtime": "2026-10-05T15:03:51.306Z",
		"size": 33511,
		"path": "../public/assets/dist-ycjj4OZx.js"
	},
	"/assets/es2015-K4Ku5UYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"789e-iz8bxYc4XEhki3I0FvmfVYmBkV4\"",
		"mtime": "2026-10-05T15:03:51.306Z",
		"size": 30878,
		"path": "../public/assets/es2015-K4Ku5UYz.js"
	},
	"/assets/link-Dgdx8pBK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-1Zkh03JStKiDQjJFMiBWsHDOOzE\"",
		"mtime": "2026-10-05T15:03:51.307Z",
		"size": 23327,
		"path": "../public/assets/link-Dgdx8pBK.js"
	},
	"/assets/login-BD3Wg5KI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d65-Vwop4znTFg5LFjHl1CUeZnKiwTA\"",
		"mtime": "2026-10-05T15:03:51.307Z",
		"size": 7525,
		"path": "../public/assets/login-BD3Wg5KI.js"
	},
	"/assets/mail-CsClqSqI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb-Cpl8d4CWEONg/LihJn2J+5Pd2Bc\"",
		"mtime": "2026-10-05T15:03:51.307Z",
		"size": 203,
		"path": "../public/assets/mail-CsClqSqI.js"
	},
	"/assets/phone-BxxJQkwl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-mIau0iNeSV5h8r/J6WXkB/eUDUI\"",
		"mtime": "2026-10-05T15:03:51.308Z",
		"size": 624,
		"path": "../public/assets/phone-BxxJQkwl.js"
	},
	"/assets/preload-helper-SEzhCAXf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18a4-ak/KYUXIsmrryTDbHD6IH041wE4\"",
		"mtime": "2026-10-05T15:03:51.308Z",
		"size": 6308,
		"path": "../public/assets/preload-helper-SEzhCAXf.js"
	},
	"/assets/refresh-cw-DFn9FuJY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57f-XD91PyLStsN8yGJK/n7Rq/utyEw\"",
		"mtime": "2026-10-05T15:03:51.308Z",
		"size": 1407,
		"path": "../public/assets/refresh-cw-DFn9FuJY.js"
	},
	"/assets/index-iRq5r4lA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e406-Sn+aA9r1RT7Ln0xGoNRq5NogeG0\"",
		"mtime": "2026-10-05T15:03:51.291Z",
		"size": 386054,
		"path": "../public/assets/index-iRq5r4lA.js"
	},
	"/assets/send-CHtfXACQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4-U7kxL3ImqXu4fVA4RAxyRkdno0s\"",
		"mtime": "2026-10-05T15:03:51.308Z",
		"size": 468,
		"path": "../public/assets/send-CHtfXACQ.js"
	},
	"/assets/routes-C9TqrSap.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2758-1gR1nIFGREIOweXIleqyBUU6FFY\"",
		"mtime": "2026-10-05T15:03:51.308Z",
		"size": 10072,
		"path": "../public/assets/routes-C9TqrSap.js"
	},
	"/assets/shop-HfEy-ukS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"536-ZII9uigKFb7qJtBwUoLNYRdmZ1Y\"",
		"mtime": "2026-10-05T15:03:51.309Z",
		"size": 1334,
		"path": "../public/assets/shop-HfEy-ukS.js"
	},
	"/assets/shield-check-BfDUTLgU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-XTkrhOs9dQzLELpRVegxH0OpXRE\"",
		"mtime": "2026-10-05T15:03:51.309Z",
		"size": 310,
		"path": "../public/assets/shield-check-BfDUTLgU.js"
	},
	"/assets/shop-DzHLM4bD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1110-yKC/snp/r6+AcBKhHNlvrS4oleo\"",
		"mtime": "2026-10-05T15:03:51.309Z",
		"size": 4368,
		"path": "../public/assets/shop-DzHLM4bD.js"
	},
	"/assets/sparkles-RhMrKzMD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-5I35ou6IzlSidIJRdGaF6YFxPjM\"",
		"mtime": "2026-10-05T15:03:51.309Z",
		"size": 484,
		"path": "../public/assets/sparkles-RhMrKzMD.js"
	},
	"/assets/star-oGM2hdBr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce-g2ZMjWa7+pTIpRshz0MM1AB70y8\"",
		"mtime": "2026-10-05T15:03:51.309Z",
		"size": 462,
		"path": "../public/assets/star-oGM2hdBr.js"
	},
	"/assets/truck-BFVVgOIZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"703-aIjCCNRaNGvjL7jhWkZUN+AtmzI\"",
		"mtime": "2026-10-05T15:03:51.309Z",
		"size": 1795,
		"path": "../public/assets/truck-BFVVgOIZ.js"
	},
	"/assets/useNavigate-H37RB7_t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-iwjbY9TltKN+aqOrIEoJHHBzMuE\"",
		"mtime": "2026-10-05T15:03:51.309Z",
		"size": 218,
		"path": "../public/assets/useNavigate-H37RB7_t.js"
	},
	"/assets/styles-R60flYVt.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1ae92-lPfuzHsehB8fDxpccYG3yXW+hNU\"",
		"mtime": "2026-10-05T15:03:51.311Z",
		"size": 110226,
		"path": "../public/assets/styles-R60flYVt.css"
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
