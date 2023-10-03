import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import { Loading } from '~/components/loading/Loading'
import { Popup } from '~/components/Modal/Popup'
import { Rate } from '~/components/Modal/Rate'
import { WatchComponent } from '~/components/watch/WatchComponent'
import { setShow } from '~/redux/modal/modalRateSlice'
import { RootState } from '~/redux/store'
import { fetcher } from '~/services/fetcher'
import request from '~/utils/request'
import Header from '../../src/components/header/Header'
import { Title } from '../../src/components/title/Title'
import { AccountType, MovieType } from '../../src/type/type'
import LazyLoad from 'react-lazyload'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const List = () => {
  const modalShow = useSelector((state: RootState) => state.modalShow)
  const [account, setAccount] = useState<AccountType>({ success: false, session_id: '', accountId: '', username: '' })
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
  const TITLES = ['FAN FAVORITES', 'STREAMING', 'TOP PICKS']

  const [active, setActive] = useState<string>('FAN FAVORITES')
  const [pageMoviePopularIndex, setPageMoviePopularIndex] = useState(1)
  const [pageMovieStreamingIndex, setPageMovieStreamingIndex] = useState(1)
  const [pageMovieTrendingIndex, setPageMovieTrendingIndex] = useState(1)

  const pageIndexRender = useMemo(() => {
    if (active === 'STREAMING') return pageMovieStreamingIndex
    if (active === 'TOP PICKS') return pageMovieTrendingIndex
    return pageMoviePopularIndex
  }, [active, pageMoviePopularIndex, pageMovieStreamingIndex, pageMovieTrendingIndex])

  const totalMoviePopularPages =
    pageMoviePopularIndex > 10
      ? Array.from({ length: pageMoviePopularIndex }, (_, i) => i + 1)
      : Array.from({ length: 10 }, (_, i) => i + 1)

  const totalMovieStreamingPages =
    pageMovieStreamingIndex > 10
      ? Array.from({ length: pageMovieStreamingIndex }, (_, i) => i + 1)
      : Array.from({ length: 10 }, (_, i) => i + 1)

  const totalMovieTrendingPages =
    pageMovieTrendingIndex > 10
      ? Array.from({ length: pageMovieTrendingIndex }, (_, i) => i + 1)
      : Array.from({ length: 10 }, (_, i) => i + 1)

  const totalPagesRender = useMemo(() => {
    if (active === 'STREAMING') return totalMovieStreamingPages
    if (active === 'TOP PICKS') return totalMovieTrendingPages
    return totalMoviePopularPages
  }, [active, totalMovieStreamingPages, totalMovieTrendingPages, totalMoviePopularPages])

  const handlePrevPage = () => {
    if (active === 'FAN FAVORITES' && pageMoviePopularIndex > 1) {
      setPageMoviePopularIndex(pageMoviePopularIndex - 1)
      router.push(`/list?page_favorite=${pageMoviePopularIndex - 1}`)
    } else if (active === 'STREAMING') {
      setPageMovieStreamingIndex(pageMovieStreamingIndex - 1)
      router.push(`/list?page_streaming=${pageMovieStreamingIndex - 1}`)
    } else if (active === 'TOP PICKS') {
      setPageMovieTrendingIndex(pageMovieTrendingIndex - 1)
      router.push(`/list?page_trending=${pageMovieTrendingIndex - 1}`)
    }
  }

  const handleNextPage = () => {
    if (active === 'FAN FAVORITES') {
      setPageMoviePopularIndex(pageMoviePopularIndex + 1)
      router.push(`/list?page_favorite=${pageMoviePopularIndex + 1}`)
    } else if (active === 'STREAMING') {
      setPageMovieStreamingIndex(pageMovieStreamingIndex + 1)
      router.push(`/list?page_streaming=${pageMovieStreamingIndex + 1}`)
    } else if (active === 'TOP PICKS') {
      setPageMovieTrendingIndex(pageMovieTrendingIndex + 1)
      router.push(`/list?page_trending=${pageMovieTrendingIndex + 1}`)
    }
  }
  const router = useRouter()

  const handleSetPage = (page: number) => {
    if (active === 'FAN FAVORITES') {
      setPageMoviePopularIndex(page)
      router.push(`/list?page_favorite=${page}`)
    } else if (active === 'STREAMING') {
      setPageMovieStreamingIndex(page)
      router.push(`/list?page_streaming=${page}`)
    } else if (active === 'TOP PICKS') {
      setPageMovieTrendingIndex(page)
      router.push(`/list?page_trending=${page}`)
    }
  }

  const changeTitle = (title: string) => {
    if (title === 'FAN FAVORITES') return 'FanFavorites'
    if (title === 'STREAMING') return 'streaming'
    return 'TopPick'
  }

  useEffect(() => {
    const account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    setAccount(account)
  }, [])

  const { data: watchList } = useSWR(
    account.session_id ? request.fetchWatchList(account.accountId, account.session_id) : null,
    fetcher
  )

  const { data: ratingList } = useSWR(
    account.session_id ? request.fetchRatingList(account.accountId, account.session_id) : null,
    fetcher
  )

  const { data: moviePopular, error: errorMoviePopular } = useSWR(
    `${request.fetchPopular}&page=${pageMoviePopularIndex}`,
    fetcher
  )
  const { data: movieStreaming, error: errorMovieStreaming } = useSWR(
    `${request.fetchStreaming}&page=${pageMovieStreamingIndex}`,
    fetcher
  )
  const { data: movieTrending, error: errorMovieTrending } = useSWR(
    `${request.fetchTrending}&page=${pageMovieTrendingIndex}`,
    fetcher
  )

  const { t } = useTranslation()

  if (errorMoviePopular || errorMovieStreaming || errorMovieTrending) return <div>failed to load</div>
  if (!moviePopular || !movieStreaming || !movieTrending) return <Loading>Loading...</Loading>

  const dataRender = () => {
    if (active === 'STREAMING') return movieStreaming
    if (active === 'TOP PICKS') return movieTrending
    return moviePopular
  }

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
      <Header />
      <main className="overflow-hidden bg-gray3 text-[80%] text-white sm:text-[100%]">
        <div className="mx-auto px-2 sm:container sm:px-0">
          <div className="mt-8">
            <Title>{t('header:WhatToWatch')}</Title>
          </div>
          <nav className="flex flex-wrap gap-y-4">
            {TITLES.map((title) => (
              <div
                key={title}
                className={clsx(
                  'cursor-pointer whitespace-nowrap px-8 py-2 text-[10px] font-medium hover:bg-gray2 sm:text-14',
                  {
                    activeTrailer: active === title,
                  }
                )}
                onClick={() => setActive(title)}
              >
                {t(`header:${changeTitle(title)}`).toLocaleUpperCase()}
              </div>
            ))}
          </nav>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-6">
            {(dataRender() ? dataRender() : moviePopular).results.map((movie: MovieType) => (
              <LazyLoad key={movie.id} height={100} offset={[-100, 100]} placeholder={<Loading height={380} />}>
                <WatchComponent movie={movie} watchList={watchList?.results} ratingList={ratingList?.results} />
              </LazyLoad>
            ))}
          </div>
          <div className="my-10 flex items-center justify-center space-x-4 text-24">
            <FaAngleLeft className="cursor-pointer text-32 hover:bg-gray2" onClick={() => handlePrevPage()} />
            <div>
              {(totalPagesRender ? totalPagesRender : totalMoviePopularPages).map((page: number) => (
                <span
                  key={page}
                  onClick={() => handleSetPage(page)}
                  className={clsx('cursor-pointer px-2 hover:bg-gray2', {
                    ['text-yellow-400']: page === (pageIndexRender ? pageIndexRender : pageMoviePopularIndex),
                  })}
                >
                  {page}
                </span>
              ))}
            </div>
            <FaAngleRight className="cursor-pointer text-32 hover:bg-gray2" onClick={() => handleNextPage()} />
          </div>
        </div>
      </main>
    </>
  )
}

export default List

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale), ['header'])),
    },
  }
}
