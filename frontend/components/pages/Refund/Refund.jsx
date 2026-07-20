import React from "react";
import {
  Receipt,
  CreditCard,
  XCircle,
  RefreshCcw,
  AlertCircle,
  Tag,
  Repeat,
  Gift,
  Mail,
  MapPin,
} from "lucide-react";

// --- Simple fallback for ScrollAnimate to work in preview ---
const ScrollAnimate = ({ children, className, delay = 0 }) => (
  <div className={className} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans mt-20 text-slate-900 selection:bg-amber-100 selection:text-amber-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <ScrollAnimate animation="fade-up">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2 border border-slate-200">
              <Receipt size={16} className="text-amber-500" />
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-serif mb-6">
              Refund{" "}
              <span className="text-amber-500 italic font-light">Policy</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Please read our payment, cancellation, and refund guidelines
              carefully to understand your rights and obligations regarding your
              purchases.
            </p>
          </div>
        </ScrollAnimate>

        {/* Content Document */}
        <ScrollAnimate animation="fade-up" delay={150}>
          <div className="bg-white shadow-2xl shadow-slate-200/40 rounded-3xl border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-12 space-y-16">
              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <CreditCard className="text-amber-500" size={24} />
                  Payment Terms
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>
                        All payments must be notified by an{" "}
                        <strong>e-mail format only</strong> with attached
                        transaction details.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>
                        Payment terms are subject to change at the time of
                        booking as per Hotel Policy and High Season.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>We will not entertain any credit facility.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Cancellation Policy */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <XCircle className="text-amber-500" size={24} />
                  Cancellation Policy
                </h2>
                <p className="text-slate-600 mb-6">
                  All cancellations must be made in{" "}
                  <strong>e-mail format only</strong>. The following
                  cancellation charges apply based on the timeframe prior to
                  your arrival date:
                </p>

                <div className="grid grid-cols-1 gap-3 mb-8">
                  {[
                    {
                      time: "45 Days prior",
                      fee: "No charge",
                      color:
                        "text-emerald-600 bg-emerald-50 border-emerald-100",
                    },
                    {
                      time: "Between 45 - 30 Days",
                      fee: "25% of Membership Fees",
                      color: "text-amber-700 bg-amber-50 border-amber-100",
                    },
                    {
                      time: "Between 30 - 15 Days",
                      fee: "50% of Membership Fees",
                      color: "text-orange-700 bg-orange-50 border-orange-100",
                    },
                    {
                      time: "Between 15 - 10 Days",
                      fee: "75% of Membership Fees",
                      color: "text-red-700 bg-red-50 border-red-100",
                    },
                    {
                      time: "Less than 10 Days",
                      fee: "100% of Membership Fees",
                      color: "text-slate-700 bg-slate-100 border-slate-200",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center p-4 rounded-xl border ${item.color}`}
                    >
                      <span className="font-medium">{item.time}</span>
                      <span className="font-bold">{item.fee}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 flex items-start gap-4">
                  <AlertCircle
                    className="text-amber-600 shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1 uppercase tracking-wider">
                      Important Note
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Once the package is booked & confirmed, Membership Fees
                      are <strong>Non-Refundable</strong>.
                    </p>
                  </div>
                </div>
              </section>

              {/* General Refund Process */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <RefreshCcw className="text-amber-500" size={24} />
                  Refund Process & Late Refunds
                </h2>
                <div className="space-y-6 text-slate-600 leading-relaxed">
                  <p>
                    If your refund is approved, then your refund will be
                    processed, and a credit will automatically be applied to
                    your credit card or original method of payment, within a
                    certain amount of days.
                  </p>

                  <div className="border-l-2 border-amber-300 pl-6 space-y-4">
                    <h3 className="font-bold text-slate-800">
                      Late or missing refunds (if applicable):
                    </h3>
                    <ol className="list-decimal pl-4 space-y-2">
                      <li>
                        If you haven’t received a refund yet, first check your
                        bank account again.
                      </li>
                      <li>
                        Then contact your credit card company; it may take some
                        time before your refund is officially posted.
                      </li>
                      <li>
                        Next, contact your bank. There is often some processing
                        time before a refund is posted.
                      </li>
                    </ol>
                    <p className="text-sm mt-4">
                      If you’ve done all of this and you still have not received
                      your refund yet, please contact us at{" "}
                      <a
                        href="mailto:membership@ownholidayclub.com"
                        className="text-amber-600 font-medium hover:underline"
                      >
                        membership@ownholidayclub.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </section>

              {/* Smaller Sections Grid */}
              <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Tag className="text-amber-500" size={20} /> Sale Services
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Only regular priced Services may be refunded. Unfortunately,
                    sale Services <strong>cannot</strong> be refunded (if
                    applicable).
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Gift className="text-amber-500" size={20} /> Gifts
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    If the item was marked as a gift when purchased and shipped
                    directly to you, you’ll receive a gift credit for the value
                    of your return. Once the returned item is received, a gift
                    certificate will be mailed to you. If it wasn’t marked as a
                    gift, we will send a refund to the gift giver.
                  </p>
                </section>
              </div>

              {/* Exchanges */}
              <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Repeat size={250} />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-3">
                    <Repeat className="text-amber-400" size={28} />
                    Exchanges (If Applicable)
                  </h2>
                  <p className="text-slate-300 mb-8 max-w-2xl text-sm leading-relaxed">
                    We only replace Services if they are defective or damaged.
                    If you need to exchange it for the same item, please follow
                    the steps below to submit your request to our team.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="flex items-start gap-3">
                      <Mail
                        className="text-amber-400 shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                          Email Request
                        </p>
                        <a
                          href="mailto:membership@ownholidayclub.com"
                          className="text-white hover:text-amber-300 transition-colors text-sm"
                        >
                          membership@ownholidayclub.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        className="text-amber-400 shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                          Send Address
                        </p>
                        <p className="text-white text-sm leading-relaxed">
                        Second floor, estate, MR- 01, Altf Mohan estate, room no, plot no A. 26, Saidabad, Block B, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </div>
  );
}
