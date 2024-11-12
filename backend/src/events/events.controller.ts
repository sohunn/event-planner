import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { ScheduledEvent } from 'src/types';

@Controller('events')
export class EventsController {
    constructor(private eventService: EventsService) { }

    @Get("test")
    test() {
        return this.eventService.test()
    }

    @Get()
    getAllEvents() {
        return this.eventService.getAllEvents()
    }

    @Get(":id")
    getEventByID(@Param() params: any) {
        const id = Number(params.id)
        return this.eventService.getEventByID(id) ?? []
    }

    @Patch(":id")
    update(@Param() params: any, @Body() newEvent: ScheduledEvent) {
        const id = Number(params.id)
        const event = this.eventService.getEventByID(id)

        if (!event) {
            throw new NotFoundException(`No event exists with ID: ${id}`)
        }

        return this.eventService.update(id, newEvent)
    }

    @Delete(":id")
    delete(@Param() params: any) {
        const id = Number(params.id)
        return this.eventService.delete(id)
    }

    @Post()
    create(@Body() event: ScheduledEvent) {
        return this.eventService.create(event)
    }
}
