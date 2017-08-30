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

## Example:
Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2]. 

## Two solutions:

-	Build one HashMap for ```nums1```, then go through ````nums2```, add same int to result list and update map at same time
	O(m + n), slow(7ms)
-	Sort two arrays first and use two points.
	O(m), fast(4ms), also save space

## Followup #1:
	
	