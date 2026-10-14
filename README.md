# HEESUN YOUM · 염희선 감독 포트폴리오

블랙·차콜 배경과 절제된 보라색 포인트를 사용한 이미지 중심 포트폴리오입니다. HTML, CSS, JavaScript와 Node.js 기본 모듈만 사용합니다. 외부 패키지 설치나 빌드 없이 실행합니다.

## 로컬 실행

Node.js 22 이상이 설치된 환경에서 프로젝트 루트에서 실행합니다.

```sh
npm start
```

접속 주소: http://127.0.0.1:3000

`npm run dev`도 같은 서버를 실행합니다. 수정한 파일은 브라우저를 새로고침하면 반영됩니다. 종료는 `Ctrl+C`입니다. 이미 서버가 실행 중이면 다시 실행하지 않고 새로고침하세요.

다른 포트로 실행하려면 macOS/Linux에서 다음 명령을 사용합니다.

```sh
PORT=3001 npm start
```

서버는 `127.0.0.1`에 바인딩되며 `public/`의 파일만 제공합니다.

## 구조

```text
my-profile/
├── public/                    # Vercel 정적 배포 루트
│   ├── index.html             # Home, About, Projects, Contact
│   ├── styles.css             # 공통 디자인 (일반 CSS)
│   ├── responsive.css         # 화면 크기별 레이아웃
│   ├── script.js              # 메뉴, 필터, 영상 모달, 이메일
│   └── images/                # 실제 원본 사진·작품 이미지 및 웹용 이미지
├── images/                    # 사용자가 제공한 원본 (수정하지 않음)
├── scripts/server.mjs         # Node.js 로컬 서버 (기존 설정 유지)
├── stitch-export/             # 원본 Stitch 자료 (수정하지 않음)
├── backups/20261014-082336/    # 리디자인 전 사이트 백업
├── qa/                        # Chrome 검증 결과와 화면 캡처
├── package.json               # 기존 start/dev 스크립트 유지, 의존성 없음
├── vercel.json                # 기존 정적 배포 설정 유지
├── tailwind.config.cjs        # 이전 Stitch CSS 생성용 설정, 현재 사용하지 않음
└── README.md
```

현재 스타일은 일반 CSS로 작성되어 Tailwind 빌드가 필요하지 않습니다. 이전 Tailwind 설정으로 `styles.css`를 덮어쓰지 마세요. `backups/`와 `qa/`는 Git에서 제외되며 Vercel에 배포되지 않습니다.

## 반영된 콘텐츠

- **Home:** HEESUN YOUM / 염희선 / 감독, 제공한 소개와 전문 분야, 실제 프로필 사진, 실제 YouTube 썸네일을 사용한 16:9 DEMO REEL. 활동 통계는 제공한 값 그대로 4 / 11 / 2 / 2 / 1 / 51 / 15로 표시합니다. 응원 및 임의의 협업 상태를 제거했습니다.
- **About:** 연세대학교 언론홍보영상학부, AI융합심화, 심리학 부전공, UC Berkeley 교환학생(2025). 네 경력은 Berkeley Student Cooperative → Crazy Maple Studio (ReelShort) → 삼성물산 에버랜드 → CJ ENM 순으로 표시합니다. 전문 분야와 활동 분야를 구분했습니다.
- **Projects:** 네 감독 작품을 실제 포스터·스틸컷과 함께 표시합니다. 제공한 유형, 장르, 역할만 사용하며 줄거리·수상·상영 이력은 추가하지 않았습니다. 데스크톱 2×2, 모바일 1열 레이아웃과 작품 유형 필터를 제공합니다.
- **Contact:** `heesunnyday@yonsei.ac.kr`, 이메일 복사, 실제 LinkedIn 링크만 남겼습니다. Quick Message는 입력한 이름·회신 이메일·문의 내용을 기본 메일 작성창에 채웁니다. 사이트에서 전송했다고 표시하지 않습니다.

## 실제 이미지

원본은 `images/`에 그대로 남아 있으며, 파일명을 NFC 한글로 정리한 사본과 웹용 파일을 `public/images/`에 보관했습니다. 웹용 JPEG는 비율을 유지하면서 크기와 용량을 줄였습니다.

| 용도 | 제공된 원본 | 페이지에 사용한 파일 |
| --- | --- | --- |
| 프로필 | 염희선_프로필.JPG | heesun-youm.jpg |
| 마르지 않는 익사 | 마르지 않는 익사 - 포스터.jpg | never-drying-drowning.jpg |
| From. YOUR World | From. 스틸.png | from-your-world.png |
| 사랑의 형상 | [최종] 사랑의형상포스터-05.png | shape-of-love.jpg |
| 미쓰블루베리 | 미쓰블루베리 포스터 기본.png | miss-blueberry.jpg |
| DEMO REEL | YouTube 영상의 실제 썸네일 | demo-reel.jpg |

프로필은 2:3 원본 비율을 유지합니다. 작품은 동일한 2:3 이미지 영역 안에서 `object-fit: contain`으로 제목과 이미지가 잘리지 않도록 표시합니다. From. 스틸은 원본이 240×259px이므로 고해상도 버전을 제공하면 선명도를 높일 수 있습니다. DEMO REEL 썸네일 로드 실패 시 `demo-reel-fallback.svg`를 표시하며 실제 영상 링크는 계속 작동합니다. 대체 커버는 다른 작품 이미지를 재사용하지 않습니다.

## 영상 링크 추가 및 변경

`public/index.html`의 각 `.work-card`에 있는 `data-trailer-url`이 작품별 trailerUrl 설정입니다.

