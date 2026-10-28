/**
 * STITCHABLE - Main Application Orchestrator
 */

import { curriculumData } from './curriculumData.js';
import { i18n } from './i18n.js';
import { MentorAI } from './mentorAI.js';
import { DraftingCalculator } from './draftingCalculator.js';
import { FabricEstimator } from './fabricEstimator.js';
import { Troubleshooter } from './troubleshooter.js';

class App {
  constructor() {
    this.currentLang = localStorage.getItem('stitchable_lang') || 'en';
    this.currentTheme = localStorage.getItem('stitchable_theme') || 'dark';
    this.currentTab = 'curriculum';
    this.currentFilter = 'all';
    this.searchQuery = '';

    // Sub-systems
    this.mentor = new MentorAI(() => this.currentLang);
    this.calculator = new DraftingCalculator(() => this.currentLang);
    this.fabricEstimator = new FabricEstimator(() => this.currentLang);
    this.troubleshooter = new Troubleshooter(() => this.currentLang);

    // Initial DOM binding & rendering
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.applyLanguage(this.currentLang);
    this.bindEvents();
    this.renderCurriculum();
    this.initDraftingCalculator();
    this.initFabricEstimator();
    this.initTroubleshooter();
    this.initMentorChat();
  }

  t(key) {
    const dict = i18n[this.currentLang] || i18n.en;
    return dict[key] || i18n.en[key] || key;
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('stitchable_theme', theme);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }

  toggleTheme() {
    this.applyTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }

