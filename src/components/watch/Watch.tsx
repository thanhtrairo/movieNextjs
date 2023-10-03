import { useTranslation } from 'next-i18next'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setShow } from '~/redux/modal/modalRateSlice'
import { RootState } from '~/redux/store'
import { MovieType } from '../../type/type'
import { Popup } from '../Modal/Popup'
import { Rate } from '../Modal/Rate'
import { Title } from '../title/Title'
import { WatchList } from './WatchList'
import { WatchListComponent } from './WatchListComponent'

export const Watch: React.FC<{ moviePopular: MovieType[]; watchList: MovieType[]; ratingList: MovieType[] }> = ({
  moviePopular,
  watchList,
  ratingList,
}) => {
  const modalShow = useSelector((state: RootState) => state.modalShow)
  const dispatch = useDispatch()

  const handleShow = () => {
    dispatch(
      setShow({
        rate: {
          showRate: false,
          movieId: '',
        },
        video: {
          showVideo: false,
          videoId: '',
        },
      })
    )
  }
  const { t } = useTranslation()
  return (
    <>
      {modalShow.rate.showRate && <Rate onShow={() => handleShow()} movieId={modalShow.rate.movieId} />}
      {modalShow.video.showVideo && <Popup onShow={() => handleShow()} videoId={modalShow.video.videoId} />}
      {(modalShow.rate.showRate || modalShow.video.showVideo) && (
        <div
          className="fixed left-0 top-0 z-20 h-screen w-full bg-blackOver group-hover:block"
          onClick={() => handleShow()}
        ></div>
      )}
      <div className="flex flex-row items-center justify-between">
        <Title>{t('header:WhatToWatch')}</Title>
        <h2 className="text hidden cursor-pointer flex-row items-center space-x-2 text-blue1 sm:flex">
          {t('header:GetMoreRecommendations')} <FaAngleRight />
        </h2>
      </div>
      <div>
        <WatchList watchList={watchList} ratingList={ratingList} />
        <WatchListComponent
          movieList={moviePopular}
          titleCategories={t('header:FanFavorites')}
          titleCategoriesPlaceholder={t('header:ThisWeekTopTVAndMovies')}
          watchList={watchList}
          ratingList={ratingList}
          slider
        />
      </div>
    </>
  )
}
