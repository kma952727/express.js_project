# Express.js Portfolio

Node.js 환경에서 Express.js 모듈을 활용한 영화정보제공 API Server

# 사용 방법

1. git clone https://github.com/kma952727/express.js_project.git
2. npm install
3. npm run dev


# 사용 기술

0. JS ( No Type Script )
1. Node
2. Express
3. Mysql2
4. Passport & JWT ( Authentication )
6. AWS & Jenkins ( Deploy )

# 개발, 배포 구성
### 어떻게 배포를 할까?   
<img width="867" alt="스크린샷 2022-06-02 오전 1 28 56" src="https://user-images.githubusercontent.com/80996897/171454268-d07c8556-ce9c-4067-be6e-31e4043d697b.png">

Local, Prod 2가지 환경으로 구분합니다.  
기능 개발 후 Main Branch에 통합합니다. 그후 사용에 문제가 없으면 deploy Branch 넘긴 후  
AWS EC2의 Jenkins에서 build를 하면 새로운 버전의 app이 배포됩니다.  
### 서비스가 어떤 구조일까?   
<img width="676" alt="스크린샷 2022-06-02 오전 7 11 19" src="https://user-images.githubusercontent.com/80996897/171510392-58d28151-7775-4f71-9b85-46ca3008749e.png">
  
app.js : allowed Http Method, CORS, Log, verify authToken, 라우팅 분기등... 서비스의 모든로직에 공통적으로 필요한 부분을 담당합니다.  
Route Layer : 서비스 레이어로 데이터를 패스해줍니다.   
Service Layer : 실제 비즈니스 로직이 작성되며 필요한 데이터를 Model Layer에 요청합니다.   
Model Layer : Service Layer의 요청을 받고 DB와 통신하여 데이터를 넘겨줍니다.   
   
# api.  



1. login  
* "/" 
  * POST :  
    * desc : 로그인 기능 제공 
2. users 
* "/" 
  * GET :    
    * desc : 사용자 단건 조회 
  * POST : 
    * desc : 사용자 1건 생성 ( 회원가입 기능 ) 
  * PUT : 
    * desc : 사용자 정보 수정 
  
3. movies 
* "/" 
  * GET :   
    * desc : 영화리스트 조회  
    * reuqest_data : page (Query_string). 
* "/:id" 
  * GET : 
    * desc : 영화 단건 조회 
  * DELETE : 
    * desc : 영화 단건 삭제 
  
4. movie-carts  
  4-1. items 
    * "/" 
      * GET :   
        * desc : 장바구니 1건 조회 
      * POST :   
        * desc : 장바구니에 영화 1건 추가 
    * "/:id" 
      * DELETE :   
        * desc : 장바구니에서 영화 1건 삭제 
        
기본적으로 httpStatus는   
POST, DELETE는 201, GET는 200,   
에러에 관해서는 없는 데이터 404, 충돌 409 정도로만 기본 골자로 가지며    
추가적인 에러코드로만 구성하였습니다.   
   
<img width="642" alt="스크린샷 2022-06-02 오전 8 16 09" src="https://user-images.githubusercontent.com/80996897/171516781-d7d60b80-184e-4b21-83dc-dad1a9a8cb51.png">


 
# 추가 사항  
config가 노출되어 AWS의 서비스를 테스트, 개발기간이 끝나면 AWS EC2, RDS를 삭제합니다.   

### TODO
1. Java Script -> Type Script 마이그레이션
2. Error Handling 보강 필요
3. log 기능 추가 필요
4. AWS RDS를 EC2 VPC의 Private Subnet으로 관리하기
5. main -> deploy PR로 Jenkins 빌드유발 적용하기
6. config file ignore 적용

### 힘든 점  
1. 동적언어여서 IDE의 도움을 받기가 힘들다. 런타임에러를 추측하기가 어려웠다.
2. Java만 사용하다 처음으로 사용해본 언어여서 어색했다. 클래스개념을 제외하고 만드는게 어색함.. 

### 아쉬운 점 
CS의 부족함을 많이 느끼면서 기반이 없이 TODO List를 처리하면서 개발하는게 무의미하다 생각이 들어  
프로젝트 진행은 잠시 중단하고 네트워크, DB, CS등을 먼저. 공부하기로 마음 먹었습니다.     
