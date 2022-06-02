import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCheck, FaPlay, FaRegStar, FaSpinner, FaStar } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setShow } from '~/redux/modal/modalRateSlice'
import MovieServices from '~/services/MovieServices'
import apiConfig from '../../../pages/api/apiConfig'
import { MovieType } from '../../type/type'
import { SvgAdd } from '../SvgAdd'
import LazyLoad from 'react-lazyload'
import Image from 'next/image'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'

export const WatchComponent: React.FC<{ movie: MovieType; ratingList: MovieType[]; watchList: MovieType[] }> = ({
  movie,
  ratingList,
  watchList,
}) => {
  const dispatch = useDispatch()

  const [addWatchList, setAddWatchList] = useState<boolean>(false)
  const [loadingAddWatch, setLoadingAddWatch] = useState<boolean>(false)
  const [ratingMovie, setRatingMovie] = useState<number>()

  const router = useRouter()

  useEffect(() => {
    if (watchList && ratingList) {
      setAddWatchList(watchList.some((watch: MovieType) => watch.id == movie.id))
      setRatingMovie(ratingList.find((rating: MovieType) => rating.id == movie.id)?.rating)
    }
  }, [movie, watchList, ratingList])

  const handleShowVideo = async (id: string) => {
    const res = await MovieServices.getMovieVideos(id)
    dispatch(
      setShow({
        rate: {
          showRate: false,
          movieId: '',
        },
        video: {
          showVideo: true,
          videoId: res.data.results[0].key,
        },
      })
    )
  }

  const handleShowRate = () => {
    dispatch(
      setShow({
        rate: {
          showRate: true,
          movieId: movie.id,
        },
        video: {
          showVideo: false,
          videoId: '',
        },
      })
    )
  }

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
          { media_type: 'movie', media_id: String(movie.id), watchlist: true },
          config
        )
        setAddWatchList(!addWatchList)
      } catch (error) {
        console.log(error)
      }
    } else {
      router.push(`/login`)
    }
  }
  const { t } = useTranslation()
  return (
    <>
      <div className="mx-3 bg-gray4">
        <div className="group relative cursor-pointer">
          <Link href={`/movie/${movie.id}`} passHref>
            <div className="absolute top-0 left-0 z-20 hidden h-full w-full bg-blackOver group-hover:block"></div>
          </Link>
          <LazyLoad once={true} placeholder={<div className="h-[300px] bg-gray2"></div>}>
            <Image
              src={apiConfig.originalImage(movie.poster_path)}
              alt={movie.title}
              priority
              width="240px"
              height="320px"
            />
          </LazyLoad>

          <div className="absolute top-0 left-0">
            <SvgAdd width="30" height="36" addWatchList={addWatchList} />
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-row items-center space-x-6">
            <div className="flex flex-row items-center">
              <FaStar className="mr-1  h-9 fill-yellow-400 py-3" />
              <p>{movie.vote_average}</p>
            </div>
            <p className="flex cursor-pointer items-center p-2 hover:bg-white2 hover:fill-white">
              <FaRegStar className="h-4 w-4 fill-[#5799ef]" onClick={() => handleShowRate()} />
              <span className="ml-1 text-14 opacity-70">{ratingMovie}</span>
            </p>
          </div>
          <p className="hiddenText my-2">
            <Link href={`/movie/${movie.id}`} passHref>
              <a className="hiddenText hover:underline">{movie.title}</a>
            </Link>
          </p>
          <div
            className={clsx('my-4 bg-white2', { ['cursor-pointer']: !addWatchList })}
            onClick={() => handleAddWatchList()}
          >
            <div className=" flex flex-row items-center justify-center space-x-2 py-1 font-medium text-blue1 hover:bg-white3">
              <span className="">
                {addWatchList ? (
                  <FaCheck className="mx-auto inline-block text-16" />
                ) : loadingAddWatch ? (
                  <FaSpinner className="inline-block animate-spin text-16" />
                ) : (
                  '+'
                )}
              </span>
              <span className="">{t('header:AddWatchList')}</span>
            </div>
          </div>
          <div onClick={() => handleShowVideo(movie.id)}>
            <a className="group flex cursor-pointer flex-row items-center justify-center space-x-2 py-1 hover:bg-white2">
              <FaPlay className="opacity-70 group-hover:opacity-100" />
              <span className="">{t('header:Trailer')}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
