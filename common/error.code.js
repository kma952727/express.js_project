/**
 * 도메인을 의미합니다.
 * xx00 : domain
 * 
 * 00xx : common
 * 01xx : movie
 * 02xx : user
 * 99xx : unknown
 * 
 * 문제행위에 대한 정의입니다.
 * 00xx : category
 * 
 * xx01 : not found
 * xx02 : exists
 * xx99 : unknown
 * 
 */

module.exports = { 
    'NOT_FOUND_MOVIE' : '0101', // 존재하지 않는 movieId
    'NOT_FOUND_USER' : '0201', // 존재하지 않는 userId
    'EXISTS_USERNAME' : '0202', // 존재하는 users테이블의 username
    'HASH_FAILED': '0099', // 암호화 실패
    'UNKNOWN_ERROR' : '9999', // 핸들링 하지 못한 예외
}