import Image from "next/image";
import { getImageUrl } from "@/lib/image";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Props {
  cast: CastMember[];
}

export default function MovieCast({ cast }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">
        Cast
      </h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
        {cast.slice(0, 10).map((person) => (
          <div
            key={person.id}
            className="group w-full cursor-pointer"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border">
              <Image
                src={getImageUrl(person.profile_path)}
                alt={person.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-2 font-semibold">
              {person.name}
            </h3>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {person.character}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}