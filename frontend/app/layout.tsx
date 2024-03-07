import React from "react";
import Head from 'next/head';
import Script from 'next/script'
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import Header from "@/app/ui/Header/index";
import CookieConsentComponent from '@/app/components/CookieConsent';
import "./globals.css";

const inter: NextFont = Inter({subsets: ["latin"]});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const gtmID:string|undefined = process.env.NEXT_PUBLIC_GTM;

    return (
        <html suppressHydrationWarning>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" />
            </Head>

            <Script
                id="Google Analytics"
                data-category="analytics"
                data-service="Google Analytics"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${gtmID}');
                    `,
                }}
                strategy="lazyOnload"
            />

            <body className={`${inter.className} bg-secondary`} suppressHydrationWarning>
                <Providers>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${gtmID}`} height="0" width="0"
                            style={{display: "none", visibility: "hidden"}}>
                        </iframe>
                    </noscript>

                    <Header/>

                    {children}

                    <CookieConsentComponent/>
                </Providers>
            </body>
        </html>
    );
}
