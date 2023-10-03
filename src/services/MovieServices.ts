// import axios from 'axios'
import { axiosInstance } from './setup'

export default class MovieServices {
  // get movies
  static async getPopularMovies() {
    return axiosInstance.get('/movie/popular')
  }

  static async getTrendingMovies() {
    return axiosInstance.get('/trending/all/day')
  }

  static async getComingSoonMovies() {
    return axiosInstance.get('/movie/upcoming')
  }

  static async getStreamingMovies() {
    return axiosInstance.get('/movie/now_playing')
  }

  // get casts
  static async getMovieCasts(movieId: string | string[] | undefined) {
    return axiosInstance.get(`/movie/${movieId}/casts`)
  }

  // get movie detail
  static async getMovieDetails(movieId: string | string[] | undefined) {
    return axiosInstance.get(`/movie/${movieId}`)
  }

  // get video movie
  static async getMovieVideos(movieId: string | string[] | undefined) {
    return axiosInstance.get(`/movie/${movieId}/videos`)
  }

  // get person
  static async getPopularPerson() {
    return axiosInstance.get('/person/popular')
  }

  static async getPersonDetail(personId: string | string[] | undefined) {
    return axiosInstance.get(`/person/${personId}`)
  }

  static async getPersonMovies(personId: string | string[] | undefined) {
    return axiosInstance.get(`/person/${personId}/movie_credits`)
  }

  // get data by search
  static async getSearch(query: string, typeSearch: string) {
    return axiosInstance.get(`/search/${typeSearch}?query=${query}`)
  }

  // get movie rating
  static async getMovieRatingList(accountId: string, sessionId: string) {
    return axiosInstance.get(`/account/${accountId}/rated/movies?session_id=${sessionId}`)
  }

  // post rate movie
  static async postRateMovie(movieId: string, sessionId: string, value: { value: number }, config: Object) {
    return axiosInstance.post(`/movie/${movieId}/rating?session_id=${sessionId}`, value, config)
  }

  // delete rate movie
  static async deleteRateMovie(movieId: string, sessionId: string) {
    return axiosInstance.delete(`/movie/${movieId}/rating?session_id=${sessionId}`)
  }

  // login
  static async postLogin(value: { request_token: string }, config: Object) {
    return axiosInstance.post(`/authentication/session/new`, value, config)
  }

  // get account detail
  static async getAccount(sessionId: string) {
    return axiosInstance.get(`/account?session_id=${sessionId}`)
  }

  // get request token
  static async getRequestToken() {
    return axiosInstance.get(`/authentication/token/new`)
  }

  // get watchlist movie
  static async getMovieWatchList(accountId: string, sessionId: string) {
    return axiosInstance.get(`/account/${accountId}/watchlist/movies?session_id=${sessionId}`)
  }

  // add watchlist movie
  static async postAddMovieWatchList(
    accountId: string,
    sessionId: string,
    value: { media_type: string; media_id: string; watchlist: boolean },
    config: Object
  ) {
    return axiosInstance.post(`/account/${accountId}/watchlist?session_id=${sessionId}`, value, config)
  }

  // get favorite
  static async getFavoriteList(accountId: string, sessionId: string) {
    return axiosInstance.get(`/account/${accountId}/favorite/movies?session_id=${sessionId}`)
  }

  // add favorite movie
  static async postAddFavoriteList(
    accountId: string,
    sessionId: string,
    value: { media_type: string; media_id: string; favorite: boolean },
    config: Object
  ) {
    return axiosInstance.post(`/account/${accountId}/favorite?session_id=${sessionId}`, value, config)
  }
}
