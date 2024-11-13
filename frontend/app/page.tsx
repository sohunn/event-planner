"use client"

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  return (
    <section className="min-h-svh flex justify-center items-center">
      <div>
        <h1 className="text-2xl text-center">Welcome to Zenstreet Calendar</h1>
        <p>Click the below links to see the outcomes of each checkpoint</p>

        <div className="flex gap-4">
          <Link className="underline text-lg text-blue-400" href="/cp1">
            CheckPoint 1
          </Link>

          <Link className="underline text-lg text-blue-400" href="/cp2">
            CheckPoint 2
          </Link>

          <Link className="underline text-lg text-blue-400" href="/cp3">
            CheckPoint 3
          </Link>

          <Link className="underline text-lg text-blue-400" href="/cp4">
            CheckPoint 4
          </Link>

          <Link className="underline text-lg text-blue-400" href="/cp5">
            CheckPoint 5
          </Link>
        </div>
      </div>
    </section>
  );
}
