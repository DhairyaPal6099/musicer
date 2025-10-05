import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command"
import { Loader2 } from "lucide-react"
import localArtistsJson from "@/data/localArtists.json"

// Fix: IDs are strings (MusicBrainz IDs are UUIDs)
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
  const cache = useRef<Map<string, Artist[]>>(new Map())
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Local artists typed correctly
  const localArtists: Artist[] = localArtistsJson as Artist[]

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      searchArtists(query)
    }, 400)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const searchArtists = async (q: string) => {
    if (!q) {
      setResults([])
      return
    }

    // 1️⃣ Check local matches
    const localMatches = localArtists.filter((a) =>
      a.name.toLowerCase().includes(q.toLowerCase())
    )

    if (localMatches.length > 0) {
      setResults(localMatches.slice(0, 10))
      return
    }

    // 2️⃣ Check cache
    if (cache.current.has(q)) {
      setResults(cache.current.get(q)!)
      return
    }

    // 3️⃣ Fetch from MusicBrainz
    setLoading(true)
    try {
      const res = await fetch(
        `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(q)}&fmt=json`
      )
      const data = await res.json()
      const apiResults: Artist[] =
        data.artists?.slice(0, 10).map((a: any) => ({
          id: a.id, // Keep as string
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
    <div className="w-full max-w-sm">
      <Input
        placeholder="Search for an artist..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Command className="mt-2 border rounded-lg shadow-sm bg-white">
        <CommandList>
          {loading && (
            <CommandItem disabled className="flex items-center gap-2">
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
                  setQuery("") // reset input safely
                  setResults([])
                }}
              >
                {artist.name}
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  )
}
