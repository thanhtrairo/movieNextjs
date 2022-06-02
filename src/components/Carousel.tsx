import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { FaAngleRight } from 'react-icons/fa'
import { SvgAdd } from './SvgAdd'
import { Play } from './Play'
import { MovieType } from '../type/type'
import apiConfig from '../../pages/api/apiConfig'
import MovieServices from '~/services/MovieServices'
import { Popup } from './Modal/Popup'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const Carousel: React.FC<{ movieTrending: MovieType[] }> = ({ movieTrending }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [videoId, setVideoId] = useState<string>('')

  const handleShowVideo = async (id: string) => {
    try {
      const res = await MovieServices.getMovieVideos(id)
      setVideoId(res.data.results[0].key)
      setShowPopup(!showPopup)
    } catch (error) {
      setVideoId('')
      setShowPopup(!showPopup)
    }
  }

  const { t } = useTranslation()

  return (
    <>
      {showPopup && (
        <>
          <Popup onShow={() => setShowPopup(false)} videoId={videoId} />
          <div
            className="fixed top-0 left-0 z-20 h-screen w-full bg-blackOver group-hover:block"
            onClick={() => setShowPopup(false)}
          ></div>
        </>
      )}
      <div className=" relative  my-4">
        <div className="group w-full hover:cursor-pointer sm:w-8/12">
          <Slider {...settings}>
            {movieTrending.map((movie: MovieType) => (
              <div className="relative" key={movie.id} onClick={() => handleShowVideo(movie.id)}>
                <Image
                  src={apiConfig.originalImage(movie.backdrop_path)}
                  alt={movie.title}
                  priority
                  width="1000px"
                  height="600px"
                />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <div className="relative flex flex-row items-end space-x-4">
                    <div className="hidden px-6 sm:block sm:basis-3/12">
                      <Image
                        src={apiConfig.originalImage(movie.poster_path)}
                        alt={movie.original_title}
                        priority
                        width="200px"
                        height="300px"
                      />
                      <div className="absolute top-0 left-6">
                        <SvgAdd width="36" height="50" />
                      </div>
                    </div>
                    <div className="w-full sm:basis-8/12">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Play width="70" height="70" />
                        </div>
                        <div className="">
                          <p className="text-20 sm:text-36">{movie.title}</p>
                          <p className="hiddenText text-20 opacity-70">{movie.overview}</p>
                        </div>
                        <p className="text-20 opacity-70">2.51</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="absolute top-0 right-[-1%] hidden sm:block sm:w-4/12">
          <h2 className="text-yellow-400">{t(`header:UpNext`)}</h2>
          <div className="py-6">
            <div className="flex flex-col gap-3">
              {movieTrending.slice(1, 4).map((movie: MovieType) => (
                <div className="flex flex-row" key={movie.id} onClick={() => handleShowVideo(movie.id)}>
                  <div className="basis-3/12 px-3">
                    <Image
                      src={apiConfig.originalImage(movie.poster_path)}
                      alt={movie.title}
                      priority
                      width="200px"
                      height="300px"
                    />
                  </div>
                  <div className="basis-9/12 px-4">
                    <div className="group flex flex-col space-y-2 hover:cursor-pointer">
                      <div className="flex items-end space-x-2 ">
                        <Play width="32" height="32" />
                        <p className="opacity-70">2:15</p>
                      </div>
                      <div>
                        <p>{movie.title}</p>
                        <p className="hiddenText text-14 opacity-70">{movie.overview}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/" passHref>
              <a className="flex items-center space-x-2 pl-3 pt-4 text-20 font-medium hover:text-yellow-400">
                <span>{t('header:BrowseTrailers')}</span> <FaAngleRight />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel
