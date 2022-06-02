export interface MovieType {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  name?: string
  id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
  character?: string
  rating?: number
}

export interface CastType {
  adult: boolean
  gender: number
  id: number
  known_for_department: 'Acting'
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface VideoTrailer {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: Date
  id: string
}

export interface VideoTrailerType {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: Date
  id: string
}

export interface PersonType {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  known_for: [
    {
      adult: boolean
      backdrop_path: string
      first_air_date: string
      genre_ids: number[]
      id: number
      media_type: string
      name: string
      origin_country: string[]
      original_language: string
      original_name: string
      overview: string
      poster_path: string
      vote_average: number
      vote_count: number
    }
  ]
  name: string
  popularity: number
  profile_path: string
  also_known_as: string[]
  biography: string
  birthday: string
  deathday?: any
  homepage: string
  imdb_id: string
  place_of_birth: string
}

export interface KeyType {
  id: number
  name: string
}

export interface CompanyType {
  id: number
  name: string
  origin_country: string
}

export interface AccountType {
  success: boolean
  session_id: string
  accountId: string
  username: string
}
export interface ReviewsType {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string
    rating: number
  }
  content: string
  created_at: Date
  id: string
  updated_at: Date
  url: string
}

export interface Props {
  movieTrending: MovieType[]
  moviePopular: MovieType[]
  movieComingSoon: MovieType[]
  movieStreaming: MovieType[]
  casts: CastType[]
  videoTrailers: VideoTrailer[]
  personPopular: PersonType[]
}
