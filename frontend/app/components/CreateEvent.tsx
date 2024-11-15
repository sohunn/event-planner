"use client"

import React, { useActionState, useEffect, useState } from 'react'
import { createEvent } from '../cp2/actions'
import { toast } from 'react-toastify'
import { ScheduledEvent } from '../types'

function CreateEvent({ date }: { date?: Date }) {
    const [isVisible, setisVisible] = useState(false)
    const [status, formAction] = useActionState(createEvent, null)
    const [popup, setpopup] = useState(false)
    const [currentEvent, setcurrentEvent] = useState<ScheduledEvent | null>(null)

    const scheduleNotification = (event: ScheduledEvent, snooze?: boolean) => {
        setTimeout(() => {
            const notification = new Notification(`Event: ${event.name}`, {
                body: `Scheduled for ${event.time}`,
                requireInteraction: true,
            })

            notification.onclick = () => notification.close()

            notification.onclose = () => {
                setpopup(true)
                setcurrentEvent(event)
            }

        }, snooze ? 5 * 60 * 1000 : new Date(`${event.date}T${event.time}:00`).getTime() - Date.now())
    }

    const formatDate = () => {
        if (date) {
            const year = date.getFullYear()
            const month = String(date?.getMonth() + 1).padStart(2, '0');
            const day = String(date?.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }

    useEffect(() => {
        if (status?.msg) {
            if (status.msg === 'close') {
                setisVisible(!isVisible)
                if (Notification.permission === 'granted' && status.event) {
                    scheduleNotification(status.event)
                }
            }
            else {
                toast(status.msg)
            }
        }
    }, [status])

    const close = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setisVisible(!isVisible)
    }

    return (
        <div>
            <button className='btn btn-primary' onClick={() => setisVisible(!isVisible)}>Schedule Event</button>
            {
                isVisible &&
                <div className='z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4'>
                    <form action={formAction} className='p-6 bg-base-300 rounded-lg relative'>
                        <div className='flex justify-end absolute right-2 top-0'>
                            <button onClick={close}>x</button>
                        </div>
                        <h2 className='text-center text-xl mb-3'>Let's get started</h2>
                        <label className="input input-primary input-bordered flex items-center gap-2 mb-4">
                            <input required type="text" name='name' className="grow" placeholder='What do we call your event?' />
                        </label>

                        <textarea defaultValue={"No description Provided"} name='description' className="textarea textarea-primary w-full mb-4" placeholder="Add a description (optional)"></textarea>

                        <label>
                            <p>Pick a date</p>
                            {
                                typeof date !== 'undefined'
                                    ? <input required readOnly value={formatDate()} className='px-2 w-full bg-base-100 rounded-lg mb-3' type="date" name='date' />
                                    : <input required className='px-2 w-full bg-base-100 rounded-lg mb-3' type="date" name='date' />
                            }
                        </label>

                        <label>
                            <p>Pick a time</p>
                            <input required type="time" name="time" className='px-2 w-full bg-base-100 rounded-lg mb-4' />
                        </label>

                        <div className='flex justify-center'>
                            <button type='submit' className='btn btn-success'>Create</button>
                        </div>
                    </form>
                </div>
            }

            {
                popup && currentEvent &&
                <div className='z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35%] bg-base-300 rounded-lg p-6'>
                    <p>Here's your reminder for: {currentEvent.name}<br />What would you like to do?</p>
                    <div className='flex gap-4'>
                        <button onClick={() => {
                            scheduleNotification(currentEvent, true)
                            setpopup(false)
                            toast("You snoozed. I'll remind you again in 5 minutes!")
                        }} className='btn btn-warning'>Snooze</button>
                        <button onClick={() => {
                            setpopup(false)
                            toast("Event marked as complete")
                        }} className='btn btn-error'>Cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CreateEvent