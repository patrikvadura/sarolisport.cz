import React from "react";
import type { Metadata } from "next";

import { getPost } from "@/app/lib/api";
import { seoHomepage } from "@/app/lib/meta";
import Hero from "@/app/components/Hero";

export async function generateMetadata(): Promise<Metadata> {
    const { title, description, image } = seoHomepage.props;
    const siteURLString = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const siteURL = new URL(siteURLString);

    return {
        title: `${title}`,
        description: description,
        metadataBase: siteURL,
        openGraph: {
            images: [
                { url: image }
            ]
        }
    }
}

export default async function Home() {
    const response = await getPost(undefined,['coverImage']);
    const posts = response.data;

    const backendPath:string|undefined = process.env.NEXT_PUBLIC_API;

    return (
        <main id="main">
            <Hero />

            <div className="container mt-24 space-y-32">
            </div>
        </main>
    );
}
