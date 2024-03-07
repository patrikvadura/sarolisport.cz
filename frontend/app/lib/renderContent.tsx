import React, { ReactNode } from 'react';

import {Image, Link} from "@nextui-org/react";

interface ContentItem {
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    children?: ContentItem[];
    level?: number;
    url?: string;
    format?: string;
    image?: any;
}

const renderContent = (contentItems: ContentItem[]): ReactNode[] => {
    return contentItems.map((item, index) => {
        if (item.type === 'paragraph' || item.type === 'heading' || item.type === 'list-item') {
            let CustomTag = item.type === 'list-item' ? 'li' : (item.type === 'heading' && item.level
                ? `h${item.level}`
                : 'p') as keyof JSX.IntrinsicElements;

            return React.createElement(CustomTag, { key: index }, renderContent(item.children || []));
        }

        if (item.type === 'text') {
            let CustomTag = 'span' as keyof JSX.IntrinsicElements;

            if (item.bold) CustomTag = 'strong';
            if (item.italic) CustomTag = 'em';
            if (item.underline) CustomTag = 'u';
            if (item.strikethrough) CustomTag = 'del';

            return React.createElement(CustomTag, { key: index }, item.text || '');
        }

        if (item.type === 'link' && item.url && item.children) {
            return <Link key={index} href={item.url}>{renderContent(item.children)}</Link>
        }

        if (item.type === 'image' && item.image) {
            return <Image key={index} src={item.image.url} alt="image" />
        }

        if (item.type === 'list' && item.format) {
            let CustomTag = item.format === 'ordered' ? 'ol' : 'ul';
            return React.createElement(CustomTag, { key: index }, renderContent(item.children || []))
        }

        if (item.type === 'quote' && item.children) {
            return <blockquote key={index}>{renderContent(item.children)}</blockquote>
        }

        return null;
    });
};

export default renderContent;
