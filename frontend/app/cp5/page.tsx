import Link from "next/link";

export default function CheckPointFive() {
    return (
        <section className="mt-2 px-6">
            <div>
                <h1 className="text-2xl text-center">Welcome to checkpoint 5</h1>
                <div className="min-h-svh flex justify-center items-center">
                    <p className="max-w-[500px]">Browser notifications have been implemented in <Link className="underline text-lg text-blue-400" href={"/cp2"}>Checkpoint 2</Link> and <Link className="underline text-lg text-blue-400" href={"/cp3"}>Checkpoint 3</Link>.</p>
                </div>
            </div>
        </section>
    )
}