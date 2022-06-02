import React from 'react'
import { BornToday } from './BornToday'
import { TopNext } from './TopNext'
import { PersonType } from '../../type/type'
import { Video } from '../Video'
import { useTranslation } from 'next-i18next'

export const MoveToExplore: React.FC<{ personPopular: PersonType[] }> = ({ personPopular }) => {
  const { t } = useTranslation()
  return (
    <>
      <Video
        title={t('header:MoreToExplore')}
        titleCategories={t('header:EditorPicks')}
        titleMovie="list"
        list
        name
        slidesShow={3}
      />
      <BornToday personPopular={personPopular} />
      <TopNext />
    </>
  )
}
