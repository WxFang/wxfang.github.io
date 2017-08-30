---
layout: post
title: "Intersection of Two Arrays"
excerpt: "Thoughts about three followup questions..."
categories: [Algorithm, Leetcode, Followup]
tags: [Algorithm, Leetcode, Followup]
comments: true
toc: true
---

## Problem Description:

Given two arrays, write a function to compute their intersection.

Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2]. 

### Two solutions:

1. Build a ```HashMap``` for ```nums1```, then go through ```nums2```, add same int to result list and update map at same time. ```O(m + n)``` time, ```O(n)``` space.

2. Sort two arrays first and use ```two points```. ```O(nlogn)``` time, ```O(n)``` space.

### Followup #1:

What if the given array is already sorted? How would you optimize your algorithm?
	
```Two points``` which resembles ```merge sort```.

Time complexcity would reduce from O(m + n) to O(m). Also it doesn't need to keep space for HashMap.

### Followup #2:

What if nums1's size is small compared to nums2's size? Which algorithm is better?

```HashMap```. Use the smaller array to construct the map. 

### Followup #3:
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

1. Store two arrays in distributed system, then using MapReduce.

2. External sort, then process arrays by chrunk which fits the memory.

3. Process arrays by streaming, then check.