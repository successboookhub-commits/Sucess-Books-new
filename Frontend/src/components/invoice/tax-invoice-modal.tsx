import { useState, useEffect, useRef } from "react";
import { Printer, Download, X, CheckCircle2, ShieldCheck, Building, MapPin, Phone, Mail, FileText, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api, type TaxInvoiceData } from "@/lib/api";
import { toast } from "sonner";

interface TaxInvoiceModalProps {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaxInvoiceModal({ orderId, open, onOpenChange }: TaxInvoiceModalProps) {
  const [invoice, setInvoice] = useState<TaxInvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && orderId) {
      setLoading(true);
      api.getOrderInvoice(orderId)
        .then(data => setInvoice(data))
        .catch(err => {
          toast.error("Failed to load invoice: " + (err instanceof Error ? err.message : "Error"));
          onOpenChange(false);
        })
        .finally(() => setLoading(false));
    }
  }, [open, orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background text-foreground max-h-[92vh] flex flex-col rounded-2xl shadow-2xl border-border">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm">Tax Invoice — {invoice?.invoiceNo || orderId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg text-xs"
            >
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </Button>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 text-xs leading-relaxed bg-white text-slate-900 font-sans" ref={printRef}>
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Generating Official Tax Invoice...</p>
            </div>
          ) : invoice ? (
            <div className="space-y-6 max-w-2xl mx-auto printable-invoice">
              {/* Header Title */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold tracking-tight text-[#800020]">
                    SUCCESS BOOK HUB
                  </h1>
                  <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                    Tax Invoice / Bill of Supply / Cash Memo
                  </p>
                  <p className="text-[10px] text-slate-500 italic mt-0.5">
                    (Original for Recipient)
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-slate-100 px-3 py-1.5 rounded border border-slate-200 inline-block text-left">
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Invoice Number</div>
                    <div className="text-sm font-bold font-mono text-slate-900">{invoice.invoiceNo}</div>
                  </div>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Order ID:</span>
                  <span className="font-bold text-slate-900 font-mono">{invoice.orderId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Order Date:</span>
                  <span className="font-medium text-slate-800">
                    {new Date(invoice.orderDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Mode:</span>
                  <span className="font-semibold text-slate-900 uppercase">{invoice.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Order Status:</span>
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px] uppercase">
                    {invoice.status}
                  </span>
                </div>
              </div>

              {/* Seller & Buyer Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded-lg p-4">
                {/* Sold By */}
                <div className="space-y-1 text-[11px] pr-2 border-r border-slate-100">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-primary">
                    Sold By (Seller):
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{invoice.seller.name}</div>
                  <div className="text-slate-600">{invoice.seller.address}</div>
                  <div className="text-slate-600">{invoice.seller.city}, {invoice.seller.state} - {invoice.seller.pincode}</div>
                  <div className="pt-1 text-slate-700">
                    <span className="font-semibold">GSTIN:</span> {invoice.seller.gstin} | <span className="font-semibold">PAN:</span> {invoice.seller.pan}
                  </div>
                  <div className="text-slate-600">Email: {invoice.seller.email}</div>
                </div>

                {/* Billing / Shipping */}
                <div className="space-y-1 text-[11px]">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-primary">
                    Billing & Shipping Address:
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{invoice.buyer.name}</div>
                  <div className="text-slate-600">{invoice.buyer.address}</div>
                  <div className="text-slate-600">{invoice.buyer.city}, {invoice.buyer.state} - {invoice.buyer.pincode}</div>
                  <div className="pt-1 text-slate-700">
                    <span className="font-semibold">Phone:</span> {invoice.buyer.phone}
                  </div>
                  <div className="text-slate-600">Email: {invoice.buyer.email}</div>
                  <div className="text-slate-500 text-[10px]">Type: {invoice.buyer.addressType}</div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <th className="p-2.5 w-8 text-center">#</th>
                      <th className="p-2.5">Description & Book Title</th>
                      <th className="p-2.5 w-16 text-center">HSN</th>
                      <th className="p-2.5 w-12 text-center">Qty</th>
                      <th className="p-2.5 w-20 text-right">MRP (₹)</th>
                      <th className="p-2.5 w-20 text-right">Unit Price</th>
                      <th className="p-2.5 w-20 text-right">Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="p-2.5 text-center text-slate-500">{item.srNo}</td>
                        <td className="p-2.5">
                          <div className="font-semibold text-slate-900">{item.title}</div>
                          <div className="text-[10px] text-slate-500">Author: {item.author}</div>
                        </td>
                        <td className="p-2.5 text-center font-mono text-slate-500">{item.hsn}</td>
                        <td className="p-2.5 text-center font-semibold text-slate-900">{item.quantity}</td>
                        <td className="p-2.5 text-right text-slate-500 line-through">₹{item.mrp}</td>
                        <td className="p-2.5 text-right font-medium text-slate-800">₹{item.unitPrice}</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">₹{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Summary */}
              <div className="flex flex-col md:flex-row justify-between gap-6 pt-2">
                {/* Words Breakdown & Tax note */}
                <div className="flex-1 space-y-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block font-semibold text-[10px] uppercase">Amount in Words:</span>
                    <span className="font-bold text-slate-900 italic text-xs">
                      {invoice.pricing.totalInWords}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[10px] text-slate-600 space-y-1">
                    <div><strong>Tax Summary (5% GST for Printed Books):</strong></div>
                    <div className="flex justify-between">
                      <span>Taxable Value: ₹{invoice.pricing.taxableAmount}</span>
                      <span>CGST (2.5%): ₹{invoice.pricing.cgst}</span>
                      <span>SGST (2.5%): ₹{invoice.pricing.sgst}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 pt-2">
                    * This is a computer-generated tax invoice and does not require a physical signature.
                  </div>
                </div>

                {/* Totals Table */}
                <div className="w-full md:w-64 space-y-1.5 border border-slate-200 bg-slate-50/50 p-3 rounded-lg text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Total MRP:</span>
                    <span>₹{invoice.pricing.mrpTotal}</span>
                  </div>
                  {invoice.pricing.discountTotal > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Total Savings / Discount:</span>
                      <span>- ₹{invoice.pricing.discountTotal}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-700">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold">₹{invoice.pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Delivery Charges:</span>
                    <span>{invoice.pricing.deliveryFee > 0 ? `₹${invoice.pricing.deliveryFee}` : "FREE"}</span>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-2 mt-2 flex justify-between font-bold text-sm text-[#800020]">
                    <span>Grand Total:</span>
                    <span>₹{invoice.pricing.total}</span>
                  </div>
                </div>
              </div>

              {/* Signature / Footer */}
              <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span>Verified 100% Original Quality Guarantee</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">For Success Book Hub Pvt Ltd</div>
                  <div className="text-[10px] text-slate-500 italic mt-0.5">Authorized Signatory</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
