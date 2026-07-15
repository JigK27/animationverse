"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { removeMovie } from "@/actions/watchlist";
import { MediaCardData } from "@/types/movie";

interface Props {
    movie: MediaCardData;
}

export default function RemoveButton({
    movie,
}: Props) {
    const [pending, startTransition] = useTransition();

    return (
        <button
            className="absolute right-2 top-2 rounded-full bg-background/80 p-2 hover:bg-blue-600 transition-colors duration-200"
            disabled={pending}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                startTransition(() => {
                    removeMovie(movie.id);
                    toast.success("Removed from watchlist");
                });
            }
            }
        >
            <Trash2 size={22} />
        </button>
    );
}