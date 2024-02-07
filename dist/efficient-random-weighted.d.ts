export interface WeightedItem<T> {
    weight: number;
    reward: T;
}
export type WeightedItems<T> = WeightedItem<T>[];
export type WeightedSampler<T> = () => T;
export declare const createWeightedSampler: <T>(weightedItems: WeightedItems<T>) => WeightedSampler<T>;
