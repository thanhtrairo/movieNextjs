import React, { useEffect, useState } from 'react'

import { FaAngleDown, FaAngleUp, FaCheck, FaRegStar, FaSpinner, FaStar } from 'react-icons/fa'
import Header from '../../src/components/header/Header'
import { Play } from '../../src/components/Play'
import { SvgAdd } from '../../src/components/SvgAdd'
import { TitleCategories } from '../../src/components/title/TitleCategories'
import { AccountType, CastType, MovieType, VideoTrailerType } from '../../src/type/type'
import request from '../../src/utils/request'
import apiConfig from '../api/apiConfig'
import { Popup } from '../../src/components/Modal/Popup'
import moment from 'moment'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { fetcher } from '../../src/services/fetcher'
import { Rate } from '../../src/components/Modal/Rate'
import MovieServices from '~/services/MovieServices'
import Link from 'next/link'
import clsx from 'clsx'
import { Loading } from '~/components/loading/Loading'
import Notfound from 'pages/404'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function MovieDetail() {
  const [showRate, setShowRate] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [autoPlay, setAutoPlay] = useState<boolean>(false)
  const [addWatchList, setAddWatchList] = useState<boolean>(false)
  const [addFavoriteList, setAddFavoriteList] = useState<boolean>(false)
  const [videoId, setVideoId] = useState<string>('')
  const [showTrailers, setShowTrailers] = useState<boolean>(false)
  const [loadingAddWatch, setLoadingAddWatch] = useState<boolean>(false)
  const [loadingAddFavorite, setLoadingAddFavorite] = useState<boolean>(false)
  const [ratingMovie, setRatingMovie] = useState<string>('')

  const [account, setAccount] = useState<AccountType>({ success: false, session_id: '', accountId: '', username: '' })

  const handleShowVideo = (key: string, autoPlay: boolean) => {
    setShowPopup(!showPopup)
    setVideoId(key)
    setAutoPlay(autoPlay)
  }
  const router = useRouter()
  const { id } = router.query

  const { t } = useTranslation()

  useEffect(() => {
    const account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    setAccount(account)
  }, [])

  const { data: watchList, error: errorWatchList } = useSWR(
    account.session_id ? request.fetchWatchList(account.accountId, account.session_id) : null,
    fetcher
  )
  const { data: favoriteList, error: errorFavoriteList } = useSWR(
    account.session_id ? request.fetchFavoriteList(account.accountId, account.session_id) : null,
    fetcher
  )

  const { data: ratingList, error: errorRatingList } = useSWR(
    account.session_id ? request.fetchRatingList(account.accountId, account.session_id) : null,
    fetcher
  )

  const { data: movieDetail, error: errorDetail } = useSWR(id ? request.fetchMovieDetail(id) : null, fetcher)
  const { data: movieDetailTrailer, error: errorDetailTrailer } = useSWR(
    id ? request.fetchMovieDetailTrailer(id) : null,
    fetcher
  )
  const { data: cast, error: errorCast } = useSWR(id ? request.fetchCasts(id) : null, fetcher)
  const { data: MovieReview, error: errorMovieReview } = useSWR(id ? request.fetchMovieReviews(id) : null, fetcher)

  useEffect(() => {
    if (id && favoriteList && watchList && ratingList) {
      setAddWatchList(watchList.results.some((watch: MovieType) => watch.id == id))
      setAddFavoriteList(favoriteList.results.some((favorite: MovieType) => favorite.id == id))
      setRatingMovie(ratingList.results.find((rating: MovieType) => rating.id == id)?.rating)
    }
  }, [id, watchList, favoriteList, ratingList])
  if (
    errorDetail ||
    errorDetailTrailer ||
    errorCast ||
    errorWatchList ||
    errorFavoriteList ||
    errorRatingList ||
    errorMovieReview
  )
    return <div>failed to load</div>
  if (!movieDetail || !movieDetailTrailer || !cast || !MovieReview) return <Loading>Loading...</Loading>
  if (movieDetail.status_message || movieDetailTrailer.status_message || cast.status_message) return <Notfound />

  const handleAddWatchList = async () => {
    if (addWatchList) return
    const requestToken = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    if (requestToken.session_id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      try {
        setLoadingAddWatch(true)
        await MovieServices.postAddMovieWatchList(
          requestToken.accountId,
          requestToken.session_id,
          { media_type: 'movie', media_id: String(movieDetail.id), watchlist: true },
          config
        )
        setAddWatchList(!addWatchList)
      } catch (error) {
        console.log(error)
      }
    } else {
      router.push(`/login?movie/${movieDetail.id}`)
    }
  }

  const handleAddFavoriteList = async () => {
    if (addFavoriteList) return
    const requestToken = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    if (requestToken.session_id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      try {
        setLoadingAddFavorite(true)
        await MovieServices.postAddFavoriteList(
          requestToken.accountId,
          requestToken.session_id,
          { media_type: 'movie', media_id: String(movieDetail.id), favorite: true },
          config
        )
        setAddFavoriteList(!addFavoriteList)
      } catch (error) {
        console.log(error)
      }
    } else {
      router.push(`/login`)
    }
  }

  const handleShowRate = () => {
    setShowRate(!showRate)
  }

  return (
    <div className="overflow-hidden text-[80%] sm:text-[100%]">
      {showPopup && <Popup onShow={() => setShowPopup(false)} videoId={videoId} autoPlay={autoPlay} />}
      {showRate && <Rate onShow={() => setShowRate(false)} movieId={movieDetail.id} />}
      {(showPopup || showRate) && (
        <div
          className="fixed left-0 top-0 z-20 h-screen w-full bg-blackOver group-hover:block"
          onClick={() => {
            setShowRate(false)
            setShowPopup(false)
          }}
        ></div>
      )}
      <Header />
      <div className="overflow-hidden bg-gray px-2 text-white">
        <div className="mx-auto sm:container ">
          <div className="my-10 flex items-center justify-between">
            <h1 className="text-20 sm:text-36">{movieDetail.title}</h1>
            <div className="flex space-x-10">
              <div className="items-center sm:flex-col">
                <p className="text-12 font-medium tracking-widest opacity-70 sm:text-14">
                  {t('movieDetail:Rating').toLocaleUpperCase()}
                </p>
                <div className="flex items-center space-x-2">
                  <FaStar className="fill-yellow-400 text-24 sm:text-32" />
                  <div>
                    <p className="sm:text-20">
                      {movieDetail.vote_average}
                      <span className="opacity-70 sm:text-14">/10</span>
                    </p>
                    <p className="opacity-70 sm:text-14">{Math.floor(movieDetail.vote_count * 0.01)}k</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-12 font-medium tracking-widest opacity-70 sm:text-14 ">
                  {t('movieDetail:YourRating').toLocaleUpperCase()}
                </p>
                <div className="flex cursor-pointer space-x-2" onClick={() => handleShowRate()}>
                  <FaRegStar className="fill-blue1 text-24 sm:text-32" />
                  <p className="sm:text-20">{ratingMovie ? `${ratingMovie}/10` : t('movieDetail:Rate')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full sm:basis-9/12">
              <div
                className="group hover:cursor-pointer"
                onClick={() => handleShowVideo(movieDetailTrailer.results[0]?.key, true)}
              >
                <div className="relative">
                  <Image
                    src={apiConfig.originalImage(movieDetail.backdrop_path)}
                    alt={movieDetail.title}
                    priority
                    width="1000px"
                    height="600px"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="relative flex flex-row items-end space-x-4">
                      <div className="hidden px-6 sm:block sm:basis-3/12">
                        <Image
                          src={apiConfig.originalImage(movieDetail.poster_path)}
                          alt={movieDetail.original_title}
                          priority
                          width="200px"
                          height="300px"
                        />
                        <div className="absolute left-6 top-0">
                          <SvgAdd width="36" height="50" />
                        </div>
                      </div>
                      <div className="basis-8/12">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Play width="70" height="70" />
                          </div>
                          <div className="">
                            <p className="text-20 sm:text-36">{movieDetail.title}</p>
                            <p className="hiddenText opacity-70 sm:text-20">{movieDetail.overview}</p>
                          </div>
                          <p className="opacity-70 sm:text-20">2.51</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:basis-3/12">
              <button onClick={() => setShowTrailers(!showTrailers)} className="my-2 text-blue1 sm:hidden">
                More trailers{' '}
                {showTrailers ? <FaAngleDown className="inline-block" /> : <FaAngleUp className="inline-block" />}
              </button>
              <div className={clsx('hidden flex-col gap-3 sm:flex', { ['flexImportant']: showTrailers })}>
                {movieDetailTrailer.results.slice(1, 5).map((movie: VideoTrailerType) => (
                  <div className="flex flex-row" key={movie.id}>
                    <div className="basis-4/12 sm:px-3">
                      <Image
                        src={apiConfig.originalImage(movieDetail.poster_path)}
                        alt={movieDetail.title}
                        priority
                        width="200px"
                        height="300px"
                      />
                    </div>
                    <div className="basis-8/12 px-4">
                      <div
                        className="group flex flex-col space-y-2 hover:cursor-pointer"
                        onClick={() => handleShowVideo(movie.key, false)}
                      >
                        <div className="flex items-end space-x-2 ">
                          <Play width="32" height="32" />
                          <p className="opacity-70">2:15</p>
                        </div>
                        <div>
                          <p>{movie.type}</p>
                          <p className="hiddenText text-14 opacity-70">{movie.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="my-6 flex flex-wrap">
            <div className="w-full sm:basis-8/12">
              <p className="borderBottomWhite">{movieDetail.overview}</p>
              <p className="borderBottomWhite">
                <span>{t('movieDetail:MovieName')} </span>
                <span className="ml-2 text-blue1">{movieDetail.title}</span>
              </p>
              <p className="borderBottomWhite">
                <span>{t('movieDetail:ReleaseDate')}: </span>
                <span className="ml-2 text-blue1">{moment(movieDetail.release_date).format('MMM Do YY')}</span>
              </p>
            </div>
            <div className="sm:basis-4/12 sm:px-4">
              <p
                className={clsx(' bg-gray2 px-6 py-2 font-medium hover:bg-white4', {
                  ['cursor-pointer']: !addWatchList,
                })}
                onClick={() => handleAddWatchList()}
              >
                <span className="text-24">
                  {addWatchList ? (
                    <FaCheck className="mx-auto inline-block text-16" />
                  ) : loadingAddWatch ? (
                    <FaSpinner className="inline-block animate-spin text-16" />
                  ) : (
                    '+'
                  )}
                </span>
                <span className="ml-2">{t('movieDetail:addWatch')}</span>
              </p>
              <p
                className={clsx(' bg-gray2 px-6 py-2 font-medium hover:bg-white4', {
                  ['cursor-pointer']: !addWatchList,
                })}
                onClick={() => handleAddFavoriteList()}
              >
                <span className="text-24">
                  {addFavoriteList ? (
                    <FaCheck className="mx-auto inline-block text-16" />
                  ) : loadingAddFavorite ? (
                    <FaSpinner className="inline-block animate-spin text-16" />
                  ) : (
                    '+'
                  )}
                </span>
                <span className="ml-2">{t('movieDetail:addFavorite')}</span>
              </p>
              {MovieReview.results.length > 0 && (
                <p className="mt-6 text-blue1">
                  <Link href={`/reviews/${movieDetail.id}`}>
                    <a className="hover:underline">
                      {MovieReview.results.length} {t('movieDetail:userReviews')}
                    </a>
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 bg-white text-black">
        <div className="mx-auto px-4 sm:container">
          <div>
            <TitleCategories title="" textColor>
              {t('movieDetail:TopCasts')}
            </TitleCategories>
            <div className="my-6">
              <div className="grid grid-cols-2 gap-y-4">
                {cast.cast.slice(0, 11).map((cast: CastType) => (
                  <div key={cast.id} className="flex space-x-4">
                    <div className="basis-2/12">
                      <div className="group relative h-[80px] w-[80px] overflow-hidden rounded-full sm:h-[200px] sm:w-[200px]">
                        <Link href={`/person/${cast.id}`}>
                          <div className="absolute left-0 top-0 z-20 hidden h-full w-full cursor-pointer bg-blackOver group-hover:block"></div>
                        </Link>
                        <Image
                          src={apiConfig.originalImage(cast.profile_path)}
                          alt={cast.name}
                          priority
                          width="200px"
                          height="200px"
                        />
                      </div>
                    </div>
                    <div className="basis-10/12">
                      <p className="font-medium">{cast.name}</p>
                      <p className="font-thin">as {cast.original_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale), ['common', 'movieDetail'])),
    },
  }
}
