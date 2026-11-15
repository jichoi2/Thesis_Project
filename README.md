# Thesis_Project

AI Research Manuscript Lab

연구 초록, 키워드 및 원시 데이터(그래프/이미지 포함)를 입력하면 학술 분야와 저널 포맷에 맞춰 여러 LLM(ChatGPT-4o, Gemini 2.5 Pro, Claude Sonnet 4.6)의 논문 원고 초안을 동시에 생성·비교하고 최종 원고를 출력할 수 있는 웹 인터페이스입니다.

주요 기능

연구 메타데이터 설정 (Step 1)

Archive Category: cs.AI, cs.LG, bio.MN, quant-ph, eess.SP, stat.ML, math.CO, physics.soc-ph 등 8개 학술 카테고리 선택

Format Standard: IEEE Standard, Nature Portfolio, ACM Transactions, ArXiv Preprint 포맷 지원

Primary Language: 영어(US/UK), 한국어, 중국어, 일본어 등 5개 언어 지원

데이터 입력 및 보조 자료 첨부: 최대 4,000자 텍스트 입력(실시간 글자 수 카운터 제공) 및 5MB 이하 그래프/이미지 데이터 미리보기 업로드

다중 AI 모델 결과 비교 (Step 2)

ChatGPT-4o, Gemini 2.5 Pro, Claude Sonnet 4.6 3개 모델의 생성 결과를 3단 카드 레이아웃으로 나란히 비교 후 최적의 초안 선택

최종 원고 뷰어 및 내보내기 (Step 3)

학술 논문 스타일(Times New Roman, 인쇄 최적화 레이아웃)로 최종 결과물 확인

DOWNLOAD PDF: 브라우저 인쇄 기능을 활용한 원고 전용 PDF 저장 (@media print 스타일 적용)

COPY TO CLIPBOARD: 원클릭 클립보드 복사 (HTTPS 및 비보안 환경 폴백 지원)

NEW PROJECT: 초기 상태로 리셋하여 새 프로젝트 시작

프로젝트 구조

Project/
├── assets/          # 정적 리소스 폴더
├── src/
│   ├── index.html   # 3단계(설정 - 비교 - 출력) SPA 구조 메인 HTML
│   └── style.css    # 다크 사이드바, 반응형 그리드 및 인쇄(@media print) 스타일시트
├── script.js        # 단계 전환, 이미지 미리보기, 모델 응답 처리 및 클립보드/PDF 유틸리티
└── README.md        # 프로젝트 문서


실행 방법

별도의 빌드 도구나 프레임워크 의존성이 없는 순수 HTML/CSS/JavaScript 기반 프로젝트입니다.

저장소를 클론합니다.

git clone https://github.com/jichoi2/Thesis_Project.git
cd Thesis_Project


로컬 웹 서버로 실행합니다.

python3 -m http.server 8000


브라우저에서 http://localhost:8000/src/index.html로 접속합니다.

백엔드 API 연동 안내

현재 script.js의 processSearch() 함수는 프론트엔드 UI 테스트를 위한 시뮬레이션(Mock) 응답을 반환하도록 구성되어 있습니다. 실제 LLM API를 연동하려면 script.js의 아래 부분을 백엔드 엔드포인트(fetch)로 교체하세요.

// script.js -> processSearch() 내부
const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, type, format, lang })
});
const data = await response.json();
manuscriptData.GPT = data.gpt;
manuscriptData.Gemini = data.gemini;
manuscriptData.Claude = data.claude;


기술 스택

Frontend: HTML5, CSS3 (Flexbox, CSS Variables, Responsive Media Queries, Print Media Query), Vanilla JavaScript (ES6+)
