import React from "react";
import {
  Cookie,
  Settings,
  ShieldCheck,
  BarChart,
  Layers,
  Globe,
  CheckCircle,
  Mail,
} from "lucide-react";

// --- Simple fallback for ScrollAnimate to work in preview ---
const ScrollAnimate = ({ children, className, delay = 0 }) => (
  <div className={className} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] mt-20 font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <ScrollAnimate animation="fade-up">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2 border border-slate-200">
              <Cookie size={16} className="text-amber-500" />
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-serif mb-6">
              Cookies{" "}
              <span className="text-amber-500 italic font-light">Policy</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Learn how Rigel Hospitality Services Pvt. Ltd. uses cookies and
              similar technologies to enhance your browsing experience on our
              website.
            </p>
          </div>
        </ScrollAnimate>

        {/* Content Document */}
        <ScrollAnimate animation="fade-up" delay={150}>
          <div className="bg-white shadow-2xl shadow-slate-200/40 rounded-3xl border border-slate-100 overflow-hidden">
            {/* Intro */}
            <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-50/50">
              <p className="text-slate-600 leading-relaxed">
                By visiting and using the{" "}
                <a
                  href="http://www.ownholidayclub.com"
                  className="text-amber-600 hover:text-amber-700 font-medium underline-offset-4 hover:underline"
                >
                  www.ownholidayclub.com
                </a>{" "}
                website, you consent to the use of cookies in accordance with
                this Cookies Policy. If you do not agree to our use of cookies,
                you should set your browser settings accordingly or not use our
                website.
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-16">
              {/* Section 1: What are cookies */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <ShieldCheck className="text-amber-500" size={24} />
                  What Are Cookies?
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Cookies are small text files that are placed on your
                    computer, smartphone, or other electronic devices by
                    websites that you visit. They are widely used to make
                    websites work, or work more efficiently, as well as to
                    provide information to the owners of the site.
                  </p>
                  <p>
                    Cookies allow our website to remember your actions and
                    preferences (such as login details, language, font size, and
                    other display preferences) over a period of time, so you
                    don't have to keep re-entering them whenever you come back
                    to the site or browse from one page to another.
                  </p>
                </div>
              </section>

              {/* Section 2: Types of Cookies We Use */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Layers className="text-amber-500" size={24} />
                  Types of Cookies We Use
                </h2>
                <p className="text-slate-600 mb-8">
                  Rigel Hospitality Services Pvt. Ltd. utilizes several
                  different types of cookies to optimize your experience and our
                  services:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Strictly Necessary */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Settings className="text-slate-700" size={20} />
                      <h3 className="font-bold text-slate-900">
                        Strictly Necessary Cookies
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      These are essential for you to browse the website and use
                      its features, such as accessing secure areas of the site
                      (e.g., Member Login). The website cannot function properly
                      without these cookies.
                    </p>
                  </div>

                  {/* Performance / Analytics */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <BarChart className="text-amber-600" size={20} />
                      <h3 className="font-bold text-slate-900">
                        Performance & Analytics
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      These cookies collect information about how you use our
                      website, like which pages you visited and which links you
                      clicked on. None of this information can be used to
                      identify you. Their sole purpose is to improve website
                      functions.
                    </p>
                  </div>

                  {/* Functionality */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="text-emerald-600" size={20} />
                      <h3 className="font-bold text-slate-900">
                        Functionality Cookies
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      These allow our website to remember choices you make (such
                      as your user name, language, or the region you are in) and
                      provide enhanced, more personal features.
                    </p>
                  </div>

                  {/* Targeting / Advertising */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="text-blue-600" size={20} />
                      <h3 className="font-bold text-slate-900">
                        Targeting / Advertising
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      These are used to deliver advertisements more relevant to
                      you and your interests. They are also used to limit the
                      number of times you see an advertisement as well as help
                      measure the effectiveness of the advertising campaigns.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Managing Cookies */}
              <section className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <Settings
                    className="text-amber-600 shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-3">
                      How to Manage Your Cookies
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      Most internet browsers are initially set up to
                      automatically accept cookies. You can change the settings
                      to block cookies or to alert you when cookies are being
                      sent to your device.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Please note that if you disable the cookies that we use,
                      this may impact your experience while on the Own Holiday
                      Club website. For example, you may not be able to visit
                      certain areas of a website or you may not receive
                      personalized information when you visit.
                    </p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-slate-700">
                      <li>
                        To manage cookies in Google Chrome, visit the Privacy
                        and Security settings.
                      </li>
                      <li>
                        To manage cookies in Safari, visit the Privacy section
                        in Preferences.
                      </li>
                      <li>
                        To manage cookies in Firefox, visit the Privacy &
                        Security panel.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Info */}
              <section className="border-t border-slate-100 pt-12 text-center">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                  Questions About Our Cookie Policy?
                </h2>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                  If you have any questions or concerns regarding our use of
                  cookies or your personal data, please don't hesitate to reach
                  out to our support team.
                </p>
                <a
                  href="mailto:membership@ownholidayclub.com"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <Mail size={18} />
                  membership@ownholidayclub.com
                </a>
              </section>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </div>
  );
}
