document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById('app');
    let config = {};
    let currentThemeId = 'onsen'; // Default theme
    let currentQuestionIndex = 0;
    let scores = {};

    // URL parameter parsing
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('t');
    if (themeParam) {
        currentThemeId = themeParam;
    }

    // Load Themes
    try {
        const response = await fetch('themes.json?ver=' + new Date().getTime());
        const data = await response.json();

        console.log("Loaded IDs:", Object.keys(data));

        if (!data[currentThemeId]) {
            console.error(`ID: ${currentThemeId} は存在しません。利用可能なIDリスト: ${Object.keys(data).join(', ')}`);
            // Fallback
            if (data['onsen']) {
                console.warn(`Theme "${currentThemeId}" not found, falling back to onsen.`);
                currentThemeId = 'onsen';
            } else {
                throw new Error("Theme not found and default 'onsen' is missing.");
            }
        }

        config = data[currentThemeId];

        // check paid parameter
        if (urlParams.get('paid') === 'true') {
            // Save premium status for THIS specific theme
            localStorage.setItem('is_premium_' + currentThemeId, 'true');
            // Remove params for clean URL but keep the theme param if needed? 
            // Actually, usually we want to keep the theme param so they don't get lost on refresh.
            // But if we use replaceState with clear params, we might lose ?t=...
            // So we should construct the new URL carefully.
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('paid');
            // Update URL without reloading
            window.history.replaceState({}, document.title, newUrl.toString());
        }

        applyTheme(config.meta);
        renderStartScreen();
    } catch (e) {
        app.innerHTML = '<div class="card"><p>エラーが発生しました。テーマデータを読み込めません。</p><p>' + e + '</p></div>';
        console.error(e);
    }

    function applyTheme(meta) {
        const root = document.documentElement;
        if (meta.themeColor) root.style.setProperty('--primary-color', meta.themeColor);
        if (meta.themeGradient) {
            document.body.style.backgroundImage = meta.themeGradient;
        }
        document.title = meta.title;
    }

    function renderStartScreen() {
        app.innerHTML = `
            <div class="card">
                <h1>${config.meta.title}</h1>
                <p>${config.meta.description}</p>
                <button class="btn" onclick="startDiagnostic()">診断をはじめる</button>
            </div>
        `;
        window.startDiagnostic = () => {
            currentQuestionIndex = 0;
            scores = {};
            renderQuestion();
        };
    }

    function renderQuestion() {
        if (currentQuestionIndex >= config.questions.length) {
            showCalculating();
            return;
        }

        const q = config.questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / config.questions.length) * 100;

        app.innerHTML = `
            <div class="card">
                <div class="progress-container">
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#999; margin-bottom:4px;">
                        <span>Question ${currentQuestionIndex + 1}</span>
                        <span>${config.questions.length}</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                <h2>${q.text}</h2>
                <div class="options-container">
                    ${q.options.map((opt, idx) => `
                        <button class="option-btn" onclick="handleAnswer(${idx})">${opt.label}</button>
                    `).join('')}
                </div>
            </div>
        `;

        window.handleAnswer = (optIndex) => {
            const selectedOpt = config.questions[currentQuestionIndex].options[optIndex];
            for (const [key, val] of Object.entries(selectedOpt.score)) {
                scores[key] = (scores[key] || 0) + val;
            }
            currentQuestionIndex++;
            renderQuestion();
        };
    }

    function showCalculating() {
        app.innerHTML = `
            <div class="card" style="padding: 60px 40px;">
                <div class="loading-spinner">診断中...</div>
                <p style="margin-top: 20px;">あなたのタイプを分析しています<br>※精密診断モード</p>
            </div>
        `;
        setTimeout(calculateResult, 2000);
    }

    function calculateResult() {
        let maxScore = -1;
        let resultKey = Object.keys(config.results)[0];

        for (const [key, val] of Object.entries(scores)) {
            if (val > maxScore) {
                maxScore = val;
                resultKey = key;
            }
        }

        // localStorage key should also be unique per theme?
        // Actually the result is transient, but let's keep it safe.
        localStorage.setItem('last_diagnostic_result_' + currentThemeId, resultKey);
        renderResult(resultKey);
    }

    function renderResult(key) {
        const r = config.results[key];
        // Check premium status using the theme ID
        const isBought = localStorage.getItem('is_premium_' + currentThemeId) === 'true';

        // Construct Detail HTML
        const detailsHtml = r.details.map(d => `
            <div class="detail-section">
                <div class="detail-heading">${d.heading}</div>
                <p style="margin-bottom:0;">${d.content}</p>
            </div>
        `).join('');

        // Psychological Hook Line (Injected for high conversion)
        const hookHtml = isBought ? '' : `
            <div style="font-weight:bold; color:#be123c; margin-bottom:16px; line-height:1.6; padding:0 8px;">
                あなたの本質は分かりました。<br>しかし、<span style="background:rgba(255,255,0,0.3);">実は10年に1度の転機がすぐそこに迫っています。</span><br>
                その具体的な日付と、絶対に避けるべき行動は……
            </div>
        `;

        app.innerHTML = `
            <div class="card">
                <div style="margin-bottom:12px;"><span style="background:#eee; padding:4px 12px; border-radius:12px; font-size:0.8rem;">診断結果</span></div>
                <h1>${r.title}</h1>
                <img src="${r.image}" class="result-image" alt="${r.title}">
                <p class="result-short">${r.short_desc}</p>
                
                <!-- Teaser Hook -->
                <div class="result-teaser">
                    <span class="teaser-heading">⚡ あなたの隠された才能</span>
                    <p class="teaser-text">${r.teaser}</p>
                </div>

                <!-- Premium Container -->
                <div id="premiumContainer" class="premium-blur-container ${isBought ? '' : 'locked'}">
                    <div class="detail-content">
                        ${hookHtml}
                        ${detailsHtml}
                    </div>
                    
                    <!-- Floating Premium Gate (Visible only when locked) -->
                    <div class="unlock-overlay">
                        <div class="premium-gate-card">
                            <div class="premium-gate-title">
                                <span>🔒</span> この先は、あなた専用の特別鑑定書です
                            </div>
                            <p class="premium-gate-desc">
                                本質的な性格、具体的な開運アクション、運命の相性など<br>
                                約<strong>3,000文字</strong>の精密レポートを開示します。
                            </p>
                            <button class="btn shimmer-btn" onclick="unlockPremium()">
                                詳細をさらに深く知る (¥${config.meta.price})
                            </button>
                        </div>
                    </div>
                </div>
                
                ${isBought ? '<div style="margin-top:20px; font-size:0.8rem; color:#aaa;">PURCHASED</div>' : ''}
                <button class="btn btn-secondary" onclick="location.reload()">診断をやり直す</button>
            </div>
        `;

        window.unlockPremium = () => {
            window.location.href = config.meta.stripeUrl;
        };
    }
});
