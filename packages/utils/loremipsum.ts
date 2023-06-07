import { range } from './collection'

const sentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  'Et harum quidem rerum facilis est et expedita distinctio.',
  'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
  'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
  'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
]

const getRandomSentence = () => sentences[Math.floor(Math.random() * sentences.length)]

interface LoremIpsumOptions {
  clamp?: boolean
  maxLength?: number
  random?: boolean
}

const defaultOptions = {
  clamp: true,
  maxLength: null,
  random: false,
}

export const loremIpsum = (lines = 1, options: LoremIpsumOptions = {}) => {
  const { clamp, maxLength, random } = { ...defaultOptions, ...options }

  let para = range(lines).reduce((txt: string, _, i) => {
    const space = i > 0 ? ' ' : ''
    const sentence = `${space}${random ? getRandomSentence() : sentences[i]}`
    txt += sentence
    return txt
  }, '')

  if (maxLength && para.length > maxLength) {
    para.trimEnd()
    const addEllipsis = clamp && !['!', '?', '.'].includes(para[maxLength - 1])
    const lastCharIndex = addEllipsis ? maxLength - 3 : maxLength - 1

    para = para.slice(0, lastCharIndex)

    para.trimEnd()

    if (addEllipsis && /\s|\.|,|\?|!|:|;|\/|\\/.test(para.slice(-2))) {
      // We want to prevent ending text with single letter words when adding ellipsis
      const wordArr = para.split(' ')
      para = wordArr.slice(0, -1).join(' ')
    }

    if (addEllipsis) {
      para += '[…]'
    }
  }

  return para
}
