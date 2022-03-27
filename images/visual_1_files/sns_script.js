/**
 * 파일명/프로그램명 : sns_script.php
 * 영문홈페이지 sns 연동 링크 처리 페이지 (공통)
 * @copyright 2015 해비타트
 * @author : 오범진
 * @소속 : FGI
 * @date : 2015-04-21
 */
function sns_go(sns_type,sns_post_url,sns_post_title) {
	sns_post_url = encodeURL(sns_post_url);
	sns_post_title = encodeURL(sns_post_title);
	if(sns_type == "f") {
		window.open('http://www.facebook.com/sharer.php?u=' + sns_post_url+'&t='+sns_post_title,'facebookSend','width=1000, height=580');
	} else if(sns_type == "t") {
		window.open('http://twitter.com/share?text='+ sns_post_title + '&url=' + sns_post_url,'twitterSend','width=400, height=350');
	}
}
function encodeURL(str){
	var s0, i, s, u;
	s0 = "";                // encoded str
	for (i = 0; i < str.length; i++){   // scan the source
		s = str.charAt(i);
		u = str.charCodeAt(i);          // get unicode of the char
		if (s == " "){s0 += "+";}       // SP should be converted to "+"
		else {
			if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){       // check for escape
				s0 = s0 + s;            // don't escape
			}
			else {                  // escape
				if ((u >= 0x0) && (u <= 0x7f)){     // single byte format
					s = "0"+u.toString(16);
					s0 += "%"+ s.substr(s.length-2);
				}
				else if (u > 0x1fffff){     // quaternary byte format (extended)
					s0 += "%" + (0xf0 + ((u & 0x1c0000) >> 18)).toString(16);
					s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
				else if (u > 0x7ff){        // triple byte format
					s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
				else {                      // double byte format
					s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
			}
		}
	} 
	return s0;
} 
function urllink(URL) {
	var IE = (document.all) ? true : false;
	
	if (IE) {
		window.clipboardData.setData('Text', URL);
	} else {
		temp = prompt("Trackback address is .Ctrl + C Press Copy to Clipboard", URL );
	}
	
}

