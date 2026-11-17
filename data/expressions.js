/* 하루세말 표현 데이터
   - release: 공개일(YYYY-MM-DD, 한국 시간). 이 날짜가 지나야 화면에 보인다.
   - 뜻·요령·예문은 모두 직접 작성한 것이다. 자료원의 풀이 문장을 옮기지 않는다. */
window.HSM_DATA = [
  {
    id: "2026-001",
    release: "2026-11-17",
    day: 1, order: 1,
    tag: "업무-공문",
    pair: ["결제", "결재"],
    question: "돈 낼 때 쓰는 건 어느 쪽일까요?",
    sides: [
      { word: "결제", hanja: "決濟", one: "돈을 내고 거래 끝!", tone: "warm",
        svg: '<svg viewBox="0 0 150 110"><rect x="20" y="28" width="90" height="58" rx="9" fill="#f6a623"/><rect x="20" y="40" width="90" height="10" fill="#c97d0c"/><rect x="30" y="62" width="26" height="12" rx="2" fill="#ffe08a"/><circle cx="122" cy="34" r="16" fill="#ffd34d" stroke="#c99a00" stroke-width="2"/><text x="122" y="40" font-size="16" text-anchor="middle" fill="#8a6500" font-weight="700">₩</text><path d="M112 72 l10 10 l18 -22" stroke="#2fa35a" stroke-width="6" fill="none" stroke-linecap="round"/></svg>' },
      { word: "결재", hanja: "決裁", one: "윗사람이 도장 쾅, 승인!", tone: "cool",
        svg: '<svg viewBox="0 0 150 110"><rect x="22" y="14" width="70" height="88" rx="6" fill="#fff" stroke="#9bb5a3" stroke-width="2"/><line x1="32" y1="32" x2="80" y2="32" stroke="#c8d6cc" stroke-width="4"/><line x1="32" y1="46" x2="80" y2="46" stroke="#c8d6cc" stroke-width="4"/><line x1="32" y1="60" x2="66" y2="60" stroke="#c8d6cc" stroke-width="4"/><circle cx="64" cy="82" r="13" fill="none" stroke="#d64545" stroke-width="3"/><text x="64" y="87" font-size="12" text-anchor="middle" fill="#d64545" font-weight="700">승인</text><rect x="104" y="22" width="22" height="34" rx="4" fill="#7a5230"/><rect x="98" y="54" width="34" height="12" rx="3" fill="#5a3a20"/></svg>' }
    ],
    tip: ["계산대에서 \"<b>제</b>가 낼게요!\" → <b>결제</b>", "부장님이 <b>재</b>판관처럼 도장 쾅! → <b>결재</b>"],
    examples: ["도메인 3년 치를 카드로 <mark>결제</mark>했다.", "출장 계획서는 팀장님 <mark>결재</mark>를 받아야 한다."],
    quiz: { q: "온라인 쇼핑몰에서 \"(　　) 수단을 선택하세요.\"", options: ["결제", "결재"], answer: "결제" },
    short: { q: "회사에서 휴가 신청서를 올리고 팀장님의 (　　)를 기다린다.", answers: ["결재"] },
    flash: { front: "돈을 치러 거래를 끝내다 / 윗사람이 안건을 승인하다", back: "결제 / 결재" },
    en: "결제 = payment (paying money) · 결재 = approval by a superior (e.g., a manager's sign-off)"
  },
  {
    id: "2026-002",
    release: "2026-11-17",
    day: 1, order: 2,
    tag: "일상-공통",
    pair: ["사흘", "나흘"],
    question: "'사흘'은 3일일까요, 4일일까요?",
    sides: [
      { word: "사흘", hanja: "", one: "세 날, 3일", tone: "warm",
        svg: '<svg viewBox="0 0 150 110"><rect x="15" y="20" width="120" height="78" rx="10" fill="#fff" stroke="#f0b35a" stroke-width="2"/><rect x="15" y="20" width="120" height="18" rx="9" fill="#f6a623"/><g font-size="15" font-weight="700" text-anchor="middle"><circle cx="38" cy="66" r="14" fill="#ffe2a8"/><text x="38" y="71" fill="#8a5a00">1</text><circle cx="75" cy="66" r="14" fill="#ffe2a8"/><text x="75" y="71" fill="#8a5a00">2</text><circle cx="112" cy="66" r="14" fill="#ffe2a8"/><text x="112" y="71" fill="#8a5a00">3</text></g></svg>' },
      { word: "나흘", hanja: "", one: "네 날, 4일", tone: "cool",
        svg: '<svg viewBox="0 0 150 110"><rect x="10" y="20" width="130" height="78" rx="10" fill="#fff" stroke="#8fbf9f" stroke-width="2"/><rect x="10" y="20" width="130" height="18" rx="9" fill="#4caf73"/><g font-size="14" font-weight="700" text-anchor="middle"><circle cx="31" cy="66" r="12" fill="#cfeedd"/><text x="31" y="71" fill="#1e6b3c">1</text><circle cx="60" cy="66" r="12" fill="#cfeedd"/><text x="60" y="71" fill="#1e6b3c">2</text><circle cx="89" cy="66" r="12" fill="#cfeedd"/><text x="89" y="71" fill="#1e6b3c">3</text><circle cx="118" cy="66" r="12" fill="#cfeedd"/><text x="118" y="71" fill="#1e6b3c">4</text></g></svg>' }
    ],
    tip: ["'사'를 숫자 4(四)로 착각하면 함정에 빠져요!", "<b>ㅅ</b>은 <b>셋</b>의 ㅅ → <b>사흘</b>, <b>ㄴ</b>은 <b>넷</b>의 ㄴ → <b>나흘</b>"],
    examples: ["월요일에 주문하면 <mark>사흘</mark> 뒤인 목요일에 도착합니다.", "이번 연휴는 목요일부터 일요일까지 <mark>나흘</mark>이다."],
    quiz: { q: "1일부터 3일까지 쉬면 모두 (　　) 쉰 것이다.", options: ["사흘", "나흘"], answer: "사흘" },
    short: { q: "하루, 이틀, 사흘, (　　), 닷새", answers: ["나흘"] },
    flash: { front: "세 날(3일) / 네 날(4일)", back: "사흘 / 나흘" },
    en: "사흘 = three days (not four!) · 나흘 = four days — native Korean day counting"
  },
  {
    id: "2026-003",
    release: "2026-11-17",
    day: 1, order: 3,
    tag: "일상-공통",
    pair: ["금일", "금요일"],
    question: "가게 문에 붙은 '금일 휴업', 언제 쉰다는 걸까요?",
    sides: [
      { word: "금일", hanja: "今日", one: "바로 오늘!", tone: "warm",
        svg: '<svg viewBox="0 0 150 110"><circle cx="75" cy="52" r="24" fill="#ffcf4a"/><g stroke="#f6a623" stroke-width="5" stroke-linecap="round"><line x1="75" y1="10" x2="75" y2="20"/><line x1="75" y1="84" x2="75" y2="94"/><line x1="33" y1="52" x2="43" y2="52"/><line x1="107" y1="52" x2="117" y2="52"/><line x1="45" y1="22" x2="52" y2="29"/><line x1="98" y1="75" x2="105" y2="82"/><line x1="105" y1="22" x2="98" y2="29"/><line x1="52" y1="75" x2="45" y2="82"/></g><text x="75" y="58" font-size="15" text-anchor="middle" font-weight="700" fill="#8a5a00">오늘</text></svg>' },
      { word: "금요일", hanja: "金曜日", one: "주말 바로 앞, 금요일", tone: "cool",
        svg: '<svg viewBox="0 0 150 110"><rect x="25" y="18" width="100" height="80" rx="10" fill="#fff" stroke="#8fbf9f" stroke-width="2"/><rect x="25" y="18" width="100" height="22" rx="10" fill="#4caf73"/><text x="75" y="34" font-size="13" text-anchor="middle" fill="#fff" font-weight="700">FRI</text><text x="75" y="80" font-size="30" text-anchor="middle" fill="#1e6b3c" font-weight="700">금</text></svg>' }
    ],
    tip: ["금일의 '금(今)'은 <b>금</b>방, <b>금</b>시초문, 지<b>금</b>의 '금' → 오늘!", "금요일의 '금(金)'은 쇠 금, 요일 이름일 뿐이에요."],
    examples: ["<mark>금일</mark> 오후 6시까지 서류를 제출해 주십시오.", "이번 주 <mark>금요일</mark>에 회식이 있다."],
    quiz: { q: "수요일 아침, 빵집 문에 '금일 휴업'이 붙어 있다. 쉬는 날은?", options: ["수요일", "금요일"], answer: "수요일" },
    short: { q: "'금일'을 쉬운 말로 바꾸면? (　　)", answers: ["오늘"] },
    flash: { front: "오늘(한자어) / 한 주의 다섯째 날", back: "금일 / 금요일" },
    en: "금일 = today (formal, Sino-Korean 今日) · 금요일 = Friday — a classic mix-up in notices"
  }
];
