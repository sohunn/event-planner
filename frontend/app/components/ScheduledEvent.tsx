"use client"

import React, { useActionState, useEffect, useState } from 'react'
import { ScheduledEvent } from '../types'
import { deleteEvent, modifyEvent } from '../cp2/actions'

function ScheduledEventComponent({ event }: { event: ScheduledEvent }) {
    const [editMode, seteditMode] = useState(false)
    const [status, formAction] = useActionState(modifyEvent, null)

    useEffect(() => {
        if (status?.msg === 'close') {
            seteditMode(false)
        }
    }, [status])

    const toggleEditWithoutSubmission = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        seteditMode(!editMode)
    }

    return (
        <div className="card bg-base-300 text-base-content w-96">
            <div className="card-body">
                {
                    editMode ?
                        <form action={formAction}>
                            <label className="input input-primary input-bordered flex items-center gap-2 mb-2">
                                <input defaultValue={event.name} type="text" name='name' className="grow" placeholder={event.name} />
                            </label>

                            <label className="input input-primary input-bordered flex items-center gap-2 mb-4">
                                <input defaultValue={event.description} type="text" name='description' className="grow" placeholder={event.description} />
                            </label>

                            <label>
                                <input defaultValue={event.date} placeholder={event.date} className='px-2 w-full bg-base-100 rounded-lg mb-3' type="date" name='date' />
                            </label>

                            <label>
                                <input defaultValue={event.time} placeholder={event.time} className='px-2 w-full bg-base-100 rounded-lg mb-4' type="time" name='time' />
                            </label>

                            <input type="number" readOnly hidden name='id' value={event.id} />

                            <div className='flex justify-self-end gap-4'>
                                <button onClick={toggleEditWithoutSubmission} className='btn btn-warning'>Cancel</button>
                                <button type='submit' className='btn btn-success'>Save</button>
                            </div>
                        </form>
                        :
                        <>
                            <h2 className="card-title justify-center">{event.name}</h2>
                            <p className='italic'>{event.description}</p>
                            <p>Scheduled On: {event.date}</p>
                            <p>Time: {event.time}</p>
                        </>
                }

                <div className="card-actions justify-end">
                    {
                        !editMode &&
                        <>
                            <button onClick={() => seteditMode(true)} className='btn btn-warning'>Edit</button>
                            <form action={deleteEvent}>
                                <input type="number" value={event.id} name='id' hidden readOnly />
                                <button type='submit' className="btn btn-error">Delete</button>
                            </form>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ScheduledEventComponent