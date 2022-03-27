/**
* 공통 common js
* @copyright 2015 해비타트
 * @author : 임미연,정의찬
 * @소속 : FGI
 * @date : 2015-01-27
*/
"use strict";
if(!window.console) window.console = {};
if(!window.console.log) window.console.log = function () { };

$(window).scroll(function(){
	sub_fixmenu();	//스크롤시 로케이션 고정시키지
	icon_fixmenu(); //스크롤시 아이콘메뉴 고정시키지
	backing_fixmenu(); //스크롤시 메뉴 고정시키지
	backing_fixmenu2(); //스크롤시 메뉴 고정시키지
});
$(document).ready(function() {
	//gnb 메뉴 활성화
	depth_menu();
	function depth_menu() {
		if(depth1 > 0 && depth2 > 0 ){
			//1depth
			$('.gnb>ul>li:nth-child('+depth1+')').each(function(){
				$(this).addClass('on').siblings().removeClass('on');
			});
			//2depth
			$('.gnb>ul>li:nth-child('+depth1+')>ul>li:nth-child('+depth2+')').each(function(){
				$(this).addClass('on').siblings().removeClass('on');
			});
		}
	}

	//gnb
	$('.gnb>ul>li').on('mouseenter focus',function(){
		$(this).addClass('on').siblings().removeClass('on');
		$(this).addClass('arrow').siblings().removeClass('arrow');
		$('#header_wrap').stop().animate({height:'370px'},800,'swing')
	});
	$('.gnb').on('mouseleave',function(){
		depth_menu();
		$('#header_wrap').stop().animate({height:'114px'},800,'swing')
			$('.gnb ul li').removeClass('arrow');
	});

	//gnb 키보드접근
	$('.gnb>ul>li>a').focus(function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
		$(this).parent().addClass('arrow').siblings().removeClass('arrow');
		$('#header_wrap').stop().animate({height:'377px'},800,'swing')
	});

	//퀵메뉴 롤오버
	$('.quick ul li a').on('mouseenter focusin',function(){
		$(this).next().show();
		$(this).find('>img').attr('src',$(this).find('>img').attr('src').replace('off.gif','on.gif'));
	});
	$('.quick ul li a').on('mouseleave focusout',function(){
		$(this).next().hide();
		$(this).find('>img').attr('src',$(this).find('>img').attr('src').replace('on.gif','off.gif'));
	});

	//탭메뉴 개수에 따라 width값 계산
	var tab_size = $('.tab_menu > li').length;
	$('.tab_menu > li').width(1000 / tab_size);
	$('.tab_menu > li > a').on('click',function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
	});

	//맨 상단으로 이동
	$('.quick > a, .top').click(function(){
		$("html,body").animate({scrollTop:0});
	});


	//기간검색
	$('.seach_area .period a').on('click',function(){
		$(this).addClass('on').siblings().removeClass('on');
	});


	//gnb current on
	$('.fix_menu li a.selected').each(function() {
		if($('.fix_menu li a').hasClass('selected')) {
			$(this).find('img:eq(0)').attr('src',$(this).find('img:eq(0)').attr('src').replace('_off','_on'));
		} else {
			$(this).find('img:eq(0)').attr('src',$(this).find('img:eq(0)').attr('src').replace('_on','_off'));
		};
	});


	//location 메뉴펼침
	var menu_width = location_depth_width(".depth:eq(0)");
	var menu_width2 = location_depth_width(".depth:eq(1)");
	var menu_width3 = location_depth_width(".depth:eq(2)");

	$('.depth:eq(0) > a').width(menu_width - 43);
	$('.depth:eq(0)').width(menu_width);
	$('.depth:eq(1) > a').width(menu_width2 - 43);
	$('.depth:eq(1)').width(menu_width2);
	$('.depth:eq(2) > a').width(menu_width3 - 43);
	$('.depth:eq(2)').width(menu_width3).find('>a.open').addClass('on');
	$('.depth').last().addClass('last');

	$('.depth a.open').click(function(){
		$('.depth ul').hide();
		$(this).next().show();
		$(this).hide();
		$('.depth a.open').show();
		$('.depth a.close').hide();
		$(this).next().next().show();
	});
	$('.depth a.close').click(function(){
		$(this).hide();
		$(this).prev().hide();
		$(this).prev().prev().show().focus();
	});
	$('.depth ul li a').click(function(){
		var txt_value = $(this).text();
		$(this).parent().parent().hide();
		$(this).parent().parent().prev().show().text(txt_value);
		$(this).parent().parent().next().text(txt_value);
		$(this).parent().parent().next().hide();

	});

	$('.depth ul').mouseleave(function(){
		$(this).hide();
		$('.depth a.open').show();
		$('.depth a.close').hide();
	});


	//자원봉사 신청정보 _ 면책증서 레이어팝업
	$('.layer_certificate, .layer_password, .layer_photo').on('click',function(){
		var layer_height = $('#layer_pop2').height();
		var layer_width = $('#layer_pop2').width();
		$('#layer_pop2').css({'margin-top':- (layer_height / 2),'margin-left':- (layer_width / 2)});
		$('#layer_pop2').fadeIn();
		$('.tab_click li:eq(0)').addClass('on');	//첫번째 탭 .on 추가
		$('.layer_fix').show();
	});

	//면책증서 클릭시 print.css파일 체인지
	$('.layer_certificate').click(function(){
		$('link[media="print"]').attr("href", "/resources/css/print_certificate.css");
	});
	//위임장 클릭시  print.css파일 체인지
	$('.layer_attorney').click(function(){
		$('link[media="print"]').attr("href", "/resources/css/print_mandate.css");
	});

	//자원봉사 신청정보 _ 위임장 레이어팝업
	$('.layer_attorney').on('click',function(){
		var layer_height = $('#layer_pop3').height();
		var layer_width = $('#layer_pop3').width();
		$('#layer_pop3').css({'margin-top':- (layer_height / 2),'margin-left':- (layer_width / 2)});
		$('#layer_pop3').fadeIn();
		$('.layer_fix').show();
	});

	//국내자원봉사 신청 - 프로그램 10개펼치기
	$('.calendar_area .calendar span.plus a').click(function(){
		$('.calendar_area .calendar tr td').removeClass('on');
		$(this).parent().parent().parent().addClass('on');
	});
	$('.calendar_area .layer_plus > a').click(function(){
		$(this).parent().parent().parent().removeClass('on');
	});


	//공통 레이어팝업
	$('.layer').on('click',function(){
		var url = $(this).attr("data-url");
		//alert (url);
		if ( url ) {
			$('#layer_pop').load(url, function() {
				var layer_height = $('#layer_pop').height();
				var layer_width = $('#layer_pop').width();
				$('#layer_pop').css({'margin-top':- (layer_height / 2),'margin-left':- (layer_width / 2)});
				$('#layer_pop').fadeIn();
				$('.layer_fix').show();
			});
		} else {
			var layer_height = $('#layer_pop').height();
			var layer_width = $('#layer_pop').width();
			$('#layer_pop').css({'margin-top':- (layer_height / 2),'margin-left':- (layer_width / 2)});
			$('#layer_pop').fadeIn();
			$('.tab_click li:eq(0)').addClass('on');	//첫번째 탭 .on 추가
			$('.layer_fix').show();
		}
	});

	$('.layer_fix').on('click',function(){
		$(this).hide();
		$('.layer_pop, .instance_layer, .instance_wrap > button').fadeOut();
	});
	$('.layer_pop .close, .instance_layer .close, .news_pop a.btn_blue2').on('click',function(){
		$('.layer_pop, .instance_layer, .instance_wrap > button').fadeOut();
		$('.layer_fix').hide();
		$('.layer_cont .tab_click li').removeClass('on');	//레이어닫기 클릭시 메뉴on 지움
	});


	//탭스크립트
	$('.visible, .visible1').hide();
	$('.visible:eq(0), .visible1:eq(0)').show();
	var tab_li = $('.tab_click li a');
	tab_li.each(function(i) {
		$(this).on('click focus',function(e){
			e.preventDefault();//기본동작 막음
			$('.instance > ul > li').removeClass('on'); //기업사회공헌 사업소개
			$('.instance_content').hide(); //기업사회공헌 사업소개
			$(this).parent().addClass('on').siblings().removeClass('on');
			$(this).parents('ul.tab_click').siblings().hide().eq(i).show();
		});
	});

	//기업사회공헌 사업소개
	var tab_li2 = $('.tab_click2 li a');
	tab_li2.each(function(i) {
		$(this).on('click focus',function(e){
			e.preventDefault();//기본동작 막음
			$('.instance > ul > li').removeClass('on');
			$('.instance_content').hide();
			$(this).parent().addClass('on').siblings().removeClass('on');
			$(this).parents('ul.tab_click2').siblings().hide().eq(i).show();
		});
	});

	$('.instance_content a.close').click(function(){
		$('.instance_content').hide();
		$('.instance > ul > li').removeClass('on');
	});

	$('.btn_sample:eq(0)').on('click',function(){
		$('.layer_cont .tab_2 li').removeClass('on');
		$('.layer_cont .tab_2 li:eq(0)').addClass('on');
		$('.layer_cont .visible').hide();
		$('.layer_cont .visible:eq(0)').show();
	});
	$('.btn_sample:eq(1)').on('click',function(){
		$('.layer_cont .tab_2 li').removeClass('on');
		$('.layer_cont .tab_2 li:eq(1)').addClass('on');
		$('.layer_cont .visible').hide();
		$('.layer_cont .visible:eq(1)').show();
	});

	//지회 레이어팝업
	$('.tel').on('click',function(e){
		e.preventDefault();
		$('.tel').not($(this)).next().fadeOut();
		$(this).next().fadeToggle(500);
	});

	// 이용약관, 개인정보처리방침 / 후원가이드_후원방법
	$('.regulations a, .tiny li a').click(function(){
		var ts_target = $(this).attr("href");
		var ts_top = $(ts_target).focus().offset().top;
		$("html,body").animate({scrollTop:ts_top - 80 },700,'swing');
		return false;
	});

	$('.board_search input').bind('click focusin', function(){
		$(this).attr('value','').css('color','#707070');
	});

	//셀렉트박스
	$('.select_box .box.close').hide();
	$('.select_box .box.open').bind('click',function(){
		$('.select_box ul').hide();
		$(this).parent().find('ul').show();
		$('.select_box .box.open').show();
		$('.select_box .box.close').hide();
		$(this).parent().find('.box.open').hide();
		$(this).parent().find('.box.close').show();
		$(this).parent().find('.box').focus();
	});
	$('.select_box .box.close').bind('click',function(){
		$('.select_box ul').hide();
		$('.select_box .box.open').show();
		$('.select_box .box.close').hide();
		$(this).parent().find('.box').focus();
	});

	$('.select_box.click_event ul a').bind('click',function(){
		var url_li = $(this).html();
		$(this).parent().parent().parent().find('.box').html(url_li);
		$('.select_box ul').hide();
		$('.select_box .box.open').show();
		$('.select_box .box.close').hide();
		$('.select_box .box').focus();
	});

	//FAQ
	$('.factSheet dt a').on('click', function(){
		if(!$(this).parent().parent().hasClass('on')){
			$(this).parent().parent().parent().find('.factSheet').removeClass('on');
			$(this).parent().parent().addClass('on');
		}
		else if ($(this).parent().parent().hasClass('on')){
			$(this).parent().parent().parent().find('.factSheet').removeClass('on');
		}
	});
