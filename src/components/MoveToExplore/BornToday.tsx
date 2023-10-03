import moment from 'moment'
import React from 'react'
import Slider from 'react-slick'
import apiConfig from '../../../pages/api/apiConfig'
import { PersonType } from '../../type/type'
import { TitleCategories } from '../title/TitleCategories'
import Link from 'next/link'
import Image from 'next/image'
import LazyLoad from 'react-lazyload'
import { Loading } from '../loading/Loading'
import { useTranslation } from 'next-i18next'

export const BornToday: React.FC<{ personPopular: PersonType[] }> = ({ personPopular }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }
  const { t } = useTranslation()
  const PeopleBornOn = t(`header:PeopleBornOn`)
  return (
    <>
      <TitleCategories title={`${PeopleBornOn} ${moment().format('MMM Do YY')}`}>
        {t('header:BornToday')}
      </TitleCategories>
      <div className="mb-16 mt-4">
        <Slider {...settings}>
          {personPopular.map((person: PersonType) => (
            <LazyLoad key={person.id} offset={[-100, 100]} placeholder={<Loading height={300} />}>
              <div className="group">
                <div className="relative mx-auto h-[180px] w-[180px] cursor-pointer overflow-hidden rounded-full lg:h-[140px] lg:w-[140px]">
                  <Link href={`/person/${person.id}`}>
                    <div className="absolute left-0 top-0 z-20 hidden h-full w-full bg-blackOver group-hover:block"></div>
                  </Link>
                  <LazyLoad once={true} placeholder={<div className="h-[180px] w-[180px] bg-gray"></div>}>
                    <Image
                      src={apiConfig.originalImage(person.profile_path)}
                      alt={person.name}
                      priority
                      width="200px"
                      height="300px"
                    />
                  </LazyLoad>
                </div>
                <div className="my-1 text-center group-hover:opacity-70">
                  <p>{person.name}</p>
                </div>
              </div>
            </LazyLoad>
          ))}
        </Slider>
      </div>
    </>
  )
}
