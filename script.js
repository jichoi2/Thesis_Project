/**
 * Global Data Storage
 */
let manuscriptData = {
    GPT: "",
    Gemini: "",
    Claude: ""
};

let isProcessing = false;

/**
 * 글자수 카운터
 */
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('userInput');
    const counter = document.getElementById('charCount');
    if (textarea && counter) {
        textarea.addEventListener('input', () => {
            counter.textContent = `${textarea.value.length} / 4000`;
        });
    }
});

/**
 * Handle Image Preview
 */
function handleImagePreview(input) {
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];

    // 용량 제한: 5MB
    if (file.size > 5 * 1024 * 1024) {
        alert("Image too large. Please upload an image under 5MB.");
        input.value = "";
        return;
    }

    const container = document.getElementById('previewContainer');
    const preview = document.getElementById('imgPreview');

    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        container.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

/**
 * Step 이동 (뒤로가기)
 */
function goBack(toStep) {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';

    if (toStep === 1) {
        document.getElementById('step1').style.display = 'flex';
    } else if (toStep === 2) {
        document.getElementById('step2').style.display = 'flex';
        document.getElementById('step2').style.flexDirection = 'column';
    }
}

/**
 * Step 1 -> Step 2
 */
async function processSearch() {
    if (isProcessing) return;

    const content = document.getElementById('userInput').value;
    const type = document.getElementById('typeSelect').value;
    const format = document.getElementById('formatSelect').value;
    const lang = document.getElementById('langSelect').value;

    if (!content.trim()) {
        alert("Please enter research content.");
        return;
    }

    // 버튼 비활성화
    isProcessing = true;
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.textContent = 'GENERATING...';

    // 화면 전환
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'flex';
    document.getElementById('step2').style.flexDirection = 'column';

    // 로딩 표시
    ['gpt-res', 'gemini-res', 'claude-res'].forEach(id => {
        document.getElementById(id).textContent = 'Generating...';
    });

    try {
        // 백엔드 연동 전 임시 데이터
        // 실제 API 연동 시 아래 블록을 fetch('/api/generate', {...}) 로 교체
        await new Promise(r => setTimeout(r, 800)); // 로딩 시뮬레이션

        manuscriptData.GPT    = `[${type} / ChatGPT-4o / ${format} / ${lang}]\n\nAbstract:\n${content}\n\nConclusion: Data analyzed successfully.`;
        manuscriptData.Gemini = `[${type} / Gemini 2.5 Pro / ${format} / ${lang}]\n\nAbstract:\n${content}\n\nObservation: Key patterns identified.`;
        manuscriptData.Claude = `[${type} / Claude Sonnet 4.6 / ${format} / ${lang}]\n\nAbstract:\n${content}\n\nSynthesis: Integrated research framework.`;

        document.getElementById('gpt-res').textContent    = manuscriptData.GPT;
        document.getElementById('gemini-res').textContent = manuscriptData.Gemini;
        document.getElementById('claude-res').textContent = manuscriptData.Claude;

    } catch (err) {
        alert("Something went wrong. Please try again.\n" + err.message);
        goBack(1);
    } finally {
        isProcessing = false;
        btn.disabled = false;
        btn.textContent = 'GENERATE & COMPARE';
    }
}

/**
 * Step 2 -> Step 3
 */
function finalSelect(modelName) {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'flex';
    document.getElementById('step3').style.flexDirection = 'column';

    // textContent로 안전하게 삽입 (XSS 방지)
    document.getElementById('finalView').textContent = manuscriptData[modelName];
}

/**
 * PDF 출력 (step3만)
 */
function printStep3() {
    document.getElementById('step3').style.display = 'flex';
    window.print();
}

/**
 * Copy to Clipboard (폴백 포함)
 */
function copyToClipboard() {
    const text = document.getElementById('finalView').textContent;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        }).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        document.execCommand('copy');
        alert("Copied to clipboard!");
    } catch (e) {
        alert("Copy failed. Please select and copy manually.");
    }
    document.body.removeChild(ta);
}
