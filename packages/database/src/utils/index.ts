const hexDict = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
const dictLength = hexDict.length

let pcCount = 1350100

export function generateProductId() {
  const prefix = 'PC'
  const id = `${prefix}${pcCount++}`

  return id
}

export function generateSKU(prefix = 'dri', length = 16) {
  const timestamp = Math.floor(+new Date() / 1000).toString(16)
  const prefillLength = prefix.length + 9
  const idLength = length - prefillLength
  const lastIndex = length - 1
  const randomIndex = Math.round(Math.random() * lastIndex)

  let randomHexItem = 0
  let randomId = ''
  for (let i = 0; i < idLength; i++) {
    randomHexItem = parseInt((Math.random() * dictLength).toFixed(0), 10) % dictLength
    randomId += hexDict[randomHexItem]
  }

  const id = [
    prefix,
    randomId.substring(0, randomIndex),
    timestamp,
    randomId.substring(randomIndex),
    randomIndex.toString(16),
  ].join('')

  return id
}
