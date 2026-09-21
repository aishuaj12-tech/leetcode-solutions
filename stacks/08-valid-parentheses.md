## Problem: Valid Parentheses (Easy)

**Link:** https://leetcode.com/problems/valid-parentheses

### Approach

I used a stack to keep track of opening brackets. Whenever a closing bracket appears, it is matched with the most recent opening bracket in the stack.

### Complexity

- Time: O(n)
- Space: O(n)

### Notes

I tested a valid combination of brackets and an incomplete bracket sequence.