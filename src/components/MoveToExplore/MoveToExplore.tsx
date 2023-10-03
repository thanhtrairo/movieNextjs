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
        title={t('common:MoreToExplore')}
        titleCategories={t('common:EditorPicks')}
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
