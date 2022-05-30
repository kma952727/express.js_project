/**
 * 문제 도메인을 의미합니다.
 * xx00 : domain
 * 
 * 00xx : common
 * 01xx : movie
 * 02xx : user
 * 96xx : method
 * 97xx : jwt token
 * 98xx : request data
 * 99xx : unknown
 * 
 * 문제 도메인의 추가 설명입니다.
 * xxxx01 : username
 * xxxx02 : mail
 * 
 * 문제 행위에 대한 정의입니다.
 * 00xx : category
 * 
 * xx01 : not found
 * xx02 : exists
 * xx03 : invalid request
 * xx97 : expired
 * xx98 : failed decoded
 * xx99 : unknown
 * 
 */

module.exports = { 
    'NOT_FOUND_MOVIE' : '010100', // 존재하지 않는 movieId
    'NOT_FOUND_USER' : '020100', // 존재하지 않는 userId
    'EXISTS_USERNAME' : '020201', // 존재하는 users테이블의 username
    'EXISTS_MAIL' : '020202', // 존재하는 users테이블의 mail
    'HASH_FAILED': '009900', // 암호화 실패
    'TOKEN_EXPIRED': '979700', // 토큰 + 만료기간 
    'INVALID_METHOD' : '960300', // 잘못된 http method
    'DECODED_TOKEN_FAILED': '979800', // 로그인 토큰 유효성 검사 실패
    'GENERATE_TOKEN_FAILED': '979900', // 로그인 토큰 생성 실패
    'INVALID_REQUEST_DATA' : '980300', // 유효하지 않는 요청데이터
    'UNKNOWN_ERROR' : '999900', // 핸들링 하지 못한 예외
}