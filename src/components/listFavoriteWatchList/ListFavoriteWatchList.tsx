import clsx from 'clsx'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import apiConfig from 'pages/api/apiConfig'
import React, { useState } from 'react'
import { FaHeart, FaTrash } from 'react-icons/fa'
import { mutate } from 'swr'
import MovieServices from '~/services/MovieServices'
import { AccountType, MovieType } from '~/type/type'
import request from '~/utils/request'
import { Rate } from '../Modal/Rate'

const ListFavoriteWatchList: React.FC<{
  movieWatchList: { results: MovieType[] }
  favoriteList?: { results: MovieType[] }
  isRating?: boolean
  isFavorite?: boolean
  account: AccountType
  activeTitle: string
}> = ({ movieWatchList, isRating, account, activeTitle, isFavorite, favoriteList }) => {
  const [showRate, setShowRate] = useState<boolean>(false)
  const [movieId, setMovieId] = useState<string>('')

  const handleRemove = async (movie: MovieType) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      if (activeTitle === 'WatchList') {
        mutate(
          request.fetchWatchList(account.accountId, account.session_id),
          (watchList: { results: MovieType[] }) => {
            return { results: watchList.results.filter((watch) => watch.id !== movie.id) }
          },
          false
        )
        await MovieServices.postAddMovieWatchList(
          account.accountId,
          account.session_id,
          { media_type: 'movie', media_id: String(movie.id), watchlist: false },
          config
        )
        mutate(request.fetchWatchList(account.accountId, account.session_id))
      } else {
        mutate(
          request.fetchFavoriteList(account.accountId, account.session_id),
          (favoriteList: { results: MovieType[] }) => {
            return { results: favoriteList.results.filter((favorite) => favorite.id !== movie.id) }
          },
          false
        )
        await MovieServices.postAddFavoriteList(
          account.accountId,
          account.session_id,
          { media_type: 'movie', media_id: String(movie.id), favorite: false },
          config
        )
        mutate(request.fetchFavoriteList(account.accountId, account.session_id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavoriteList = async (movie: MovieType) => {
    const account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    const favorite = favoriteList?.results.some((favorite: MovieType) => favorite.id == movie.id)
    const currentFavorite = movieWatchList.results.find((favorite: MovieType) => favorite.id == movie.id)

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      if (favorite) {
        mutate(
          request.fetchFavoriteList(account.accountId, account.session_id),
          (favoriteList: { results: MovieType[] }) => {
            return { results: favoriteList.results.filter((favorite) => favorite.id !== movie.id) }
          },
          false
        )
      } else {
        mutate(
          request.fetchFavoriteList(account.accountId, account.session_id),
          (favoriteList: { results: MovieType[] }) => {
            return { results: [...favoriteList.results, currentFavorite] }
          },
          false
        )
      }
      await MovieServices.postAddFavoriteList(
        account.accountId,
        account.session_id,
        { media_type: 'movie', media_id: String(movie.id), favorite: !favorite },
        config
      )
      mutate(request.fetchFavoriteList(account.accountId, account.session_id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowRate = (movie: MovieType) => {
    setShowRate(true)
    setMovieId(movie.id)
  }

  const { t } = useTranslation(['movieDetail'])

  return (
    <>
      {showRate && (
        <>
          <Rate onShow={() => setShowRate(false)} movieId={movieId} />
          <div
            className="fixed top-0 left-0 z-20 h-screen w-full bg-blackOver group-hover:block"
            onClick={() => setShowRate(false)}
          ></div>
        </>
      )}
      <div className="my-6 text-[80%] sm:text-[100%]">
        {movieWatchList?.results?.map((movie: MovieType) => (
          <div className="mb-4 flex py-4 shadow-lg" key={movie.id}>
            <div className="group relative basis-4/12 sm:basis-2/12">
              <Link href={`/movie/${movie.id}`}>
                <div className="absolute top-0 left-0 z-20 hidden h-full w-full cursor-pointer bg-blackOver group-hover:block"></div>
              </Link>
              <Image
                src={apiConfig.originalImage(movie.poster_path)}
                alt={movie.title}
                priority
                width="240px"
                height="360px"
              />
            </div>
            <div className="basis-8/12 px-6 sm:basis-10/12">
              <p className="font-medium">{movie.title}</p>
              <p className="opacity-50">{moment(movie.release_date).format('MMM Do YY')}</p>
              <p className="hiddenTextLine my-4">{movie.overview}</p>
              <div className="flex items-center gap-6">
                {isRating && (
                  <div className="flex items-center gap-2">
                    <p
                      onClick={() => handleShowRate(movie)}
                      className="h-[30px] w-[30px] cursor-pointer rounded-full bg-yellow-400 text-center leading-[30px] hover:bg-yellow-500"
                    >
                      {movie.rating}
                    </p>
                    <p> {t('YourRating')}</p>
                  </div>
                )}
                {isFavorite && (
                  <p className="flex items-center">
                    <FaHeart
                      className={clsx('mr-1 cursor-pointer text-20 hover:text-pink-400', {
                        ['text-pink-400']: favoriteList?.results.some((favorite: MovieType) => favorite.id == movie.id),
                      })}
                      onClick={() => handleFavoriteList(movie)}
                    />
                    <span>{t('Favorite')}</span>
                  </p>
                )}
                {!isRating && (
                  <p className="flex items-center">
                    <FaTrash
                      className="mr-1 cursor-pointer text-20 hover:text-red-600"
                      onClick={() => handleRemove(movie)}
                    />
                    <span> {t('Remove')}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ListFavoriteWatchList
