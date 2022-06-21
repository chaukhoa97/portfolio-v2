---
title: 'JSON'
---

### ĐIỀU KIỆN JSON OBJECT

1. Một JSON object = (1 / nhiều) cặp key - value dc bao bởi dấu {}, Vs nhiều cặp key - value, cặp cuối cùng ko có dấu "," sau cùng
2. Nhiều JSON object dc bao bởi một array - []
3. Đặt\ trước value có dấu quote (Ex: `"name": "\"Nguyen Van A"`)

Vd1: Một array bao gồm 2 JSON object - > Mỗi object bao gồm 2 cặp key - value

```json
[
  {
    "name": "Nguyễn Văn Cường",
    "age": "21 tuổi"
  },
  {
    "name": "Nguyễn Văn Kính",
    "age": "22 tuổi"
  }
]
```

Vd2: Một JSON object bao gồm 2 cặp key - value - > Value của mỗi cặp là một JSON object con

```json
{
  "sv0001": {
    "toan": "Môn Toán",
    "ly": "Môn Lý"
  },
  "sv0002": {
    "toan": "Môn Toán",
    "anh": "Môn Anh"
  }
}
```

Vd3: Một JSON object bao gồm 2 cặp key - value - > Value của mỗi cặp là một array -> Mỗi array bao gồm 2 JSON object - > Mỗi object bao gồm 2 cặp key - value

```json
{
  "items": [
    {
      "src": "assets/product1.png",
      "category": "Vòng tay"
    },
    {
      "src": "assets/product2.png",
      "category": "Vòng tay"
    }
  ],
  "cart": [
    {
      "img": "assets/cart-item.png",
      "name": "Lắc tay D&G"
    },
    {
      "img": "assets/cart-item.png",
      "name": "Lắc tay D&G"
    }
  ]
}
```
