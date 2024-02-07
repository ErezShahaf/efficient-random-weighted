export interface WeightedItem<T> {
  weight: number;
  reward: T;
}

export type WeightedItems<T> = WeightedItem<T>[];

export type WeightedSampler<T> = () => T;

export const createWeightedSampler = <T>(weightedItems: WeightedItems<T>): WeightedSampler<T> => {
  if (weightedItems.length === 0) throw Error('createWeightedSampler should receive at least one item');

  const weightSum = weightedItems.reduce((sum, item) => {
    if (item.weight <= 0) throw Error('Item weigh must be higher than 0');
    return sum + item.weight;
  }, 0);

  const averageWeightPerIndex = weightedItems.length / weightSum;
  const probabilities = weightedItems.map((p) => p.weight * averageWeightPerIndex);

  const overFull: number[] = [];
  const underFull: number[] = [];

  probabilities.forEach((p, i) => {
    if (p > 1) overFull.push(i);
    else if (p < 1) underFull.push(i);
  });

  const aliases: number[] = [];

  while (overFull.length > 0 && underFull.length > 0) {
    aliases[underFull[0]] = overFull[0];
    probabilities[overFull[0]] += probabilities[underFull[0]] - 1;
    underFull.shift();
    if (probabilities[overFull[0]] > 1) overFull.push(overFull.shift()!);
    else if (probabilities[overFull[0]] < 1) underFull.push(overFull.shift()!);
    else overFull.shift();
  }

  return function rewardSampler() : T {
    const index = Math.floor(Math.random() * probabilities.length);
    return Math.random() < probabilities[index]
      ? weightedItems[index].reward
      : weightedItems[aliases[index]].reward;
  };
};
