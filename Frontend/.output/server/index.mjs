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
	"/assets/about-OkUlnKOg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2893-yQ2hCFSWub1BFGGR57hirOS9Nwg\"",
		"mtime": "2026-10-09T10:56:58.300Z",
		"size": 10387,
		"path": "../public/assets/about-OkUlnKOg.js"
	},
	"/assets/account-Cp5UPr6k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"538-sLWnO9zuhIH4/4n09D/RehVPgxY\"",
		"mtime": "2026-10-09T10:56:58.301Z",
		"size": 1336,
		"path": "../public/assets/account-Cp5UPr6k.js"
	},
	"/assets/account-CTDRNPS6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ad9-WADu2j/4T8n5mW+eGuLK3D8nMac\"",
		"mtime": "2026-10-09T10:56:58.300Z",
		"size": 31449,
		"path": "../public/assets/account-CTDRNPS6.js"
	},
	"/assets/admin-D24xhwQW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8d0-yH93OtaRrUKMCfKdEwZ8m/ptzXY\"",
		"mtime": "2026-10-09T10:56:58.303Z",
		"size": 59600,
		"path": "../public/assets/admin-D24xhwQW.js"
	},
	"/assets/api-DxkOHvTU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4f0-xbcd27AmaKwv+3aKq3YNZ30CUNQ\"",
		"mtime": "2026-10-09T10:56:58.303Z",
		"size": 50416,
		"path": "../public/assets/api-DxkOHvTU.js"
	},
	"/assets/arrow-left-DR_a9xUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-TBJMCbNkzeLPqVjLCZZ1kQ+tpUA\"",
		"mtime": "2026-10-09T10:56:58.305Z",
		"size": 165,
		"path": "../public/assets/arrow-left-DR_a9xUw.js"
	},
	"/assets/admin-CrXYX1u7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28f1c-P4v1vPbr9iCovUnPcYWHPjY9poc\"",
		"mtime": "2026-10-09T10:56:58.301Z",
		"size": 167708,
		"path": "../public/assets/admin-CrXYX1u7.js"
	},
	"/assets/arrow-right-CiUACkXZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-iAHhr4JxD+ijpbK64Nkt6tNoQwQ\"",
		"mtime": "2026-10-09T10:56:58.305Z",
		"size": 165,
		"path": "../public/assets/arrow-right-CiUACkXZ.js"
	},
	"/assets/auth-C0i9j3TU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"496-gQ8fxWWQLNaSwx6b1IbKg9+A1ug\"",
		"mtime": "2026-10-09T10:56:58.305Z",
		"size": 1174,
		"path": "../public/assets/auth-C0i9j3TU.js"
	},
	"/assets/book-card-Cgn4QKuv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61c7-3DtlXRCEhVs+KeMLQcDMaHgth34\"",
		"mtime": "2026-10-09T10:56:58.305Z",
		"size": 25031,
		"path": "../public/assets/book-card-Cgn4QKuv.js"
	},
	"/assets/book-open-CVw-I5P1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-YGCvsH3DjEPUGHWwUNWd2EMxGO8\"",
		"mtime": "2026-10-09T10:56:58.305Z",
		"size": 279,
		"path": "../public/assets/book-open-CVw-I5P1.js"
	},
	"/assets/button-DGqueH1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f42-xBt5qQJsuZOjUKwr1sQsCe2PLVs\"",
		"mtime": "2026-10-09T10:56:58.307Z",
		"size": 32578,
		"path": "../public/assets/button-DGqueH1g.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"7a-joAS1t4bCbDa6ixC5Oo85uYgtkk\"",
		"mtime": "2026-10-08T16:28:56.847Z",
		"size": 122,
		"path": "../public/robots.txt"
	},
	"/assets/cart-DVjS5ynR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167c-w2sZvyfEGnGL2dCRaNV/RzH2rwM\"",
		"mtime": "2026-10-09T10:56:58.307Z",
		"size": 5756,
		"path": "../public/assets/cart-DVjS5ynR.js"
	},
	"/assets/chevron-down-BnvS7aMP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-NyheRfBwAOkEJ3cEEIuZbVpcyBg\"",
		"mtime": "2026-10-09T10:56:58.307Z",
		"size": 128,
		"path": "../public/assets/chevron-down-BnvS7aMP.js"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"4e6-s4LuoxfyAWKaML/YVuxonqFr3lg\"",
		"mtime": "2026-10-08T16:28:48.582Z",
		"size": 1254,
		"path": "../public/sitemap.xml"
	},
	"/assets/circle-check-Co11zhBR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-xTE/HpLcNnRpR9gFlTWffX8NEOw\"",
		"mtime": "2026-10-09T10:56:58.307Z",
		"size": 178,
		"path": "../public/assets/circle-check-Co11zhBR.js"
	},
	"/assets/clock-q0gNZWlP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-u2WD1jdvCNmPYxo8sX/L3RyLE2E\"",
		"mtime": "2026-10-09T10:56:58.307Z",
		"size": 169,
		"path": "../public/assets/clock-q0gNZWlP.js"
	},
	"/assets/contact-BqiMbmNf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2229-alcbE2+3+h9uNXKiFnSLOjH8B4c\"",
		"mtime": "2026-10-09T10:56:58.307Z",
		"size": 8745,
		"path": "../public/assets/contact-BqiMbmNf.js"
	},
	"/assets/createLucideIcon-BfZogB2V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a09-a8QXm/2I1TZdhi8+ATI4z9G77Vo\"",
		"mtime": "2026-10-09T10:56:58.320Z",
		"size": 18953,
		"path": "../public/assets/createLucideIcon-BfZogB2V.js"
	},
	"/assets/dialog-Cq4qu-h0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"918b-ji8YNfZszkNOZm98m2XpKeJsNWA\"",
		"mtime": "2026-10-09T10:56:58.320Z",
		"size": 37259,
		"path": "../public/assets/dialog-Cq4qu-h0.js"
	},
	"/assets/external-link-Cv28W478.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-hEcZdz3n9mmWJ9fVijS444x2pEs\"",
		"mtime": "2026-10-09T10:56:58.320Z",
		"size": 251,
		"path": "../public/assets/external-link-Cv28W478.js"
	},
	"/assets/heart-Br4dmbPQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a3-yEFZZPc9uDU6+rEFeQuFnQ6pkMA\"",
		"mtime": "2026-10-09T10:56:58.356Z",
		"size": 1955,
		"path": "../public/assets/heart-Br4dmbPQ.js"
	},
	"/assets/file-text-BhQN5vPp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-SuAKMUnrlpW86L71jI/7XnYV8t4\"",
		"mtime": "2026-10-09T10:56:58.346Z",
		"size": 385,
		"path": "../public/assets/file-text-BhQN5vPp.js"
	},
	"/assets/faq-BB9m3mEw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f67-X5H3R0QrOSGtmUFpf7pOoXig1WA\"",
		"mtime": "2026-10-09T10:56:58.320Z",
		"size": 8039,
		"path": "../public/assets/faq-BB9m3mEw.js"
	},
	"/assets/link-BQhbMAEl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b29-ZRlc90CPlzLa+flliezrpk7UXdg\"",
		"mtime": "2026-10-09T10:56:58.356Z",
		"size": 23337,
		"path": "../public/assets/link-BQhbMAEl.js"
	},
	"/assets/login-BqBdV-Oe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d59-EWjQQPGw7aFuaas0H5laUqvWfqc\"",
		"mtime": "2026-10-09T10:56:58.357Z",
		"size": 7513,
		"path": "../public/assets/login-BqBdV-Oe.js"
	},
	"/assets/map-pin-keqKJRd-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-Jm9RRaTQ6EezZXvWusw95sD3Hig\"",
		"mtime": "2026-10-09T10:56:58.357Z",
		"size": 259,
		"path": "../public/assets/map-pin-keqKJRd-.js"
	},
	"/assets/mail-D3emFCCY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-uYYnynT41AbdsajxoKu7R2bIfEI\"",
		"mtime": "2026-10-09T10:56:58.357Z",
		"size": 213,
		"path": "../public/assets/mail-D3emFCCY.js"
	},
	"/assets/message-circle-BCMdgIo1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-fS0DDsPuG9UuUjx5vFzaFrHqZKQ\"",
		"mtime": "2026-10-09T10:56:58.363Z",
		"size": 241,
		"path": "../public/assets/message-circle-BCMdgIo1.js"
	},
	"/assets/pen-C4rwqR7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-SvDJK2pghyHEYv7xmuPsGUiJ+NM\"",
		"mtime": "2026-10-09T10:56:58.375Z",
		"size": 235,
		"path": "../public/assets/pen-C4rwqR7X.js"
	},
	"/assets/lock-CEeFLh8R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-DP7OaloSQmeY9QvCTvn0qs0DBTM\"",
		"mtime": "2026-10-09T10:56:58.356Z",
		"size": 206,
		"path": "../public/assets/lock-CEeFLh8R.js"
	},
	"/assets/phone-Cn2i1kth.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-ogXmjvXIm9OBIU8UczYNUGTcBJA\"",
		"mtime": "2026-10-09T10:56:58.381Z",
		"size": 322,
		"path": "../public/assets/phone-Cn2i1kth.js"
	},
	"/assets/preload-helper-PYkFbxrK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1833-JcKOp50mtVjaa+AXsXqdHkAIrSE\"",
		"mtime": "2026-10-09T10:56:58.390Z",
		"size": 6195,
		"path": "../public/assets/preload-helper-PYkFbxrK.js"
	},
	"/assets/privacy-CCAkxVfD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1170-xOmXZI3RLfVBwxuis1u7KIZfQoA\"",
		"mtime": "2026-10-09T10:56:58.390Z",
		"size": 4464,
		"path": "../public/assets/privacy-CCAkxVfD.js"
	},
	"/assets/routes-Bn2muxmo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83fa-DPezXhoy2AnMC/0HTsQY4PWGVxc\"",
		"mtime": "2026-10-09T10:56:58.390Z",
		"size": 33786,
		"path": "../public/assets/routes-Bn2muxmo.js"
	},
	"/assets/search-HGcPZjpq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-N7wj82yn4dEL/kikhkAiXEtPDoo\"",
		"mtime": "2026-10-09T10:56:58.390Z",
		"size": 312,
		"path": "../public/assets/search-HGcPZjpq.js"
	},
	"/assets/send-Xz2UEHVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-4m7X6E3No7JMeu4ovdwEseD8kQ0\"",
		"mtime": "2026-10-09T10:56:58.392Z",
		"size": 290,
		"path": "../public/assets/send-Xz2UEHVr.js"
	},
	"/assets/shield-check-1fMsNNwi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-9FIKe1e/srW4AubCeyvhr8icpR0\"",
		"mtime": "2026-10-09T10:56:58.392Z",
		"size": 320,
		"path": "../public/assets/shield-check-1fMsNNwi.js"
	},
	"/assets/index-tHOj_KHR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ad56-yct2EOhWGGqJC39j0A1sKKW4sfU\"",
		"mtime": "2026-10-09T10:56:58.300Z",
		"size": 437590,
		"path": "../public/assets/index-tHOj_KHR.js"
	},
	"/assets/refresh-cw-CLRbSjy1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-/X48ciX9CLrxSa98fkBGjb93YEI\"",
		"mtime": "2026-10-09T10:56:58.390Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CLRbSjy1.js"
	},
	"/assets/shop-B8w23Ms7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3fab-xt6XNpYkLRTvOnTO39RojS5uBTc\"",
		"mtime": "2026-10-09T10:56:58.392Z",
		"size": 16299,
		"path": "../public/assets/shop-B8w23Ms7.js"
	},
	"/assets/shop-CJFpCFaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"603-+jT09w4MoXktIpZLDNlNifvUglg\"",
		"mtime": "2026-10-09T10:56:58.392Z",
		"size": 1539,
		"path": "../public/assets/shop-CJFpCFaI.js"
	},
	"/assets/sparkles-Di7Nq1aI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-5YV7PZKSR9VxlM8HWiK4BR0In3A\"",
		"mtime": "2026-10-09T10:56:58.392Z",
		"size": 494,
		"path": "../public/assets/sparkles-Di7Nq1aI.js"
	},
	"/assets/tag-B_1aP3S8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f-+WE9fz8dIOa3sU36GP38RprKmO0\"",
		"mtime": "2026-10-09T10:56:58.395Z",
		"size": 1103,
		"path": "../public/assets/tag-B_1aP3S8.js"
	},
	"/assets/styles-CQhSiMqF.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2b38d-JXtCXKe/c12LmUyD8AWN+UOp3TU\"",
		"mtime": "2026-10-09T10:56:58.395Z",
		"size": 177037,
		"path": "../public/assets/styles-CQhSiMqF.css"
	},
	"/assets/tax-invoice-modal-vNSJXyOE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ddb-A1KSi1vkY37pluQQcZSYiXHsQkk\"",
		"mtime": "2026-10-09T10:56:58.395Z",
		"size": 11739,
		"path": "../public/assets/tax-invoice-modal-vNSJXyOE.js"
	},
	"/assets/terms-BL-V4rMK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b0-zYF1oth8I6ddbLE6d5s2fthTVBI\"",
		"mtime": "2026-10-09T10:56:58.395Z",
		"size": 4272,
		"path": "../public/assets/terms-BL-V4rMK.js"
	},
	"/assets/truck-YO8mbBV9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-g5XBx52rxK800Tc6pUXk27edfTk\"",
		"mtime": "2026-10-09T10:56:58.395Z",
		"size": 406,
		"path": "../public/assets/truck-YO8mbBV9.js"
	},
	"/assets/useNavigate-BoELgxfH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-Gp/kgpzpjzQ/7WRiP9jzLBLF77U\"",
		"mtime": "2026-10-09T10:56:58.395Z",
		"size": 228,
		"path": "../public/assets/useNavigate-BoELgxfH.js"
	},
	"/assets/users-BTrRfMos.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-DDoV2V1ECw1FLVQp+gOPVIDQa9Y\"",
		"mtime": "2026-10-09T10:56:58.395Z",
		"size": 306,
		"path": "../public/assets/users-BTrRfMos.js"
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
