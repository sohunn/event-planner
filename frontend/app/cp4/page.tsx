import Link from "next/link";

export default function CheckPointFour() {
    return (
        <section className="mt-2 px-6">
            <div>
                <h1 className="text-2xl text-center">Welcome to checkpoint 4</h1>
                <div className="min-h-svh flex justify-center items-center">
                    <p className="max-w-[500px]">Form validation has been implemented in <Link className="underline text-lg text-blue-400" href={"/cp2"}>Checkpoint 2</Link> and <Link className="underline text-lg text-blue-400" href={"/cp3"}>Checkpoint 3</Link>. Users cannot submit garbage data neither can they create or edit events to reflect dates in the past</p>
                </div>
            </div>
        </section>
    )
}