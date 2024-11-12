import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-svh flex justify-center items-center">
      <div>
        <h1 className="text-2xl text-center">Welcome to Zenstreet Calendar</h1>
        <p>Click the below links to see the outcomes of each checkpoint</p>

        <div className="flex gap-4">
          <Link className="underline text-lg text-blue-400" href="/cp1">
            CheckPoint 1
          </Link>

          <Link className="underline text-lg text-blue-400" href="/cp2">
            CheckPoint 2
          </Link>
        </div>
      </div>
    </section>
  );
}
