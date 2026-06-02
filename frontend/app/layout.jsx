
import "./globals.css";
import AppShell from "@/components/AppShell";
import SmoothScroll from "@/components/SmoothScroll";
import { siteUrl } from "@/lib/site-config";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SITE_DESCRIPTION,
  SITE_NAME,
  resolveMetadataImage,
} from "@/lib/metadata";

const GTM_ID = "GTM-NL2D8S75";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [
      {
        url: resolveMetadataImage(DEFAULT_OG_IMAGE),
        width: 1376,
        height: 768,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [resolveMetadataImage(DEFAULT_OG_IMAGE)],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-800 flex flex-col min-h-screen">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SmoothScroll>
          <AppShell>{children}</AppShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
