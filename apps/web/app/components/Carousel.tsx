'use client'

import React, { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, BoxProps, Button, Heading, Stack, forwardRefAs } from '@trms/ui'
import { classNames } from '@trms/utils'

type CarouselProps = {
  addNavigation?: boolean
  slideHeight: number | string
  defaultItem?: number
  title?: string
} & BoxProps

export const Carousel = forwardRefAs<'section', CarouselProps>(
  (
    {
      addNavigation = true,
      activeSlide: initialActiveSlide = 0,
      children,
      className,
      slideHeight,
      title,
      ...props
    },
    ref,
  ) => {
    // const [isDisabled, setIsDisabled] = useState<'prev' | 'next'>('prev')
    // const [activeSlide, setActiveSlide] = useState<number>(initialActiveSlide)
    const activeSlide = useRef<number>(initialActiveSlide)

    const slideCount = useMemo(() => Object.keys(children).length || 0, [children])

    const containerRef = useRef<HTMLUListElement>(null)
    const slideEls = useRef<Element[]>(null)

    // const slides = useMemo(() => {
    //   const els = React.Children.toArray(children).map(child => {
    //     const childProps = (child as React.ReactElement).props
    //     const childEl = cloneElement(child as React.ReactElement, {
    //       className: childProps.className + ` h-[${slideHeight}]`,
    //     })

    //     return <>{childEl}</>
    //   })
    //   return els
    // }, [children])

    console.log('Carousel->props', props)

    const handleIntersect = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries.filter(e => e.isIntersecting).at(-1)
        const index = slideEls.current.findIndex(e => e === entry?.target)
        if (index > -1 && index !== activeSlide.current) {
          activeSlide.current = index
        }
        console.log('handleIntersection', index, activeSlide)

        // if (initialActiveSlide === activeSlide) {
        //   setActiveSlide(entries.indexOf(entry))
        // }
        // if (entry) {
        //   const index = slideEls.current.findIndex(e => e === entry.target)
        //   setActiveSlide(index)
        // }
      },
      [slideEls],
    )

    const goBack = useCallback(() => {
      slideEls.current[activeSlide.current - 1].scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'smooth',
      })
    }, [activeSlide])

    const goForward = useCallback(() => {
      console.log('goForward', activeSlide, slideCount)
      slideEls.current[activeSlide.current + 1].scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'smooth',
      })
    }, [activeSlide, slideCount])

    useEffect(() => {
      const obs = new IntersectionObserver(handleIntersect, {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 0.75,
      })
      if (slideCount > 0 && containerRef.current) {
        const els = Array.from(containerRef.current.querySelectorAll('.carousel-slide'))
        slideEls.current = els

        els.forEach(el => {
          obs.observe(el)
        })
      }
    }, [slideCount, containerRef.current])

    return (
      <Box as="section" ref={ref} className={classNames('section', className)}>
        <Box as="header" className="carousel-header">
          {title && (
            <Heading as="h2" data-qa="title" className="carousel-headline">
              {title}
            </Heading>
          )}
          {addNavigation && (
            <Box role="menu" display="flex" alignItems="center" justify="end" ps="3">
              <Button
                circle
                variant="default"
                muted
                disabled={activeSlide.current <= 0}
                className="carousel-button"
                onClick={goBack}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M15.525 18.966L8.558 12l6.967-6.967"
                  ></path>
                </svg>
              </Button>
              <Button
                circle
                variant="default"
                muted
                disabled={activeSlide.current >= slideCount}
                className="carousel-button"
                onClick={goForward}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M8.474 18.966L15.44 12 8.474 5.033"
                  ></path>
                </svg>
              </Button>
            </Box>
          )}
        </Box>
        <Stack
          as="ul"
          ref={containerRef}
          display="grid"
          orientation="horizontal"
          className="carousel grid-cols-7"
          childClassName={['carousel-slide', 'snap-start']}
          {...props}
        >
          {children}
        </Stack>
      </Box>
    )
  },
)
