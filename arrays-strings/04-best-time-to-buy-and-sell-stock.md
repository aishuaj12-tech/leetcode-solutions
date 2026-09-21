## Problem: Best Time to Buy and Sell Stock (Easy)

**Link:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock

### Approach

I kept track of the minimum price seen so far and calculated the possible profit at each later price. The maximum profit found during the scan is returned.

### Complexity

- Time: O(n)
- Space: O(1)

### Notes

I tested one case where a profit is possible and another case where prices continuously decrease.