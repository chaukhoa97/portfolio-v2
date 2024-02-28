---
title: 'Python Essentials'
sidebar_position: 1
---

## Quick note

- Mutable: list, dict, set
- Immutable: tuple; int, float, decimal, complex; bool; string...
- Falsy: Empty string, Empty container, 0, False, None

## Containers

| Type       | Mutable | Ordered | Syntax                               | Example                            |
| ---------- | ------- | ------- | ------------------------------------ | ---------------------------------- |
| List       | Yes     | Yes     | `[]` or `list()`                     | `[1, 2, 3]`                        |
| Tuple      | No      | Yes     | `()` or `tuple()`                    | `(1, 2, 3)`                        |
| Dictionary | Yes     | Yes     | `{}` or `dict()`                     | `{'key1': 'value1', 12: 'value2'}` |
| Set        | Yes     | No      | `{}` (for non-empty sets) or `set()` | `{1, 2, 3}`                        |

```python
[1,2,3,4,5,6,7,8,9,10][8:2:-2] # [9, 7, 5]
[1,2,3,4,5,6,7,8,9,10][::2]  # [1, 3, 5, 7, 9]

# Iterable
len([1,4,2,3]) # 4
simple_list = [i*2 for i in range(0,5,1)] # [0, 2, 4, 6, 8]
sorted([1,4,2,3]) # [1, 2, 3, 4]
sorted([1,4,2,3], reverse=True) # [4, 3, 2, 1]
```

## Function

```python
def add(a, b):
    return a + b

add2 = lambda a, b: a + b

user_infos = [
    {'name': 'Cathy', 'age': 30}
    {'name': 'Anna', 'age': 10},
    {'name': 'Bob', 'age': 20},
]
sorted(user_infos, key=lambda x: x['age'])
# [{'name': 'Anna', 'age': 10}, {'name': 'Bob', 'age': 20}, {'name': 'Cathy', 'age': 30}]
```

## For loop

```python
for x in range(10, 0, -3):
    print(x) # 10 7 4 1

for k, v in enumerate(['a', 'b', 'c']):
    print(k, v) # 0 a 1 b 2 c
```

## While loop

```python
i = 1
while i < 6:
  print(i)
  i += 1
  if i == 3:
    continue
  if i == 5:
    break
else:
  print("can't reach here due to break statement")
# 1 2 4
```

## Filter

```python
list(filter(lambda x: x % 2 == 0, [1,2,3,4,5])) # [2, 4]
```

## Map

```python
list(map(lambda x: x * 2, [1,2,3,4,5])) # [2, 4, 6, 8, 10]
```

## F String

```python
user_name = 'Anna'
user_age = '10'
user_info = f'{user_name} is {10}'
user_verify = 'Adult' if user_age >= 18 else 'Child'
```

## Class

```python
class Cookie:
  def __init(self,color):
    self.color = color
  def get_color(self):
    return self.color
  def set_color(self, color):
    self.color = color

cookie_one = Cookie('red')
print(cookie_one.get_color()) # red
```