  applyLanguage(lang) {
    this.currentLang = lang;
    document.body.setAttribute('lang', lang);
    localStorage.setItem('stitchable_lang', lang);

    // Update static i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', this.t(key));
    });

    const langBtnText = document.getElementById('lang-switch-text');
    if (langBtnText) {
      langBtnText.textContent = this.t('langSwitchTo');
    }

    // Re-render active screens
    this.renderCurriculum();
    this.updateDraftingSvg();
    this.updateFabricEstimate();
    this.renderTroubleSolution();
  }

  toggleLanguage() {
    this.applyLanguage(this.currentLang === 'en' ? 'te' : 'en');
  }

  bindEvents() {
    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggleTheme());

    // Language toggle
    document.getElementById('lang-toggle')?.addEventListener('click', () => this.toggleLanguage());

    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const targetTab = tab.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });

    // Track filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentFilter = chip.getAttribute('data-filter');
        this.renderCurriculum();
      });
    });

    // Search bar
    const searchInput = document.getElementById('curriculum-search');
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderCurriculum();
    });

    // Modal close
    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') this.closeModal();
    });

    // Floating Mentor trigger & drawer close
    document.getElementById('mentor-trigger')?.addEventListener('click', () => this.toggleMentorDrawer(true));
    document.getElementById('drawer-close-btn')?.addEventListener('click', () => this.toggleMentorDrawer(false));
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.nav-tab[data-tab="${tabId}"]`)?.classList.add('active');

    // Section visibility
    const sections = ['curriculum', 'drafting', 'fabric', 'machine', 'mentor'];
    sections.forEach(s => {
      const el = document.getElementById(`section-${s}`);
      if (el) {
        el.style.display = s === tabId ? 'block' : 'none';
      }
    });

    if (tabId === 'mentor') {
      this.toggleMentorDrawer(true);
    }
  }

  renderCurriculum() {
    const grid = document.getElementById('curriculum-grid');
    if (!grid) return;

    let items = curriculumData;

    // Filter by track
    if (this.currentFilter !== 'all') {
      items = items.filter(item => item.track === this.currentFilter);
    }

    // Filter by search
    if (this.searchQuery) {
      items = items.filter(item => {
        const titleEn = item.title.en.toLowerCase();
        const titleTe = item.title.te.toLowerCase();
        const subEn = item.subtitle.en.toLowerCase();
        const subTe = item.subtitle.te.toLowerCase();
        return titleEn.includes(this.searchQuery) ||
               titleTe.includes(this.searchQuery) ||
               subEn.includes(this.searchQuery) ||
               subTe.includes(this.searchQuery) ||
               item.book.toLowerCase().includes(this.searchQuery);
      });
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--accent-gold); margin-bottom: 1rem;"></i>
          <p style="font-size: 1.1rem;">${this.currentLang === 'te' ? 'ఎటువంటి పాఠాలు కనుగొనబడలేదు. దయచేసి వేరే పదాన్ని వెతకండి.' : 'No tailoring modules found matching your query.'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="atelier-card stitched-border">
        <div>
          <div class="card-top-bar">
            <span class="card-track-badge">${item.track.toUpperCase()}</span>
            <div class="card-icon-bubble">
              <i class="fa-solid ${item.icon}"></i>
            </div>
          </div>
          <h3 class="card-title">${item.title[this.currentLang]}</h3>
          <p class="card-subtitle">${item.subtitle[this.currentLang]}</p>
          <ul class="card-meta-list">
            <li class="card-meta-item">
              <i class="fa-regular fa-clock"></i>
              <span><strong>${this.t('duration')}:</strong> ${item.duration}</span>
            </li>
            <li class="card-meta-item">
              <i class="fa-solid fa-gauge-high"></i>
              <span><strong>${this.t('difficulty')}:</strong> ${item.difficulty}</span>
            </li>
            <li class="card-meta-item">
              <i class="fa-solid fa-ruler-combined"></i>
              <span><strong>${this.t('fabricReq')}:</strong> ${item.fabricRequirement[this.currentLang]}</span>
            </li>
          </ul>
        </div>
        <div class="card-action-bar">
          <button class="btn-card-guide" onclick="window.stitchableApp.openModal('${item.id}')">
            <i class="fa-solid fa-book-open"></i>
            <span>${this.t('viewGuide')}</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  openModal(itemId) {
    const item = curriculumData.find(i => i.id === itemId);
    if (!item) return;

    const overlay = document.getElementById('modal-overlay');
    const headerTitle = document.getElementById('modal-title');
    const headerSubtitle = document.getElementById('modal-subtitle');
    const body = document.getElementById('modal-content');

    headerTitle.textContent = item.title[this.currentLang];
    headerSubtitle.textContent = item.book;

    let contentHtml = '';

    // Measurements Needed
    if (item.measurementsNeeded) {
      contentHtml += `
        <div class="modal-section">
          <h4><i class="fa-solid fa-tape"></i> ${this.t('measurementsList')}</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
            ${item.measurementsNeeded.map(m => `
              <span style="background: var(--bg-card); border: 1px solid var(--border-subtle); padding: 0.4rem 0.8rem; border-radius: var(--radius-full); font-size: 0.85rem;">
                <i class="fa-solid fa-check" style="color: var(--accent-gold); margin-right: 0.3rem;"></i>${m[this.currentLang]}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Formulas
    if (item.formulas) {
      contentHtml += `
        <div class="modal-section">
          <h4><i class="fa-solid fa-calculator"></i> ${this.t('draftingFormulas')}</h4>
          <div class="formula-grid">
            ${item.formulas.map(f => `
              <div class="formula-box">
                <div class="label">${f.label}</div>
                <div class="code">${f.formula}</div>
                <div class="note">${f.note}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Pattern Drafting Steps
    if (item.draftingSteps) {
      contentHtml += `
        <div class="modal-section">
          <h4><i class="fa-solid fa-pen-ruler"></i> ${this.t('stepByStepDraft')}</h4>
          <ol class="steps-list">
            ${item.draftingSteps[this.currentLang].map(step => `<li>${step.replace(/^\s*\d+[\.\)]\s*/, '')}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Stitching & Construction Steps
    if (item.stitchingSteps) {
      contentHtml += `
        <div class="modal-section">
          <h4><i class="fa-solid fa-scissors"></i> ${this.t('stepByStepStitch')}</h4>
          <ol class="steps-list">
            ${item.stitchingSteps[this.currentLang].map(step => `<li>${step.replace(/^\s*\d+[\.\)]\s*/, '')}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Machine Problems (if machine guide)
    if (item.machineProblems) {
      contentHtml += `
        <div class="modal-section">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> ${this.t('docTitle')}</h4>
          ${item.machineProblems.map(p => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 1rem;">
              <h5 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.5rem;">${p.title[this.currentLang]}</h5>
              <p style="margin-bottom: 0.5rem;"><strong>${this.t('docCause')}:</strong> ${p.cause[this.currentLang]}</p>
              <p><strong>${this.t('docRemedy')}:</strong> ${p.solution[this.currentLang].replace(/\n/g, '<br>')}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Needle-Fabric Chart
    if (item.needleFabricChart) {
      contentHtml += `
        <div class="modal-section">
          <h4><i class="fa-solid fa-table"></i> ${this.t('docNeedleChartTitle')}</h4>
          <div class="results-table-box">
            <table class="results-table">
              <thead>
                <tr>
                  <th>Fabric Type</th>
                  <th>Needle Size</th>
                  <th>Thread Type</th>
                  <th>Stitch Density</th>
                </tr>
              </thead>
              <tbody>
                ${item.needleFabricChart.map(row => `
                  <tr>
                    <td><strong>${row.fabric}</strong></td>
                    <td style="color: var(--accent-gold); font-weight: 700;">${row.needleSize}</td>
                    <td>${row.thread}</td>
                    <td>${row.stitchLen}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Seam Types
    if (item.seamTypes) {
      contentHtml += `
        <div class="modal-section">
          <h4><i class="fa-solid fa-layer-group"></i> Master Seam Construction</h4>
          ${item.seamTypes.map(s => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 1rem;">
              <h5 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.3rem;">${s.name[this.currentLang]}</h5>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.75rem;"><strong>Best For:</strong> ${s.use[this.currentLang]}</p>
              <ol class="steps-list">
                ${s.steps[this.currentLang].map(step => `<li>${step.replace(/^\s*\d+[\.\)]\s*/, '')}</li>`).join('')}
              </ol>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Golden Pro Tip
    if (item.mentorTip) {
      contentHtml += `
        <div class="pro-tip-box">
          <i class="fa-solid fa-lightbulb pro-tip-icon"></i>
          <div>
            <h5 style="color: var(--accent-gold); font-weight: 700; margin-bottom: 0.2rem;">${this.t('proTip')}</h5>
            <p style="font-size: 0.92rem; color: var(--text-primary);">${item.mentorTip[this.currentLang]}</p>
          </div>
        </div>
      `;
    }

    body.innerHTML = contentHtml;
    overlay.classList.add('open');
  }

  closeModal() {
    document.getElementById('modal-overlay')?.classList.remove('open');
  }

  // ==========================================
  // Drafting Calculator
  // ==========================================
  initDraftingCalculator() {
    const computeBtn = document.getElementById('calc-compute-btn');
    const garmentSelect = document.getElementById('calc-garment');
    const lengthInput = document.getElementById('calc-length');
    const inputs = ['calc-chest', 'calc-waist', 'calc-hip', 'calc-shoulder', 'calc-length', 'calc-garment'];

    inputs.forEach(id => {
      const el = document.getElementById(id);
      el?.addEventListener('input', () => this.updateDraftingSvg());
      el?.addEventListener('change', () => this.updateDraftingSvg());
    });

    garmentSelect?.addEventListener('change', (e) => {
      const val = e.target.value;
      if (lengthInput) {
        if (val === 'kameez') lengthInput.value = '38';
        else if (val === 'top') lengthInput.value = '25';
        else if (val === 'blouse' || val === 'princess') lengthInput.value = '14.5';
      }
      this.updateDraftingSvg();
    });

    computeBtn?.addEventListener('click', () => this.updateDraftingSvg());
    this.updateDraftingSvg();
  }

  updateDraftingSvg() {
    const chest = parseFloat(document.getElementById('calc-chest')?.value) || 36;
    const waist = parseFloat(document.getElementById('calc-waist')?.value) || 30;
    const hip = parseFloat(document.getElementById('calc-hip')?.value) || 38;
    const shoulder = parseFloat(document.getElementById('calc-shoulder')?.value) || 14;
    const garmentType = document.getElementById('calc-garment')?.value || 'blouse';
    const length = parseFloat(document.getElementById('calc-length')?.value) || (garmentType === 'kameez' ? 38 : (garmentType === 'top' ? 25 : 14.5));

    const result = this.calculator.calculate({ chest, waist, hip, shoulder, length, garmentType });

    // Update dynamic SVG matching the selected garment model
    const svgContainer = document.getElementById('calc-svg-container');
    if (svgContainer) {
      svgContainer.innerHTML = this.calculator.generateSvgSchematic(result);
    }

    // Update dimensions table with model-specific formulas
    const tableBody = document.getElementById('calc-results-body');
    if (tableBody && result.outputsList) {
      tableBody.innerHTML = result.outputsList.map(row => `
        <tr>
          <td>${row.label[this.currentLang] || row.label.en}</td>
          <td style="color: var(--accent-gold); font-weight:700;">${row.val}</td>
        </tr>
      `).join('');
    }
  }

  // ==========================================
  // Fabric Estimator
  // ==========================================
  initFabricEstimator() {
    const btn = document.getElementById('fab-estimate-btn');
    const inputs = ['fab-garment', 'fab-width', 'fab-height', 'fab-size'];

    inputs.forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.updateFabricEstimate());
    });

    btn?.addEventListener('click', () => this.updateFabricEstimate());
    this.updateFabricEstimate();
  }

  updateFabricEstimate() {
    const garmentType = document.getElementById('fab-garment')?.value || 'plain-blouse';
    const rollWidth = document.getElementById('fab-width')?.value || '44';
    const heightCategory = document.getElementById('fab-height')?.value || 'medium';
    const sizeCategory = document.getElementById('fab-size')?.value || 'm';

    const res = this.fabricEstimator.estimate({ garmentType, rollWidth, heightCategory, sizeCategory });

    const totalMetersEl = document.getElementById('fab-result-meters');
    const totalYardsEl = document.getElementById('fab-result-yards');
    const bufferNoteEl = document.getElementById('fab-result-buffer');
    const layoutAdviceEl = document.getElementById('fab-result-layout');

    if (totalMetersEl) totalMetersEl.textContent = res.totalMeters;
    if (totalYardsEl) totalYardsEl.textContent = res.totalYards;
    if (bufferNoteEl) bufferNoteEl.textContent = res.bufferNote;
    if (layoutAdviceEl) layoutAdviceEl.textContent = res.layoutAdvice;
  }

  // ==========================================
  // Troubleshooter (Machine Doctor)
  // ==========================================
  initTroubleshooter() {
    const container = document.getElementById('trouble-selector-grid');
    if (!container) return;

    container.innerHTML = this.troubleshooter.issues.map((issue, idx) => `
      <div class="trouble-pill ${idx === 0 ? 'active' : ''}" data-trouble-id="${issue.id}">
        <i class="fa-solid ${issue.icon}"></i>
        <span style="font-weight: 700; font-size: 0.9rem;">${issue.name[this.currentLang]}</span>
      </div>
    `).join('');

    container.querySelectorAll('.trouble-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        container.querySelectorAll('.trouble-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const id = pill.getAttribute('data-trouble-id');
        this.renderTroubleSolution(id);
      });
    });

    this.renderTroubleSolution();
  }

  renderTroubleSolution(id = 'thread-snapping') {
    const activePill = document.querySelector('.trouble-pill.active');
    const issueId = id || (activePill ? activePill.getAttribute('data-trouble-id') : 'thread-snapping');
    const issue = this.troubleshooter.getIssue(issueId);

    const titleEl = document.getElementById('trouble-solution-title');
    const causeEl = document.getElementById('trouble-solution-cause');
    const stepsEl = document.getElementById('trouble-solution-steps');

    if (titleEl) titleEl.textContent = issue.name[this.currentLang];
    if (causeEl) causeEl.textContent = issue.cause[this.currentLang];
    if (stepsEl) {
      stepsEl.innerHTML = issue.remedy[this.currentLang].map(step => `<li>${step}</li>`).join('');
    }
  }

  // ==========================================
  // Master Ji AI Mentor
  // ==========================================
  initMentorChat() {
    const sendBtn = document.getElementById('drawer-send-btn');
    const input = document.getElementById('drawer-input');

    const handleSend = async () => {
      const q = input?.value?.trim();
      if (!q) return;
      input.value = '';
      await this.sendMentorMessage(q);
    };

    sendBtn?.addEventListener('click', handleSend);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    // Quick doubt chips
    document.querySelectorAll('.chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        this.sendMentorMessage(text);
      });
    });
  }

  async sendMentorMessage(query) {
    const messagesBox = document.getElementById('drawer-messages-box');
    if (!messagesBox) return;

    // Render User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user';
    userMsg.innerHTML = `
      <div class="bubble-header"><span>You</span></div>
      <div>${query}</div>
    `;
    messagesBox.appendChild(userMsg);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Render typing indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-bubble mentor';
    typingMsg.innerHTML = `
      <div class="bubble-header"><span>Master Ji</span></div>
      <div style="color: var(--accent-gold);"><i class="fa-solid fa-spinner fa-spin"></i> ${this.currentLang === 'te' ? 'మాస్టర్ జీ విశ్లేషిస్తున్నారు...' : 'Master Ji is reviewing the tailoring curriculum...'}</div>
    `;
    messagesBox.appendChild(typingMsg);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Get response
    const res = await this.mentor.askQuestion(query);

    // Replace typing indicator with actual response
    const formattedContent = res.content
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    typingMsg.innerHTML = `
      <div class="bubble-header">
        <span>Master Ji</span>
        <span style="font-size: 0.72rem; color: var(--accent-gold); border: 1px solid var(--border-golden); padding: 0.1rem 0.5rem; border-radius: var(--radius-full);">${res.actionTag}</span>
      </div>
      <h5 style="color: var(--text-golden); font-size: 1rem; margin-bottom: 0.4rem;">${res.title}</h5>
      <div style="font-size: 0.92rem; line-height: 1.6;">${formattedContent}</div>
      <button class="voice-btn-pill" onclick="window.stitchableApp.speak('${encodeURIComponent(res.content)}')">
        <i class="fa-solid fa-volume-high"></i>
        <span>${this.t('mentorVoiceRead')}</span>
      </button>
    `;
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  speak(encodedText) {
    const text = decodeURIComponent(encodedText);
    this.mentor.speakAnswer(text, this.currentLang);
  }

  toggleMentorDrawer(open) {
    const drawer = document.getElementById('mentor-drawer');
    if (open) {
      drawer?.classList.add('open');
      document.getElementById('drawer-input')?.focus();
    } else {
      drawer?.classList.remove('open');
      this.mentor.stopSpeaking();
    }
  }
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.stitchableApp = new App();
});
