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
    id: "guitar",
    label: "Guitar",
  },
  {
    id: "piano",
    label: "Piano",
  },
  {
    id: "drums",
    label: "Drums",
  },
  {
    id: "bass",
    label: "Bass",
  },
  {
    id: "flute",
    label: "Flute",
  },
  {
    id: "violin",
    label: "Violin",
  },
  {
    id: "saxophone",
    label: "Saxophone",
  },
]

const FormSchema = z.object({
  instruments: z.array(z.string()).refine((value) => value.some((instrument) => instrument), {
    message: "You have to select at least one instrument.",
  }),
})

let selectedInstruments: string[] = [] // Fetched from database

export default function Profile() {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        instruments: [], // Fetched from database
      },
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast("You submitted the following values", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }

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
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="instruments"
                          render={() => (
                            <FormItem>
                              {instruments.map((instrument) => (
                                <FormField
                                  key={instrument.id}
                                  control={form.control}
                                  name="instruments"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={instrument.id}
                                        className="flex flex-row items-center gap-2"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(instrument.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, instrument.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== instrument.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {instrument.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Submit</Button>
                      </form>
                    </Form>
                </div>
            </main>
        </>
    );
}