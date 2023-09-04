import { Gender } from '@prisma/client'

// import { getReviewsByProfileId } from './reviews'
// import { gen } from './seed-ids'

// const at = gen.at('profiles')

export const profiles = [
  {
    // uid: at(0),
    gender: Gender.MALE,
    // productReviews: { create: getReviewsByProfileId(at(0)) },
  },
  {
    // uid: at(1),
    gender: Gender.FEMALE,
    // productReviews: { create: getReviewsByProfileId(at(1)) },
  },
  {
    // uid: at(2),
    gender: Gender.NON_BINARY,
    // productReviews: { create: getReviewsByProfileId(at(2)) },
  },
]
