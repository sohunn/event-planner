"use client"

import React, { useEffect, useState } from 'react'
import { ScheduledEvent } from '../types';
import ScheduledEventComponent from './ScheduledEvent';
import CreateEvent from './CreateEvent';

type ScheduledEventWithDateObj = Omit<ScheduledEvent, 'date'> & { date: Date }

const getDaysInMonth = (month: number, year: number) => {
    return new Array(31)
        .fill(null)
        .map((_, index) => new Date(year, month, index + 1))
        .filter((date) => date.getMonth() === month);
};

function CalendarView({ events }: { events: ScheduledEvent[] }) {
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentEvents, setcurrentEvents] = useState<ScheduledEventWithDateObj[]>([])

    useEffect(() => {
        if (selectedDate) {
            const filteredEvents = events
                .map(e => {
                    return { ...e, date: new Date(e.date) }
                })
                .filter(e => e.date.getMonth() === selectedDate.getMonth() && e.date.getFullYear() === selectedDate.getFullYear() && selectedDate.getDate() === e.date.getDate())

            setcurrentEvents(filteredEvents)
        }
        else {
            setcurrentEvents([])
        }

    }, [selectedDate, events])

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <h2 className='text-2xl font-bold'>
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                })}
            </h2>

            <p className='mb-3'>Pick a date to add an event</p>

            <div className="w-[500px] flex flex-wrap gap-4 text-white">
                {daysInMonth.map((date) => (
                    <div
                        key={date.toISOString()}
                        className={`cursor-pointer border-2 border-white w-[50px] h-[50px] flex items-end justify-end pr-2 ${selectedDate?.getDate() === date.getDate() ? "bg-info" : ""}`}
                        onClick={() => handleDateClick(date)}
                    >
                        {date.getDate()}
                    </div>
                ))}
            </div>

            {
                currentEvents.length > 0 &&
                <div className='mt-6 '>
                    <h1 className='text-2xl font-bold mb-2'>Events Scheduled for {selectedDate?.toDateString()}</h1>
                    <div className='flex flex-wrap gap-4'>
                        {
                            currentEvents.map((event, index) => {
                                return <ScheduledEventComponent key={index} event={{ ...event, date: `${event.date.getFullYear()}-${event.date.getMonth() + 1}-${event.date.getDate()}` }} />
                            })
                        }
                    </div>

                </div>
            }

            {
                selectedDate &&
                <div className='mt-6'>
                    <CreateEvent date={selectedDate} />
                </div>
            }

        </div >
    )
}

export default CalendarView