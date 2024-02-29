window.addEventListener("load", function () {
  // 언어 펼침 기능
  const langWord = document.querySelector(".language-word");
  const language = document.querySelector(".language");
  const languageLi = this.document.querySelector(".language li");
  langWord.addEventListener("click", function () {
    language.classList.toggle("language-box-active");
  });
  this.setTimeout(function () {
    languageLi.style.transition = "all .5s";
  });
  // header scroll active
  //scroll bar top position
  let scy = 0;
  let scActive = 50;
  scy = this.document.documentElement.scrollTop;
  let header = this.document.querySelector(".header");
  let logoW = this.document.querySelector(".logo-wh");
  let logoG = this.document.querySelector(".logo-gr");
  //hovered header
  header.addEventListener("mouseenter", () => {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  });
  header.addEventListener("mouseleave", () => {
    header.classList.remove("header-active");
    logoW.style.display = "block";
    logoG.style.display = "none";
  });
  this.setTimeout(function () {
    header.style.transition = "all .5s";
  });
  //scrolled header
  this.window.addEventListener("scroll", () => {
    scy = this.window.document.documentElement.scrollTop;
    if (scy > 0) {
      header.classList.add("header-active");
      logoW.style.display = "none";
      logoG.style.display = "block";
    } else {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });
  //menu
  let nav = this.document.querySelector(".nav");
  let btMenu = this.document.querySelector(".btn-menu");
  let navClose = this.document.querySelector(".nav-close");
  btMenu.addEventListener("click", () => {
    nav.classList.add("nav-active");
  });
  navClose.addEventListener("click", () => {
    nav.classList.remove("nav-active");
  });
  nav.addEventListener("mouseleave", () => {
    nav.classList.remove("nav-active");
  });
  //video list check (video 태그로 파악)
  //모든 비디오 태그를 변수에 저장
  let video = this.document.querySelectorAll(".swVisual video");
  // 비디오 재생시간 체크
  // 비디오 재생 시간을 보관할 배열을 생성
  let videoTimeArr = [];
  // 비디오 재생 시간을 배열에 저장하는 반복문
  for (let i = 0; i < video.length; i++) {
    //비디오 재생 시간 알아보는 로그
    // console.log(video[i].duration);
    // Math.ceil() 함수는 주어진 숫자를 올림하여 반환
    videoTimeArr[i] = Math.ceil(video[i].duration);
  }
  // 첫번째 비디오 자동 실행
  let videoIndex = 0;
  video[videoIndex].play();
  //visual swiper
  let swVisual = new Swiper(".swVisual", {
    loop: true,
  });
  // 슬라이드 변경 이벤트 시 처리
  swVisual.on("slideChange", () => {
    //진행 중인 비디오를 멈춤
    video[videoIndex].pause();
    //다음 화면에 보이는 swiper slide 번호를 담기
    // console.log(swVisual.activeIndex);
    // console.log(swVisual.realIndex);
    videoIndex = swVisual.realIndex;
    //다음 비디오를 재생
    //처음으로 비디오 플레이 헤드 이동
    //currentTime 속성 HTML <vedio>요소에서 사용되는 속성
    //현재 비디오 재생 위치를 나타냄
    //이 속성을 조작하여 재생위치를 변경
    //다음 슬라이드로 이동할때 마다 비디오를 처음부터 재생하기 위해서
    video[videoIndex].currentTime = 0;
    const playPromise = video[videoIndex].play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
    //progress bar 도 같이 넘어가는 코드 (하단 코드 재사용)
    this.clearInterval(videoTimer);
    videoReset();
  });
  //video 영상 플레이가 끝나면 다음 slide로 넘어가기
  //video progress bar
  let bars = this.document.querySelectorAll(".bar");
  let barScaleW = 0;
  //timer create
  //비디오 타이머 초기화 및 설정
  let videoTimer;
  //비디오 타이머를 설정하고 초기화하는 함수를 정의하고 호출
  function videoReset() {
    // 처음은 0%
    barScaleW = 0;
    //최초에 bar 초기화
    for (let i = 0; i < bars.length; i++) {
      let tag = bars[i];
      tag.style.width = `${barScaleW}%`;
    }
    // 활성화 될 bar class 선택
    let activeBar = bars[videoIndex];
    // console.log(activeBar);
    //setTimeout : 1번 실행 clearTimeOut()
    //setInterval : 시간마다 연속 실행 clearInterval()
    this.clearInterval(videoTimer);
    //비디오 플레이 시간
    let videoTime = videoTimeArr[videoIndex];
    videoTimer = this.setInterval(() => {
      barScaleW++;
      activeBar.style.width = `${barScaleW}%`;
      if (barScaleW >= 100) {
        swVisual.slideNext();
        clearInterval(videoTimer);
        videoReset();
      }
    }, videoTime * 10);
  }

  videoReset();
  //video control > li 클릭했을 때 해당 페이지 활성화 하기
  const visualConrolLi = this.document.querySelectorAll(".visual-control > li");
  visualConrolLi.forEach((item, index) => {
    item.addEventListener("click", () => {
      videoIndex = index;
      swVisual.slideTo(videoIndex);
    });
  });
  //aos 적용
  AOS.init();
  //business swiper
  const swBusiness = new Swiper(".swBusiness", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
});
