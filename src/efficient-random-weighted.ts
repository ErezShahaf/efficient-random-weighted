export type weightedSampler = () => any
export interface weightedItem {
  weight: number
  reward: any
}
export type weightedItems = weightedItem[]

export const createWeightedSampler = (weightedItems: weightedItems): weightedSampler => {
  if (weightedItems.length === 0) throw Error('createWeightedSampler should receive at least one item')
  const weightSum = weightedItems.reduce((sum, item) => {
    if (item.weight <= 0) throw Error('Item weigh must be higher than 0')
    return sum + item.weight
  }, 0)

  const weightsToProbabilitiesRatio = weightedItems.length / weightSum
  const probabilities = weightedItems.map((p) => {
    return p.weight * weightsToProbabilitiesRatio
  })

  const overFull: number[] = []
  const underFull: number[] = []

  probabilities.forEach((p, i) => {
    if (p > 1) overFull.push(i)
    else if (p < 1) underFull.push(i)
  })

  const aliases: number[] = []

  while (overFull.length > 0 && underFull.length > 0) {
    aliases[underFull[0]] = overFull[0]
    probabilities[overFull[0]] += probabilities[underFull[0]] - 1
    underFull.shift()
    if (probabilities[overFull[0]] > 1) overFull.push(overFull.shift()!)
    else if (probabilities[overFull[0]] < 1) underFull.push(overFull.shift()!)
    else overFull.shift()
  }
  return function rewardSampler (): number {
    const index = Math.floor(Math.random() * probabilities.length)
    return Math.random() < probabilities[index]
      ? weightedItems[index].reward
      : weightedItems[aliases[index]].reward
  }
}
