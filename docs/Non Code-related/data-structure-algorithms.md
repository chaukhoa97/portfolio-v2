---
title: 'DS & Algorithms'
---

### [Big O](https://www.bigocheatsheet.com/): Luôn xét đến worst case

- **Drop constant**: O(2n) = O(0.5n) = O(n).
- **Simplify Exponent**: O(n^100) = O(n^2).
- **Drop Non-Dominants**: O(n^2 + n) = O(n^2).
- **Different Terms for Inputs**: Các biến là riêng biệt nhau, không gộp chung vào một `n`.
- **Array xét trên phương diện Big O**:

  - Thêm/xóa element ở đầu/giữa array (.splice; .shift;…) -{'>'} O(n) vì phải reindex.
  - Thêm/xóa element ở cuối array -{'>'} O(1).
  - Tìm item theo index -{'>'} O(1).

  ={'>'} Nếu dùng Data Structure này để truy cập item theo index, hay chỉ thêm/xóa item ở cuối thì nên dùng array.

### Others

- **Linked List**: Phân bố bất kỳ đâu trong memory (không liền kề nhau như Array).
- **Stacks**: LIFO -{'>'} **Callstack**: The last invoked fn will be popped out when it returns something.
- **Queues**: FIFO
