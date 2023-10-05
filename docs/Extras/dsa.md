---
title: 'DSA'
---

## [Big O](https://www.bigocheatsheet.com/): Luôn xét đến worst case

### Basics

- **Drop constant**: `O(2n)` = `O(0.5n)` = `O(n)`.
- **Simplify Exponent**: `O(n^100)` = `O(n^2)`.
- **Drop Non-Dominants**: `O(n^2 + n)` = `O(n^2)`.
- **Different Terms for Inputs**: Các biến là riêng biệt nhau, không gộp chung vào một biến: `O(n + m)` != `O(2n)` == `O(n)`.

### Array xét trên phương diện Big O

- Thêm/xóa element ở đầu/giữa array (`slice`, `splice`; `shift`...) &rarr; `O(n)` vì phải reindex.
- Thêm/xóa element ở cuối array (`pop`, `push`...) &rarr; `O(1)`.
- Tìm item theo index &rarr; `O(1)`.

Kết luận: Nếu Data Structure này dùng để truy cập item theo index, hay chỉ thêm/xóa item ở cuối thì nên dùng array.

## Data Structure

### Linked List

Phân bố bất kỳ đâu trong memory (không liền kề nhau như Array).

### Stack

**LIFO**. Ex: Call Stack: The last invoked fn will be popped out first.

### Queue

**FIFO**. Ex: Human Queue: The first person will be served first.
