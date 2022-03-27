"use strict";



$(function(){

    //페이징 클래스 설정

    $('.paging .paging_body>a:eq(0)').addClass('firstchild');

    $('.paging .paging_body span a:first-child').addClass('firstchild');



    //입력시 에러메시지 감추기

    $(document).on('keypress keydown change', 'input, select, textarea', function(){

        info_message_clear($(this));

    });

    

    $("#user_email1, #user_email2, #user_email3, #user_email4,#hanno1,#hanno2").css("ime-mode", "disabled"); //이메일 필드 한글 제한

	$("#user_email1, #user_email2, #user_email3, #user_email4").keyup(function(){

		$(this).val( $(this).val().replace(/[^\!-z]/gi,"") );

	});
	
	$("#hanno1,#hanno2").keyup(function(){

		//$(this).val( $(this).val().replace(/[^\!-z ]/gi,"") );

	});

	$("#numberonly1,#numberonly2,#numberonly3,#numberonly4").keyup(function(){  //숫자만 입력

		$(this).val( $(this).val().replace(/[^0-9]/g,"") );

	});

    //레이어팝업

    /*

    $(document).on('click', '.layer', function(){

        $('body').append('<div class="layer_fix" /><div id="layer_pop" class="layer_pop"></div>');



        var url = $(this).attr("data-url");



        if( url ) {

            //페이지 로딩

            $('#layer_pop').load(url, function() {

                var layer_height = $('.layer_pop .layer_pop_wrap').height();

                var layer_width = $('.layer_pop .layer_pop_wrap').width();

                $(this).css({'width':layer_width});

                $('.layer_pop').css({'margin-top': -(layer_height / 2), 'margin-left': -(layer_width / 2)});

            });

        }

        else {

            var layer_height = $('.layer_pop').height();

            var layer_width = $('.layer_pop').width();

            $('.layer_pop').css({'margin-top': -(layer_height / 2), 'margin-left': -(layer_width / 2)});

        }



        $('.layer_pop').fadeIn();

    });



    //레이어팝업 닫기

    $(document).on('click', '.layer_pop .close, .instance_layer .close', function(){

        $('.layer_pop, .instance_layer, .instance_wrap > button').fadeOut();

        $('.layer_pop').remove();

        $('.layer_fix').remove();

    });

    */

    

});//end of function()



/**

 * 메시지 알림 지우기

 */

function info_message_clear(obj) {

	if( !$(obj).length ) {

		return false;

	}

	$(obj).next('.info_message_red').remove();

	$(obj).removeClass('fl mgr10');

	$(obj).parent('div').next('.info_message_red').remove();

	$(obj).parent('div').removeClass('fl mgr10');

	$("#field_all").next('.info_message_red').remove();

	$("#field_all_1").next('.info_message_red').remove();

	$("#field_all_2").next('.info_message_red').remove();

	$("#field_all_3").next('.info_message_red').remove();

	$("#field_all_4").next('.info_message_red').remove();

}//end of info_message_clear()



/**

 * 전체 메시지 알림 지우기

 */

function info_message_all_clear() {

	$('.info_message_red').remove();

	$('.info_message_red').prev().removeClass('fl mgr10');

	$('.info_message_red').parent().removeClass('fl mgr10');

}//end of info_message_all_clear()



/**

 * 폼 검증 오류 메시지 출력

 * obj  => 체크할 객체

 * msg  => 메시지

 */

function error_message(obj, msg) {

    if( !$(obj).length ) {

        return false;

    }



    var inline = $(obj).hasClass('info_inline');

    var obj_tag = $(obj).get(0).tagName;



    $(obj).removeClass('fl mgr10');



    var tag = 'p';



    //같은 라인에 출력일때

    if( inline  ) {

        tag = 'span';

        $(obj).addClass('fl mgr10');



        if( obj_tag == 'INPUT' || obj_tag == 'SELECT' || obj_tag == 'TEXTAREA' ) {

            $(obj).css({'display':'inline'});

        }

    }

    else {

        if( obj_tag == 'INPUT' || obj_tag == 'SELECT' || obj_tag == 'TEXTAREA' ) {

            $(obj).css({'display':'block'});

        }

    }



    $(obj).next('.info_message_red').remove();

    $(obj).after('<' + tag + ' class="info_message_red">' + msg + '</' + tag + '>');

}//end of error_message()



