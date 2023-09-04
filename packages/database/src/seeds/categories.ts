// import { gen } from './seed-ids'

// const at = gen.at('categories')

// const mensId = at(0)
// const womensId = at(1)

const categories = {
  men: {
    // uid: mensId,
    name: 'Men',
    code: 'catalog_men',
    path: '/catalog/men',
    description: JSON.stringify({
      type: 'paragraph',
      children: [{ text: "Stylish and hip men's clothing." }],
    }),
  },
  women: {
    // uid: womensId,
    name: 'Women',
    code: 'catalog_women',
    path: '/catalog/women',
    description: JSON.stringify({
      type: 'paragraph',
      children: [{ text: 'Modern clothing for modern women' }],
    }),
  },
  menShirts: {
    // uid: at(2),
    name: "Men's Shirts",
    code: 'catalog_men_shirts',
    // parentId: mensId,
    path: '/catalog/men/shirts/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Men's Shirts" }],
    }),
  },
  menJeans: {
    // uid: at(3),
    name: "Men's Jeans",
    code: 'catalog_men_jeans',
    // parentId: mensId,
    path: '/catalog/men/jeans/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Men's Jeans" }],
    }),
  },
  menShoes: {
    // uid: at(4),
    name: "Men's Shoes",
    code: 'catalog_men_shoes',
    // parentId: mensId,
    path: '/catalog/men/shoes/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Men's Shoes" }],
    }),
  },
  dresses: {
    // uid: at(5),
    name: 'Dresses',
    code: 'catalog_women_dresses',
    // parentId: womensId,
    path: '/catalog/women/dresses/c',
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
    // uid: at(6),
    name: "Women's Jeans",
    code: 'catalog_women_jeans',
    // parentId: womensId,
    path: '/catalog/women/jeans/c',
    description: JSON.stringify({
      type: 'paragraph',
      children: [{ text: "Women's Jeans" }],
    }),
  },
  womenShoes: {
    // uid: at(7),
    name: "Women's Shoes",
    code: 'catalog_women_shoes',
    // parentId: womensId,
    path: '/catalog/women/shoes/c',
    description: JSON.stringify({
      type: 'h1',
      children: [{ text: "Women's Shoes" }],
    }),
  },
}

export { categories }

// export const categories = [
//   {
//     id: uids.categories[0],
//     name: 'Video Games',
//     path: '/c/video-games',
//     description: JSON.stringify({
//       type: 'paragraph',
//       children: [{ text: "Shop around for consoles, games, accessories, and more." }],
//     }),
//   },
//   {
//     id: uids.categories[1],
//     name: 'Consoles',
//     code: 'video-games_consoles',
//     path: '/c/consoles',
//     description: JSON.stringify({
//       type: 'paragraph',
//       children: [{ text: 'Find the video game console that\'s right for you.' }],
//     }),
//   },
//   {
//     id: uids.categories[2],
//     name: 'Games',
//     code: '',
//     path: '/c/games',
//     description: JSON.stringify({
//       type: 'paragraph',
//       children: [{ text: 'Video games for your platform of choice.' }],
//     }),
//   },
// ]