/*
	//홈파트너 신청 _다음단계별 펼침
	$('.btn_next').on('click',function(){
		var href_target = $(this).attr("href");
		var target_top = $(href_target).offset().top;
		//console.log(target_top)
		$('body').animate({scrollTop:target_top},0);
		$(this).parent().parent().next().next().addClass('on').siblings().removeClass('on');
		$(this).parent().parent().next().addClass('on');	//h5 활성화
	});
	//홈파트너 신청 _이전단계별 펼침
	$('.btn_prev').on('click',function(){
		$(this).parent().parent().parent().prev().prev().addClass('on').siblings().removeClass('on');
		$(this).parent().parent().parent().prev().prev().prev().addClass('on');	//h5 활성화
	});


	//입사지원서 _다음단계별 펼침
	$('.apply_btn_next').on('click',function(){
		var href_target = $(this).attr("href");
		var target_top = $(href_target).offset().top;
		$('body').animate({scrollTop:target_top - 50},0);
		$(this).parent().parent().next().next().addClass('on').siblings().removeClass('on');
		$(this).parent().parent().next().addClass('on');	//h5 활성화
	});
	//입사지원서 _이전단계별 펼침
	$('.apply_btn_prev').on('click',function(){
		$(this).parent().parent().parent().prev().prev().addClass('on').siblings().removeClass('on');
		$(this).parent().parent().parent().prev().prev().prev().addClass('on');	//h5 활성화
	});*/

	//포토갤러리 scale
	if($('html').hasClass('lte9')){
		$('.photo_list li a, .photo_view ul li a').mouseenter(function(){
			$(this).find('.imgBg').stop().animate({opacity:'.7'}, 500,'swing');
			$(this).find('.photo > img').stop().animate({opacity:'.2', width:"130%", height:"130%", "margin-left":"-10.5%", "margin-top":"-15.5%"}, 600,'swing');
			$(this).find('.information').stop().fadeIn();
		});
		$('.photo_list li a, .photo_view ul li a').on('mouseleave',function(){
			$(this).parent().parent().find('.imgBg').stop().animate({opacity:'0'}, 500,'swing');
			$(this).find('.photo > img').stop().animate({opacity:'1', width:"100%", height:"100%", "margin-left":"0", "margin-top":"0"}, 600,'swing');
			$(this).find('.information').stop().fadeOut();
		});
	}else{
		$('.photo_list li a, .photo_view ul li a').on('mouseenter',function(){
			$(this).find('.photo').addClass('transition');
			$(this).find('.photo > img').stop().animate({opacity:'.2'}, 600,'swing');
			$(this).find('.information').stop(true,true).fadeIn();
		});
		$('.photo_list li a, .photo_view ul li a').on('mouseleave',function(){
			$(this).find('.photo').removeClass('transition');
			$(this).find('.photo > img').stop().animate({opacity:'1'}, 600,'swing');
			$(this).find('.information').stop(true,true).fadeOut();
		});
	}
	/*$('.photo_list li a, .photo_view ul li a').on('mouseenter',function(){
		$(this).find('.photo').addClass('transition');
		$(this).find('.photo img').stop().animate({opacity:'.2'}, 1000,'swing');
		$(this).find('.information').stop(true,true).fadeIn();
	});
	$('.photo_list li a, .photo_view ul li a').on('mouseleave',function(){
		$(this).find('.photo').removeClass('transition');
		$(this).find('.photo img').stop().animate({opacity:'1'}, 1000,'swing');
		$(this).find('.information').stop(true,true).fadeOut();
	});*/

	//포토갤러리 상세 레이어팝업
	$('.photo_view ul li a').on('click',function(e){
		$('body').css('overflow','hidden');
		$('#photo_layer').css({visibility:'visible'});
		e.preventDefault();
		$('a[data-slidesjs-item="' + $(this).attr("data_item") + '"]').trigger('click');
		$('.photo_close').show();
		//$("#photo_layer").slidesjs("goto", "3");
	});
	$('.photo_close').on('click',function(){
		$('body').css('overflow','visible');
		$('#photo_layer').css({visibility:'hidden'});
		$(this).hide();
	});

	//캠페인 슬라이드
	window.silde_flag=0;
	window.silde_length=$('.camp_slide_wrap ul li').length;

	//캠페인 슬라이드 좌우버튼
	$('.left_arrow').click(function(){
		left_move();
	});
	$('.right_arrow').click(function(){
		right_move();
	});
	slide_check();

	//캠페인 슬라이드 전체보기
	$('.show_all').click(function(){
		$('.camp_slide_wrap ul').css({width:'auto', marginLeft:0, height:'auto'});
		$('.camp_slide_wrap > div').animate({'height':$('.camp_slide_wrap ul').height()},500,'swing');
		$('.right_arrow, .left_arrow').hide();
		$(this).hide();
		$('.show_one').show();
		window.silde_flag=0;
	});

	//캠페인 슬라이드 닫기
	$('.show_one').click(function(){
		$('.camp_slide_wrap > div').animate({'height':'137px'},function(){
			$('.camp_slide_wrap ul').css({width:'1000%', marginLeft:0});
		});
		$('.right_arrow, .left_arrow').show();
		$(this).hide();
		$('.show_all').show();
		window.silde_flag=0;
		slide_check();
	});

	//캠페인 슬라이드 가림 레이어
	$('.camp_slide_wrap .img_wrap').after('<span class="like_after"></span>');

	//주요트렌드 이미지 온,오프, 스크롤링
	$('.trend_tab a').on('click',function(e){
		//e.preventDefault();
		var href_target = $(this).attr("href");
		var target_top = $(href_target).offset().top;
		console.log(target_top)
		$('html, body').animate({'scrollTop':target_top - 220},800,function(){
			//$('html, body').animate({scrollTop:target_top - 250},1000);
		});
		$(this).addClass('on').siblings().removeClass('on');
		$('.trend_tab a > img').each(function(){
			var img_off = $(this).attr('src').replace('_on','_off');
			$(this).attr('src',img_off);
		});
		var img_on = $(this).find('>img').attr('src').replace('_off','_on');
		$(this).find('>img').attr('src',img_on);
	});

	//이미지 온오프
	$('.onoff a')
		.bind('mouseenter focusin', function(){
		$(this).addClass('on');
		var img_name = $(this).attr("img_on");
		if( img_name ) {
			if($(this).find('>img').attr('src')){
				$(this).find('>img').attr('src',$(this).find('>img').attr('src').replace($(this).find('>img').attr('src'),img_name));
			}
		} else {
			if($(this).find('>img').attr('src')){
				$(this).find('>img').attr('src',$(this).find('>img').attr('src').replace('_off','_on'));
			}
		}
	});
	$('.onoff a')
		.bind('mouseleave focusout', function(){
		$(this).removeClass('on');
		var img_name = $(this).attr("img_off");
		if( img_name ) {
			if($(this).find('>img').attr('src')){
				$(this).find('>img').attr('src',$(this).find('>img').attr('src').replace($(this).find('>img').attr('src'),img_name));
			}
		} else {
			if($(this).find('>img').attr('src')){
				$(this).find('>img').attr('src',$(this).find('>img').attr('src').replace('_on','_off'));
			}
		}
	});

	//사업소개 메인
	/*$('.business_set dd').on('mouseenter', function(){
		$(this).find('.go').fadeIn();
		$(this).addClass('on');
	});

	$('.business_set dd').on('mouseleave', function(){
		$(this).find('.go').fadeOut();
		$(this).removeClass('on');
	});*/

	//공통 sns 공유 레이어팝업
	$('.sns_area ul li a:eq(3)').on('click',function(){
		$(this).parent().addClass('on');
		$(this).parent().parent().next().show();
	});
	$('.sns_layer a').on('click',function(){
		$(this).parent().hide();
		$('.sns_area ul li').removeClass('on');
	});
	//rss 레이어팝업
	$('a.rss').on('click',function(){
		$('.rss_layer').show();
	});
	$('.rss_layer a').on('click',function(){
		$('.rss_layer').hide();
	});

	//<a href="#none" 이벤트 중지
	$("a").on("click",function(event){
		if($(this).attr("href") == "#none"){
			event.preventDefault();
			//console.log('prevent');
		}

	});
});

