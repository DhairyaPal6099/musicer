"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const instruments = [
  {
    value: "guitar",
    label: "Guitar",
  },
  {
    value: "piano",
    label: "Piano",
  },
  {
    value: "drums",
    label: "Drums",
  },
  {
    value: "bass",
    label: "Bass",
  },
  {
    value: "flute",
    label: "Flute",
  },
  {
    value: "violin",
    label: "Violin",
  },
  {
    value: "saxophone",
    label: "Saxophone",
  },
]

export default function Profile() {
    const [open, setOpen] = useState(false)
    const [instrument, setInstrument] = useState("Select instrument...")

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
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                            >
                            {instrument
                                ? instruments.find((ins) => ins.value === instrument)?.label
                                : "Select instrument..."}
                            <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                            <CommandInput placeholder="Search instrument..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No instrument found.</CommandEmpty>
                                <CommandGroup>
                                {instruments.map((ins) => (
                                    <CommandItem
                                    key={ins.value}
                                    value={ins.value}
                                    onSelect={(currentValue) => {
                                        setInstrument(currentValue === instrument ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    >
                                    {ins.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        instrument === ins.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </main>
        </>
    );
}