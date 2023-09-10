'use client'

import { Component } from 'react'
import { Carousel as RRCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface ICarousel {
  articles: {
    title: string
    image: string
  }[]
}

export class Carousel extends Component<ICarousel> {
  render() {
    return (
      <div>
        <RRCarousel autoPlay={true} infiniteLoop={true} interval={5000} showThumbs={false}>
          {this.props.articles.map((article) => (
            <div className="h-full relative">
              <img src={article.image} alt="image1" className="h-full object-cover" />
              <div className="absolute bottom-2 left-2 tracking-wider w-[calc(100%-1rem)] text-left">
                <span className="py-1 px-2 bg-green2-light/80 text-[16px]/[32px] box-decoration-clone">
                  {article.title}
                </span>
              </div>
            </div>
          ))}
        </RRCarousel>
      </div>
    )
  }
}
