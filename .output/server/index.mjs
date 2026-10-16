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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1b31-65Uq7dRre8XCGONji1t0BIMOqvs\"",
		"mtime": "2026-09-19T11:15:11.329Z",
		"size": 6961,
		"path": "../public/favicon.ico"
	},
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"289-bW/UjfYDYpckEAyVZTsIqkqNwM0\"",
		"mtime": "2026-09-19T11:15:11.331Z",
		"size": 649,
		"path": "../public/favicon-32x32.png"
	},
	"/assets/about-D9rqwbY1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2894-eBiUtatZVj+K6ym+18jC6gTAY2M\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 10388,
		"path": "../public/assets/about-D9rqwbY1.js"
	},
	"/assets/account-B58QJg6O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"606-AqhDkSXVDqF6C1v4OjLzNeaOaNQ\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 1542,
		"path": "../public/assets/account-B58QJg6O.js"
	},
	"/assets/account-Blr9waaX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89cd-I/kfMEVBCiLkS+iizt81PjB3u2E\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 35277,
		"path": "../public/assets/account-Blr9waaX.js"
	},
	"/assets/admin-BkIEmwVU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e910-g4dTXcuMDKLmu4HUCH5bVOolbLE\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 59664,
		"path": "../public/assets/admin-BkIEmwVU.js"
	},
	"/assets/arrow-left-D657_zWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-zbJazBvJyzvmbafhxD+tksCrngk\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 165,
		"path": "../public/assets/arrow-left-D657_zWR.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"7a-joAS1t4bCbDa6ixC5Oo85uYgtkk\"",
		"mtime": "2026-10-08T16:28:56.847Z",
		"size": 122,
		"path": "../public/robots.txt"
	},
	"/assets/api-BczvAxZQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca24-nMGkxsaucbDIp9M9BRQAHGv3vs4\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 51748,
		"path": "../public/assets/api-BczvAxZQ.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"a2d-M3pryDVwgd2HPWki2kHOR1PBDCE\"",
		"mtime": "2026-09-19T10:40:31.356Z",
		"size": 2605,
		"path": "../public/favicon.svg"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"4e6-s4LuoxfyAWKaML/YVuxonqFr3lg\"",
		"mtime": "2026-10-08T16:28:48.582Z",
		"size": 1254,
		"path": "../public/sitemap.xml"
	},
	"/assets/auth-rLjvRwDH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"496-svSpXdjU14oQ2C8lXondTsWhLeo\"",
		"mtime": "2026-10-16T11:57:22.048Z",
		"size": 1174,
		"path": "../public/assets/auth-rLjvRwDH.js"
	},
	"/assets/arrow-right-BFNVlEkZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-lxx3HER6v+cKqPp38+v3fkvEzVE\"",
		"mtime": "2026-10-16T11:57:22.048Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BFNVlEkZ.js"
	},
	"/assets/book-open-BxfErSFW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-3cydxVYM9aVuAE7huVXQ7sTaA4E\"",
		"mtime": "2026-10-16T11:57:22.048Z",
		"size": 279,
		"path": "../public/assets/book-open-BxfErSFW.js"
	},
	"/assets/admin-DbURec5B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"293f4-JTHeMcXUxBksGDfRjUFD9eK8/lk\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 168948,
		"path": "../public/assets/admin-DbURec5B.js"
	},
	"/assets/book-card-C044w1Lr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6644-u5FUUo+qAwtAttIwTPjbtlXC7aE\"",
		"mtime": "2026-10-16T11:57:22.048Z",
		"size": 26180,
		"path": "../public/assets/book-card-C044w1Lr.js"
	},
	"/assets/button-ybd-lUh1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f42-Wpet+SNskxf+k/PR5M/wva1a+rA\"",
		"mtime": "2026-10-16T11:57:22.050Z",
		"size": 32578,
		"path": "../public/assets/button-ybd-lUh1.js"
	},
	"/assets/cart-C4xKSBs3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16c1-xJLlX7s+q2JDNGgxk4c3z17tN4U\"",
		"mtime": "2026-10-16T11:57:22.050Z",
		"size": 5825,
		"path": "../public/assets/cart-C4xKSBs3.js"
	},
	"/assets/chevron-down-CqmVxOgp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-px9aAjt5Nk305OEIsJ1vWf33vCY\"",
		"mtime": "2026-10-16T11:57:22.052Z",
		"size": 128,
		"path": "../public/assets/chevron-down-CqmVxOgp.js"
	},
	"/assets/chevron-right-DNBjKhd-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-tfrsI1i5qwTp0UeVKcQeKmmEVRw\"",
		"mtime": "2026-10-16T11:57:22.052Z",
		"size": 130,
		"path": "../public/assets/chevron-right-DNBjKhd-.js"
	},
	"/assets/circle-check-CW1fUXqY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-MwIHLr7893HoXrG8axQNAUZTu94\"",
		"mtime": "2026-10-16T11:57:22.052Z",
		"size": 178,
		"path": "../public/assets/circle-check-CW1fUXqY.js"
	},
	"/assets/contact-C6jYGKCf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d5-RPRnutkE6Y6+/BRZyhxzp3k2VIQ\"",
		"mtime": "2026-10-16T11:57:22.052Z",
		"size": 9941,
		"path": "../public/assets/contact-C6jYGKCf.js"
	},
	"/assets/clock-VNp5POHz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-yc+JAFUCmbJ6hVSaq+kEhdY/n74\"",
		"mtime": "2026-10-16T11:57:22.052Z",
		"size": 169,
		"path": "../public/assets/clock-VNp5POHz.js"
	},
	"/assets/createLucideIcon-B0PJLGQl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55fe-+L5FfgjbLTKge/VfV8N1oT1d9Ds\"",
		"mtime": "2026-10-16T11:57:22.054Z",
		"size": 22014,
		"path": "../public/assets/createLucideIcon-B0PJLGQl.js"
	},
	"/assets/dialog-DGvMpqfJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"918f-B2LghphEYomsuaiSJh1OWmXAXyk\"",
		"mtime": "2026-10-16T11:57:22.054Z",
		"size": 37263,
		"path": "../public/assets/dialog-DGvMpqfJ.js"
	},
	"/assets/faq-BJhuBMVD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f82-m7iquGiivNha48R39HmY3aBfZRI\"",
		"mtime": "2026-10-16T11:57:22.054Z",
		"size": 8066,
		"path": "../public/assets/faq-BJhuBMVD.js"
	},
	"/assets/external-link-DXpbXH_S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-9LdjejyjM8PwISxIkVI/a+tZXrw\"",
		"mtime": "2026-10-16T11:57:22.054Z",
		"size": 251,
		"path": "../public/assets/external-link-DXpbXH_S.js"
	},
	"/assets/file-text-DbaPDUQO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-lMVZJwEbVGJlp74XgGVvgRLR5xg\"",
		"mtime": "2026-10-16T11:57:22.054Z",
		"size": 385,
		"path": "../public/assets/file-text-DbaPDUQO.js"
	},
	"/assets/heart-O8AYb3II.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1e-/VxDxoPGnXEOBcEqvFRR//Q9qP0\"",
		"mtime": "2026-10-16T11:57:22.054Z",
		"size": 2590,
		"path": "../public/assets/heart-O8AYb3II.js"
	},
	"/assets/link-C0Ue2dSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b29-u4WSramlF7SprNBiVabjwKE9O8E\"",
		"mtime": "2026-10-16T11:57:22.073Z",
		"size": 23337,
		"path": "../public/assets/link-C0Ue2dSg.js"
	},
	"/assets/lock-B1G1YU99.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-gOyOG9MeWsQWWop/fubHnLRkuL0\"",
		"mtime": "2026-10-16T11:57:22.082Z",
		"size": 206,
		"path": "../public/assets/lock-B1G1YU99.js"
	},
	"/assets/login-CHHfy0q9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eac-WgHZpML145a8vck96GhlefqzpUk\"",
		"mtime": "2026-10-16T11:57:22.082Z",
		"size": 7852,
		"path": "../public/assets/login-CHHfy0q9.js"
	},
	"/assets/mail-B-ZlPB2f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-fJVI3MvSgt0QhUad89ptgmmZlOo\"",
		"mtime": "2026-10-16T11:57:22.082Z",
		"size": 213,
		"path": "../public/assets/mail-B-ZlPB2f.js"
	},
	"/assets/map-pin-B77yEw0C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-uXnFmbu90k2x5FQrx5eJnGapXcY\"",
		"mtime": "2026-10-16T11:57:22.082Z",
		"size": 259,
		"path": "../public/assets/map-pin-B77yEw0C.js"
	},
	"/assets/message-circle-_EtW_buc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-6LUbEbrPClmuG2h9jC8FwyoCd7I\"",
		"mtime": "2026-10-16T11:57:22.082Z",
		"size": 241,
		"path": "../public/assets/message-circle-_EtW_buc.js"
	},
	"/assets/message-square-D77QJ39a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-cLzzOlM23xZ5Q9LLwPmguq62EiY\"",
		"mtime": "2026-10-16T11:57:22.082Z",
		"size": 233,
		"path": "../public/assets/message-square-D77QJ39a.js"
	},
	"/assets/order-tracker-modal-DmSRIsJH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"201c-kVn4GsTTvpUhvSk6u2uI1PKXwV4\"",
		"mtime": "2026-10-16T11:57:22.102Z",
		"size": 8220,
		"path": "../public/assets/order-tracker-modal-DmSRIsJH.js"
	},
	"/assets/pen-Cg7FoBIk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-xbYmEiiTdp+P3obbXB7EnXSGuYI\"",
		"mtime": "2026-10-16T11:57:22.113Z",
		"size": 235,
		"path": "../public/assets/pen-Cg7FoBIk.js"
	},
	"/assets/pincode-delivery-checker-DlXiRHl9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6b-OqkM74QpnrGnv3xMqodpJXhW1IE\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 3947,
		"path": "../public/assets/pincode-delivery-checker-DlXiRHl9.js"
	},
	"/assets/preload-helper-iHvirpW0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1833-3zu131L3BqS3lQc3zKukWDyd3vc\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 6195,
		"path": "../public/assets/preload-helper-iHvirpW0.js"
	},
	"/assets/refresh-cw-DtWgt4JG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-4DmitWzXMpTTyYBzkGVXzvrS/KQ\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-DtWgt4JG.js"
	},
	"/assets/privacy-CoCehXdL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1174-P9CFJdnCfJaw7CjZlA1c0gzpp0A\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 4468,
		"path": "../public/assets/privacy-CoCehXdL.js"
	},
	"/assets/routes-DV4a5hkk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8dc3-ATedi1p5n2pPI7lSV0zH/n6SV+E\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 36291,
		"path": "../public/assets/routes-DV4a5hkk.js"
	},
	"/assets/index-C2VWTKV3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bf00-aCTGz+VJTUbVpPK5zjmJFHvcc7U\"",
		"mtime": "2026-10-16T11:57:22.043Z",
		"size": 442112,
		"path": "../public/assets/index-C2VWTKV3.js"
	},
	"/assets/send-Cfmi2fHe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-CO9G7twhd0+OIXYpQSdQgoVCnQI\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 290,
		"path": "../public/assets/send-Cfmi2fHe.js"
	},
	"/assets/shield-check-Bt3iXmR7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-xDaMjSJEAqzBEA1pchnF411O4QY\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 320,
		"path": "../public/assets/shield-check-Bt3iXmR7.js"
	},
	"/assets/shop-gmDe2B00.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f75-OlTQeSLgJffE5801F0MqWphL4+w\"",
		"mtime": "2026-10-16T11:57:22.116Z",
		"size": 20341,
		"path": "../public/assets/shop-gmDe2B00.js"
	},
	"/assets/shop-D9rAx3xD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2805-jBFSi9fdNXhUyXKhBplkjMnjXio\"",
		"mtime": "2026-10-16T11:57:22.114Z",
		"size": 10245,
		"path": "../public/assets/shop-D9rAx3xD.js"
	},
	"/assets/package-y-iJ1XOg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22b-TTCUnT/q+lVsl3IMGAektFvGrPo\"",
		"mtime": "2026-10-16T11:57:22.113Z",
		"size": 555,
		"path": "../public/assets/package-y-iJ1XOg.js"
	},
	"/assets/shopping-bag-DPGvLuFo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b8-PeayyVJfL0QwWePJnUREBsDKSgo\"",
		"mtime": "2026-10-16T11:57:22.116Z",
		"size": 440,
		"path": "../public/assets/shopping-bag-DPGvLuFo.js"
	},
	"/assets/sparkles-CBbWNjyW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-WcIrKgIZqlK+RpU+GWeFAwPXWzk\"",
		"mtime": "2026-10-16T11:57:22.116Z",
		"size": 494,
		"path": "../public/assets/sparkles-CBbWNjyW.js"
	},
	"/assets/tag-CEYL6Xjy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f-jOgSl5UezjHE3D7qCyFgHH3yp4k\"",
		"mtime": "2026-10-16T11:57:22.116Z",
		"size": 1103,
		"path": "../public/assets/tag-CEYL6Xjy.js"
	},
	"/assets/tax-invoice-modal-DHJDMdk4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ca1-25mF207UCR6ITl7mQEAGMnO/Xqs\"",
		"mtime": "2026-10-16T11:57:22.116Z",
		"size": 11425,
		"path": "../public/assets/tax-invoice-modal-DHJDMdk4.js"
	},
	"/assets/terms-2qjKatFk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b4-w528IF1ihp46REO65SYwLb9fzYQ\"",
		"mtime": "2026-10-16T11:57:22.131Z",
		"size": 4276,
		"path": "../public/assets/terms-2qjKatFk.js"
	},
	"/assets/truck-B5JrKxMy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-9rhlllCi/FOilzSpx+s1Jbm5QGk\"",
		"mtime": "2026-10-16T11:57:22.136Z",
		"size": 406,
		"path": "../public/assets/truck-B5JrKxMy.js"
	},
	"/assets/useNavigate-BkUnIIsL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-lHuiKdVy6veiCPP7SLNZOxbvS0k\"",
		"mtime": "2026-10-16T11:57:22.136Z",
		"size": 228,
		"path": "../public/assets/useNavigate-BkUnIIsL.js"
	},
	"/assets/users-rvqwauhd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-9/whDRHZHf/V4zkIAFS8Yz1CcE8\"",
		"mtime": "2026-10-16T11:57:22.136Z",
		"size": 306,
		"path": "../public/assets/users-rvqwauhd.js"
	},
	"/assets/styles-CGBiytXc.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2feaa-UGDiwIdwLW/LYauTulzgT78aA3o\"",
		"mtime": "2026-10-16T11:57:22.141Z",
		"size": 196266,
		"path": "../public/assets/styles-CGBiytXc.css"
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
