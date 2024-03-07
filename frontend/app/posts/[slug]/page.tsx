import React from 'react';
import type { Metadata } from 'next';

import { getPost } from "@/app/lib/api";
import renderContent from '@/app/lib/renderContent';

interface ParamsProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata(props: ParamsProps): Promise<Metadata> {
    const postData = await getPost(props.params.slug, ['coverImage']);
    const siteURLString = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const siteURL = new URL(siteURLString);

    return {
        title: `${postData.data[0].attributes.title} | Hospůdka u Ježka`,
        description: postData.data[0].attributes.excerpt,
        metadataBase: siteURL,
        openGraph: {
            images: [
                { url: postData.data[0].attributes.coverImage.data.attributes.url }
            ]
        },
    }
}

export default async function Post(props: ParamsProps) {
    const postData = await getPost(props.params.slug);

    const postDataContent:any[] = postData.data[0].attributes.content;

    return (
        <main className="prose w-full py-10 px-5 mx-auto">
            <h1 className="text-3xl font-bold">
                {postData.data[0].attributes.title}
            </h1>

            <div>
                {renderContent(postDataContent)}
            </div>
        </main>
    );
}
