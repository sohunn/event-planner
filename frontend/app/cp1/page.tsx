"use server"

import { apiUrl } from "../constants"

export default async function CheckPointOne() {
    const response = await fetch(`${apiUrl}/events/test`)
    const text = await response.text()

    return (
        <section className="mt-2 flex justify-center items-center min-h-screen">
            <div>
                <h1 className="text-2xl text-center">Welcome to checkpoint 1</h1>
                <p>{text}</p>
            </div>
        </section>
    )
}