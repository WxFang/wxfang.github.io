---
layout: post
title: "Moore Voting"
excerpt: "A linear time voting algorithm to find the majority element in a non-sorted array."
categories: [moore voting, Algorithm, Leetcode]
tags: [moore voting, Algorithm, Leetcode]
comments: true
toc: true
---

[http://www.cs.utexas.edu/~moore/best-ideas/mjrty/index.html](http://www.cs.utexas.edu/~moore/best-ideas/mjrty/index.html)

This algo uses O(N) time and O(1) extra time.

We need 2 values:

- A candidate value, initially set to any value.
- A count, initially set to 0.

For each element in our input list, we first examine the count value. If the count is equal to 0, we set the candidate to the value at the current element. Next, first compare the element's value to the current candidate value. If they are the same, we increment count by 1. If they are different, we decrement count by 1.

```java
public int majorityElement(int[] nums) {
    int count = 0, candidate = nums[0];
    for(int n: nums){
        if(count == 0)
            candidate = n;
        if(candidate != n)
            count--;
        else
            count++;
    }
    return candidate;
}
```