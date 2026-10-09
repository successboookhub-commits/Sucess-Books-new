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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1b31-65Uq7dRre8XCGONji1t0BIMOqvs\"",
		"mtime": "2026-09-19T11:15:11.329Z",
		"size": 6961,
		"path": "../public/favicon.ico"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"a2d-M3pryDVwgd2HPWki2kHOR1PBDCE\"",
		"mtime": "2026-09-19T10:40:31.356Z",
		"size": 2605,
		"path": "../public/favicon.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"7a-joAS1t4bCbDa6ixC5Oo85uYgtkk\"",
		"mtime": "2026-10-08T16:28:56.847Z",
		"size": 122,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"4e6-s4LuoxfyAWKaML/YVuxonqFr3lg\"",
		"mtime": "2026-10-08T16:28:48.582Z",
		"size": 1254,
		"path": "../public/sitemap.xml"
	},
	"/assets/about-Bw9-5EyD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2893-HMaNMiCvFqyabPv6g9zoJVouJ/E\"",
		"mtime": "2026-10-09T15:56:48.874Z",
		"size": 10387,
		"path": "../public/assets/about-Bw9-5EyD.js"
	},
	"/assets/account-BseFQf6Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56e-plqABeLM6fRNcYpk40EpcCquNqc\"",
		"mtime": "2026-10-09T15:56:48.880Z",
		"size": 1390,
		"path": "../public/assets/account-BseFQf6Y.js"
	},
	"/assets/account-D52_GknJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"793c-HZ4r/Ilx7RyUwyH05hrmcUCcTzs\"",
		"mtime": "2026-10-09T15:56:48.889Z",
		"size": 31036,
		"path": "../public/assets/account-D52_GknJ.js"
	},
	"/assets/admin-Byye6G_O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e76-l9MepDB3S/FeYAWlZV5b7XuXnOw\"",
		"mtime": "2026-10-09T15:56:48.889Z",
		"size": 167542,
		"path": "../public/assets/admin-Byye6G_O.js"
	},
	"/assets/admin-D5tVhOsB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e97f-qT5PBTFt+8aGEX8fMZ63zvhHcIM\"",
		"mtime": "2026-10-09T15:56:48.902Z",
		"size": 59775,
		"path": "../public/assets/admin-D5tVhOsB.js"
	},
	"/assets/api-DgKNNwDy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7e9-8p1FqpQPKpLhLNuuFPj1oDUYGJc\"",
		"mtime": "2026-10-09T15:56:48.904Z",
		"size": 51177,
		"path": "../public/assets/api-DgKNNwDy.js"
	},
	"/assets/arrow-left-D657_zWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-zbJazBvJyzvmbafhxD+tksCrngk\"",
		"mtime": "2026-10-09T15:56:48.904Z",
		"size": 165,
		"path": "../public/assets/arrow-left-D657_zWR.js"
	},
	"/assets/arrow-right-BFNVlEkZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-lxx3HER6v+cKqPp38+v3fkvEzVE\"",
		"mtime": "2026-10-09T15:56:48.907Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BFNVlEkZ.js"
	},
	"/assets/auth-BWrcKXai.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"496-6Yh4tMjiqY1KQD2p0LL3O1KAzM0\"",
		"mtime": "2026-10-09T15:56:48.909Z",
		"size": 1174,
		"path": "../public/assets/auth-BWrcKXai.js"
	},
	"/assets/book-open-BxfErSFW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-3cydxVYM9aVuAE7huVXQ7sTaA4E\"",
		"mtime": "2026-10-09T15:56:48.912Z",
		"size": 279,
		"path": "../public/assets/book-open-BxfErSFW.js"
	},
	"/assets/book-card-BsGVrRCi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63fa-jX7EuDh9VsBTG23/E55JtRH2q3E\"",
		"mtime": "2026-10-09T15:56:48.909Z",
		"size": 25594,
		"path": "../public/assets/book-card-BsGVrRCi.js"
	},
	"/assets/cart-VLrZPwxE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167c-6PFk1orawzIylp89LfOQ7wMwAaQ\"",
		"mtime": "2026-10-09T15:56:48.915Z",
		"size": 5756,
		"path": "../public/assets/cart-VLrZPwxE.js"
	},
	"/assets/button-ybd-lUh1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f42-Wpet+SNskxf+k/PR5M/wva1a+rA\"",
		"mtime": "2026-10-09T15:56:48.914Z",
		"size": 32578,
		"path": "../public/assets/button-ybd-lUh1.js"
	},
	"/assets/chevron-down-CqmVxOgp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-px9aAjt5Nk305OEIsJ1vWf33vCY\"",
		"mtime": "2026-10-09T15:56:48.915Z",
		"size": 128,
		"path": "../public/assets/chevron-down-CqmVxOgp.js"
	},
	"/assets/circle-check-CW1fUXqY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-MwIHLr7893HoXrG8axQNAUZTu94\"",
		"mtime": "2026-10-09T15:56:48.917Z",
		"size": 178,
		"path": "../public/assets/circle-check-CW1fUXqY.js"
	},
	"/assets/clock-VNp5POHz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-yc+JAFUCmbJ6hVSaq+kEhdY/n74\"",
		"mtime": "2026-10-09T15:56:48.917Z",
		"size": 169,
		"path": "../public/assets/clock-VNp5POHz.js"
	},
	"/assets/contact-DTfgVsls.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-EYelK6tzriLpuQdpVV0noSoPOk4\"",
		"mtime": "2026-10-09T15:56:48.925Z",
		"size": 8745,
		"path": "../public/assets/contact-DTfgVsls.js"
	},
	"/assets/createLucideIcon-B0PJLGQl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55fe-+L5FfgjbLTKge/VfV8N1oT1d9Ds\"",
		"mtime": "2026-10-09T15:56:48.930Z",
		"size": 22014,
		"path": "../public/assets/createLucideIcon-B0PJLGQl.js"
	},
	"/assets/dialog-BtTqjTO1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"918b-zHcc7zmDdvxR7h9Dew6ZDsr/Tck\"",
		"mtime": "2026-10-09T15:56:48.940Z",
		"size": 37259,
		"path": "../public/assets/dialog-BtTqjTO1.js"
	},
	"/assets/external-link-DXpbXH_S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-9LdjejyjM8PwISxIkVI/a+tZXrw\"",
		"mtime": "2026-10-09T15:56:48.941Z",
		"size": 251,
		"path": "../public/assets/external-link-DXpbXH_S.js"
	},
	"/assets/faq-AOz9F5sf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f67-4lpbwicTd3nvpKwpF2A7xg1BMmI\"",
		"mtime": "2026-10-09T15:56:48.967Z",
		"size": 8039,
		"path": "../public/assets/faq-AOz9F5sf.js"
	},
	"/assets/file-text-DbaPDUQO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-lMVZJwEbVGJlp74XgGVvgRLR5xg\"",
		"mtime": "2026-10-09T15:56:48.969Z",
		"size": 385,
		"path": "../public/assets/file-text-DbaPDUQO.js"
	},
	"/assets/heart-DxojjBdO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1e-HjPHXg65HGMRIlE/zgZ5g4Kok4M\"",
		"mtime": "2026-10-09T15:56:48.970Z",
		"size": 2590,
		"path": "../public/assets/heart-DxojjBdO.js"
	},
	"/assets/link-C0Ue2dSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b29-u4WSramlF7SprNBiVabjwKE9O8E\"",
		"mtime": "2026-10-09T15:56:48.972Z",
		"size": 23337,
		"path": "../public/assets/link-C0Ue2dSg.js"
	},
	"/assets/lock-B1G1YU99.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-gOyOG9MeWsQWWop/fubHnLRkuL0\"",
		"mtime": "2026-10-09T15:56:48.976Z",
		"size": 206,
		"path": "../public/assets/lock-B1G1YU99.js"
	},
	"/assets/login-Bi7ShyEe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d59-8kWaDScSzXlEHSVisuVSloI8zaY\"",
		"mtime": "2026-10-09T15:56:48.977Z",
		"size": 7513,
		"path": "../public/assets/login-Bi7ShyEe.js"
	},
	"/assets/mail-B-ZlPB2f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-fJVI3MvSgt0QhUad89ptgmmZlOo\"",
		"mtime": "2026-10-09T15:56:48.984Z",
		"size": 213,
		"path": "../public/assets/mail-B-ZlPB2f.js"
	},
	"/assets/map-pin-B77yEw0C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-uXnFmbu90k2x5FQrx5eJnGapXcY\"",
		"mtime": "2026-10-09T15:56:48.984Z",
		"size": 259,
		"path": "../public/assets/map-pin-B77yEw0C.js"
	},
	"/assets/message-circle-_EtW_buc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-6LUbEbrPClmuG2h9jC8FwyoCd7I\"",
		"mtime": "2026-10-09T15:56:49.004Z",
		"size": 241,
		"path": "../public/assets/message-circle-_EtW_buc.js"
	},
	"/assets/phone-DvEYf9n1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-I1FwXunQXf3GshOG7eHO1Bt7+5M\"",
		"mtime": "2026-10-09T15:56:49.008Z",
		"size": 322,
		"path": "../public/assets/phone-DvEYf9n1.js"
	},
	"/assets/pen-Cg7FoBIk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-xbYmEiiTdp+P3obbXB7EnXSGuYI\"",
		"mtime": "2026-10-09T15:56:49.006Z",
		"size": 235,
		"path": "../public/assets/pen-Cg7FoBIk.js"
	},
	"/assets/preload-helper-iHvirpW0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1833-3zu131L3BqS3lQc3zKukWDyd3vc\"",
		"mtime": "2026-10-09T15:56:49.027Z",
		"size": 6195,
		"path": "../public/assets/preload-helper-iHvirpW0.js"
	},
	"/assets/privacy-DCGAlKpX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1170-8OmwKDdCqYuMZSTXh0io5k2vFXw\"",
		"mtime": "2026-10-09T15:56:49.027Z",
		"size": 4464,
		"path": "../public/assets/privacy-DCGAlKpX.js"
	},
	"/assets/refresh-cw-DtWgt4JG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-4DmitWzXMpTTyYBzkGVXzvrS/KQ\"",
		"mtime": "2026-10-09T15:56:49.027Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-DtWgt4JG.js"
	},
	"/assets/search-ZdRFKx_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-YF32VKBkdtg91oF585XNZBASGSE\"",
		"mtime": "2026-10-09T15:56:49.029Z",
		"size": 312,
		"path": "../public/assets/search-ZdRFKx_Z.js"
	},
	"/assets/routes-D34AvAzv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84f0-9K1XbGrqmU1IPkFB6xv5JkX2CQk\"",
		"mtime": "2026-10-09T15:56:49.027Z",
		"size": 34032,
		"path": "../public/assets/routes-D34AvAzv.js"
	},
	"/assets/send-Cfmi2fHe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-CO9G7twhd0+OIXYpQSdQgoVCnQI\"",
		"mtime": "2026-10-09T15:56:49.030Z",
		"size": 290,
		"path": "../public/assets/send-Cfmi2fHe.js"
	},
	"/assets/shield-check-Bt3iXmR7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-xDaMjSJEAqzBEA1pchnF411O4QY\"",
		"mtime": "2026-10-09T15:56:49.030Z",
		"size": 320,
		"path": "../public/assets/shield-check-Bt3iXmR7.js"
	},
	"/assets/shop-Bo4xyL82.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40a1-ggmYGZGxc92nZTEHt0v/VlJLLy0\"",
		"mtime": "2026-10-09T15:56:49.038Z",
		"size": 16545,
		"path": "../public/assets/shop-Bo4xyL82.js"
	},
	"/assets/shop-Ddfw9TEA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"603-JsNtFL00TZN7PgfbFlkQnaJQgIM\"",
		"mtime": "2026-10-09T15:56:49.107Z",
		"size": 1539,
		"path": "../public/assets/shop-Ddfw9TEA.js"
	},
	"/assets/sparkles-CBbWNjyW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-WcIrKgIZqlK+RpU+GWeFAwPXWzk\"",
		"mtime": "2026-10-09T15:56:49.107Z",
		"size": 494,
		"path": "../public/assets/sparkles-CBbWNjyW.js"
	},
	"/assets/index-CncKKbNh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b9ef-INU0eYjNpajEaTILKPT1Z3uq9Xc\"",
		"mtime": "2026-10-09T15:56:48.870Z",
		"size": 440815,
		"path": "../public/assets/index-CncKKbNh.js"
	},
	"/assets/tag-CEYL6Xjy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f-jOgSl5UezjHE3D7qCyFgHH3yp4k\"",
		"mtime": "2026-10-09T15:56:49.107Z",
		"size": 1103,
		"path": "../public/assets/tag-CEYL6Xjy.js"
	},
	"/assets/styles-zOq_YHtb.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2b467-cDXrGVKkCZTnagbqsD8i934q2Ws\"",
		"mtime": "2026-10-09T15:56:49.222Z",
		"size": 177255,
		"path": "../public/assets/styles-zOq_YHtb.css"
	},
	"/assets/tax-invoice-modal-FFGbZqk_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ddb-Q89GdVN4BePaRqwaf3k9EaI9BZU\"",
		"mtime": "2026-10-09T15:56:49.107Z",
		"size": 11739,
		"path": "../public/assets/tax-invoice-modal-FFGbZqk_.js"
	},
	"/assets/terms-B830jnIc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b0-hB7HZ2TorzMN8rcX4IGWnJVm24I\"",
		"mtime": "2026-10-09T15:56:49.107Z",
		"size": 4272,
		"path": "../public/assets/terms-B830jnIc.js"
	},
	"/assets/truck-B5JrKxMy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-9rhlllCi/FOilzSpx+s1Jbm5QGk\"",
		"mtime": "2026-10-09T15:56:49.174Z",
		"size": 406,
		"path": "../public/assets/truck-B5JrKxMy.js"
	},
	"/assets/useNavigate-BkUnIIsL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-lHuiKdVy6veiCPP7SLNZOxbvS0k\"",
		"mtime": "2026-10-09T15:56:49.220Z",
		"size": 228,
		"path": "../public/assets/useNavigate-BkUnIIsL.js"
	},
	"/assets/users-rvqwauhd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-9/whDRHZHf/V4zkIAFS8Yz1CcE8\"",
		"mtime": "2026-10-09T15:56:49.220Z",
		"size": 306,
		"path": "../public/assets/users-rvqwauhd.js"
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
