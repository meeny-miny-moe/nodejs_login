module.exports = {
  web: function (authStatusUI = '<a href="/login">로그인</a>') {
    return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href ="./css/main.css" />
        <script src="./jquery/dist/jquery.js"></script>
        <script type="text/javascript" src="./js/api.js"></script>

        <!-- icon -->
        <script
        src="https://kit.fontawesome.com/5b7a7cfcb5.js"
          crossorigin="anonymous"
        ></script>
        <!-- font -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans  +KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <!-- favicon -->
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>main page</title>
      </head>
      <body>
        <nav class="navbar">
          <a href="/" class="navbar_logo"> &#127800;Blooming </a>

          <div class="navbar_side">
            <ul class="navbar_menu">

              <li>${authStatusUI}</li>
            </ul>
          </div>

          <a href="#" class="navbar_togglebtn">
            <i class="fa-solid fa-bars"></i>
          </a>
        </nav>
        <div class="container">
          <div class="content">
            <div class="title">
              <h1>Blooming</h1>
              <h3>매일이 새롭게 피어나는 봄, 봄날을 함께할 인연을 사귀어봐요.</h3>
            </div>
            <div class="method">
              <br />
              <img
                src="../puzzles.png"
                alt="puzzles"
                border="0"
                height="400"
                weight="400"
              />
            </div>
          </div>
          <!-- 로그인 되어있으면 매칭페이지로 아니면 로그인 페이지로 연결되도록 구현하기 -->
          <button type="button" class="btn-block" id="start_btn">매칭하기</button>
          <button type="button" class="btn-my" id="chat">대화하기</button>
        </div>
        <footer class="footer">
          <div class="column">©WAP_WEB3</div>
        </footer>
        <!-- 페이지 이동을 위해서 추가해줘야 하는 부분 -->
        <script type="text/javascript" src="/js/move.js"></script>
        

      </body>
    </html>
    `;
  },
};