- 마르지 않는 익사: 비어 있음 (버튼 없음)
- From. YOUR World: 비어 있음 (버튼 없음)
- 사랑의 형상: https://youtu.be/22DeqGTzDao?si=0AKtF9sRCijXVHJI
- 미쓰블루베리: https://youtu.be/Tk2UYBgotnk?si=Q1Yz783VWwgDyqCy

유효한 YouTube URL을 설정하면 JavaScript가 예고편 버튼을 구성합니다. 빈 URL에는 버튼을 노출하지 않습니다. 기존 버튼이 있는 작품의 링크를 바꾸면 HTML의 `href`도 함께 갱신해 JavaScript가 꺼진 환경에서도 같은 영상으로 연결되도록 하세요. 새 작품에 버튼을 추가할 때도 실제 URL이 있을 때만 `.work-actions`에 링크를 넣으세요.

예고편은 16:9 모달에서 재생하며 닫기 버튼, ESC, 바깥 영역 클릭으로 종료합니다. 모달을 닫으면 iframe을 제거해 재생을 중단하고 원래 링크로 포커스를 돌립니다. YouTube가 임베딩을 제한하거나 영상 재생이 실패하면 모달의 YouTube 직접 링크를 사용하세요. JavaScript 또는 dialog 지원이 없는 환경에서는 제공한 YouTube 링크가 새 탭으로 열립니다.

DEMO REEL: https://www.youtube.com/watch?v=r8tTLb-_N-Y

추가 정보가 있으면 첫 두 작품의 예고편 URL, 고해상도 From. 스틸, 실제 작품 소개·상영·수상 정보를 반영할 수 있습니다. 제공되지 않은 내용은 표시하지 않았습니다.

## 이메일 및 외부 링크

메일 작성과 복사는 `#contact-email`의 `mailto:` 주소를 사용합니다. 이메일을 변경할 때 폼의 `action`도 함께 변경하세요. 복사 성공을 안내하며 권한이 없거나 Clipboard API를 사용할 수 없으면 주소를 선택하고 수동 복사를 안내합니다.

Quick Message는 백엔드 전송 기능을 사용하지 않습니다. 메일 앱이 설치·설정되어 있어야 하며, 열리는 작성창에서 직접 전송해야 합니다. 입력값은 폼에 남겨 둡니다.

외부 프로필은 `.social-links` 안에 실제 링크만 추가합니다. 현재 LinkedIn 주소:
https://www.linkedin.com/in/heesunyoum-various-director/

## Vercel 정적 배포

프로젝트를 Git 저장소에 올린 뒤 Vercel에서 가져옵니다. Root Directory는 프로젝트 루트로 지정합니다. 기존 `vercel.json`은 다음 설정을 유지합니다.

- Framework Preset: Other (`framework: null`)
- Output Directory: `public`
- Build Command / Install Command: 비어 있음

Vercel에서는 로컬 서버를 실행하지 않고 `public/`을 그대로 배포합니다. 사진, 포스터, 썸네일과 SVG 아이콘은 사이트에 포함되며, 실제 YouTube 재생 및 LinkedIn 접속에는 인터넷 연결이 필요합니다. 실제 배포는 수행하지 않았습니다.

## 검증 및 남은 확인

설치된 Chrome을 헤드리스로 실행해 1440×1000, 1280×800, 768×1024, 390×844, 320×780 화면을 검사했습니다.

- 가로 넘침 없음, 모든 로컬 이미지 로드 성공
- 상단·하단 메뉴의 섹션 이동, 헤더 가림 없음, 활성 메뉴 표시
- 작품 필터 전체 4 / 영화 3 / 다큐멘터리 X 아트필름 1
- 두 실제 예고편의 모달 생성, ESC·닫기, iframe 제거, 포커스 복귀
- 썸네일 대체 처리, 키보드 Tab 이동
- 이메일 복사 성공 및 권한/기능 제한 시 수동 복사 안내
- 폼 필수 입력 검증, JavaScript 오류 없음
- 페이지, CSS, JavaScript 및 실제 이미지 모두 HTTP 200
- 원본 사이트 파일 백업, 제공된 이미지 원본 보존, 서버·package.json·vercel.json 유지

세부 결과는 `qa/report.json`, 화면은 `qa/*.png`에 있습니다. 실제 YouTube 영상 재생 완료와 기기의 기본 메일 앱 실행·메일 발송은 자동 검증하지 않았습니다. 외부 페이지 내용을 읽는 도구는 YouTube 응답 및 LinkedIn robots 접근 제한으로 직접 확인하지 못했으며, 사용자 제공 주소를 그대로 사용했습니다. Vercel 배포 후 재생 및 메일 앱 연결을 마지막으로 확인하세요.

## 추가 점검 및 모바일 보완

메뉴 대상, SVG 아이콘 참조, 이미지·CSS·JavaScript 경로를 다시 검사했고 누락은 없었습니다. Chrome에서 320~1440px 범위의 13개 화면 크기를 점검했습니다. 메뉴 이동, 활성 표시, 작품 필터, 예고편 모달, 이메일 복사와 모든 로컬 이미지 로드를 확인했습니다.

`public/responsive.css`에서 모바일 입력창을 16px로 설정해 iPhone의 입력 시 자동 확대를 방지하고, 상·하단 안전 영역 및 고정 하단 메뉴를 고려한 스크롤 여백과 푸터 여백을 추가했습니다. 디자인과 콘텐츠는 유지했습니다. 변경 후 320·390·600·767·768px에서 재검사해 Tab으로 이동한 폼 버튼이 하단 메뉴에 가려지지 않는 것을 확인했습니다.

변경 전 백업: `backups/20261014-101814/`. 전체 점검은 `qa/full-audit-report.json`, 수정 후 검증은 `qa/report.json`을 참고하세요. 실제 iPhone Safari, 외부 영상 재생 완료, 기기의 메일 앱 실행·발송은 별도로 확인해야 합니다.
