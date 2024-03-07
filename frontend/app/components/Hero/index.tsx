'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Image } from "@nextui-org/react";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const pilsnerBeer01 = useRef<HTMLElement | any>(null);
    const pilsnerBeer02 = useRef<HTMLElement | any>(null);

    useEffect(() => {
        gsap.fromTo(pilsnerBeer01.current, {
            y: 0,
            rotation: 0,
        }, {
            y: 250,
            rotation: -30,
            scrollTrigger: {
                trigger: 'body',
                start: '0',
                end: '600px',
                scrub: true,
                markers: true,
            },
        });
    }, []);

    useEffect(() => {
        gsap.fromTo(pilsnerBeer02.current, {
            y: 200,
            rotation: 0,
        }, {
            y: -150,
            rotation: 20,
            scrollTrigger: {
                trigger: 'body',
                start: '0',
                end: '600px',
                scrub: true,
                markers: true,
            },
        });
    }, []);

    return (
        <div className="relative h-160 bg-primary">
            <Image
                removeWrapper
                alt="Hospůdka U Ježka"
                className="absolute top-0 left-0 z-0 w-full h-full object-cover !opacity-50 grayscale mix-blend-multiply"
                src="/images/hero/hero_1.webp"
            />

            <div className="relative px-10 md:px-0 flex flex-col items-center justify-center h-full max-w-screen-lg mx-auto z-10">
                <h1 className="filter drop-shadow-lg text-5xl md:text-7xl text-white font-bold text-center rounded-full py-16">
                    K Ježkovi na dobrý mok, cigáro i vepřový bok
                </h1>
            </div>

            <Image
                removeWrapper
                alt="Pilsner Urquell"
                className="pilsnerBeer absolute top-0 right-0 z-0 size-[200px] md:size-[500px] backdrop-filter blur-[2px]"
                ref={pilsnerBeer01}
                src="/images/pilsner-urquell/pilsner-urquell_01.png"
                isZoomed
            />

            <Image
                removeWrapper
                alt="Pilsner Urquell"
                className="pilsnerBeer absolute top-32 left-0 md:left-32 z-0 size-[300px] filter filter-op blur-sm !opacity-60"
                ref={pilsnerBeer02}
                src="/images/pilsner-urquell/pilsner-urquell_01.png"
                isZoomed
            />
        </div>
    );
}
