const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);
http.listen(8080, function () {
  console.log("listening on 8080");
});

app.use(express.static(path.join(__dirname, "shop/build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "shop/build/index.html"));
});

// server 페이지로 연결
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "public/main.html"));
});

// 기본설정
// app.use(express.static(path.join(__dirname, "public")));

// 서버와 리액트 경로를 나눌 경우
// app.use("/", express.static(path.join(__dirname, "public")));
// app.use("/react", express.static(path.join(__dirname, "shop/build")));

// app.get("/", function (request, response) {
//   response.sendFile(path.join(__dirname, "public/main.html"));
// });

// app.get("/react", function (request, response) {
//   response.sendFile(path.join(__dirname, "shop/build/index.html"));
// });
