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
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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
]

const genres = [
  { value: "rock", label: "Rock" },
  { value: "pop", label: "Pop" },
  { value: "blues", label: "Blues" },
  { value: "jazz", label: "Jazz" },
  { value: "country", label: "Country" },
  { value: "indie-rock", label: "Indie Rock" },
  { value: "alternative-rock", label: "Alternative Rock" },
  { value: "punk", label: "Punk" },
  { value: "metal", label: "Metal" },
  { value: "folk", label: "Folk" },
  { value: "funk", label: "Funk" },
  { value: "surf-rock", label: "Surf Rock" },
  { value: "psychedelic-rock", label: "Psychedelic Rock" },
  { value: "hard-rock", label: "Hard Rock" },
  { value: "progressive-rock", label: "Progressive Rock" },
  { value: "grunge", label: "Grunge" },
  { value: "southern-rock", label: "Southern Rock" },
  { value: "ska", label: "Ska" },
  { value: "reggae", label: "Reggae" },
  { value: "flamenco", label: "Flamenco" },
  { value: "bluegrass", label: "Bluegrass" },
  { value: "hip-hop", label: "Hip-Hop" },
  { value: "edm", label: "EDM" },
  { value: "rnb", label: "R&B" },
  { value: "soul", label: "Soul" },
  { value: "gospel", label: "Gospel" },
  { value: "latin", label: "Latin" },
  { value: "afrobeat", label: "Afrobeat" },
  { value: "reggaeton", label: "Reggaeton" },
  { value: "trap", label: "Trap" },
  { value: "drum-and-bass", label: "Drum & Bass" },
  { value: "techno", label: "Techno" },
  { value: "classical", label: "Classical" },
  { value: "ballads", label: "Ballads" },
  { value: "singer-songwriter", label: "Singer-Songwriter" },
  { value: "musical-theatre", label: "Musical Theatre" },
  { value: "ambient", label: "Ambient" },
  { value: "new-age", label: "New Age" },
  { value: "post-rock", label: "Post-Rock" },
  { value: "garage-rock", label: "Garage Rock" },
  { value: "lo-fi", label: "Lo-fi" },
  { value: "shoegaze", label: "Shoegaze" },
  { value: "emo", label: "Emo" },
  { value: "math-rock", label: "Math Rock" },
  { value: "industrial", label: "Industrial" },
  { value: "j-pop", label: "J-Pop" },
  { value: "k-pop", label: "K-Pop" },
  { value: "bossa-nova", label: "Bossa Nova" },
  { value: "swing", label: "Swing" },
  { value: "boogie-woogie", label: "Boogie Woogie" },
];

let selectedGenres: string[] = [];

const FormSchema = z.object({
  instruments: z.array(z.string()).refine((value) => value.some((instrument) => instrument), {
    message: "You have to select at least one instrument.",
  }),
})

export default function Profile() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
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
            <main className="flex flex-row p-5">
              {/* PROFILE */}
              <div className="w-1/3 p-10 border-r">
                <h1 className="text-4xl font-bold">Profile</h1>
                <div className="mt-5">
                    <p className="text-lg mt-5 mb-2">Name</p>
                    <input type="text" className="border p-2 rounded" defaultValue="JohnDoe" />
                    <p className="text-lg mt-5 mb-2">Email</p>
                    <input type="email" className="border p-2 rounded" defaultValue="johndoe@gmail.com" />
                    
                </div>
              </div>

              {/* AESTHETICS */}
              <div className="w-1/3 p-10">
                <h1 className="text-4xl font-bold">Aesthetics</h1>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* MUSIC STUFF */}
              <div className="w-1/3 p-10 border-l">
                <h1 className="text-4xl font-bold">Music stuff</h1>
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
                    {/* TODO: Add genres and instruments as part of the form */}
                  </form>
                </Form>
                <p className="text-lg mt-5 mb-2">Genres</p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? genres.find((genre) => genre.value === value)?.label
                        : "Select genre..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search genre..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No genre found.</CommandEmpty>
                        <CommandGroup>
                          {genres.map((genre) => (
                            <CommandItem
                              key={genre.value}
                              value={genre.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                                { selectedGenres.includes(currentValue) ? selectedGenres = selectedGenres.filter((genre) => genre !== currentValue) : selectedGenres.push(currentValue); }
                                {console.log(selectedGenres);}
                              }}
                            >
                              {genre.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  selectedGenres.includes(genre.value) ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-lg mt-5 mb-2">Artists</p>
                <Button type="submit">Submit</Button>
              </div>
            </main>
        </>
    );
}