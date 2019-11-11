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

- 앱 기반 어플입니다.
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
- 사용자 주문 내역 페이지
- 카페 메뉴 및 배치도 가져와서 자리 설정 및 메뉴 선정 기능
- 결재 후 본인 자리 확인 및 잔여시간 확인 기능
- 잔여시간 30분 이전, 잔여시간 2시간 추가 기능
- 잔여시간 초과시 자동 자리 초기화

### admin
- 카페 내부 배치도 수정 기능
- 카페 메뉴 수정 기능
- 주문 내역 확인 및 주문 처리 완료 기능

## Skills
### Client-Side

- ES2015+
- React
- React Hooks
- React Router
- Redux
- Scss

### Server-Side

- Node.js
- Express
- ES2015+
- JSON Web Token Authentication
- MongoDB
- Mongoose
- Atlas


## Test

- PropTypes
- Reducer Unit Test (Jest)
- Component Unit Test (Jest, Enzyme)
- server Test (Jest)

## Deployment & Continuous Integration

### Client

- Netlify CI를 통한 배포 자동화

### Server
- AWS Elastic beanstalk를 통해 서비스 배포
- CircleCI를 통한 배포 자동화

## Project Control

- Git Branch 활용
- Trello 활용한 Task Management


## Challenges

- npm 모듈을 사용하지 않고 온전히 자바스크립트로 메뉴를 보여 줄때 쓰인 **트리 구조**, 자리를 선택하거나, 주인이 자리 배치를 수정할 때 쓰인 **드래그 앤 드롭**을 구현하는데 시간이 많이 걸렸습니다.

### 드래그 앤 드롭 구현
- `li` tag의 `onDragOver`, `onDrop`, `onDoubleClick` 속성을 중심으로 구현하였습니다.
- 카페 구조는 100개의 `li` tag로 구성되고, 각 `li`는 `data-id` 값으로 0부터 100까지의 숫자를 가집니다. 이 `data-id`를 활용하여 `getAttribute('data-id')`에 값이 있으면 changeSeat를 하였습니다.
- `onDragOver`는 `preventDefault()`만 사용하고, `li`를 변경해도 화면이 바뀌지 않도록 하였습니다.
- `onDrop`하면 위에서 말한 100개의 `li` 중 하나가 호출되며 그 `li`에 벽 또는 테이블이라는 속성이 들어갑니다.
- `onDoubleClick` 하면 `getAttribute('data-id')`값이 있을 경우 위에서 `onDrop`을 통해 얻은 벽 또는 테이블이라는 속성을 제거합니다.

### 트리구조 구현
- 부트스트랩을 쓰지 않고, `li` tag에 `className`을 함수를 통해 유동적으로 관리하면서 `open`, `close`로 state를 관리하였습니다.
- 트리구조의 list는
```{label : coffee, children : [{name : '아이스아메리카노, price : 3000}, ...]}``` 구조로 만들었고 세부내역으로 들어갈때 `children` 속성을 `this.state.list`에 넣어 세부내역이 보여지도록 하였습니다

기본 JavaScript에 더 집중했던 프로젝트였습니다.

## Things To Do

- n x n으로 자리 설정 기능
- 소셜로그인 기능
- 로컬 로그인 시 이메일 인증 후 회원가입
- server test



## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
