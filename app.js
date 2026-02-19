// ============================================================
//  THE GUIDELINE PODCAST — APP LOGIC
// ============================================================

// ---- State ----
let currentCategory  = null;
let currentGuideline = null;
let currentChapter   = null;
let quizState = { current: 0, score: 0, answered: false };

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
});

// ============================================================
//  STEP 1: KATEGORIEN
// ============================================================
function renderCategories() {
  const grid = document.getElementById('category-grid');
  grid.innerHTML = '';

  CONTENT.categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = `card ${cat.available ? 'available' : 'locked'}`;
    card.style.setProperty('--card-accent', cat.color);

    card.innerHTML = `
      <div class="card-icon">${cat.icon}</div>
      <div class="card-name">${cat.name}</div>
      <div class="card-desc">${cat.description}</div>
      <div class="card-status">${cat.available ? 'Verfügbar' : 'Kommt bald'}</div>
    `;

    if (cat.available) {
      card.onclick = () => selectCategory(cat);
    }

    grid.appendChild(card);
  });
}

function selectCategory(cat) {
  currentCategory = cat;
  renderGuidelines(cat);
  goTo('step-guideline');

  document.getElementById('guideline-title').textContent = cat.name;
  document.getElementById('guideline-subtitle').textContent = `Wähle eine Guideline in ${cat.name}`;
}

// ============================================================
//  STEP 2: GUIDELINES
// ============================================================
function renderGuidelines(cat) {
  const grid = document.getElementById('guideline-grid');
  grid.innerHTML = '';

  cat.guidelines.forEach(gl => {
    const card = document.createElement('div');
    card.className = `card ${gl.available ? 'available' : 'locked'}`;
    card.style.setProperty('--card-accent', cat.color);

    card.innerHTML = `
      <div class="card-icon">${cat.icon}</div>
      <div class="card-name">${gl.name}</div>
      <div class="card-desc">${gl.description}</div>
      <div class="card-status">${gl.available ? `${gl.chapters.length} Kapitel` : 'Kommt bald'}</div>
    `;

    if (gl.available) {
      card.onclick = () => selectGuideline(gl);
    }

    grid.appendChild(card);
  });
}

function selectGuideline(gl) {
  currentGuideline = gl;
  renderChapters(gl);
  goTo('step-chapter');

  document.getElementById('chapter-title').textContent = gl.name;
  document.getElementById('chapter-subtitle').textContent = gl.description;
}

// ============================================================
//  STEP 3: KAPITEL
// ============================================================
function renderChapters(gl) {
  const list = document.getElementById('chapter-list');
  list.innerHTML = '';

  gl.chapters.forEach((ch, idx) => {
    const item = document.createElement('div');
    item.className = 'chapter-item';

    item.innerHTML = `
      <div class="chapter-num">${idx + 1}</div>
      <div class="chapter-info">
        <div class="chapter-name">${ch.name}</div>
        <div class="chapter-duration">${ch.duration}</div>
      </div>
      <div class="chapter-arrow">→</div>
    `;

    item.onclick = () => selectChapter(ch);
    list.appendChild(item);
  });
}

function selectChapter(ch) {
  currentChapter = ch;
  loadPlayer(ch);
  goTo('step-player');
  switchTab('podcast'); // immer mit Podcast-Tab starten
}

// ============================================================
//  STEP 4: PLAYER + CONTENT
// ============================================================
function loadPlayer(ch) {
  // Titel
  document.getElementById('player-title').textContent = ch.name;
  document.getElementById('player-subtitle').textContent =
    currentGuideline.name + ' · ' + (currentCategory ? currentCategory.name : '');
  document.getElementById('player-chapter-name').textContent = ch.name;
  document.getElementById('player-guideline-name').textContent = currentGuideline.name;

  // Audio
  const audio = document.getElementById('audio-player');
  if (ch.audioUrl) {
    audio.src = ch.audioUrl;
  } else {
    audio.removeAttribute('src');
    audio.load();
  }

  // Schaubild
  const container = document.getElementById('schaubild-container');
  const placeholder = document.getElementById('schaubild-placeholder');
  container.innerHTML = '';

  if (ch.schaubildUrl) {
    placeholder.style.display = 'none';
    if (ch.schaubildUrl.endsWith('.pdf')) {
      container.innerHTML = `<iframe src="${ch.schaubildUrl}"></iframe>`;
    } else {
      container.innerHTML = `<img src="${ch.schaubildUrl}" alt="Schaubild ${ch.name}" />`;
    }
  } else {
    placeholder.style.display = 'block';
  }

  // Quiz
  loadQuiz(ch.quiz || []);
}

