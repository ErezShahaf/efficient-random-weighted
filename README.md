# Efficient-Random-Weighted
## 📘 What is it?
A node package for selecting an item based on probability/weight in a time complexity of O(1).
It is especially beneficial in functions that choose between a high amount of items.
## 🔨 Install with npm
`npm install efficient-random-weighted`
## 📖 Examples
First, we create a weighted sampler. In the example below I have created a sampler that returns a reward of type number but it can support all types. 
### Create a sampler in Typescript
```
const mySampler: WeightedSampler<number> = createWeightedSampler([
  { weight: 20, reward: 0 },
  { weight: 70, reward: 1 },
  { weight: 10, reward: 2 },
])
```
### Create a sampler in Javascript
```
const mySampler = createWeightedSampler([
  { weight: 20, reward: 0 },
  { weight: 70, reward: 1 },
  { weight: 10, reward: 2 },
])
```

Now we can continuously use this sampler to get an item extremely fast. Based on the weights we have 20% chance to get 0, 70% chance to get 1, and 10% chance to get 2.

### Using the sampler to draft and log the result.
`console.log(mySampler())`

## 😵 How it works
### Other packages
Lets imagine that we have 3 buckets.
- 1 Liter of orange juice
- 1 Liter of water
- 2 Liters of apple juice

  
![image](https://github.com/ErezShahaf/efficient-random-weighted/assets/62619268/2927994a-0f72-4b26-8c2d-4c4965e40b6e)

In order to draft a random liquid based on the amount (higher chances for higher amount), existing npm packages calculate the total amount (4 Liters), draft a value between 0-4, iterate each of the buckets and increment the iterator based on the weight until it reaches that number. The time complexity of this method is O(n) but it is possible to use binary search to achieve a time complexity of O(logn).
### This package
During the creation of the sampler, we pour liquid between cups to acheive cups of similar volume.
![image](https://github.com/ErezShahaf/efficient-random-weighted/assets/62619268/e9bce970-f1f4-4141-998f-86a42da699dc)

Then, when we use the sampler, we can simply choose a cup (index) randomly. If the cup has one liquid, we return it. If the cup has two liquids, we randomize a float between 0-1 and choose based of the volume (probability) of each liquid. Since in our case the cup is half water and half carrot, we can choose that the range 0-0.5 returns carrot, and if it is between 0.5-1 we return water. This method allows us to randomized a weighted item in O(1).

