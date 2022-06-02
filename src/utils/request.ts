import apiConfig from '../../pages/api/apiConfig'

const request = {
  fetchPopular: `${apiConfig.baseUrl}/movie/popular?${apiConfig.apiKey}`,
  fetchTrending: `${apiConfig.baseUrl}/trending/all/week?${apiConfig.apiKey}`,
  fetchComingSoon: `${apiConfig.baseUrl}/movie/upcoming?${apiConfig.apiKey}`,
  fetchTopRate: `${apiConfig.baseUrl}/movie/top_rated?${apiConfig.apiKey}`,
  fetchStreaming: `${apiConfig.baseUrl}/movie/now_playing?${apiConfig.apiKey}`,
  fetchCasts: (id: string | undefined | string[]) => `${apiConfig.baseUrl}/movie/${id}/casts?${apiConfig.apiKey}`,
  fetchVideoTrailer: `${apiConfig.baseUrl}/movie/453395/videos?${apiConfig.apiKey}`,
  fetchMovieDetail: (id: string | undefined | string[]) => `${apiConfig.baseUrl}/movie/${id}?${apiConfig.apiKey}`,
  fetchMovieReviews: (id: string | undefined | string[]) =>
    `${apiConfig.baseUrl}/movie/${id}/reviews?${apiConfig.apiKey}`,
  fetchMovieDetailTrailer: (id: string | undefined | string[]) =>
    `${apiConfig.baseUrl}/movie/${id}/videos?${apiConfig.apiKey}`,
  fetchRateMovie: (id: string | undefined | string[]) =>
    `${apiConfig.baseUrl}/movie/${id}/rating?${apiConfig.apiKey}&session_id=f30f1f4f9ffab5f0b8414f4a1f4fc7c09f03fbe9`,
  fetchSearch: (query: string, typeSearch: string) =>
    `${apiConfig.baseUrl}/search/${typeSearch}?${apiConfig.apiKey}&query=${query}`,
  fetchTvPopular: `${apiConfig.baseUrl}/tv/popular?${apiConfig.apiKey}`,
  fetchTvLatest: `${apiConfig.baseUrl}/tv/latest?${apiConfig.apiKey}`,
  fetchTvAiringToday: `${apiConfig.baseUrl}/tv/airing_today?${apiConfig.apiKey}`,
  fetchTvOnTheAir: `${apiConfig.baseUrl}/tv/on_the_air?${apiConfig.apiKey}`,
  fetchTvTopRate: `${apiConfig.baseUrl}/tv/top_rated?${apiConfig.apiKey}`,
  fetchPersonPopular: `${apiConfig.baseUrl}/person/popular?${apiConfig.apiKey}`,
  fetchPersonDetail: (id: string | undefined | string[]) => `${apiConfig.baseUrl}/person/${id}?${apiConfig.apiKey}`,
  fetchPersonDetailMovie: (id: string | undefined | string[]) =>
    `${apiConfig.baseUrl}/person/${id}/movie_credits?${apiConfig.apiKey}`,
  fetchLogin: `${apiConfig.baseUrl}/authentication/token/validate_with_login?${apiConfig.apiKey}`,
  fetchToken: `${apiConfig.baseUrl}/authentication/token/new?${apiConfig.apiKey}`,
  fetchWatchList: (accountId: string, sessionId: string) =>
    `${apiConfig.baseUrl}/account/${accountId}/watchlist/movies?session_id=${sessionId}&${apiConfig.apiKey}`,
  fetchFavoriteList: (accountId: string, sessionId: string) =>
    `${apiConfig.baseUrl}/account/${accountId}/favorite/movies?session_id=${sessionId}&${apiConfig.apiKey}`,
  fetchRatingList: (accountId: string, sessionId: string) =>
    `${apiConfig.baseUrl}/account/${accountId}/rated/movies?session_id=${sessionId}&${apiConfig.apiKey}`,
}

export default request
