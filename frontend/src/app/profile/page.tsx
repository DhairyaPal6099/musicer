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
import { GenreBadge } from "@/components/ui/genrebadge"
import ArtistSelector from "@/components/ui/artistselector"
import ProfilePicture from "@/components/ui/profilepicture"
import { useTheme } from "@/hooks/useTheme"

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

const FormSchema = z.object({
  instruments: z.array(z.string()).refine((value) => value.some((instrument) => instrument), {
    message: "You have to select at least one instrument.",
  }),
  genres: z.array(z.string()).max(10, "You can select up to 10 genres."),
  artists: z.array(z.object({ id : z.string(), name : z.string() })).max(10, "You can select up to 10 artists"),
})

export default function Profile() {
    const { theme, setTheme } = useTheme();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          instruments: [], // Fetched from database
          genres: [], // Fetched from database
          artists: [], // Fetched from database
        },
      })
    const [open, setOpen] = useState(false)
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast("You submitted the following values", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-secondary p-4 text-theme border border-theme">
            <code className="text-theme">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }

    return (
        <>
            <main className="flex flex-row min-h-screen bg-theme text-theme transition-colors duration-300 p-5">
              {/* PROFILE */}
              <div className="w-1/3 p-10 border-r border-theme">
                <h1 className="text-4xl font-bold text-primary text-center"><center>Profile Stuff</center></h1>
                <div className="mt-5">
                    <p className="text-lg mt-5 mb-2 text-secondary">Name</p>
                    <input type="text" className="border border-theme p-2 rounded-md bg-transparent text-theme focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200" defaultValue="JohnDoe" />
                    <p className="text-lg mt-5 mb-2">Email</p>
                    <input type="email" className="border border-theme p-2 rounded-md bg-transparent text-theme focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200" defaultValue="johndoe@gmail.com" />
                    
                </div>
              </div>

              {/* AESTHETICS */}
              <div className="w-1/3 p-10">
                <h1 className="text-4xl font-bold text-primary mb-4 text-center"><center>Aesthetics</center></h1>
                <ProfilePicture />
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="border border-theme rounded-md p-2 mt-5 bg-transparent text-theme transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="forest">Forest</option>
                  <option value="sunset">Sunset</option>
                  <option value="ocean">Ocean</option>
                  <option value="midnight">Midnight</option>
                </select>
              </div>

              {/* MUSIC STUFF */}
              <div className="w-1/3 p-10 border-l border-theme">
                <h1 className="text-4xl font-bold text-primary text-center"><center>Music Stuff</center></h1>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="instruments"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-lg mt-5 mb-2 text-secondary">Instruments</FormLabel>
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
                                    <FormLabel className="text-sm font-normal text-theme">
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

                    <FormField
                      control={form.control}
                      name="genres"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg mt-5 mb-2 text-secondary">Genres</FormLabel>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between border-theme bg-transparent text-theme"
                              >
                                {"Add/Remove Genre..."}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0 bg-theme border border-theme">
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
                                          setOpen(false)
                                          if (field.value.includes(currentValue)) {
                                            field.onChange(field.value.filter((g) => g !== currentValue))
                                          } else if (field.value.length < 10) {
                                            field.onChange([...field.value, currentValue])
                                          } else {
                                            alert("You can only select up to 10 genres")
                                          }
                                        }}
                                      >
                                        {genre.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            field.value.includes(genre.value) ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((value) => {
                              const genre = genres.find((g) => g.value === value);
                              return (
                                <GenreBadge
                                  key={value}
                                  label={genre?.label || value}
                                  onRemove={() => {
                                    field.onChange(field.value.filter((g) => g !== value));
                                    }
                                  }
                                />
                              );
                            })}
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="artists"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg mt-5 mb-2 text-secondary">Artists</FormLabel>
                          <ArtistSelector
                            onSelect={(artist) => {
                              if (!field.value.some((a) => a.id === artist.id)) {
                                if (field.value.length < 10) {
                                  field.onChange([...field.value, artist])
                                } else {
                                  alert("You can only select up to 10 artists.")
                                }
                              }
                            }}
                          />                          

                          <div className="flex flex-wrap gap-2">
                            {field.value.map((artist) => (
                              <GenreBadge
                                key={artist.id}
                                label={artist.name}
                                onRemove={() => {
                                  field.onChange(field.value.filter((a) => a.id !== artist.id))
                                }}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                      />


                    <Button type="submit" className="bg-primary text-theme hover:bg-primary/90 transition-all duration-300">Submit</Button>
                  </form>
                </Form>                
              </div>
            </main>
        </>
    );
}