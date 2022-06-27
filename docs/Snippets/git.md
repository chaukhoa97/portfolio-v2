---
title: 'Git'
---

### Terms

- **HEAD**: Khi làm việc với Git, chỉ một branch có thể check out tại một thời điểm - và đây được gọi là nhánh **HEAD**. Thông thường, đây còn được gọi là nhánh _active_ hoặc _current_.
- **Detached HEAD**: When a specific commit is checked out instead of a branch.

### Push & Pull

- `git push origin f1`: Push **local t1** lên **remote t1**
- `git push t1:t2`: Push **local t1** sang **local t2** (ko cần chuyển nhánh để push)
- `git pull origin main`: Pull **origin main** về **local main**, BẤT KỂ ĐANG Ở NHÁNH NÀO.

### Merge, Rebase & Cherry-Pick

Cả 3 đều integrate changes from one branch into another branch

- `git checkout feature` + `git merge main`
  - **Nếu hủy**: `git merge --abort`
  - **Fix conflict** -> add. -> `git merge --continue` -> Sửa message ở màn hình _interactive_ -> :wq
- `git rebase` syntax giống hệt: Chỉ nên sử dụng trên nhánh **feature**, không nên dùng ở nhánh **master**

- `git cherry-pick <commit-id>`: Nhánh **feature** có commit _F1_ và _F2_. Ở nhánh **master**:

  - `git merge feature` sẽ merge cả _F1_ và _F2_ vào **master**.
  - `git cherry-pick <F1>` sẽ chỉ merge _F1_ vào **master**.

### Status

- `git reflog show master` (Xem nhật ký thao tác trên nhánh master) → `git reset 'HEAD@{1}’` (với HEAD@{0} là thao tác vừa làm → reset về thao tác trước đó là HEAD@{1}).
- `HEAD@{1}` vs `HEAD~1`: 2nd của `git reflog` vs 2 commits older than HEAD của `git log --oneline`.

### Squash 3 commit

- **Chưa push**: `git rebase -i HEAD~3` -{'>'} Từ hàng 2 trở xuống, đổi từ pick thành s -{'>'} Conflict -{'>'} ...
- **Đã push**: `git reset HEAD~3` / (3rd trong `git log`) -{'>'} add, commit -{'>'} `git push -f origin <branch-name>`

### Branch

- `git branch -b newBranch`: Tạo và chuyển sang nhánh _newBranch_
- `git branch -d test1`: Xóa nhánh test1
- `git branch -m newName`: Đổi tên nhánh đang checkout thành newName
- `git branch -a`: Show cả các branch ở remote

### Reset

- `git reset --(soft / mixed / hard) (HEAD~1 / <commit-id>)` -> Về stage/local/xóa luôn.
- `git status (<file-name>)`: Xem trạng thái (local, staging hay đã commit) cả nhánh (hoặc file-name).
- `reset` vs `revert`: `revert` chỉ undo riêng 1 commit `X`, còn `reset` back về luôn commit đó luôn (undo hết ~ commit sau `X`).

### Config

- `git config --list --show-origin`
- `git config --global user.email jonhkane00@gmail.com`

### Remote

- `git remote -v`: Show những remote repo mà local repo này liên kết, mặc định của Github là **origin**
- `git fetch origin`: Cập nhật data từ remote **origin**
- `git merge origin/master`: Merge nhánh **master** của remote **origin** vào local HEAD

### Stash

- `git stash` / `git stash save 'message'`
- `git stash apply ‘stash@{1}’` vs `git stash pop`: Apply nhưng ko xóa / xóa luôn stash.
- `git stash list` - `git stash clear` - `git drop stash@{1}`

### Tìm lại và checkout commit/stash cũ

1. **Tìm lại ID của commit/stash cũ**:  
   `git fsck --unreachable | grep commit | cut -d" " -f3 | xargs git log --merges --no-walk --grep=WIP`  
   Thay "WIP" ở cuối by a part of the title của stash/commit
2. **Thử version cũ hơn của pj (Detached HEAD)**: `git checkout -b test-branch 56a4e5c08 --index.js` - Tạo nhánh mới từ `commit-id 56a4e5c08` -> do anything... -> `git checkout master` + `git branch -d test-branch`

### ETC

- **Xóa file**: `git rm *.ts (--cached)` -> Xóa file (khỏi stage).

- **Vim**: `ESC : W Q` -> Save & Quit.
