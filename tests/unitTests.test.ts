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
// describe('check that the results make sense statistically. It can fail in rare occasuions', () => {
//   it('should return true', () => {
//     const mySampler: weightedSampler = createWeightedSampler([
//       { weight: 1, reward: 0 },
//       { weight: 1.01, reward: 1 },
//       { weight: 1.02, reward: 2 },
//       { weight: 1.03, reward: 3 },
//       { weight: 1.04, reward: 4 }
//     ])
//     const resultArray: number[] = new Array(5).fill(0)
//     for (let i = 0; i < 1000 * 1000 * 10; i++) {
//       resultArray[mySampler()]++
//     }
//     expect(resultArray[0] < resultArray[1] && resultArray[1] < resultArray[2] && resultArray[2] < resultArray[3] && resultArray[3] < resultArray[4]).toBe(true)
//   })
//   it('should return true', () => {
//     const mySampler: weightedSampler = createWeightedSampler([
//       { weight: 0.1, reward: 0 },
//       { weight: 1, reward: 1 },
//       { weight: 5, reward: 2 },
//       { weight: 20, reward: 3 },
//       { weight: 100, reward: 4 }
//     ])
//     const resultArray: number[] = new Array(5).fill(0)
//     for (let i = 0; i < 1000 * 1000 * 2; i++) {
//       resultArray[mySampler()]++
//     }
//     expect(resultArray[0] < resultArray[1] && resultArray[1] < resultArray[2] && resultArray[2] < resultArray[3] && resultArray[3] < resultArray[4]).toBe(true)
//   })
//   it('should return true', () => {
//     const mySampler: weightedSampler = createWeightedSampler([
//       { weight: 1, reward: 0 },
//       { weight: 1, reward: 1 }
//     ])
//     const resultArray: number[] = new Array(5).fill(0)
//     for (let i = 0; i < 1000 * 1000 * 2; i++) {
//       resultArray[mySampler()]++
//     }
//     const ratio: number = resultArray[0] / resultArray[1]
//     console.log(ratio)
//     expect(ratio < 1.005 && ratio > 0.995).toBe(true)
//   })
// })
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