//스크롤시 상단 로테이션영역 고정
function sub_fixmenu() {
	var $doc = $(document);
	if($doc.scrollTop() > 100){
		$('.location_wrap').addClass('fixed');
	} else{
		$('.location_wrap').removeClass('fixed');
	}
}

//한국해비타트_주요트렌드
function icon_fixmenu() {
	var $doc = $(document);
	if($doc.scrollTop() >= 300){
		$('.trend_tab').addClass('fixed');
		$('#trend1').css('margin-top','260px');
	} else{
		$('.trend_tab').removeClass('fixed');
		$('#trend1').css('margin-top','0px');
	}
}


//후원하기_후원방법안내
function backing_fixmenu() {
	var $doc = $(document);
	if($doc.scrollTop() >= 590){
		$('.way_to_backing .tab_3').addClass('fixed');
	} else{
		$('.way_to_backing .tab_3').removeClass('fixed');
	}
}

//후원하기_기업사회공헌소개_해외사업
function backing_fixmenu2() {
	var $doc = $(document);
	if($doc.scrollTop() >= 700){
		$('.global_business .tab_6').addClass('fixed');
		$('.global_business').css('margin-top','150px');
	} else{
		$('.global_business .tab_6').removeClass('fixed');
		$('.global_business').css('margin-top','0px');
	}
}