// ============================================================
//  QUIZ
// ============================================================
function loadQuiz(questions) {
  quizState = { current: 0, score: 0, answered: false, questions };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  const { questions, current } = quizState;

  if (!questions || questions.length === 0) {
    container.innerHTML = `<p class="placeholder-text">Für dieses Kapitel ist noch kein Quiz verfügbar.</p>`;
    return;
  }

  if (current >= questions.length) {
    renderQuizResult();
    return;
  }

  const q = questions[current];
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const progress = Math.round((current / questions.length) * 100);
  const hasTip = q.tip && q.tip.trim().length > 0;

  container.innerHTML = `
    <div class="quiz-progress">Frage ${current + 1} von ${questions.length}</div>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${progress}%"></div>
    </div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" onclick="answerQuiz(${i})" id="opt-${i}">
          <span class="quiz-option-letter">${letters[i]}</span>
          ${opt}
        </button>
      `).join('')}
    </div>
    ${hasTip ? `<button class="qz-tip-btn" id="qtipbtn" onclick="toggleTip()"><span>💡</span> Tipp anzeigen <span class="tip-icon">▾</span></button><div class="qz-tip-box" id="qtipbox">${q.tip}</div>` : ''}
    <div class="quiz-feedback" id="quiz-feedback"></div>
    <button class="quiz-next-btn" id="quiz-next" onclick="nextQuestion()">
      ${current + 1 < questions.length ? 'Nächste Frage →' : 'Ergebnis anzeigen →'}
    </button>
  `;
}

function answerQuiz(selectedIdx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.current];
  const isCorrect = selectedIdx === q.correct;
  if (isCorrect) quizState.score++;

  // Alle Buttons deaktivieren
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === selectedIdx && !isCorrect) btn.classList.add('wrong');
  });

  // Feedback
  const fb = document.getElementById('quiz-feedback');
  fb.textContent = q.explanation;
  fb.className = `quiz-feedback show ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;

  // Weiter-Button zeigen
  document.getElementById('quiz-next').classList.add('show');
}

function nextQuestion() {
  quizState.current++;
  quizState.answered = false;
  renderQuizQuestion();
}

function renderQuizResult() {
  const { score, questions } = quizState;
  const pct = Math.round((score / questions.length) * 100);
  let msg, sub;

  if (pct >= 80) {
    msg = 'Ausgezeichnet! 🎉';
    sub = 'Sehr gutes Verständnis der Guideline-Inhalte.';
  } else if (pct >= 60) {
    msg = 'Gut gemacht!';
    sub = 'Einige Aspekte kannst du noch vertiefen.';
  } else {
    msg = 'Weiter üben!';
    sub = 'Hör dir das Kapitel nochmal an und versuche es erneut.';
  }

  document.getElementById('quiz-container').innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-score">${pct}%</div>
      <div class="quiz-result-msg">${msg}</div>
      <div class="quiz-result-sub">${score} von ${questions.length} Fragen richtig · ${sub}</div>
      <button class="quiz-restart-btn" onclick="loadQuiz(quizState.questions)">Quiz wiederholen</button>
    </div>
  `;
}

// ============================================================
//  TAB NAVIGATION
// ============================================================
function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

  document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
  document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ============================================================
//  STEP NAVIGATION
// ============================================================
function goTo(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(stepId);
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack(stepId) {
  goTo(stepId);
}

// ═══════════════════════════════════════════════════════════
//  TIPP-FUNKTION
// ═══════════════════════════════════════════════════════════
function toggleTip() {
  const btn = document.getElementById('qtipbtn');
  const box = document.getElementById('qtipbox');
  if (!btn || !box) return;
  
  const isOpen = box.classList.contains('show');
  box.classList.toggle('show', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.innerHTML = isOpen
    ? '<span>💡</span> Tipp anzeigen <span class="tip-icon">▾</span>'
    : '<span>💡</span> Tipp ausblenden <span class="tip-icon">▾</span>';
}
