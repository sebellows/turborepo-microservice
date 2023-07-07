import { Review } from '@prisma/client'

import { uids } from './seed-ids'

const _reviews = [
  {
    label: 'Great',
    comment: 'I love this! Well made and very comfortable. I love it! Very pretty',
    rating: 5,
  },
  {
    label: 'Great',
    comment: 'Very stylish!',
    rating: 5,
  },
  {
    label: 'Great',
    comment: 'Excellent! Fits perfectly and is so comfortable.',
    rating: 5,
  },
  {
    label: 'Good',
    comment: 'Very good.',
    rating: 4,
  },
  {
    label: 'Good',
    comment: "Could be better, but it's very comfortable.",
    rating: 4,
  },
  {
    label: 'Good',
    comment: 'I liked this a lot!',
    rating: 4,
  },
  {
    label: 'Okay',
    comment: 'This was okay, I guess',
    rating: 3,
  },
  {
    label: 'Okay',
    comment: "Looks nice, but it's not very durable.",
    rating: 3,
  },
  {
    label: 'Okay',
    comment: 'Should be less expensive given how cheaply made it looks.',
    rating: 3,
  },
  {
    label: 'Poor',
    comment: "This is not as good as I hoped it would be and I didn't even have high expectations",
    rating: 2,
  },
  {
    label: 'Poor',
    comment: 'Very poorly manufactured.',
    rating: 2,
  },
  {
    label: 'Poor',
    comment: 'The color was not the same as what was pictured here.',
    rating: 2,
  },
  {
    label: 'Awful',
    comment: 'I immediately returned it. So disappointed.',
    rating: 1,
  },
  {
    label: 'Awful',
    comment: 'As comfortable as wearing a burlap bag.',
    rating: 1,
  },
  {
    label: 'Awful',
    comment: "This shouldn't even be still on the market it's so bad.",
    rating: 1,
  },
]

const productIds = uids.products
const profileIds = uids.profiles
const profileCount = profileIds.length

const getRandomItems = <T>(arr: T[], cnt: number, max = cnt) => {
  const results: T[] = []

  while (results.length !== max) {
    const item = arr[Math.floor(Math.random() * Math.floor(cnt))]

    if (results.indexOf(item) === -1) {
      results.push(item)
    }
  }

  return results
}

const reviews = productIds.reduce((list, productId) => {
  const randomProfileIds = getRandomItems(profileIds, profileCount, profileCount)
  const randomReviews = getRandomItems(_reviews, _reviews.length, randomProfileIds.length)
  const userReviews = randomProfileIds.map((profileId, i) => ({
    ...randomReviews[i],
    profileId,
    productId,
  }))

  list.push(...(userReviews as Review[]))

  return list
}, [] as Review[])

const getReviewsByProfileId = (profileId: string) => {
  return reviews.filter(review => review.profileId === profileId)
}

const getReviewsByProductId = (productId: string): Review[] => {
  return reviews?.filter?.(review => review.productId === productId) ?? []
}

export { getReviewsByProductId, getReviewsByProfileId }