//로케이션 메뉴 넓이 구하기
function location_depth_width(div_class_name) {
	var max_width=45;
	var clone = $(div_class_name).clone().css({"visibility": "hidden", "display":"block", "position":"static"});
	$("body").append(clone);

	clone.find("ul").show().find("a").each(function(){
		if($(this).width() > max_width) {
	        max_width = $(this).width();
	    }
	});
	clone.remove();
	return max_width+45;
}


//봉사확인증 프린트
var init_body;
function before_print() {
     init_body = document.body.innerHTML;
     document.body.innerHTML = idPrint.innerHTML;
	 alert(idPrint.innerHTML);
}
function after_print() {
     document.body.innerHTML = init_body;
}
function print_area() { window.print(); }
window.onbefore_print = before_print;
window.onafter_print = after_print;


//캠페인 슬라이드 오른쪽 이벤트
function right_move(){
	var width_size = $('.camp_slide_wrap ul li').outerWidth(true);
	if(window.silde_flag>(-window.silde_length+3)){
		--window.silde_flag;
		$('.camp_slide_wrap ul').stop().animate({
			marginLeft:width_size*window.silde_flag
		});
	}
	slide_check();
}

//캠페인 슬라이드 왼쪽 이벤트
function left_move(){
	var width_size = $('.camp_slide_wrap ul li').outerWidth(true);
	if (window.silde_flag < 0) {
		++window.silde_flag;
		$('.camp_slide_wrap ul').stop().animate({
			marginLeft:width_size*window.silde_flag
		});
	}
	slide_check();
}

