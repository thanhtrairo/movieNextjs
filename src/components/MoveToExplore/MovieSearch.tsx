import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import apiConfig from '../../../pages/api/apiConfig'
import { MovieType } from '../../type/type'

export const MovieSearch: React.FC<{ movie: MovieType; onSearch: Function }> = ({ movie, onSearch }) => {
  return (
    <div className="group mx-2 hover:cursor-pointer">
      <div className="flex gap-4">
        <div className="relative basis-2/12" onClick={() => onSearch()}>
          <Link href={`/movie/${movie.id}`}>
            <div className="absolute left-0 top-0 z-50 hidden h-full w-full bg-blackOver group-hover:block"></div>
          </Link>
          <Image src={apiConfig.originalImage(movie.poster_path)} alt={movie.title} width={160} height={200} />
        </div>
        <div className="flex basis-10/12 flex-col space-y-1 group-hover:opacity-70">
          <p className="hiddenText">{movie.title ? movie.title : movie.name}</p>
          <div className="text-12 opacity-70">
            <span>{moment(movie.release_date ? movie.release_date : movie.first_air_date).format('MMM Do YY')}</span>
            <span>Variety Film {movie.media_type}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
