$(document).ready(function () {
  // 모달창
  let modal_close = $(".modal-close");
  let modal = $(".modal");

  modal_close.click(function () {
    modal.hide();
  });

  // 헤더
  let header = $(".header");
  let logo = $(".logo");
  let gnb_li_a = $(".gnb > li > a");
  let help_menu_a = $(".help-menu > li  > a");
  let header_more = $(".header-more");
  let submenu = $(".submenu");

  let header_height = $(".header").offset().top;

  $(window).scroll(function () {
    header_height = $(".header").offset().top;
  });

  let header_limit = $(".visual-header-limit").offset().top;

  function header_change() {
    // 배경색, 그림자 추가
    header.addClass("header-active");
    // 로고 변경
    logo.addClass("logo-active");
    // 주메뉴 글자색 변경
    gnb_li_a.addClass("gnb-li-a-active");
    // help-menu 글자색 변경
    help_menu_a.addClass("help-menu-a-active");
    // 햄버거 메뉴 라인 색상 변경
    header_more.children().addClass("active");
    header_more.children().css("background", "#333");
  }

  function header_undo() {
    header.removeClass("header-active");
    logo.removeClass("logo-active");
    gnb_li_a.removeClass("gnb-li-a-active");
    help_menu_a.removeClass("help-menu-a-active");
    header_more.children().removeClass("active");
    header_more.children().css("background", "#fff");
  }

  // 마우스 스크롤이 header_limit 지점을 지나면 header가 바뀐다.
  $(window).scroll(function () {
    if (header_height > header_limit) {
      header_change();
    } else {
      header_undo();
      if (submenu.hasClass("submenu-active")) {
        header.addClass("header-active");
        logo.addClass("logo-active");
        gnb_li_a.addClass("gnb-li-a-active");
        help_menu_a.addClass("help-menu-a-active");
        header_more.children().css("background", "#333");
      }
    }
  });

  // header에 마우스 롤오버하면 header가 바뀐다.
  header.mouseenter(function () {
    header_change();
  });
  // header에 마우스 롤아웃하면 header가 원래대로 투명하게 돌아온다.
  header.mouseleave(function () {
    header_undo();
  });

  //gnb_li_a에 호버를 하면 서브메뉴가 보이면서 header가 바뀐다.
  gnb_li_a.mouseenter(function (event) {
    event.preventDefault();
    submenu.addClass("submenu-active");
    header_change();
  });

  // header에서 마우스 롤아웃할 때 서브메뉴가 사라진다 && 스크롤이 header_limit 지점을 넘어갔을 시에는 header가 바뀐 상태로 유지된다.
  header.mouseleave(function () {
    submenu.removeClass("submenu-active");
    if (header_height > header_limit) {
      header_change();
    }
    header_more.removeClass("active");
  });

  let submenu_list = $(".submenu-list");
  $.each(submenu_list, function (index, item) {
    $(this).mouseenter(function () {
      gnb_li_a.removeClass("gnb-li-a-after-active");
      gnb_li_a.eq(index).addClass("gnb-li-a-after-active");
    });
    $(this).mouseleave(function () {
      gnb_li_a.removeClass("gnb-li-a-after-active");
    });
  });

  // help-more 버튼 누르면 모양 변화 && 서브메뉴 나타나기
  header_more.click(function () {
    $(this).toggleClass("active");
    submenu.toggleClass("submenu-active");
  });

  //KOR에 마우스 롤오버하면 ENG 보이기
  let kor = $(".korean");
  let eng = $(".english");

  kor.mouseenter(function (event) {
    event.preventDefault();
    kor.addClass("korean-off");
    eng.addClass("english-on");
  });

  eng.mouseleave(function (event) {
    event.preventDefault();
    kor.removeClass("korean-off");
    eng.removeClass("english-on");
  });
});

window.onload = function () {
  // 비주얼 영역 슬라이드
  let sw_visual = new Swiper(".sw-visual", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
    navigation: {
      prevEl: ".sw-visual-prev",
      nextEl: ".sw-visual-next",
    },
    pagination: {
      el: ".sw-visual-pg",
      clickable: false,
      type: "fraction",
      formatFractionCurrent: function (number) {
        return ("0" + number).slice(-2);
      },
      formatFractionTotal: function (number) {
        return ("0" + number).slice(-2);
      },
      renderFraction: function (currentClass, totalClass) {
        return (
          '<span class="' +
          currentClass +
          '"></span>' +
          " / " +
          '<span class="' +
          totalClass +
          '"></span>'
        );
      },
    },
  });

  // 해비타트 이야기 슬라이드

  let sw_story = new Swiper(".sw-story", {
    loop: true,
    slidesPerView: 4.8,
    navigation: {
      prevEl: ".sw-story-prev",
      nextEl: ".sw-story-next",
    },
  });

  // 해비타트 영상
  let clip_list_a = $(".clip-list > li >a");

  $.each(clip_list_a, function () {
    $(this).click(function (event) {
      event.preventDefault();
      let src = $(this).data("video-src");
      $(".clip-box-left iframe").attr({
        src: "https://www.youtube.com/embed/" + src,
      });

      $(this).find(":first-child").click();
    });
  });

  // 언론보도 슬라이드
  let sw_info = new Swiper(".sw-info", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: ".sw-info-prev",
      nextEl: ".sw-info-next",
    },
  });

  // 배너 슬라이드
  let sw_banner = new Swiper(".sw-banner", {
    loop: true,
    slidesPerView: 8,
    slidesPerGroup: 8,
    navigation: {
      prevEl: ".sw-banner-prev",
      nextEl: ".sw-banner-next",
    },
  });
};
