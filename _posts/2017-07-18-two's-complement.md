---
layout: post
---

I often feel confused about bit manipulation. So here is a little bit summary.  
<br>
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
