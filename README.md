> [리팩토링 관련 레포지토리입니다. 프로젝트의 전반적인 내용에 대한 설명이 궁금하시면 여기를 클릭해주세요!](https://github.com/devyouth94/gomgom)

# 리팩토링 내용 및 과정

- 기존의 레거시 코드의 유지보수성 향상을 위해 리팩토링 진행하였습니다.

## 1차

1. 디렉토리 구조 변경
   - 기존에 기능 단위로 묶여 있던 디렉토리를 도메인 단위로 구조를 변경했습니다.
   - 프로젝트 구조가 복잡해지면서 원하는 컴포넌트 파일과 훅스 파일을 한번에 찾기가 어려운 느낌이 들었습니다. 이를 해소하고자 같은 도메인을 공유하는 페이지, 컴포넌트, 훅스를 한 폴더에서 관리하고자 했습니다.
2. 스타일드 컴포넌트 객체로 묶어서 관리
   - 기존에 따로 변수로 만들던 스타일을 `S` 라는 객체로 묶어 관리합니다.
   - 한 눈에 보기 편하게 하기 위함이고, 객체로 접근하여 자동완성 기능을 사용하고자 했습니다.
3. 컴포넌트 분리 및 중복되는 코드 줄이기
   - 기존의 하나의 파일에서 여러가지 코드가 섞여있는 방대한 파일이 가독성이 떨어진다고 판단하여 컴포넌트를 분리시켰습니다.
   - 마이페이지에 무분별하게 중복되는 코드와 이외의 중복 코드들은 최대한 줄이는 방식으로 작업했습니다.
4. 커스텀 훅 적극적으로 사용
   - 재사용이 가능한 코드 이외에도 컴포넌트 코드의 분리를 위해서도 커스텀 훅을 적절하게 사용하였습니다.

## 2차

1. 타입스크립트 적용
   - 기존에 자바스크립트로 작성된 코드들을 타입스크립트로 마이그레이션 진행하였습니다.
   - 중요한 컴포넌트 및 파일은 99% 마이그레이션 완료하였습니다.

## 추후

1. 타입스크립트 any, as 사용한 코드 줄이기
2. React-Query 로 마이그레이션하기
3. Next.js 로 마이그레이션하기
