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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1b31-65Uq7dRre8XCGONji1t0BIMOqvs\"",
		"mtime": "2026-09-19T11:15:11.329Z",
		"size": 6961,
		"path": "../public/favicon.ico"
	},
	"/assets/account-Cwe2DB1m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"683c-wonoJuifgA0z8nhq024xaVRQ1zw\"",
		"mtime": "2026-10-09T04:51:32.564Z",
		"size": 26684,
		"path": "../public/assets/account-Cwe2DB1m.js"
	},
	"/assets/about-lrZQSPdm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2893-Bc9F7F1Aodhm3pTk1G+B3PpJt/0\"",
		"mtime": "2026-10-09T04:51:32.564Z",
		"size": 10387,
		"path": "../public/assets/about-lrZQSPdm.js"
	},
	"/assets/account-Do0Mi4JR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"391-9g4xbE17o198bK9CtBf337OhkEU\"",
		"mtime": "2026-10-09T04:51:32.564Z",
		"size": 913,
		"path": "../public/assets/account-Do0Mi4JR.js"
	},
	"/assets/api-Cx3o6577.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"350f-wfqCCWgUeXEY/idckWFyWSBLV1o\"",
		"mtime": "2026-10-09T04:51:32.569Z",
		"size": 13583,
		"path": "../public/assets/api-Cx3o6577.js"
	},
	"/assets/admin-BdwuEp_I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8ed-CwHjPnl20CV1/i1yXqEHRPOcJ9o\"",
		"mtime": "2026-10-09T04:51:32.564Z",
		"size": 59629,
		"path": "../public/assets/admin-BdwuEp_I.js"
	},
	"/assets/arrow-right-CiUACkXZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-iAHhr4JxD+ijpbK64Nkt6tNoQwQ\"",
		"mtime": "2026-10-09T04:51:32.570Z",
		"size": 165,
		"path": "../public/assets/arrow-right-CiUACkXZ.js"
	},
	"/assets/arrow-left-DR_a9xUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-TBJMCbNkzeLPqVjLCZZ1kQ+tpUA\"",
		"mtime": "2026-10-09T04:51:32.569Z",
		"size": 165,
		"path": "../public/assets/arrow-left-DR_a9xUw.js"
	},
	"/assets/auth-D-GKnnSu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"496-35HbnYYFWtAXtqORPZr6LAljeCM\"",
		"mtime": "2026-10-09T04:51:32.572Z",
		"size": 1174,
		"path": "../public/assets/auth-D-GKnnSu.js"
	},
	"/assets/book-card-e3qSk4_c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55e6-cZQktnMTqnYhetlsGODHBZ42SQA\"",
		"mtime": "2026-10-09T04:51:32.576Z",
		"size": 21990,
		"path": "../public/assets/book-card-e3qSk4_c.js"
	},
	"/assets/book-open-CVw-I5P1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-YGCvsH3DjEPUGHWwUNWd2EMxGO8\"",
		"mtime": "2026-10-09T04:51:32.577Z",
		"size": 279,
		"path": "../public/assets/book-open-CVw-I5P1.js"
	},
	"/assets/button-DGqueH1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f42-xBt5qQJsuZOjUKwr1sQsCe2PLVs\"",
		"mtime": "2026-10-09T04:51:32.578Z",
		"size": 32578,
		"path": "../public/assets/button-DGqueH1g.js"
	},
	"/assets/cart-B2HHY52X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79c-f5OArNOS0jjloWDr3rUYXuotMp0\"",
		"mtime": "2026-10-09T04:51:32.578Z",
		"size": 1948,
		"path": "../public/assets/cart-B2HHY52X.js"
	},
	"/assets/admin-BxMUny_p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"245a5-u/t/+nFXrX9f6exQtkQis4Fsu90\"",
		"mtime": "2026-10-09T04:51:32.568Z",
		"size": 148901,
		"path": "../public/assets/admin-BxMUny_p.js"
	},
	"/assets/chevron-down-BnvS7aMP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-NyheRfBwAOkEJ3cEEIuZbVpcyBg\"",
		"mtime": "2026-10-09T04:51:32.579Z",
		"size": 128,
		"path": "../public/assets/chevron-down-BnvS7aMP.js"
	},
	"/assets/circle-check-Co11zhBR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-xTE/HpLcNnRpR9gFlTWffX8NEOw\"",
		"mtime": "2026-10-09T04:51:32.579Z",
		"size": 178,
		"path": "../public/assets/circle-check-Co11zhBR.js"
	},
	"/assets/clock-q0gNZWlP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-u2WD1jdvCNmPYxo8sX/L3RyLE2E\"",
		"mtime": "2026-10-09T04:51:32.580Z",
		"size": 169,
		"path": "../public/assets/clock-q0gNZWlP.js"
	},
	"/assets/contact-pyWvLVGX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2249-eoWLs6ehUqdT+uE6Byx3gxeL22o\"",
		"mtime": "2026-10-09T04:51:32.580Z",
		"size": 8777,
		"path": "../public/assets/contact-pyWvLVGX.js"
	},
	"/assets/createLucideIcon-BfZogB2V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a09-a8QXm/2I1TZdhi8+ATI4z9G77Vo\"",
		"mtime": "2026-10-09T04:51:32.581Z",
		"size": 18953,
		"path": "../public/assets/createLucideIcon-BfZogB2V.js"
	},
	"/assets/dialog-Cq4qu-h0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"918b-ji8YNfZszkNOZm98m2XpKeJsNWA\"",
		"mtime": "2026-10-09T04:51:32.581Z",
		"size": 37259,
		"path": "../public/assets/dialog-Cq4qu-h0.js"
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
	"/assets/dist-CzdFZCXt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82f1-Eg2Nv+4WScpgJbvBY6YJhM8Uh14\"",
		"mtime": "2026-10-09T04:51:32.627Z",
		"size": 33521,
		"path": "../public/assets/dist-CzdFZCXt.js"
	},
	"/assets/external-link-Cv28W478.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-hEcZdz3n9mmWJ9fVijS444x2pEs\"",
		"mtime": "2026-10-09T04:51:32.637Z",
		"size": 251,
		"path": "../public/assets/external-link-Cv28W478.js"
	},
	"/assets/faq-BB9m3mEw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f67-X5H3R0QrOSGtmUFpf7pOoXig1WA\"",
		"mtime": "2026-10-09T04:51:32.662Z",
		"size": 8039,
		"path": "../public/assets/faq-BB9m3mEw.js"
	},
	"/assets/file-text-BhQN5vPp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-SuAKMUnrlpW86L71jI/7XnYV8t4\"",
		"mtime": "2026-10-09T04:51:32.662Z",
		"size": 385,
		"path": "../public/assets/file-text-BhQN5vPp.js"
	},
	"/assets/heart-DJxHG2XH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d4b-IdxnwWwGza2O9YJ6uorz43m9vKc\"",
		"mtime": "2026-10-09T04:51:32.663Z",
		"size": 3403,
		"path": "../public/assets/heart-DJxHG2XH.js"
	},
	"/assets/link-BQhbMAEl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b29-ZRlc90CPlzLa+flliezrpk7UXdg\"",
		"mtime": "2026-10-09T04:51:32.663Z",
		"size": 23337,
		"path": "../public/assets/link-BQhbMAEl.js"
	},
	"/assets/login-DazjKSgd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dc7-wKtIEs7i4p0MSd6Wi+PFYR4Hqis\"",
		"mtime": "2026-10-09T04:51:32.663Z",
		"size": 7623,
		"path": "../public/assets/login-DazjKSgd.js"
	},
	"/assets/mail-D3emFCCY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-uYYnynT41AbdsajxoKu7R2bIfEI\"",
		"mtime": "2026-10-09T04:51:32.663Z",
		"size": 213,
		"path": "../public/assets/mail-D3emFCCY.js"
	},
	"/assets/map-pin-keqKJRd-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-Jm9RRaTQ6EezZXvWusw95sD3Hig\"",
		"mtime": "2026-10-09T04:51:32.664Z",
		"size": 259,
		"path": "../public/assets/map-pin-keqKJRd-.js"
	},
	"/assets/message-circle-BCMdgIo1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-fS0DDsPuG9UuUjx5vFzaFrHqZKQ\"",
		"mtime": "2026-10-09T04:51:32.664Z",
		"size": 241,
		"path": "../public/assets/message-circle-BCMdgIo1.js"
	},
	"/assets/pen-C4rwqR7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-SvDJK2pghyHEYv7xmuPsGUiJ+NM\"",
		"mtime": "2026-10-09T04:51:32.664Z",
		"size": 235,
		"path": "../public/assets/pen-C4rwqR7X.js"
	},
	"/assets/phone-Cn2i1kth.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-ogXmjvXIm9OBIU8UczYNUGTcBJA\"",
		"mtime": "2026-10-09T04:51:32.714Z",
		"size": 322,
		"path": "../public/assets/phone-Cn2i1kth.js"
	},
	"/assets/preload-helper-PYkFbxrK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1833-JcKOp50mtVjaa+AXsXqdHkAIrSE\"",
		"mtime": "2026-10-09T04:51:32.763Z",
		"size": 6195,
		"path": "../public/assets/preload-helper-PYkFbxrK.js"
	},
	"/assets/privacy-CCAkxVfD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1170-xOmXZI3RLfVBwxuis1u7KIZfQoA\"",
		"mtime": "2026-10-09T04:51:32.764Z",
		"size": 4464,
		"path": "../public/assets/privacy-CCAkxVfD.js"
	},
	"/assets/refresh-cw-CLRbSjy1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-/X48ciX9CLrxSa98fkBGjb93YEI\"",
		"mtime": "2026-10-09T04:51:32.764Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CLRbSjy1.js"
	},
	"/assets/routes-Cgr0IagI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83fa-xGtxyEpxnvu9m7x78AMQG4DLxgQ\"",
		"mtime": "2026-10-09T04:51:32.764Z",
		"size": 33786,
		"path": "../public/assets/routes-Cgr0IagI.js"
	},
	"/assets/search-HGcPZjpq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-N7wj82yn4dEL/kikhkAiXEtPDoo\"",
		"mtime": "2026-10-09T04:51:32.764Z",
		"size": 312,
		"path": "../public/assets/search-HGcPZjpq.js"
	},
	"/assets/send-Xz2UEHVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-4m7X6E3No7JMeu4ovdwEseD8kQ0\"",
		"mtime": "2026-10-09T04:51:32.765Z",
		"size": 290,
		"path": "../public/assets/send-Xz2UEHVr.js"
	},
	"/assets/shield-check-1fMsNNwi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-9FIKe1e/srW4AubCeyvhr8icpR0\"",
		"mtime": "2026-10-09T04:51:32.765Z",
		"size": 320,
		"path": "../public/assets/shield-check-1fMsNNwi.js"
	},
	"/assets/shop-91z8QwpT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3fab-kpY8qO2c5ZPozWvG+ESWwV6dPVc\"",
		"mtime": "2026-10-09T04:51:32.772Z",
		"size": 16299,
		"path": "../public/assets/shop-91z8QwpT.js"
	},
	"/assets/shop-DSgvl5JW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"620-ttA4hfg2QWzLYbKSkV2trFWa0Yw\"",
		"mtime": "2026-10-09T04:51:32.777Z",
		"size": 1568,
		"path": "../public/assets/shop-DSgvl5JW.js"
	},
	"/assets/index-C-E0RlGF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"684e2-Umu7ETpQk9fXkL8hnrK75Vg0DV0\"",
		"mtime": "2026-10-09T04:51:32.564Z",
		"size": 427234,
		"path": "../public/assets/index-C-E0RlGF.js"
	},
	"/assets/sparkles-Di7Nq1aI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-5YV7PZKSR9VxlM8HWiK4BR0In3A\"",
		"mtime": "2026-10-09T04:51:32.777Z",
		"size": 494,
		"path": "../public/assets/sparkles-Di7Nq1aI.js"
	},
	"/assets/tag-B_1aP3S8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f-+WE9fz8dIOa3sU36GP38RprKmO0\"",
		"mtime": "2026-10-09T04:51:32.784Z",
		"size": 1103,
		"path": "../public/assets/tag-B_1aP3S8.js"
	},
	"/assets/styles-CtLfByGS.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2a633-1uR7rZM9HvHoyjhWLeIwmTnbif0\"",
		"mtime": "2026-10-09T04:51:32.794Z",
		"size": 173619,
		"path": "../public/assets/styles-CtLfByGS.css"
	},
	"/assets/tax-invoice-modal-CdKx4N6I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2df9-29IJVhR9IdV6U8yonfZNkby3FPA\"",
		"mtime": "2026-10-09T04:51:32.785Z",
		"size": 11769,
		"path": "../public/assets/tax-invoice-modal-CdKx4N6I.js"
	},
	"/assets/terms-BL-V4rMK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b0-zYF1oth8I6ddbLE6d5s2fthTVBI\"",
		"mtime": "2026-10-09T04:51:32.785Z",
		"size": 4272,
		"path": "../public/assets/terms-BL-V4rMK.js"
	},
	"/assets/useNavigate-BoELgxfH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-Gp/kgpzpjzQ/7WRiP9jzLBLF77U\"",
		"mtime": "2026-10-09T04:51:32.794Z",
		"size": 228,
		"path": "../public/assets/useNavigate-BoELgxfH.js"
	},
	"/assets/truck-YO8mbBV9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-g5XBx52rxK800Tc6pUXk27edfTk\"",
		"mtime": "2026-10-09T04:51:32.792Z",
		"size": 406,
		"path": "../public/assets/truck-YO8mbBV9.js"
	},
	"/assets/users-BTrRfMos.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-DDoV2V1ECw1FLVQp+gOPVIDQa9Y\"",
		"mtime": "2026-10-09T04:51:32.794Z",
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
