# ntu-monkey
## localhost安裝
1. yarn install 
2. 開啟前端：在此資料夾中yarn start
3. 依照backend中的.env.defaults製作出.env檔
4. 開啟後端：在此資料夾中yarn server 

## 如果yarn start有問題且為mui的問題的話
1. 至frontend的資料夾中
2. yarn add @mui/material @emotion/react @emotion/styled
3. yarn add @mui/material @mui/styled-engine-sc styled-components
4. yarn add @mui/icons-material
5. yarn add @mui/lab
## 測試

### 註冊
1. 點選sign up 按鈕，輸入五樣資訊，
2. 用戶名與已存在的重複或是沒填完五像資訊，跳出error的snackbar。
3. 皆有輸入，跳出成功的snackbar，並回到login頁面。
### 登入
使用用戶名、密碼登入
1. 輸入不存在用戶名，跳出error的snackbar。
2. 密碼錯誤，跳出error的snackbar。
3. 都正確，跳出成功的snackbar，並到TaskList
 
### 編輯Profile:
1. 到左方profile的地方查看自己的資訊。
2. 點選EDIT按鈕，並填寫相關資訊。
3. 編輯成功。
 
 ### Task種類說明
 #### 1.Boss_MyTasks
 我發佈的任務
 #### 2.Boss_DoneTasks
 我發佈的任務中已經有人執行此任務的任務
 #### 3.Applicants_AllTasks
 現在平台上全部有徵人需求的任務
 #### 4.Applicants_PendingTasks
 我已經應徵還在等僱主回覆的任務
 #### 5.Applicants_MyTasks
  我已經應徵到的任務
 #### 6.Applicants_DoneTasks
 我應徵到並完成的任務
### 僱主方_發佈任務：
1. 點選右上角的圖像會出現menu，點選裏面的create new task 
2. 並填寫相關資訊即可創任務
3. 可以在Boss中的myTask以及Applicants的allTasks看到
4. 若資訊填寫不完全會跳出error的snackbar且無法創建成功。

### 僱主方_編輯任務：
1. 在Boss中的myTask中點選編輯的icon
2. 填寫任務的新資訊
3. 點選變更即可成功編輯，並看到新資訊。
 ### 僱主方_刪除任務：
1. 在Boss中的myTask中點選垃圾桶的icon
2. 該任務會直接被刪除
3. 在Boss中的myTask以及Applicants的allTasks都無法看到。
### 應徵方_接任務：
1. 在左方的menu中點選Applicants的allTasks
2. 點選任一個任務的Learn More，即可看到應徵按鈕
3. 若該任務為沒有應徵過的其他人發佈的任務-> 跳出成功應徵的snackbar，並可以在pending看到該任務
4. 若應徵自己發佈的任務-> 跳出error 的snackbar
5. 若應徵已應徵過的任務-> 跳出error 的snackbar
 
### 僱主方_選應徵者：
1. 請助教建立3個帳號A,B,C，A當BOSS B,C當應徵者１，２
2. Ａ發佈新任務。
3. 在Boss的myTask中點選該任務的Learn More，可看到第1行為應徵者，點選查看人才，此時會跳出info的snackbar表示還沒有應徵者。
4. ＢＣ皆去應徵。
5. 重複第3.，此時會跳到有table的頁面，顯示應徵者的資訊，選擇B作為你的應徵者。
6. 頁面跳轉至Boss的myTasks
7. 該任務會從Boss的myTask移動到DoneTasks，從AllTask消失，在B的帳號中任務從pendingTask移到mytasks，在C的帳號中任務從pendingTask消失。
 
### 應徵方_完成任務：
1. 延續上一個測試，B借到任務後，任務會出現在myTasks，可點選任務中完成的按鈕，表示完成此任務
2. 此任務會從mytasks移到DoneTask

### 小功能
1. 創見超過8個任務
2. 可以順利翻頁！
### 登出
在右上角的menu中登出

## 組員分工
### 何品喻
1. 全部backend
2. deploy

### 洪韻蕎
1. 全部frontend
2. 打文件