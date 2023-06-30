import { gen } from './seed-ids'

const at = gen.at('categories')

const mensId = at(0)
const womensId = at(1)

export const categories = {
  men: {
    id: mensId,
    name: 'Men',
    code: 'catalog_men',
    url: '/catalog/men',
    description: JSON.stringify({
      type: 'paragraph',
      children: [{ text: "Stylish and hip men's clothing." }],
    }),
  },
  women: {
    id: womensId,
    name: 'Women',
    code: 'catalog_women',
    url: '/catalog/women',
    description: JSON.stringify({
      type: 'paragraph',
      children: [{ text: 'Modern clothing for modern women' }],
    }),
  },
  menShirts: {
    id: at(2),
    name: "Men's Shirts",
    code: 'catalog_men_shirts',
    parentId: mensId,
    url: '/catalog/men/shirts/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Men's Shirts" }],
    }),
  },
  menJeans: {
    id: at(3),
    name: "Men's Jeans",
    code: 'catalog_men_jeans',
    parentId: mensId,
    url: '/catalog/men/jeans/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Men's Jeans" }],
    }),
  },
  menShoes: {
    id: at(4),
    name: "Men's Shoes",
    code: 'catalog_men_shoes',
    parentId: mensId,
    url: '/catalog/men/shoes/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Men's Shoes" }],
    }),
  },
  dresses: {
    id: at(5),
    name: 'Dresses',
    code: 'catalog_women_dresses',
    parentId: womensId,
    url: '/catalog/women/dresses/c',
    description: JSON.stringify({
      type: 'h1',
      children: [
        {
          text: 'Dresses',
        },
      ],
    }),
  },
  womenJeans: {
    id: at(6),
    name: "Women's Jeans",
    code: 'catalog_women_jeans',
    parentId: womensId,
    url: '/catalog/women/jeans/c',
    description: JSON.stringify({
      type: 'paragraph',
      children: [{ text: "Women's Jeans" }],
    }),
  },
  womenShoes: {
    id: at(7),
    name: "Women's Shoes",
    code: 'catalog_women_shoes',
    parentId: womensId,
    url: '/catalog/women/shoes/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Women's Shoes" }],
    }),
  },
}

// export const categories = [
//   {
//     id: uids.categories[0],
//     name: 'Video Games',
//     url: '/c/video-games',
//     description: JSON.stringify({
//       type: 'paragraph',
//       children: [{ text: "Shop around for consoles, games, accessories, and more." }],
//     }),
//   },
//   {
//     id: uids.categories[1],
//     name: 'Consoles',
//     code: 'video-games_consoles',
//     url: '/c/consoles',
//     description: JSON.stringify({
//       type: 'paragraph',
//       children: [{ text: 'Find the video game console that\'s right for you.' }],
//     }),
//   },
//   {
//     id: uids.categories[2],
//     name: 'Games',
//     code: '',
//     url: '/c/games',
//     description: JSON.stringify({
//       type: 'paragraph',
//       children: [{ text: 'Video games for your platform of choice.' }],
//     }),
//   },
// ]
