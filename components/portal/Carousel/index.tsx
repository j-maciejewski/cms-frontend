'use client'

import Link from 'next/link'
import { Component } from 'react'
import { Carousel as RRCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { IMAGES_URL } from '@/consts'
import { PublicArticleFragment } from '@/gql/graphql'

import { ImageWithFallback } from '../ImageWithFallback'

interface ICarousel {
  articles: PublicArticleFragment[]
}

export class Carousel extends Component<ICarousel> {
  render() {
    const { articles } = this.props

    return (
      <div>
        <RRCarousel autoPlay={true} infiniteLoop={true} interval={5000} showThumbs={false} showStatus={false}>
          {articles.map((article, idx) => (
            <Link href={`/article/${article.slug}`}>
              <div key={idx} className="relative h-full">
                <ImageWithFallback
                  className="h-full object-cover duration-200 ease-in-out hover:scale-[1.01] hover:opacity-[.95]"
                  width={600}
                  height={250}
                  alt={article?.title}
                  src={`${IMAGES_URL}/${article.leadImage}`}
                />
                <div className="absolute bottom-2 left-2 w-[calc(100%-1rem)] tracking-wider">
                  <span className="bg-primary/80 box-decoration-clone px-2 py-1 text-[20px]/[40px] font-semibold text-white">
                    {article?.title}
                  </span>
                </div>
                {article.author && (
                  <span className="absolute right-2 top-2 bg-primary/80 px-1.5 py-0.5 text-xs text-white">
                    {article?.author?.firstName} {article?.author?.lastName}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </RRCarousel>
      </div>
    )
  }
}
