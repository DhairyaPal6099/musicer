import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command"
import { Loader2, ChevronsUpDown } from "lucide-react"
import localArtistsJson from "@/data/localArtists.json"

export type Artist = {
  id: string
  name: string
}

interface ArtistSelectorProps {
  onSelect: (artist: Artist) => void
}

export default function ArtistSelector({ onSelect }: ArtistSelectorProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Artist[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const cache = useRef<Map<string, Artist[]>>(new Map())
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const localArtists: Artist[] = localArtistsJson as Artist[]

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchArtists(query), 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const searchArtists = async (q: string) => {
    if (!q) {
      setResults([])
      return
    }

    const localMatches = localArtists.filter((a) =>
      a.name.toLowerCase().includes(q.toLowerCase())
    )
    if (localMatches.length > 0) {
      setResults(localMatches.slice(0, 10))
      return
    }

    if (cache.current.has(q)) {
      setResults(cache.current.get(q)!)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(
        `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(q)}&fmt=json`
      )
      const data = await res.json()
      const apiResults: Artist[] =
        data.artists?.slice(0, 10).map((a: any) => ({
          id: a.id,
          name: a.name,
        })) || []

      cache.current.set(q, apiResults)
      setResults(apiResults)
    } catch (err) {
      console.error("MusicBrainz fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          Search/Add Artist...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0 bg-theme text-theme border border-secondary transition-colors duration-300">
        <Command>
          <CommandList>
            <CommandItem className="hover:bg-secondary hover:text-primary transition-colors duration-200 p-2">
              <input
                autoFocus
                className="w-full rounded px-2 py-1 bg-theme text-theme border border-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </CommandItem>

            {loading && (
              <CommandItem disabled className="flex items-center gap-2 hover:bg-secondary hover:text-primary transition-colors duration-200">
                <Loader2 className="h-4 w-4 animate-spin" /> Searching...
              </CommandItem>
            )}

            {!loading && results.length === 0 && query && (
              <CommandEmpty>No results found</CommandEmpty>
            )}

            {!loading &&
              results.map((artist) => (
                <CommandItem
                  key={artist.id}
                  onSelect={() => {
                    onSelect(artist)
                    setQuery("")
                    setResults([])
                    setOpen(false)
                  }}
                >
                  {artist.name}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
