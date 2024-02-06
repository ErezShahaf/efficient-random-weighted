import { type weightedSampler, createWeightedSampler } from '../src/efficient-random-weighted'

describe('create one item sampler and get reward', () => {
  it('should return 10', () => {
    const mySampler: weightedSampler = createWeightedSampler([
      { weight: 1, reward: 10 }
    ])
    expect(mySampler()).toBe(10)
  })
  it('should return 10', () => {
    const mySampler: weightedSampler = createWeightedSampler([
      { weight: 0.000000001, reward: 10 }
    ])
    expect(mySampler()).toBe(10)
  })
})
describe('try to create invalid samplers', () => {
  it('should throw error', () => {
    expect(() => createWeightedSampler([{ weight: 0, reward: 10 }])).toThrow()
  })
  it('should throw error', () => {
    expect(() => createWeightedSampler([{ weight: -0.000001, reward: 10 }])).toThrow()
  })
})
describe('check that the results make sense statistically.', () => {
  it('should return true', () => {
    const mySampler: weightedSampler = createWeightedSampler([
      { weight: 1, reward: 0 },
      { weight: 2, reward: 1 },
      { weight: 4, reward: 2 },
      { weight: 8, reward: 3 },
      { weight: 16, reward: 4 }
    ])
    const resultArray: number[] = new Array(5).fill(0)
    for (let i = 0; i < 1000; i++) {
      resultArray[mySampler()]++
    }
    expect(resultArray[0] <= resultArray[1] && resultArray[1] <= resultArray[2] && resultArray[2] <= resultArray[3] && resultArray[3] <= resultArray[4]).toBe(true)
  })
  it('should return true', () => {
    const mySampler: weightedSampler = createWeightedSampler([
      { weight: 1, reward: 0 },
      { weight: 1, reward: 1 }
    ])
    const resultArray: number[] = new Array(5).fill(0)
    for (let i = 0; i < 1000; i++) {
      resultArray[mySampler()]++
    }
    const ratio: number = resultArray[0] / resultArray[1]
    console.log(ratio)
    expect(ratio < 1.2 && ratio > 0.8).toBe(true)
  })
})
describe('check reward as object', () => {
  it('should return true', () => {
    const myObject = { value: 10 }
    const mySampler: weightedSampler = createWeightedSampler([
      { weight: 1, reward: myObject }
    ])
    expect(mySampler()).toBe(myObject)
  })
})
describe('check reward as string', () => {
  it('should return true', () => {
    const myString: string = 'banana'
    const mySampler: weightedSampler = createWeightedSampler([
      { weight: 1, reward: myString }
    ])
    expect(mySampler() === 'banana').toBe(true)
  })
})
