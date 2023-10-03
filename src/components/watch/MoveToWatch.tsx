import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { TitleCategories } from '../title/TitleCategories'

export const MoveToWatch = () => {
  const { t } = useTranslation()
  return (
    <>
      <TitleCategories title={t('common:IMDbHelpsYouSelectThePerfectNextShowOrMovieToWatch')}>
        {t('common:MoreToWatch')}
      </TitleCategories>
      <div className="mb-16 mt-6 flex flex-row space-x-6">
        <Link href="/" passHref>
          <a className="border-2 border-white3 bg-transparent px-12 py-1 text-white3 hover:bg-white2 sm:px-20">
            {t('common:WatchGuide')}
          </a>
        </Link>
        <Link href="/" passHref>
          <a className="border-2 border-white3 bg-transparent px-12 py-1 text-white3 hover:bg-white2 sm:px-20">
            {t('common:MostPopular')}
          </a>
        </Link>
      </div>
    </>
  )
}
