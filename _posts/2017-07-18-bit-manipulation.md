---
layout: post
title: "Bit Manipulation"
excerpt: "I often feel confused about bit manipulation. So here is a little bit summary.  "
categories: [Bit Manipulation, Algorithm, Leetcode, Math]
tags: [Bit Manipulation, Algorithm, Leetcode, Math]
comments: true
toc: true
---

I often feel confused about bit manipulation. So here is a little bit summary.  
<br>
"&" AND operation, for example, 2 (0010) & 7 (0111) => 2 (0010)  

"^" XOR operation, for example, 2 (0010) ^ 7 (0111) => 5 (0101)  

"~" NOT operation, for example, ~2(0010) => -3 (1101) what??? Don't get frustrated here. It's called two's complement.  

1111 is -1, in two's complement  

1110 is -2, which is ~2 + 1, ~0010 => 1101, 1101 + 1 = 1110 => 2  

1101 is -3, which is ~3 + 1  

so if you want to get a negative number, you can simply do ~x + 1  

Reference:  

[https://en.wikipedia.org/wiki/Two%27s_complement](https://en.wikipedia.org/wiki/Two%27s_complement)  

[https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html](https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html)

#### Problem :
How to realize math without using + or -?  
#### Code:
```java
// Iterative
public int getSum(int a, int b) {
	if (a == 0) return b;
	if (b == 0) return a;

	while (b != 0) {
		int carry = a & b;
		a = a ^ b;
		b = carry << 1;
	}
	
	return a;
}

// Iterative
public int getSubtract(int a, int b) {
	while (b != 0) {
		int borrow = (~a) & b;
		a = a ^ b;
		b = borrow << 1;
	}
	
	return a;
}

// Recursive
public int getSum(int a, int b) {
	return (b == 0) ? a : getSum(a ^ b, (a & b) << 1);
}

// Recursive
public int getSubtract(int a, int b) {
	return (b == 0) ? a : getSubtract(a ^ b, (~a & b) << 1);
}

// Get negative number
public int negate(int x) {
	return ~x + 1;
}
```
