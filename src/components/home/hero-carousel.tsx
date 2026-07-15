"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { useCallback, useEffect, useState } from "react";

import HeroSlide from "./hero-slide";
import HeroControls from "./hero-controls";

interface HeroCarouselProps {
    movies: any[];
}

export default function HeroCarousel({
    movies,
}: HeroCarouselProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const autoplay = Autoplay({
        delay: 15000,
        stopOnInteraction: false,
    });

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [autoplay]
    );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
        autoplay.reset();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
        autoplay.reset();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(
                emblaApi.selectedScrollSnap()
            );
        };

        emblaApi.on("select", onSelect);

        onSelect();
    }, [emblaApi]);

    return (
        <section className="relative">

            <div
                ref={emblaRef}
                className="overflow-hidden"
            >
                <div className="flex">
                    {movies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="min-w-0 flex-[0_0_100%]"
                        >
                            <HeroSlide movie={movie} isActive={selectedIndex === index} />
                        </div>
                    ))}
                </div>
            </div>

            <HeroControls
                current={selectedIndex}
                total={movies.length}
                onPrev={scrollPrev}
                onNext={scrollNext}
            />

        </section>
    );
}