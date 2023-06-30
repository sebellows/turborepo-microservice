import { gen } from './seed-ids'
import { users } from './users'

const reviewId = gen('reviews')

const reviews = [
  {
    id: reviewId.next(),
    label: 'Very Good',
    comment: "Better than good, it's great!",
    rating: 5,
  },
  {
    id: reviewId.next(),
    label: 'Good',
    comment: "That'll do, pig. That'll do.",
    rating: 4,
  },
  {
    id: reviewId.next(),
    label: 'Okay',
    comment: "Meh, it's okay, I guess.",
    rating: 3,
  },
  {
    id: reviewId.next(),
    label: 'Poor',
    comment: 'I am not impressed.',
    rating: 2,
  },
  {
    id: reviewId.next(),
    label: 'Awful',
    comment: 'This product actually has a negative impact on the universe as a whole.',
    rating: 1,
  },
]

export const getRandomProductReviews = (productId: string, count = 1) => {
  const arr = new Array(count)

  return arr.map(_ => {
    const reviewsIndex = Math.floor(Math.random() * Math.floor(reviews.length))
    const userId = Math.floor(Math.random() * Math.floor(users.length))

    return { ...reviews[reviewsIndex], userId, productId }
  })
}
