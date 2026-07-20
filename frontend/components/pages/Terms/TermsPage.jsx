import React from "react";
import {
  Scale,
  CheckCircle,
  Globe,
  Edit3,
  Link as LinkIcon,
  AlertTriangle,
  ShieldAlert,
  Gavel,
  FileX,
  Copyright,
  Trophy,
  Info,
} from "lucide-react";

// --- Simple fallback for ScrollAnimate to work in preview ---
const ScrollAnimate = ({ children, className, delay = 0 }) => (
  <div className={className} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans mt-20 text-slate-900 selection:bg-amber-100 selection:text-amber-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <ScrollAnimate animation="fade-up">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2 border border-slate-200">
              <Scale size={16} className="text-amber-500" />
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-serif mb-6">
              Terms &{" "}
              <span className="text-amber-500 italic font-light">
                Conditions
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Welcome to the Rigel Hospitality Services Pvt.Ltd. web site (the
              "Site"). Please read these Terms of Use carefully before using
              this Site.
            </p>
          </div>
        </ScrollAnimate>

        {/* Content Document */}
        <ScrollAnimate animation="fade-up" delay={150}>
          <div className="bg-white shadow-2xl shadow-slate-200/40 rounded-3xl border border-slate-100 overflow-hidden">
            {/* Intro */}
            <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-50/50">
              <p className="text-slate-600 leading-relaxed font-medium">
                By using this Site you agree to comply with and be bound by
                these Terms of Use. If you do not agree to these terms, you must
                not use this Site.
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-16">
              {/* Acceptance & Use */}
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <CheckCircle className="text-amber-500" size={24} />
                    Acceptance Of Agreement
                  </h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      You agree to the terms and conditions outlined in this
                      Terms of Use Agreement ("Agreement") with respect to our
                      Site. This Agreement constitutes the entire and only
                      agreement between us and you with respect to the Site and
                      supersedes all prior or contemporaneous agreements,
                      representations, warranties and understandings with
                      respect to the Site, the content, products or services
                      provided by or through the Site, and the subject matter of
                      this Agreement.
                    </p>
                    <p>
                      This Agreement may be amended at any time by us from time
                      to time without specific notice to you. The latest
                      Agreement will be posted on the Site, and you must review
                      this Agreement prior to using the Site. Rigel Hospitality
                      Services Pvt. Ltd. reserves the right to revise, amend or
                      modify our TERMS policy at any time and in any manner it
                      pleases. Any change or revision will be posted here.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Globe className="text-amber-500" size={24} />
                    Use Of Website
                  </h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      Rigel Hospitality Services Pvt. Ltd. authorizes you to
                      view, print or download any content, graphic, form or
                      document from the Site for your personal, non-commercial
                      use and you must not change or delete any such material or
                      copyright notice appearing on such material. You may not
                      modify the materials at this Site in any way or repost,
                      republish, reproduce, publicly display, perform, assign,
                      sublicense, sell or prepare derivative works of or
                      otherwise use the materials for any purpose except as
                      expressly permitted under this Agreement.
                    </p>
                    <p>
                      Copyright in the materials at this Site is owned by or
                      used with permission Rigel Hospitality Services Pvt. Ltd.
                      and any unauthorized use of any materials at this Site may
                      violate copyright, trade mark and other proprietary
                      (including but not limited to intellectual property) legal
                      rights of Rigel Hospitality Services Pvt. Ltd.
                    </p>
                    <p>
                      As a user of this Web Site you are granted a nonexclusive,
                      nontransferable, revocable, limited license to access and
                      use this Web Site and Content in accordance with these
                      Terms of Use. Provider may terminate this license at any
                      time for any reason.
                    </p>
                  </div>
                </section>
              </div>

              {/* Smaller Sections Grid */}
              <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Edit3 className="text-amber-500" size={20} /> Editing &
                    Modification
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We reserve the right in our sole discretion to edit or
                    delete any documents, information or other content appearing
                    on the Site.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <LinkIcon className="text-amber-500" size={20} /> Links To
                    Other Web Sites
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The Site contains links to other Web sites which are not
                    created, owned or operated by Rigel Hospitality Services
                    Pvt. Ltd. We are not responsible for the content, accuracy
                    or opinions expressed in such Web sites. Inclusion of any
                    linked Web site on our Site does not imply approval or
                    endorsement. If you decide to use these links you will leave
                    our Site and access these third-party sites at your own
                    risk.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Copyright className="text-amber-500" size={20} /> Copyright
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    All material available on this web site is protected by
                    copyright laws. Distribution of the material from the Web
                    Site, for commercial purposes is prohibited. Domestic and
                    International copyright and Trademark laws protect the
                    entire Contents of the Site. You are expressly prohibited
                    from modifying, copying, reproducing, republishing,
                    uploading, posting, transmitting or distributing any
                    material on this Site.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileX className="text-amber-500" size={20} /> Not Legal
                    Advice
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Content is not intended to and does not constitute legal
                    advice and no attorney-client relationship is formed, nor is
                    anything submitted to this Web Site treated as confidential.
                    The accuracy, completeness, adequacy or currency of the
                    Content is not warranted or guaranteed.
                  </p>
                </section>
              </div>

              {/* Warranties & Liabilities Block */}
              <div className="space-y-6">
                <section className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <AlertTriangle
                      className="text-amber-600 shrink-0 mt-1"
                      size={24}
                    />
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                        No Warranties
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed uppercase tracking-wide">
                        The information, materials and services provided at and
                        accessible through this site are provided "as is", "as
                        available" and, to the maximum extent permitted by
                        applicable law, Rigel Hospitality Services Pvt. Ltd.
                        expressly disclaims all warranties, whether expressed or
                        implied, including warranties of merchant ability,
                        fitness for a particular purpose, use, or the results of
                        use of this site.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2">
                        The information, materials and services provided at and
                        accessible through this site may contain bugs, errors,
                        viruses, problems or other limitations.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <ShieldAlert
                      className="text-slate-600 shrink-0 mt-1"
                      size={24}
                    />
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mb-3">
                        Limitation Of Liability
                      </h3>
                      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                        <p>
                          Rigel Hospitality Services Pvt. Ltd. aggregate
                          liability for damages claimed under this agreement and
                          arising out of Rigel Hospitality Services Pvt. Ltd.
                          performance of services hereunder shall be limited to
                          the total purchase price you pay for any goods,
                          services or information.
                        </p>
                        <p className="uppercase tracking-wide font-medium text-slate-700">
                          To the maximum extent permitted by applicable law, in
                          no event shall own holiday club's be liable whatsoever
                          for your use of any information, materials or services
                          provided at or accessible through this site.
                        </p>
                        <p>
                          In particular, but not as a limitation thereof, own
                          holiday club's is not liable for any indirect,
                          special, incidental or consequential damages
                          (including damage for loss of business, loss of
                          profits, litigation, or the like), whether or not
                          reasonably foreseeable. The negation of damages set
                          forth above are fundamental elements of the basis of
                          the bargain between own holiday club's and you.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Legal Jurisdiction */}
              <section className="border-t border-slate-100 pt-12">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Gavel className="text-amber-500" size={24} />
                  Applicable Laws & Severability
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-800">Applicable Laws:</strong>{" "}
                    This Site is administered by Rigel Hospitality Services Pvt.
                    Ltd. at its offices in India and is subject to the laws of
                    the India. You agree to submit to the non-exclusive
                    jurisdiction of the courts of India in relation to any
                    dispute relating to this Agreement. Rigel Hospitality
                    Services Pvt. Ltd. makes no representation that materials at
                    this Site are appropriate or available for use outside
                    India, and access to them from territories where there
                    contents are illegal is prohibited.
                  </p>
                  <p>
                    <strong className="text-slate-800">Severability:</strong> If
                    any provision of this Agreement is found invalid or
                    unenforceable, that provision will be enforced to the
                    maximum extent permissible, and the other provisions of this
                    Agreement will remain in force.
                  </p>
                </div>
              </section>

              {/* Contest Terms & Conditions */}
              <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Trophy size={250} />
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-serif font-bold text-white mb-4 flex items-center gap-3">
                    <Trophy className="text-amber-400" size={32} />
                    Terms and Conditions (Contest)
                  </h2>
                  <p className="text-slate-300 mb-8 max-w-2xl text-sm leading-relaxed">
                    Welcome to the terms and conditions ("Terms") for Rigel
                    Hospitality Services Pvt.Ltd. (“Contest”). These Terms are
                    between you and Rigel Hospitality Services Pvt.Ltd. and
                    govern our respective rights and obligations. By
                    participating in this contest, you accept these terms,
                    conditions, limitations, and requirements.
                  </p>

                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                      <Info size={18} /> For Contest Participants:
                    </h3>
                    <ul className="space-y-4 text-sm text-slate-300 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          These Terms and Conditions govern the conduct of the
                          contests brought to you by Rigel Hospitality Services
                          Pvt.Ltd.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          By submitting any Entry or undertaking any other
                          action for participation, the Participant shall be
                          deemed to have read, understood, and unconditionally
                          accepted these Terms and Conditions.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          No purchase of any kind whatsoever (monetary or
                          otherwise) is required to be eligible for
                          participation in this Contest.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          Rigel Hospitality Services Pvt.Ltd. reserves the right
                          to update, amend, cancel, change or substitute the
                          Contest at any time without any prior notice.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          The terms shall be governed by Indian Laws. The Courts
                          at Mumbai shall have exclusive jurisdiction in respect
                          of all the subject matter pertaining to this Contest.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          By participating, you expressly agree that Rigel Hospitality Services Pvt. Ltd will not be responsible for any loss or
                          damage incurred by you in relation to this Contest.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          Benefits/Prizes offered are non-transferrable and
                          non-refundable. Rigel Hospitality Services Pvt.Ltd.
                          reserves its right to call upon the participant to
                          submit any document for verification of identity.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          Rigel Hospitality Services Pvt.Ltd. reserves the
                          contest entry usage rights for their social media
                          resharing and digital advertising purposes.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          The Participant waives conditions of DND registration
                          by participating in this Contest.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>
                          Rigel Hospitality Services Pvt.Ltd. shall not be
                          liable for any loss or damage due to Acts of God,
                          Governmental actions, and/or any other force majeure
                          circumstances.
                        </span>
                      </li>
                    </ul>
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
