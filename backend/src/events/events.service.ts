import { Injectable } from '@nestjs/common';
import { ScheduledEvent } from 'src/types';

@Injectable()
export class EventsService {
    private scheduledEvents: ScheduledEvent[]
    private currentID: number

    constructor() {
        this.scheduledEvents = []
        this.currentID = 0
    }

    create(event: ScheduledEvent) {
        const newEvent = { ...event, id: ++this.currentID }
        this.scheduledEvents.push(newEvent)
        return newEvent
    }

    getAllEvents() {
        return this.scheduledEvents
    }

    getEventByID(eventID: number) {
        return this.scheduledEvents.find(event => event.id === eventID)
    }

    update(eventID: number, newEvent: ScheduledEvent) {
        const eventIndex = this.scheduledEvents.findIndex(event => event.id === eventID)
        if (eventIndex === -1) return
        Object.assign(this.scheduledEvents[eventIndex], newEvent)
    }

    delete(eventID: number) {
        const event = this.scheduledEvents.find(event => event.id === eventID)
        if (!event) return

        this.scheduledEvents = this.scheduledEvents.filter(event => event.id !== eventID)
    }

    test() {
        return "This text was sent over an API call to ensure the in-memory db was setup properly"
    }
}
