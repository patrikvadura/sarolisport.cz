import React from "react";
import type { Metadata } from "next";

import { getPageBySlug } from "@/app/lib/api";
import renderContent from "@/app/lib/renderContent";

interface ParamsProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata(props: ParamsProps): Promise<Metadata> {
    const pageData = await getPageBySlug(props.params.slug, ['ogImage']);
    const siteURLString = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const siteURL = new URL(siteURLString);

    return {
        title: pageData.data[0].attributes.seoTitle || `${pageData.data[0].attributes.title} | Hospůdka u Ježka`,
        description: pageData.data[0].attributes.seoDescription,
        metadataBase: siteURL,
        openGraph: {
            images: [
                { url: pageData.data[0].attributes.ogImage.data.attributes.url }
            ]
        },
    }
}

export default async function Page(props: ParamsProps) {
    const pageData = await getPageBySlug(props.params.slug);

    const pageDataContent:any[] = pageData.data[0].attributes.content;

    if (pageData.data.length === 0) return null;

    return (
        <main className="container pt-16">
            <h1 className="text-h1 text-primary">
                {pageData.data[0].attributes.title}
            </h1>

            <article className="prose max-w-none dark:prose-invert">
                {renderContent(pageDataContent)}
            </article>
        </main>
    );
}
