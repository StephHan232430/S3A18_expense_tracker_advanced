# 家庭記帳本

學期3 A17:老爸的私房錢

## 功能列表

- 使用者可以email和自訂密碼註冊登入，也可藉由facebook快速註冊、登入
- 使用者可新增支出項目
- 首頁依支出時間由新至舊列出支出項目並加總總金額，點擊綠色info按鈕可查看詳細資訊，點擊黃色Edit按鈕可修改項目資訊，點擊紅色Delete可刪除支出項目
- 點選Edit按鈕進入編輯模式，編輯完成點選『儲存變更』按鈕或放棄編輯點選『取消編輯』按鈕後，導回首頁
- 點擊刪除按鈕後，呈現警語頁面，使用者可再度確認是否刪除
- 點擊navbar左上角『家庭記帳本』icon可清除所有篩選條件返回首頁
- 可結合月份和類別篩選支出項目，並顯示篩選後之項目總金額

## 環境建置
1. MongoDB v4.0以上
2. Node.js

## 專案安裝流程
1. 開啟terminal，將此專案clone至本機

```
git clone https://github.com/StephHan232430/S3A18_expense_tracker_advanced.git
```

2. 進入專案資料夾

```
cd S3A18_expense_tracker_advanced
```

3. 安裝專案所需套件

```
npm install
```

4. 於terminal輸入指令匯入種子資料

```
npm run seeder
```

5. 待terminal出現下列訊息，表示種子資料已新增至資料庫，按下 <kbd>command</kbd> + <kbd>c</kbd> 結束執行

```
mongodb connected!
seeded!
```

6. 執行專案
```
npm run dev
```

7. 開啟網頁瀏覽器，於網址列輸入
```
http://localhost:3000
```

## 測試帳號

| Name  | Email               | Password         |
| :---: | :-----------------: | :--------------: |
| Tony  | tony@stark.com      | iamironman       |
| Steve | captain@hotmail.com | icandothisallday |

## 使用工具

- [bcryptjs v2.4.3](https://www.npmjs.com/package/bcryptjs)
- [body-parser v1.19.0](https://www.npmjs.com/package/body-parser)
- [connect-flash v0.1.1](https://www.npmjs.com/package/connect-flash)
- [dotenv v8.2.0](https://www.npmjs.com/package/dotenv)
- [express v4.17.1](https://expressjs.com/zh-tw/)
- [express-Handlebars v3.1.0](https://github.com/ericf/express-handlebars)
- [express-session v1.17.0](https://www.npmjs.com/package/express-session)
- [method-override v3.0.0](https://www.npmjs.com/package/method-override)
- [MongoDB Community Server v4.0.13](https://www.mongodb.com/download-center/community)
- [Mongoose v5.7.10](https://www.npmjs.com/package/mongoose)
- [Node.js v12.13.0](https://nodejs.org/en/)
- [passport v0.4.0](https://www.npmjs.com/package/passport)
- [passport-facebook v3.0.0](https://www.npmjs.com/package/passport-facebook)
- [passport-local v1.0.0](https://www.npmjs.com/package/passport-local)
- [Visual Studio Code v1.39.2](https://code.visualstudio.com/)