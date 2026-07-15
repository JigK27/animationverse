"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Volume2, VolumeX } from "lucide-react";

import HeroVideo from "./hero-video";

import { getImageUrl } from "@/lib/image";

interface Props {
    movie: any;
    isActive: boolean;
}

export default function HeroSlide({
    movie,
    isActive,
}: Props) {
    const title = movie.title ?? movie.name;
    const mediaType = movie.media_type ?? "movie";

    const [videoKey, setVideoKey] = useState("");
    const [iframeReady, setIframeReady] = useState(false);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadTrailer() {
            setVideoKey("");
            setIframeReady(false);

            if (!isActive) return;

            await new Promise((resolve) => setTimeout(resolve, 5000));

            if (cancelled) return;

            const res = await fetch(
                `/api/trailer/${movie.id}?type=${movie.media_type === "tv" ? "tv" : "movie"
                }`
            );

            const data = await res.json();

            if (!cancelled && data.key) {
                setVideoKey(data.key);
            }
        }

        loadTrailer();

        return () => {
            cancelled = true;
            setVideoKey("");
            setIframeReady(false);
        };
    }, [isActive, movie.id, movie.media_type]);

    return (
        <section className="relative h-[100vh] overflow-hidden">
            <AnimatePresence mode="wait">
                <div className="absolute inset-0">
                    {videoKey && (
                        <HeroVideo
                            videoKey={videoKey}
                            muted={muted}
                            onReady={() => setIframeReady(true)}
                        />
                    )}

                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            opacity: iframeReady ? 0 : 1,
                        }}
                        transition={{
                            duration: 1,
                        }}
                    >
                        <Image
                            fill
                            priority
                            src={getImageUrl(movie.backdrop_path, "original")}
                            alt={title}
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />

            <motion.div
                initial={false}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="absolute bottom-20 left-8 z-20 max-w-xl space-y-6"
            >
                <h1 className="text-3xl font-bold text-white md:text-6xl">
                    {title}
                </h1>

                <p className="line-clamp-3 text-gray-200">
                    {movie.overview}
                </p>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:scale-105">
                        <Play size={18} />
                        Play
                    </button>

                    <Link
                        href={`/${mediaType}/${movie.id}`}
                        className="flex items-center gap-2 rounded-lg bg-white/20 px-6 py-3 text-white backdrop-blur transition hover:bg-white/30"
                    >
                        <Info size={18} />
                        Details
                    </Link>

                    <button
                        onClick={() => setMuted((m) => !m)}
                        className="rounded-full bg-black/40 p-3 text-white backdrop-blur"
                    >
                        {muted ? <VolumeX /> : <Volume2 />}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}