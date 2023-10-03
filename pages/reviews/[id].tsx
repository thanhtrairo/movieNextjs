import { useRouter } from 'next/router'
import Notfound from 'pages/404'
import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaStar } from 'react-icons/fa'
import useSWR from 'swr'
import Header from '~/components/header/Header'
import { Loading } from '~/components/loading/Loading'
import { fetcher } from '~/services/fetcher'
import request from '~/utils/request'
import moment from 'moment'
import { ReviewsType, MovieType } from '../../src/type/type'
import apiConfig from 'pages/api/apiConfig'
import clsx from 'clsx'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Reviews = () => {
  const [showStory, setShowStory] = useState<boolean>(false)

  const router = useRouter()
  const { id } = router.query

  const { t } = useTranslation(['header'])

  const { data: dataMovieReview, error: errorMovieReview } = useSWR(id ? request.fetchMovieReviews(id) : null, fetcher)
  const { data: dataMovieDetail, error: errorDetail } = useSWR(id ? request.fetchMovieDetail(id) : null, fetcher)

  if (errorMovieReview || errorDetail) return <div>failed to load</div>
  if (!dataMovieReview || !dataMovieDetail) return <Loading>Loading...</Loading>
  if (dataMovieReview.status_message || dataMovieDetail.status_message) return <Notfound />
  const movieReview: ReviewsType[] = dataMovieReview.results
  const movieDetail: MovieType = dataMovieDetail
  return (
    <div className="overflow-hidden text-[80%] sm:text-[100%]">
      <Header />
      <div className="bg-white5">
        <div className="mx-auto sm:container ">
          <div className="min-h-screen bg-white px-8 py-20">
            <div className="flex">
              <div className="mr-2">
                <Image
                  src={apiConfig.originalImage(movieDetail.poster_path)}
                  alt={movieDetail.title}
                  priority
                  width="100px"
                  height="140px"
                />
              </div>
              <div>
                <p>
                  <span className="text-blue1">{movieDetail.title}</span>
                  <span className="text-14 opacity-70">{`(${moment(movieDetail.release_date).format(
                    'MMM Do YY'
                  )})`}</span>
                </p>
                <p className="text-blue1">
                  {movieReview.length} {t(`reviews`)}
                </p>
              </div>
            </div>
            <div className="my-10">
              {movieReview.map((review) => (
                <div className="my-4 bg-white6 p-4" key={review.id}>
                  <div className="mb-2 flex">
                    <div className="mr-2">
                      <Image
                        src={
                          review.author_details.avatar_path.includes('https')
                            ? review.author_details.avatar_path.substring(1)
                            : apiConfig.originalImage(review.author_details.avatar_path)
                        }
                        alt={review.author_details.name}
                        priority
                        width="100px"
                        height="120px"
                      />
                    </div>
                    <div>
                      <p className="flex items-center text-14">
                        <FaStar className="mr-2 inline-block text-yellow-400" />
                        <span className="text-16">{review.author_details.rating}</span>/10
                      </p>
                      <p className="my-2 flex gap-2 text-12">
                        <span className="text-blue1">{review.author_details.name}</span>
                        <span>{moment(review.created_at).format('MMM Do YY')}</span>
                      </p>
                    </div>
                  </div>
                  <p className={clsx('text-14', { ['hiddenTextLine']: !showStory })}>{review.content}</p>
                  <button onClick={() => setShowStory(!showStory)} className="text-blue1">
                    {t('MoreToWatch')}{' '}
                    {!showStory ? <FaAngleDown className="inline-block" /> : <FaAngleUp className="inline-block" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale), ['common'])),
    },
  }
}
