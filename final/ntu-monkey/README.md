# (Group: 19 ) NTUMonkey_台大專屬任務媒合平台

## 基本資料說明
1. 組員：資管三何品諭、資管二洪韻蕎
2. [deploy Link](https://ntu-monkey.herokuapp.com/)
3. [demo Link](https://drive.google.com/file/d/1-iLoK7vQ1YWwV_YcZfX3uNCu74xZgqFR/view?usp=sharing)
### 介紹：
台大生專屬的任務媒合平台，類似於小雞上工，註冊登入之後即可一面當Boss發佈任務請別人幫你完成日常所需，另一面也可以接別人的任務來賺取零用錢！

### 使用流程：
#### 註冊&登入：
使用用戶名、密碼、台大學號等五樣資訊做註冊，登入則是使用用戶名以及密碼。
 
#### 編輯Profile:
可以到profile的地方查看以及編輯自己的資訊。
 
#### 僱主方_發佈任務：
點選右上角的圖像會出現menu，點選裏面的create new task 並填寫相關資訊即可創見新任務，此時可以在Boss中的myTask以及Applicants的allTasks看到。
 
#### 應徵方_接任務：
在左方的menu中點選Applicants的allTasks，點選任一個任務的Learn More，即可看到應徵按鈕，點選應徵後會跳出成功的通知並可以在pending的地方看到剛剛應徵的任務，此時代表僱主還沒決定要不要採用你。（自己不能應徵自己的）
 
#### 僱主方_選應徵者：
在左方的menu中點選Boss的myTask，點選任一個任務的Learn More，可看到第1行的應徵者，點選查看人才即可看到現在有誰應徵，並選擇一個特定的人執行你的任務，點選過後此任務在僱主方會被移到Boss的doneTask，在應徵方會被移到Applicant的myTask。如果是沒應徵到的人此任務會直接從他的清單中消失。
 
#### 應徵方_完成任務：
若應徵方接到任務之後可以在Applicant的myTask中點選完成，即代表做完此任務，此任務會被移到Applicant的doneTask中。
#### 登出
在右上角的menu中登出

### 使用套件 / 框架
 #### Frontend: 
 1. React.js
 2. React Hooks
 3. axios
 4. Material-ui
 5. notistack
 #### Backend: Node.js
 1. http
 2. jsonwebtoken
 3. mongoose
 4. dotenv-defaults
 5. babel
 6. heroku

### 心得
#### 何品諭
這次做專案是我第一次從零發想實作出一個app，在寫後端的時候也學到怎麼樣寫出更有架構的code，還有學到一些新的套件的用法還有怎麼deploy，總之學到很多，也感謝我的組員跟我一起完成～～
#### 洪韻蕎
學網服的整個學期可說是充滿困難以及打擊，在滿滿的作業跟快速到來的黑客松之中努力生存，慢慢的（其實才沒有慢慢的）從0開始學會前端到後端的基本用法，並可以跟品喻合作生出一個好像可以用的東西，在這次專案中也接觸了很多套件的用法，component的克制化、搭配，雖然中間因為網頁的排版而崩潰幾次，但看見成果還是覺得一切值得，也謝謝老師願意開這門課讓我可以初探網頁的世界。但最後我只想說，好累，我要去睡覺了。

# ntu-monkey
## localhost安裝
1. yarn install 
2. 開啟前端及後端：在此資料夾中yarn start
3. 依照backend中的.env.defaults製作出.env檔

### 填入 .env 的欄位內容
```
PORT=4000
TOKEN_SECRET=09f26e402586e2faa8da4c98a35f1b20d6b033c60
LOGIN_EXPIRE_DAYS=7 days
SALT=
```
(並填入自己的MONGO_URL)

## 如果yarn start有問題且為mui的問題的話
1. 至frontend的資料夾中
2. yarn add @mui/material @emotion/react @emotion/styled
3. yarn add @mui/material @mui/styled-engine-sc styled-components
4. yarn add @mui/icons-material
5. yarn add @mui/lab
## 測試
### 備註：有時候如果有更改的task沒出現的話，先按左方menu中其他選項再跳回來，謝謝
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
4. 再點選EDIT按鈕，可看到有預帶原本資訊。
 
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
3. 頁面換跳轉到DoneTask

### 小功能
1. 創見超過8個任務
2. 可以順利翻頁！

### 小細節
## Learn more的內容不一樣
1. 在BOSS方的任務Learn more中第1行是應徵者
2. 在Applicants方的任務Learn more中第1行是刊登者
## 頁面跳轉
1. 在作許多動作時，結束後會有對應的跳轉頁面，方便查看結果。
## 通知
1. 在作許多動作時，結束後會有對應的snackbar出現，方便查看結果。
### 登出
在右上角的menu中登出

## 組員分工
### 何品諭
1. 全部backend
2. deploy

### 洪韻蕎
1. 全部frontend
2. 打文件