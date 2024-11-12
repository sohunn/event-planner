"use server"

import { revalidatePath } from "next/cache"
import { apiUrl } from "../constants"
import { ScheduledEvent } from "../types"

export const createEvent = async (_prevState: any, formData: FormData) => {
    const eventName = formData.get('name') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string

    const payload: Omit<ScheduledEvent, "id"> = {
        name: eventName,
        date,
        time,
        description
    }

    await fetch(`${apiUrl}/events`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': "application/json"
        }
    })

    revalidatePath("/cp2")
    return { msg: "close" }
}

export const deleteEvent = async (formData: FormData) => {
    const id = formData.get("id") as string
    await fetch(`${apiUrl}/events/${id}`, {
        method: 'DELETE'
    })
    revalidatePath("/cp2")
}

export const modifyEvent = async (_prevState: any, formData: FormData) => {
    const id = formData.get("id") as string

    const response = await fetch(`${apiUrl}/events/${id}`)
    const event = await response.json()

    const newName = formData.get("name") as string
    const newDate = formData.get("date") as string
    const newTime = formData.get("time") as string
    const newDescription = formData.get("description") as string

    const newEvent = {}

    // @ts-ignore
    if (event.name !== newName) newEvent.name = newName
    // @ts-ignore
    if (event.date !== newDate) newEvent.date = newDate
    // @ts-ignore
    if (event.time !== newTime) newEvent.time = newTime
    // @ts-ignore
    if (event.description !== newDescription) newEvent.description = newDescription

    await fetch(`${apiUrl}/events/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newEvent)
    })

    revalidatePath("/cp2")
    return { msg: 'close' }
}