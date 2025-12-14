// client/app/utils/Heading.tsx
'use client'

import React, { FC, useEffect } from "react";

interface HeadProps {
    title: string;
    description: string;
    keywords: string;
}

const Heading: FC<HeadProps> = ({ title, description, keywords }) => {
    useEffect(() => {
        // Update document title
        document.title = title;
        
        // Update meta tags
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);
        
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords);
    }, [title, description, keywords]);

    return null;
}

export default Heading;