function slide_check(){
	window.silde_flag < 0 ? $('.left_arrow').addClass('on') : $('.left_arrow').removeClass('on');
	window.silde_flag>(-window.silde_length+3) ? $('.right_arrow').addClass('on') : $('.right_arrow').removeClass('on');
}


// 개발자 추가 :: 뉴스레터 처리 :: 2017-02-09 18:00:21
$(function(){
	// 뉴스레터 신청 폼
	$(document).delegate('.quickNewsLetter','click',function(){
		if(!$('.newsletterApply').html()){
			var subData = {};
			$.ajax({
				type: 'post',
				url: '/common/globals/newsletterApplyForm',
				data: subData,
				success: function(res) {
					console.log(' >>>> '+res);
					if(res){
						$('body').prepend(res);
						$('.layer_fix').show();
						$('.newsletterApply').show();
					}
				}
			});
		}else{
			$('.layer_fix').show();
			$('.newsletterApply').show();
		}
	});

	// 뉴스레터 신청 창닫기
	$(document).delegate('.newsletterApplyClose','click',function(){
		$('.layer_fix').hide();
		$('.newsletterApply').hide();
		$('.newsletterApply').remove();

	});


	//이메일 도메인 선택시
	$(document).delegate('select[name="newsletter_user_email_select"]','change', function(){
		if( $(this).val() == '#' ) {
			$('input[name="newsletter_user_email[2]"]').val('');
			$('input[name="newsletter_user_email[2]"]').prop('readonly', false);
			$('input[name="newsletter_user_email[2]"]').focus();
		}else{
			$('input[name="newsletter_user_email[2]"]').val($(this).val());
			$('input[name="newsletter_user_email[2]"]').prop('readonly', true);
		}
	});

	$(document).delegate('.newsletterApplyDo','click',function(){
		//뉴스레터 저장

		var subData = $("#main_form_newsletter").serialize();;
		$.ajax({
			type: 'post',
			url: https+'/common/globals/newsletterApplyDo',
			data: subData,
			dataType: 'json',
			success: function(res,status,response){
				console.log(response);

				if(res.status == '000') {
					console.log('ttt');
					$("#layer_request").css("display","none");
					$("#layer_finish").css("display","");
				}else{
					if(res.error_data){
						$.each(res.error_data,function(key, msg){
							if( $('#field_' + key).length ) {
								error_message($('#field_' + key), msg);
							}
						});
					}
				}//end of if()
			},
			error: function(res) {
				console.log(res.responseText);
				alert("죄송합니다. 저장에 실패 하였습니다.");
			}
		});

	});
});
