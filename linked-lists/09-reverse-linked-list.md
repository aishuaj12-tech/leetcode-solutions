## Problem: Reverse Linked List (Easy)

**Link:** https://leetcode.com/problems/reverse-linked-list/

### Approach

I used three pointers: previous, current, and next. The next pointer stores the next node before changing the current node's link. The current node is then connected to the previous node, and the pointers are moved forward until the end of the list.

### Complexity

- Time: O(n)
- Space: O(1)

### Notes

The linked list is reversed in-place by changing the direction of each node's next pointer.