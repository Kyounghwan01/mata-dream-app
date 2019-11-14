# MATA-DEREAM!

## Intorduction

- **MATA-DEREAM** 은 한강 공원에 자리 잡은 사람에게 그 자리를 구매하는 가상 앱입니다.
- react-native, expo를 사용하여 앱을 구현하였습니다.

<!-- <img height="500" alt="example" src="./runmate.gif"> -->

## Content

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Features](#Features)
- [Skills](#Skills)
- [Test](#Test)
- [Deployment & Continuous Integration](#Deployment-&-Continuous-Integration)
- [Project Control](#Project-Control)
- [Challenges](#Challenges)
- [Things To Do](#Things-To-Do)
- [Sincere Thanks](#Sincere-Thanks)

## Requirements

- 모바일 앱 어플입니다.
- 웹으로 구동하시려면 Xcode, simulator가 설치 되있어야합니다
- 모바일 위치 서비스를 켜시고 시작하여야 앱에서 위치 정보를 읽을 수 있습니다.

## Installation

```javascript
git clone https://github.com/Kyounghwan01/mata-dream-server.git
cd mataDream-server
yarn install
yarn ios or yarn start

git clone https://github.com/Kyounghwan01/mata-dream-app.git
cd mataDream-app
yarn install
yarn start

```

## Features

- Facebook login
- JSON Web Token Authentication
- 로그아웃
- 공원 리스트 페이지
- 공원 별 자리 판매 위치 확인
- 사진 저장, 카메라, 앨범 접근
- 공원 별 자리 등록, 삭제 기능
- 실시간 채팅, 교환 기능

## Skills
### Client-Side

- ES2015+
- react-native
- react-navigation
- Expo

### Server-Side

- Node.js
- Express
- ES2015+
- JSON Web Token Authentication
- MongoDB
- Mongoose
- Atlas


## Test

- Reducer Unit Test (Jest)
- Component Unit Test (Jest, Enzyme)

## Deployment & Continuous Integration

### Client

- Google Play Store 배포

### Server
- AWS Elastic beanstalk를 통해 서비스 배포
- CircleCI를 통한 배포 자동화

## Project Control

- Git Branch 활용
- Trello 활용한 Task Management


## Challenges

### react-native 특징 파악
- `react-navigation`

### 실시간 채팅, 정보 교환
- `socket.io`를 이용하여 상대방과 채팅하였습니다.
- 상대방의 행동에 따라 실시간으로 다른 반응 도출
  - 교환 수락시, 본인에게 대기 이벤트, 상대방에게는 상대방이 교환 수락 알림 이벤트
  - 교환 거부시, 상대방에게 거부 이벤트
  - 판매자 채팅방에 구매자 1 접근시, 실시간으로 구매자 2 접근 못하도록 이벤트
- AWS에 서버를 배포한 이후에는 실시간 기능이 매우 느려졌습니다 (local 서버가 1초라면 배포 서버는 5초 정도)

### 코드 재사용, 모듈화
- 최대한 재사용 가능한 코드를 만들도록 하였습니다 (마감기한에 다가옴에 따라 뒤로 갈수록 지키지 못함)

### AWS S3 자료 저장 및 삭제


## Things To Do

- react-native e2e test
  - react-native의 경우 `expo build:ios`를 통해 `.ipa`파일이 있어야 `detox`를 통해 e2e 테스트를 실행가능한데, 빌드를 하려면 apple 라이센스를 구입해야 빌드가 가능해서, 중지하였습니다. 라이센스 구매 할일이 생기면 꼭 e2e테스트를 해보고 싶습니다.
- 좀 더 디테일 한 `socket.io` 활용
  - 마감에 쫒겨서 socket 코드가 너무 모듈화되지 않았습니다.
- 채팅 전송시 알람 기능



## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
