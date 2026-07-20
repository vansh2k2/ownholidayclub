import React from "react";
import {
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  Info,
  Lock,
  FileText,
  Globe,
  Smartphone,
  Database,
} from "lucide-react";

// --- Simple fallback for ScrollAnimate to work in preview ---
const ScrollAnimate = ({ children, className, delay = 0 }) => (
  <div className={className} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans mt-20 text-slate-900 selection:bg-amber-100 selection:text-amber-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <ScrollAnimate animation="fade-up">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2 border border-slate-200">
              <ShieldCheck size={16} className="text-amber-500" />
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-serif mb-6">
              Privacy{" "}
              <span className="text-amber-500 italic font-light">Policy</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              This privacy policy applies to the activities of Rigel Hospitality
              Service Pvt. Ltd. and its affiliates (referred to as "RHSPL").
            </p>
          </div>
        </ScrollAnimate>

        {/* Content Document */}
        <ScrollAnimate animation="fade-up" delay={150}>
          <div className="bg-white shadow-2xl shadow-slate-200/40 rounded-3xl border border-slate-100 overflow-hidden">
            {/* Intro */}
            <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-50/50">
              <p className="text-slate-600 leading-relaxed">
                By visiting website{" "}
                <a
                  href="http://www.ownholidayclub.com"
                  className="text-amber-600 hover:text-amber-700 font-medium underline-offset-4 hover:underline"
                >
                  www.ownholidayclub.com
                </a>{" "}
                and our mobile application you are accepting the terms stated
                hereunder relating to privacy. It explains how RHSPL handles
                personal information and complies with the requirements of the
                privacy act. If you have further questions relating to this
                policy please contact our member experience management team by
                e-mail at{" "}
                <a
                  href="mailto:membership@ownholidayclub.com"
                  className="text-amber-600 font-medium"
                >
                  membership@ownholidayclub.com
                </a>
                .
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-16">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Database className="text-amber-500" size={24} />
                  Collecting Information About You
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    In accordance with the applicable acts governing privacy,
                    RHSPL only collects personal information that is necessary
                    for business purposes. We endeavour at all times to collect
                    personal information in a fair and lawful manner, and to
                    meet our members' expectations that we will respect their
                    right to control how their personal information is collected
                    and used. RHSPL collects personal information to be used for
                    the purpose of its business. These include:
                  </p>
                  <ul className="list-disc pl-5 space-y-3 mt-4">
                    <li>
                      <strong className="text-slate-800">
                        Prior and Post purchase of RHSPL’s Membership, Exchange
                        program:
                      </strong>{" "}
                      RHSPL collects information about members and prospects at
                      the time when a person first joins a program and while a
                      person is a member. The main categories of information we
                      collect relate to a person's general contact information,
                      personal details including spouse/family members details
                      such as name, age range, gender, demographic information
                      like post code, preferences, interest, professional
                      details, address, contact information including e-mail
                      address, use of the program, payment details, responses to
                      surveys, Know Your Customer (KYC) documents as mandated by
                      Government authorities and other details.
                    </li>
                    <li>
                      <strong className="text-slate-800">
                        RHSPL Resort Management:
                      </strong>{" "}
                      RHSPL collects personal information related to bookings
                      and as necessary for other purposes related to the
                      management of the resort facility. Further personal
                      information may be collected in specific instances such as
                      in the event of an incident occurring on site for legal
                      and insurance reasons.
                    </li>
                  </ul>
                  <p>
                    RHSPL collects information on individuals when they book
                    their travel arrangements, in order to process the
                    transaction and to fulfil booking requests with travel and
                    tourism operators. We also collect general business
                    information relating to employees, contractors,
                    shareholders, resort managers and other individuals.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FileText className="text-amber-500" size={24} />
                  Using and Disclosing Your Personal Information
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Our purpose in collecting information about you is to
                    provide you with personalized membership services, including
                    exploring options like exchanging your holiday accommodation
                    entitlements. RHSPL uses personal information in several
                    different ways in operating our membership programs and
                    operating our business, improve our product and services. We
                    also use your personal information for internal quality
                    assurance purposes.
                  </p>
                  <p>
                    RHSPL provides personal information to resort operators in
                    order to facilitate a booking that you have requested.
                    Otherwise, RHSPL does not routinely disclose personal
                    information, except where it is necessary to provide you
                    with a service that you have requested. RHSPL will not
                    normally otherwise use or disclose any information about you
                    without your consent, unless:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li>Required by law.</li>
                    <li>
                      To protect the rights, property or personal safety of
                      another RHSPL member, or any member of the public.
                    </li>
                    <li>
                      The assets and operations of the business are transferred
                      to another party as a going concern.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Disclaimer Block */}
              <section className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <Info className="text-amber-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-3">
                      Disclaimer for using data for Rigel Hospitality Services
                      Pvt.Ltd.
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      I/We hereby agree and authorize Rigel Hospitality Services
                      Pvt.Ltd. and all of its divisions, affiliates,
                      subsidiaries, related parties and other group companies
                      (collectively the “RHSPL Group”) to access my/our basic
                      data / contact details provided herewith, i.e. name,
                      address, telephone number, e-mail address, birth date and
                      / or anniversary date. I/ We hereby consent to, agree and
                      acknowledge that any of the RHSPL Group may call/ email/
                      SMS me/us... I/We provide the details herein at my/our
                      sole discretion and confirm that no RHSPL Entity shall
                      be held responsible or liable for any claim arising out of
                      accessing or using my/our basic data. I/We consent to
                      being assigned a unique identity within the RHSPL Group.
                      I/We also agree that if at any point of time, I/We wish to
                      stop receiving such communications from RHSPL Entity,
                      I/We will call at Rigel Hospitality Services Pvt. Ltd designated call center number and register
                      my/our preference or write to{" "}
                      <a
                        href="mailto:membership@ownholidayclub.com"
                        className="font-semibold text-amber-700"
                      >
                        membership@ownholidayclub.com
                      </a>{" "}
                      with “OPT OUT CCD” as Subject.
                    </p>
                  </div>
                </div>
              </section>

              {/* Additional Sections */}
              <div className="grid md:grid-cols-2 gap-12">
                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Globe className="text-amber-500" size={20} /> For our Web
                    Site Users
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    RHSPL is committed to high standards of data security. We
                    offer SSL encryption, the industry standard security
                    measures for transactions made over the Internet. We
                    primarily use "cookies" to help us determine which service
                    and support information is appropriate to your computer and
                    to facilitate your use of our instant transactions area.
                    Accepting a cookie in no way gives us access to your
                    computer or any personal information about you.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <strong>Links from our web site:</strong> Our web site
                    contains links to other sites. Please be aware that we are
                    not responsible for the content or privacy practices of such
                    other sites.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Smartphone className="text-amber-500" size={20} /> For our
                    Mobile App Users
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    When you download or use apps created by RHSPL, we may
                    receive information about your location and your mobile
                    device, including a unique identifier. We may use this
                    information to provide you with location-based services,
                    such as advertising, search results, and other personalized
                    content. We also process technical data such as your
                    IP-address, Device ID, Device Contacts, and operating system
                    to enable functionalities and resolve technical
                    difficulties.
                  </p>
                </section>
              </div>

              {/* Security & Access */}
              <section className="border-t border-slate-100 pt-12">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Lock className="text-amber-500" size={24} />
                  Storage, Security & Access
                </h2>
                <div className="space-y-6 text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-800">
                      Storage and security:
                    </strong>{" "}
                    RHSPL endeavours to take all reasonable steps to keep secure
                    any information which we hold about you. We use a
                    sophisticated computer data network, and all access is
                    password controlled. Data is secured in a secure data centre
                    environment, totally private and not accessible over the
                    Internet. Under no circumstances, including negligence,
                    shall RHSPL have any liability in respect of personal
                    information provided by you on this website.
                  </p>
                  <p>
                    <strong className="text-slate-800">
                      Transfer overseas:
                    </strong>{" "}
                    As a global business, RHSPL may use overseas facilities to
                    process or back up information. We will only transfer
                    information overseas as authorized by the applicable Privacy
                    laws.
                  </p>
                  <p>
                    <strong className="text-slate-800">
                      Accessing & Changing:
                    </strong>{" "}
                    You are welcome to access your record or ask to
                    change/delete inaccurate data by contacting us. For security
                    purposes, confirmation of your identity will be required.
                    Our file will usually be made available to you within 14
                    days.
                  </p>
                </div>
              </section>

              {/* Contact & Grievance */}
              <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <ShieldCheck size={250} />
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-serif font-bold text-white mb-6">
                    Data Grievance & Contact
                  </h2>
                  <p className="text-slate-300 mb-8 max-w-2xl">
                    Any complaints, requests, or concerns with regards to the
                    use, processing, or disclosure of information provided by
                    you may be taken up with our designated grievance redressal
                    officer.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail
                          className="text-amber-400 shrink-0 mt-1"
                          size={20}
                        />
                        <div>
                          <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-1">
                            Email
                          </p>
                          <a
                            href="mailto:membership@ownholidayclub.com"
                            className="text-white hover:text-amber-300 transition-colors"
                          >
                            membership@ownholidayclub.com
                          </a>
                          <br />
                          {/* <a
                            href="mailto:DataGrievanceOfficer@mahindraholidays.com"
                            className="text-white hover:text-amber-300 transition-colors text-sm"
                          >
                            DataGrievanceOfficer@mahindraholidays.com
                          </a> */}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone
                          className="text-amber-400 shrink-0 mt-1"
                          size={20}
                        />
                        <div>
                          <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-1">
                            Phone
                          </p>
                          <p className="text-white">+91 9871984074
</p>
                          <p className="text-xs text-slate-400 mt-1">
                            Mon - Sat: 9.30 AM to 6.30 PM
                            <br />
                            Closed on Sunday & National Holidays
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        className="text-amber-400 shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-1">
                          Address
                        </p>
                        <p className="text-white leading-relaxed">
                       Second floor, estate, MR- 01, Altf Mohan estate, room no, plot no A. 26, Saidabad, Block B, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <p className="text-sm text-amber-300 font-semibold mb-3">
                      Please provide the following in your complaint:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                      <li>
                        Identification of the information provided by you.
                      </li>
                      <li>
                        Clear statement if information is personal or sensitive.
                      </li>
                      <li>
                        Your Membership ID, Mobile number and/or e-mail address.
                      </li>
                      <li>
                        A statement that you have a good-faith belief that use
                        of the information was processed incorrectly.
                      </li>
                      <li>
                        A statement, under penalty of perjury, that the
                        information is accurate.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Footer Note */}
              <div className="text-center pt-8 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  <strong>Future changes:</strong> From time to time, our
                  policies will be reviewed and may be revised. Changes to
                  RHSPL's Privacy Policy will be made by posting an updated
                  version of the policy on our website.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </div>
  );
}
