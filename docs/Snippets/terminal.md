---
title: 'Terminal'
---

### Update all package

```shell
npm i -g npm-check-updates
ncu -u
npm i
```

### Node version manager

```shell
nvm i 10.24.1
nvm use 10.24.1
nvm list
nvm use newest
node -v
```

### npm, npx, yarn

- package.json: ~1.2.3 < 1.3.0 || ^1.2.3 < 2.0.0
- `npm i` / `npm i -g`: Project Dependencies / Global Dependencies.
- `npm i --save-dev`: Development Only &rarr; Không có trong Production.
- `npx`: Chỉ execute chứ ko cài &rarr; Dùng cho các lib chỉ chạy 1 lần trong vòng đời dự án như `create-react-app`.
- `yarn`: Chạy song song + cached so với Chạy tuần tự + ko cached của `npm`.
