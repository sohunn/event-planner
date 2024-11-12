"use client"

import React, { useActionState, useEffect, useState } from 'react'
import { createEvent } from '../cp2/actions'

function CreateEvent() {
    const [isVisible, setisVisible] = useState(false)
    const [status, formAction] = useActionState(createEvent, null)

    useEffect(() => {
        if (status?.msg === 'close') {
            setisVisible(false)
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
                            <input required className='px-2 w-full bg-base-100 rounded-lg mb-3' type="date" name='date' />
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
        </div>
    )
}

export default CreateEvent