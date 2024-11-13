"use server"

import CalendarView from "../components/CalendarView";
import { apiUrl } from "../constants";
import { ScheduledEvent } from "../types";

export default async function CheckPointThree() {
    const response = await fetch(`${apiUrl}/events`)
    const events = await response.json() as ScheduledEvent[]

    return (
        <section className="mt-2 px-6">
            <div >
                <h1 className="text-2xl text-center">Welcome to checkpoint 3</h1>
                <div>
                    <CalendarView events={events} />
                </div>
            </div>
        </section>
    )
}