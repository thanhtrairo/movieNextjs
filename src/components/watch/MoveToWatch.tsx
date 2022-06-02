import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { TitleCategories } from '../title/TitleCategories'

export const MoveToWatch = () => {
  const { t } = useTranslation()
  return (
    <>
      <TitleCategories title={t('header:IMDbHelpsYouSelectThePerfectNextShowOrMovieToWatch')}>
        {t('header:MoreToWatch')}
      </TitleCategories>
      <div className="mt-6 mb-16 flex flex-row space-x-6">
        <Link href="/" passHref>
          <a className="border-2 border-white3 bg-transparent py-1 px-12 text-white3 hover:bg-white2 sm:px-20">
            {t('header:WatchGuide')}
          </a>
        </Link>
        <Link href="/" passHref>
          <a className="border-2 border-white3 bg-transparent px-12 py-1 text-white3 hover:bg-white2 sm:px-20">
            {t('header:MostPopular')}
          </a>
        </Link>
      </div>
    </>
  )
}
