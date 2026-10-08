import { r as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DNBX1byj.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-CKfowhiz.mjs";
import { G as LoaderCircle, T as Printer, g as ShieldCheck, n as X, nt as FileText } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-C-FEQyPT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tax-invoice-modal-ChXmdkAa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TaxInvoiceModal({ orderId, open, onOpenChange }) {
	const [invoice, setInvoice] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const printRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open && orderId) {
			setLoading(true);
			api.getOrderInvoice(orderId).then((data) => setInvoice(data)).catch((err) => {
				toast.error("Failed to load invoice: " + (err instanceof Error ? err.message : "Error"));
				onOpenChange(false);
			}).finally(() => setLoading(false));
		}
	}, [open, orderId]);
	const handlePrint = () => {
		window.print();
	};
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl p-0 overflow-hidden bg-background text-foreground max-h-[92vh] flex flex-col rounded-2xl shadow-2xl border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 bg-muted/50 border-b border-border print:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-sm",
						children: ["Tax Invoice — ", invoice?.invoiceNo || orderId]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handlePrint,
						size: "sm",
						className: "bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), "Print / Save PDF"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onOpenChange(false),
						className: "p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-6 md:p-8 text-xs leading-relaxed bg-white text-slate-900 font-sans",
				ref: printRef,
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-20 flex flex-col items-center justify-center text-muted-foreground gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Generating Official Tax Invoice..." })]
				}) : invoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 max-w-2xl mx-auto printable-invoice",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b-2 border-slate-900 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-serif font-bold tracking-tight text-[#800020]",
									children: "SUCCESS BOOK HUB"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold text-slate-600 uppercase tracking-wider mt-0.5",
									children: "Tax Invoice / Bill of Supply / Cash Memo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 italic mt-0.5",
									children: "(Original for Recipient)"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-100 px-3 py-1.5 rounded border border-slate-200 inline-block text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-500 uppercase font-semibold",
										children: "Invoice Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold font-mono text-slate-900",
										children: invoice.invoiceNo
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500 block",
									children: "Order ID:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-slate-900 font-mono",
									children: invoice.orderId
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500 block",
									children: "Order Date:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-slate-800",
									children: new Date(invoice.orderDate).toLocaleDateString("en-IN", {
										day: "2-digit",
										month: "short",
										year: "numeric"
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500 block",
									children: "Payment Mode:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-slate-900 uppercase",
									children: invoice.paymentMethod
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500 block",
									children: "Order Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px] uppercase",
									children: invoice.status
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded-lg p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-[11px] pr-2 border-r border-slate-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-slate-900 uppercase tracking-wider text-[10px] text-primary",
										children: "Sold By (Seller):"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-slate-900 text-xs",
										children: invoice.seller.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-slate-600",
										children: invoice.seller.address
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-slate-600",
										children: [
											invoice.seller.city,
											", ",
											invoice.seller.state,
											" - ",
											invoice.seller.pincode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-1 text-slate-700",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "GSTIN:"
											}),
											" ",
											invoice.seller.gstin,
											" | ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "PAN:"
											}),
											" ",
											invoice.seller.pan
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-slate-600",
										children: ["Email: ", invoice.seller.email]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-slate-900 uppercase tracking-wider text-[10px] text-primary",
										children: "Billing & Shipping Address:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-slate-900 text-xs",
										children: invoice.buyer.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-slate-600",
										children: invoice.buyer.address
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-slate-600",
										children: [
											invoice.buyer.city,
											", ",
											invoice.buyer.state,
											" - ",
											invoice.buyer.pincode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-1 text-slate-700",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "Phone:"
											}),
											" ",
											invoice.buyer.phone
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-slate-600",
										children: ["Email: ", invoice.buyer.email]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-slate-500 text-[10px]",
										children: ["Type: ", invoice.buyer.addressType]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border border-slate-200 rounded-lg overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left border-collapse text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-slate-100 text-slate-700 font-semibold border-b border-slate-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2.5 w-8 text-center",
											children: "#"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2.5",
											children: "Description & Book Title"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2.5 w-16 text-center",
											children: "HSN"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2.5 w-12 text-center",
											children: "Qty"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2.5 w-20 text-right",
											children: "MRP (₹)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2.5 w-20 text-right",
											children: "Unit Price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2.5 w-20 text-right",
											children: "Total (₹)"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-slate-100",
									children: invoice.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-slate-50/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2.5 text-center text-slate-500",
												children: item.srNo
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-slate-900",
													children: item.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-slate-500",
													children: ["Author: ", item.author]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2.5 text-center font-mono text-slate-500",
												children: item.hsn
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2.5 text-center font-semibold text-slate-900",
												children: item.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2.5 text-right text-slate-500 line-through",
												children: ["₹", item.mrp]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2.5 text-right font-medium text-slate-800",
												children: ["₹", item.unitPrice]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2.5 text-right font-bold text-slate-900",
												children: ["₹", item.total]
											})
										]
									}, idx))
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row justify-between gap-6 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2 text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500 block font-semibold text-[10px] uppercase",
										children: "Amount in Words:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-slate-900 italic text-xs",
										children: invoice.pricing.totalInWords
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50 p-2.5 rounded border border-slate-200 text-[10px] text-slate-600 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tax Summary (5% GST for Printed Books):" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Taxable Value: ₹", invoice.pricing.taxableAmount] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["CGST (2.5%): ₹", invoice.pricing.cgst] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SGST (2.5%): ₹", invoice.pricing.sgst] })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-500 pt-2",
										children: "* This is a computer-generated tax invoice and does not require a physical signature."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full md:w-64 space-y-1.5 border border-slate-200 bg-slate-50/50 p-3 rounded-lg text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-slate-600",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total MRP:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", invoice.pricing.mrpTotal] })]
									}),
									invoice.pricing.discountTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-emerald-700 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Savings / Discount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["- ₹", invoice.pricing.discountTotal] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-slate-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Items Subtotal:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: ["₹", invoice.pricing.subtotal]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-slate-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery Charges:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: invoice.pricing.deliveryFee > 0 ? `₹${invoice.pricing.deliveryFee}` : "FREE" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t-2 border-slate-900 pt-2 mt-2 flex justify-between font-bold text-sm text-[#800020]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grand Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", invoice.pricing.total] })]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified 100% Original Quality Guarantee" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-slate-800",
									children: "For Success Book Hub Pvt Ltd"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-slate-500 italic mt-0.5",
									children: "Authorized Signatory"
								})]
							})]
						})
					]
				}) : null
			})]
		})
	});
}
//#endregion
export { TaxInvoiceModal as t };
