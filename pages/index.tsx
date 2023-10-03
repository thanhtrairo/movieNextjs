import type { GetServerSideProps } from 'next'

import Head from 'next/head'
import Header from '../src/components/header/Header'
import Carousel from '../src/components/Carousel'
import { Watch } from '../src/components/watch/Watch'
import { MoveToWatch } from '../src/components/watch/MoveToWatch'
import { Video } from '../src/components/Video'
import { WatchListComponent } from '../src/components/watch/WatchListComponent'
import { ExportsMovie } from '../src/components/ExportsMovie/ExportsMovie'
import { Footer } from '../src/components/Footer'
import { MoveToExplore } from '../src/components/MoveToExplore/MoveToExplore'
import { AccountType, Props } from '../src/type/type'
import MovieServices from '~/services/MovieServices'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import request from '~/utils/request'
import { fetcher } from '~/services/fetcher'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Home = ({ moviePopular, movieTrending, personPopular, movieStreaming }: Props) => {
  const [account, setAccount] = useState<AccountType>({ success: false, session_id: '', accountId: '', username: '' })

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
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>Movie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overflow-hidden text-[80%] sm:text-[100%]">
        <Header />
        <main className="overflow-hidden bg-gray3 px-2 text-white">
          <div className="mx-auto sm:container">
            <Carousel movieTrending={movieTrending} />
            <div className=" mb-20">
              <Video title={t('header:FeaturedToday')} titleMovie="List" list name slidesShow={2} features />
            </div>
            <Watch moviePopular={moviePopular} watchList={watchList?.results} ratingList={ratingList?.results} />
            <MoveToWatch />
            <Video
              title={t('header:FeaturedToday')}
              titleCategories={t('header:IMDbOriginals')}
              titleCategoriesPlaceholder={t('header:CelebrityInterviewsTrendingEntertainmentStoriesAndExpertAnalysis')}
              titleMovie="3:45"
              name
              slidesShow={3}
            />
            <WatchListComponent
              movieList={movieStreaming}
              title={t('header:ExploreWhat’sStreaming')}
              titleCategories={t('header:PrimeVIDEO')}
              titleCategoriesPlaceholder={t('header:includedWithPrime')}
              slider
              watchList={watchList?.results}
              ratingList={ratingList?.results}
            />
            <ExportsMovie />
            <MoveToExplore personPopular={personPopular} />
            <Footer />
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  try {
    const result = await Promise.all([
      MovieServices.getPopularMovies(),
      MovieServices.getTrendingMovies(),
      MovieServices.getComingSoonMovies(),
      MovieServices.getPopularPerson(),
    ])
    return {
      props: {
        moviePopular: result[0].data.results,
        movieTrending: result[1].data.results,
        movieStreaming: result[2].data.results,
        personPopular: result[3].data.results,
        ...(await serverSideTranslations(String(locale), ['common', 'header'])),
      },
    }
  } catch (e) {
    return {
      // FIXME: should redirect to 500 page
      props: {
        moviePopular: [],
        movieTrending: [],
        movieStreaming: [],
        personPopular: {},
      },
      redirect: '/',
    }
  }
}

export default Home
