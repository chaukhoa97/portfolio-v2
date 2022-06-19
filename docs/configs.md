---
title: 'Configs'
category: 'Archive'
draft: false
---

### Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "printWidth": 80,
  "overrides": [
    {
      "files": ["framework/saleor/**/*"],
      "options": {
        "printWidth": 120
      }
    }
  ]
}
```
