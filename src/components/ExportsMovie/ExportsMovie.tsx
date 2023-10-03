import { useTranslation } from 'next-i18next'
import React from 'react'
import { BuyMovie } from '../BuyMovie'
import { Title } from '../title/Title'
import { TitleCategories } from '../title/TitleCategories'
import { Video } from '../Video'

export const ExportsMovie = () => {
  const { t } = useTranslation()
  return (
    <>
      <Title>{t('common:ExploreMoviesTVShows')}</Title>
      <TitleCategories title={t('common:Weekend')}>{t('common:TopBoxOffice')}</TitleCategories>
      <div className="mb-16 mt-6 grid gap-x-16 gap-y-6 sm:grid-cols-2">
        <BuyMovie num price />
        <BuyMovie num price />
        <BuyMovie num price />
        <BuyMovie num price />
        <BuyMovie num price />
        <BuyMovie num price />
      </div>
      <Video
        titleCategories={t('common:ComingSoonToTheaters')}
        titleCategoriesPlaceholder={t('common:TrailersForUpcomingReleases')}
        titleMovie="3:45"
        slidesShow={3}
      />
    </>
  )
}
