export interface Radio {
    station: Station
    listeners: Listeners2
    live: Live
    now_playing: NowPlaying
    playing_next: PlayingNext
    song_history: SongHistory[]
    cache: string
}

interface Station {
    id: number
    name: string
    shortcode: string
    description: string
    frontend: string
    backend: string
    listen_url: string
    is_public: boolean
    mounts: Mount[]
    remotes: any[]
}

interface Mount {
    path: string
    is_default: boolean
    id: number
    name: string
    url: string
    bitrate: number
    format: string
    listeners: Listeners
}

interface Listeners {
    current: number
    unique: number
    total: number
}

interface Listeners2 {
    current: number
    unique: number
    total: number
}

interface Live {
    is_live: boolean
    streamer_name: string
    broadcast_start: any
}

interface NowPlaying {
    elapsed: number
    remaining: number
    sh_id: number
    played_at: number
    duration: number
    playlist: string
    streamer: string
    is_request: boolean
    song: Song
}

interface Song {
    id: string
    text: string
    artist: string
    title: string
    album: string
    genre: string
    lyrics: string
    art: string
    custom_fields: any[]
}

interface PlayingNext {
    cued_at: number
    duration: number
    playlist: string
    is_request: boolean
    song: Song2
}

interface Song2 {
    id: string
    text: string
    artist: string
    title: string
    album: string
    genre: string
    lyrics: string
    art: string
    custom_fields: any[]
}

interface SongHistory {
    sh_id: number
    played_at: number
    duration: number
    playlist: string
    streamer: string
    is_request: boolean
    song: Song3
}

interface Song3 {
    id: string
    text: string
    artist: string
    title: string
    album: string
    genre: string
    lyrics: string
    art: string
    custom_fields: any[]
}