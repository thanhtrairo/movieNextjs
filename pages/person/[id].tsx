import React, { useState } from 'react'
import Header from '../../src/components/header/Header'
import { SvgAdd } from '../../src/components/SvgAdd'
import { MovieType } from '../../src/type/type'
import { useRouter } from 'next/router'
import apiConfig from '../api/apiConfig'
import moment from 'moment'
import Link from 'next/link'
import { fetcher } from '~/services/fetcher'
import useSWR from 'swr'
import request from '~/utils/request'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import Notfound from 'pages/404'
import { Loading } from '~/components/loading/Loading'
import clsx from 'clsx'
import Image from 'next/image'
import LazyLoad from 'react-lazyload'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const PersonDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [showStory, setShowStory] = useState<boolean>(false)

  const { data: personDetail, error: personDetailError } = useSWR(id ? request.fetchPersonDetail(id) : null, fetcher)

  const { data: personDetailMovie, error: personDetailMovieError } = useSWR(
    id ? request.fetchPersonDetailMovie(id) : null,
    fetcher
  )
  const { t } = useTranslation()

  if (personDetailError || personDetailMovieError) return <div>failed to load</div>
  if (!personDetail || !personDetailMovie) return <Loading>Loading...</Loading>
  if (personDetail.status_message || personDetail.status_message) return <Notfound />

  return (
    <div className="overflow-hidden text-[80%] sm:text-[100%]">
      <Header />
      <div className="bg-white5">
        <div className="mx-auto sm:container ">
          <div className="bg-white px-8 py-20">
            <div className="border-[1px] border-solid border-gray5 px-4 py-4 sm:px-0">
              <p className="text-36">{personDetail.name}</p>
              <div className="flex flex-wrap">
                <div className="basis-6/12 sm:basis-4/12">
                  <div className="">
                    <Image
                      src={apiConfig.originalImage(personDetail.profile_path)}
                      alt={personDetail.name}
                      priority
                      width="400px"
                      height="600px"
                    />
                  </div>
                </div>
                <div className="w-full sm:basis-8/12 sm:px-6">
                  <p className={clsx({ ['hiddenTextLine']: !showStory })}>{personDetail.biography}</p>
                  <button onClick={() => setShowStory(!showStory)} className="text-blue1">
                    {t('common:MoreToWatch')}{' '}
                    {!showStory ? <FaAngleDown className="inline-block" /> : <FaAngleUp className="inline-block" />}
                  </button>
                  <p className="mt-4 flex gap-2">
                    <span className="font-medium">{t('common:Born')}</span>
                    <span className="text-blue1">{moment(personDetail.birthday).format('MMM Do YY')}</span>
                    <span>{t('common:in')}</span>
                    <span className="text-blue1">{personDetail.place_of_birth}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 border-[1px] border-solid border-gray5 p-4 sm:px-0">
              {personDetailMovie.cast.length > 0 && <p className="text-32 text-yellow1">{t('common:KnownFor')}</p>}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-10">
                {personDetailMovie.cast.map((movie: MovieType) => (
                  <LazyLoad key={movie.id} height={100} offset={[-100, 100]} placeholder={<Loading />}>
                    <div className="">
                      <div className="group relative h-[260px] w-full overflow-hidden sm:h-[300px]">
                        <Link href={`/movie/${movie.id}`}>
                          <div className="absolute left-0 top-0 z-20 hidden h-full w-full cursor-pointer bg-blackOver group-hover:block"></div>
                        </Link>
                        <LazyLoad once={true}>
                          <Image
                            src={apiConfig.originalImage(movie.poster_path)}
                            alt={movie.title}
                            priority
                            width="240px"
                            height="360px"
                          />
                        </LazyLoad>
                        <div className="absolute left-0 top-0">
                          <SvgAdd width="36" height="50" />
                        </div>
                      </div>
                      <div className="text-center text-14 sm:px-3">
                        <p className="text-blue1">{movie.title}</p>
                        <div className="text-gray6">
                          <p>{movie.character}</p>
                          <p>{moment(movie.release_date).format('MMM Do YY')}</p>
                        </div>
                      </div>
                    </div>
                  </LazyLoad>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonDetail

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale), ['common'])),
    },
  }
}
