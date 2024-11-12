import CreateEvent from "../components/CreateEvent";
import ScheduledEventComponent from "../components/ScheduledEvent";
import { apiUrl } from "../constants";
import { ScheduledEvent } from "../types";

export default async function CheckPointTwo() {
    const response = await fetch(`${apiUrl}/events`)
    const events = await response.json() as ScheduledEvent[]

    return (
        <section className="mt-2 px-6">
            <div>
                <h1 className="text-2xl text-center">Welcome to checkpoint 2</h1>
                <div className="mb-6">
                    <CreateEvent />
                </div>

                {
                    events.length > 0
                        ?
                        <>
                            <h1 className="text-2xl font-bold mb-3">Events Scheduled: {events.length}</h1>
                            <div className="flex flex-wrap gap-4">
                                {events.map((event, index) => {
                                    return <ScheduledEventComponent event={event} key={index} />
                                })}
                            </div>
                        </>
                        :
                        <p>You do not have any events scheduled</p>
                }
            </div>
        </section>
    )
}