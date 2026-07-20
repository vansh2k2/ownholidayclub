import React from "react";
import { Check, Minus } from "lucide-react";

// --- Simple fallback for ScrollAnimate to work in preview ---
const ScrollAnimate = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// --- Data ---
const comparisonFeatures = [
  {
    feature: "Annual Nights",
    silver: "7 Nights",
    gold: "14 Nights",
    platinum: "21 Nights",
    signature: "30 Nights",
  },
  {
    feature: "Resort Access",
    silver: "4-Star Only",
    gold: "4 & 5-Star",
    platinum: "All Premium",
    signature: "Ultra-Luxury Portfolio",
  },
  {
    feature: "Concierge Level",
    silver: "Standard",
    gold: "Priority",
    platinum: "Dedicated VIP",
    signature: "24/7 Lifestyle Manager",
  },
  {
    feature: "Credit Rollover",
    silver: "2 Years",
    gold: "3 Years",
    platinum: "Unlimited",
    signature: "Unlimited",
  },
  {
    feature: "Family Transferable",
    silver: false,
    gold: true,
    platinum: true,
    signature: true,
  },
  {
    feature: "Airport Transfers",
    silver: false,
    gold: false,
    platinum: true,
    signature: true,
  },
  {
    feature: "Yacht Charter Access",
    silver: false,
    gold: false,
    platinum: false,
    signature: true,
  },
];

// --- Component ---
export default function App() {
  return (
    <section className="py-24 bg-white relative">
      <div className="site-width mx-auto">
        <div className="text-center mb-16">
          <ScrollAnimate animation="fade-up">
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block font-sans border border-slate-200">
              Compare Tiers
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-serif">
              Membership{" "}
              <span className="text-amber-500 italic font-light">Features</span>
            </h2>
          </ScrollAnimate>
        </div>

        <ScrollAnimate animation="fade-up" delay={200}>
          <div className="overflow-x-auto pb-6">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="p-6 text-slate-400 font-bold uppercase tracking-widest text-xs font-sans w-1/4">
                    Feature
                  </th>
                  <th className="p-6 text-slate-900 font-bold font-serif text-xl text-center">
                    13th Anniv.
                  </th>
                  <th className="p-6 text-slate-900 font-bold font-serif text-xl text-center">
                    Privilege
                  </th>
                  {/* Highlighted Column */}
                  <th className="p-6 text-amber-600 font-bold font-serif text-xl text-center bg-amber-50/50 rounded-t-3xl border-t border-l border-r border-amber-100">
                    Memorable
                  </th>
                  <th className="p-6 text-slate-900 font-bold font-serif text-xl text-center">
                    Golden
                  </th>
                </tr>
              </thead>
              <tbody className="font-sans">
                {comparisonFeatures.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-6 text-slate-700 font-medium text-sm">
                      {row.feature}
                    </td>

                    {/* 13th Anniv. (Mapped to 'silver') */}
                    <td className="p-6 text-center text-slate-600 text-sm">
                      {typeof row.silver === "boolean" ? (
                        row.silver ? (
                          <Check size={20} className="mx-auto text-slate-800" />
                        ) : (
                          <Minus size={20} className="mx-auto text-slate-300" />
                        )
                      ) : (
                        row.silver
                      )}
                    </td>

                    {/* Privilege (Mapped to 'gold') */}
                    <td className="p-6 text-center text-slate-600 text-sm">
                      {typeof row.gold === "boolean" ? (
                        row.gold ? (
                          <Check size={20} className="mx-auto text-slate-800" />
                        ) : (
                          <Minus size={20} className="mx-auto text-slate-300" />
                        )
                      ) : (
                        row.gold
                      )}
                    </td>

                    {/* Memorable (Mapped to 'platinum') - Highlighted */}
                    <td className="p-6 text-center text-amber-700 text-sm font-bold bg-amber-50/50 border-l border-r border-amber-100">
                      {typeof row.platinum === "boolean" ? (
                        row.platinum ? (
                          <Check size={20} className="mx-auto text-amber-600" />
                        ) : (
                          <Minus size={20} className="mx-auto text-amber-300" />
                        )
                      ) : (
                        row.platinum
                      )}
                    </td>

                    {/* Golden (Mapped to 'signature') */}
                    <td className="p-6 text-center text-slate-600 text-sm">
                      {typeof row.signature === "boolean" ? (
                        row.signature ? (
                          <Check size={20} className="mx-auto text-slate-800" />
                        ) : (
                          <Minus size={20} className="mx-auto text-slate-300" />
                        )
                      ) : (
                        row.signature
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Bottom Border for Highlighted Column */}
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="border-b border-l border-r border-amber-100 bg-amber-50/50 rounded-b-3xl h-4"></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

