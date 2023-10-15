'use client'

import Image from 'next/image'
import { Component } from 'react'
import { Carousel as RRCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { IMAGES_URL } from '@/consts'
import { ArticleFragment } from '@/gql/graphql'

interface ICarousel {
  articles: ArticleFragment[]
}

export class Carousel extends Component<ICarousel> {
  render() {
    const { articles } = this.props

    return (
      <div>
        <RRCarousel autoPlay={true} infiniteLoop={true} interval={5000} showThumbs={false}>
          {articles.map((article, idx) => (
            <div key={idx} className="relative h-full">
              <Image
                className="h-full object-cover"
                width={600}
                height={250}
                alt={article?.title}
                src={`${IMAGES_URL}/${article.leadImage}`}
              />
              <div className="absolute bottom-2 left-2 w-[calc(100%-1rem)] text-left tracking-wider">
                <span className="bg-primary/80 box-decoration-clone px-2 py-1 text-[16px]/[32px]">{article.title}</span>
              </div>
            </div>
          ))}
        </RRCarousel>
      </div>
    )
  }
}
