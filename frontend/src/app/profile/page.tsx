"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const instruments = [
  {
    value: "Guitar",
    label: "Guitar",
  },
  {
    value: "Piano",
    label: "Piano",
  },
  {
    value: "Drums",
    label: "Drums",
  },
  {
    value: "Bass",
    label: "Bass",
  },
  {
    value: "Flute",
    label: "Flute",
  },
  {
    value: "Violin",
    label: "Violin",
  },
  {
    value: "Saxophone",
    label: "Saxophone",
  },
]

let selectedInstruments: string[] = [] // Fetched from database

export default function Profile() {

    return (
        <>
            <main className="flex flex-col p-5">
                <h1 className="text-4xl font-bold">Profile</h1>
                <div className="mt-5">
                    <p className="text-lg mt-5 mb-2">Name</p>
                    <input type="text" className="border p-2 rounded" defaultValue="JohnDoe" />
                    <p className="text-lg mt-5 mb-2">Email</p>
                    <input type="email" className="border p-2 rounded" defaultValue="johndoe@gmail.com" />
                    <p className="text-lg mt-5 mb-2">Instruments</p>
                    
                    <ul>
                      {selectedInstruments.map((ins) => (
                        <li key={ins} className="mt-2">{ins}</li>
                      ))}
                    </ul>
                </div>
            </main>
        </>
    );
}