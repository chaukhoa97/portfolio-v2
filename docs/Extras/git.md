---
title: 'Git'
---

## Terms

- **HEAD**: Khi làm việc với Git, chỉ một branch có thể check out tại một thời điểm - và đây được gọi là nhánh **HEAD**. Thông thường, đây còn được gọi là nhánh `active` hoặc `current`.
- **Detached HEAD**: When a specific commit is checked out instead of a branch.

## Remote

- `git remote -v`: Show những remote repo mà local repo này liên kết, mặc định của Github là `origin`
- `git fetch origin`: Cập nhật data từ remote `origin`
- `git merge origin/master`: Merge nhánh `master` của remote `origin` vào local HEAD

## Push & Pull

_All belows can be executed with the same result at any branch._  
`git push <remote_URL/remote_name> <local-branch>:<remote-branch>`

- Local & remote `origin` has the same name: `git push origin t1` (Push **local** `t1` lên **origin** `t1`)
- Local & remote `origin` has different names: `git push origin t1:newT1` (Push **local** `t1` lên **origin** `newT1`)
- Between local branches: `git push origin t1:t2` (Push **local** `t1` sang **local** `t2`)
- `git pull origin main`: Pull **origin** `main` về **local** `HEAD`.

## Merge, Rebase & Cherry-Pick

Cả 3 đều integrate changes from one branch into another branch.

- `git checkout feature` + `git merge dev`
  - **Nếu hủy**: `git merge --abort`
  - **Fix conflict** &rarr; add. &rarr; `git merge --continue` &rarr; Sửa message ở màn hình _interactive_ &rarr; :wq
  - Nên dùng khi merge các nhánh `feature` với nhau vì ít cần quan tâm đến lịch sử commit, hoặc khi merge các nhánh `feature` đã được `rebase` vào nhánh `dev` (đọc ở dưới).
- `git checkout feature` + `git rebase dev`, next steps are similar
  - **KHÔNG** dùng ở nhánh chính `dev`, chỉ sử dụng trên các nhánh phụ `feature` trước khi merge vào `dev` because it put all `feature`'s commits behind the last commit of`dev` -> Easy to resolve conflicts.

![Merge, Rebase](https://i.imgur.com/9A4MKGu.png)

- `git cherry-pick <commit-id>`: Nhánh **feature** có commit _F1_ và _F2_. Ở nhánh **master**:

  - `git merge feature` sẽ merge cả _F1_ và _F2_ vào **master**.
  - `git cherry-pick <F1>` sẽ chỉ merge _F1_ vào **master**.

## Squash 3 commit

- **Chưa push**: `git rebase -i HEAD~3` &rarr; Từ hàng 2 trở xuống, đổi chữ `pick` thành `s` &rarr; Conflict &rarr; ...
- **Đã push**: `git reset HEAD~3` / (3rd trong `git log`) &rarr; add, commit &rarr; `git push -f origin <branch-name>`

## Branch

- `git checkout -b newBranch`: Tạo và chuyển sang nhánh `newBranch`
- `git branch -d test1`: Xóa nhánh `test1`
- `git branch -m newName`: Đổi tên nhánh đang checkout thành `newName`
- `git branch -a`: Show all remote branches

## Mess Up

- `git reflog show master` (Xem nhật ký thao tác trên nhánh master) → `git reset 'HEAD@{1}’` (với `HEAD@{0}` là thao tác vừa làm → reset về thao tác trước đó là `HEAD@{1}`).
- `HEAD@{1}` vs `HEAD~1`: 2nd của `git reflog` vs 2 commits older than HEAD của `git log --oneline`.

## Reset

- `git reset (HEAD~1 / <commit-id>) --(soft / mixed / hard)` &rarr; Về stage/local/xóa luôn.
- `git status (<file-name>)`: Xem status (local, staging or committed) cả nhánh (hoặc `file-name`).
- `reset` vs `revert`: `revert` chỉ undo riêng 1 commit `X`, còn `reset` back về luôn commit đó luôn (undo hết ~ commit sau `X`). `revert` cũng sẽ tạo ra 1 commit mới, còn `reset` thì ko.

## Config

- `git config --list --show-origin`
- `git config --global user.email jonhkane00@gmail.com`
- `git config --global user.name "Finn Chau"`

## Stash

- `git stash` / `git stash save 'message'`
- `git stash apply ‘stash@{1}’` vs `git stash pop`: Apply nhưng ko xóa / xóa luôn stash.
- `git stash list` - `git stash clear` - `git drop stash@{1}`

## Tìm lại và checkout commit/stash cũ

1. **Bash ONLY: Tìm lại ID của commit/stash cũ**:  
   `git fsck --unreachable | grep commit | cut -d" " -f3 | xargs git log --merges --no-walk --grep=WIP`  
   Thay `WIP` ở cuối by a part of the title của stash/commit
2. **Thử version cũ hơn của pj (Detached HEAD)**: `git checkout -b test-branch 56a4e5c08 --index.js` - Tạo nhánh mới từ `commit-id 56a4e5c08` &rarr; do anything... &rarr; `git checkout master` + `git branch -d test-branch`.  
   Nếu ko có `--index.js` &rarr; phục hồi tất cả các file.

## ETC

- **Xóa file**: `git rm *.ts (--cached)` &rarr; Xóa file (khỏi stage).
- **Vim**: `ESC : W Q` &rarr; Save & Quit.
