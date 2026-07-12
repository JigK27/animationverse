interface CrewMember {
  id: number;
  name: string;
  job: string;
}

interface Props {
  crew: CrewMember[];
}

export default function MovieCrew({ crew }: Props) {
  const importantJobs = [
    "Director",
    "Writer",
    "Screenplay",
    "Producer",
    "Original Music Composer",
  ];

  const members = crew.filter((person) =>
    importantJobs.includes(person.job)
  );

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">
        Crew
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {members.map((person) => (
          <div
            key={`${person.id}-${person.job}`}
            className="rounded-xl border p-4"
          >
            <h3 className="font-semibold">
              {person.name}
            </h3>

            <p className="text-muted-foreground">
              {person.job}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}