/**

 * select 선택값 체크

 * obj      => 체크할 객체

 * ckVal    => 선택값

 */

function selected_check(obj, ckVal){



    if( typeof(obj) != 'undefined' && typeof(obj) != null ){



        $(obj).find('option').each(function(){



            if( $(this).val() == ckVal ){

                $(this).attr('selected', 'selected');

                return true;

            }



        });



    }//end of if()



    return false;



} //end of selected_check()



/**

 * 라디오버튼 선택값 체크

 * obj      => 체크할 객체

 * ckVal    => 선택값

 * */

function input_radio_check(obj, ckVal){



    if( typeof(obj) != 'undefined' && typeof(obj) != null ){



        $(obj).each(function(){



            if( $(this).val() == ckVal ){

                $(this).attr('checked', 'checked');

                return true;

            }



        });



    }//end of if()



    return false;



} //end of input_radio_check()





/**

 * 체크박스 선택값 체크

 * obj      => 체크할 객체

 * ckVal    => 체크여부

 * */

function input_checkbox_check(obj, ckVal){



    if( typeof(obj) != 'undefined' && typeof(obj) != null ){



        if( obj && ckVal ){

            obj.attr('checked', 'checked');

            return true;

        }



    }//end of if()



    return false;



} //end of input_checkbox_check()



/**

 * json => array (1차원)

 * */

function json2array(json){



    var result = [];

    var keys = Object.keys(json);

    keys.forEach(function(key){

        result.push(json[key]);

    });

    return result;



}//end of json2array()



/**

 * 레이어 alert

 * text_id : 텍스트 영역 아이디

 * text_msg : 경고 메세지

 * */

function popup_massage(text_id,text_msg) {

	

	$("#popup_massage").css("display","");

	$("#"+text_id).html(text_msg);



}



/**

 * 페이징 클래스 설정

 */

function set_paging_class() {

    $('.paging .paging_body span a:first-child').addClass('firstchild');

    $('.paging .paging_body>a:eq(0)').addClass('firstchild');

}//end of set_paging_class()



/**

 * 텍스트로 된 배열의 인덱스 추출 (a[1] => 1)

 */

function get_index_from_name(str, pos) {

    if( !str ) {

        return false;

    }

    if( !pos ) {

        pos = 1;

    }



    return str.split('[').slice(pos)[0].toString().replace(']', '');

}//end of get_index_from_name()









function _base64_encode(v){

	v = base64_encode(v);

	v = str_replace('+', '-', v);

	v = str_replace('/', '_', v);

	v = str_replace('=', '.', v);

	return v;

}





function _back(){

	history.go(-1);

}





function _move(url){

	if(url)	location.href=url;

	else	location.href="/";

}





function _reload(){

	location.reload();

}



/**

 * 텍스트 박스 글자수 제한

 */

function limitCharacters(textid, limit, limitid)

{

	// 잆력 값 저장

	var str = $('#'+textid).val();

	// 입력값 길이 저장

	var textlength = str.length;

	if(textlength > limit)

	{

		$('#' + limitid).html(limit);

		// 제한 글자 길이만큼 값 재 저장

		alert('글자 입력수가 초과하였습니다.');

		$('#'+textid).val(str.substr(0,limit));

		return false;

	} else {

		$('#' + limitid).html((0 + textlength));

		return true;

	}

}



function numbersonly(e, decimal) {

    var key;

    var keychar;



    if (window.event) {

        key = window.event.keyCode;

    } else if (e) {

        key = e.which;

    } else {

        return true;

    }

    keychar = String.fromCharCode(key);



    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13)

            || (key == 27)) {

        return true;

    } else if ((("0123456789").indexOf(keychar) > -1)) {

        return true;

    } else if (decimal && (keychar == ",")) {

        return true;

    } else

        return false;

}


/**
 * 페이징 클래스 설정
 */
function set_paging_class() {
    $('.paging .paging_body span a:first-child').addClass('firstchild');
    $('.paging .paging_body>a:eq(0)').addClass('firstchild');
}//end of set_paging_class()