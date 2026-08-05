import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Pankaj Agrawal & Co | Chartered Accountants | GST | Income Tax | Audit | ROC Compliance",
  description:
    "Pankaj Agrawal & Co is a Chartered Accountant firm in New Delhi providing GST, Income Tax, Audit & Assurance, ROC Compliance, Tax Advisory and Financial Consultancy services.",
  keywords: [
    "Chartered Accountant New Delhi",
    "CA Firm Vikaspuri",
    "Pankaj Agrawal & Co",
    "GST Registration New Delhi",
    "GST Refunds India",
    "Income Tax Return Filing",
    "Tax Audit CA",
    "Statutory Audit Firm",
    "ROC Compliance MCA",
  ],
  authors: [{ name: "Mr. Pankaj Agrawal", url: "https://pacoadvisory.com" }],
  creator: "Pankaj Agrawal & Co",
  openGraph: {
    title:
      "Pankaj Agrawal & Co | Chartered Accountants | GST, Tax & Audit Advisory",
    description:
      "Reliable financial, taxation, and statutory compliance solutions for businesses and individuals in New Delhi.",
    url: "https://pacoadvisory.com",
    siteName: "Pankaj Agrawal & Co",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Agrawal & Co | Chartered Accountants",
    description:
      "Helping Businesses & Individuals navigate Taxation, GST, Audits, and Regulatory Compliance with Professional Excellence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "Pankaj Agrawal & Co",
  "image": "https://pacoadvisory.com/images/profile.jpeg",
  "@id": "https://pacoadvisory.com",
  "url": "https://pacoadvisory.com",
  "telephone": "+918273801105",
  "email": "pankaj@pacoadvisory.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C-730, Vikaspuri",
    "addressLocality": "New Delhi",
    "postalCode": "110018",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.6369,
    "longitude": 77.0729
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:30",
    "closes": "19:00"
  },
  "founder": {
    "@type": "Person",
    "name": "Pankaj Agrawal",
    "jobTitle": "Chartered Accountant",
    "alumniOf": "The Institute of Chartered Accountants of India (ICAI)"
  },
  "areaServed": "India",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Chartered Accountancy & Tax Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "GST Registration & Returns"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Direct Tax & Income Tax Filing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Statutory & Tax Audit"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ROC & MCA Company Compliances"
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-[#FAF2EE] text-slate-900 font-sans antialiased selection:bg-[#0F3040] selection:text-[#D99B7F]">
        {children}
      </body>
    </html>
  );
}
