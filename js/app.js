/**
 * STITCHABLE - Main Application Orchestrator
 * Fully integrates:
 * 1. Stitching Guides & Curriculum Library
 * 2. Interactive Pattern Drafting Calculator & Live Dynamic SVG Schematic
 * 3. Fabric Meterage Estimator & Roll Width Converter
 * 4. Sewing Machine Doctor & Diagnostics
 * 5. Master Ji AI Mentor (Context-aware, bilingual, voice synthesis)
 * 6. Guided Garment Project Workspace (7 Stages with deterministic math, validation & persistence)
 */

import { curriculumData } from './curriculumData.js';
import { i18n } from './i18n.js';
import { MentorAI } from './mentorAI.js';
import { DraftingCalculator } from './draftingCalculator.js';
import { FabricEstimator } from './fabricEstimator.js';
import { Troubleshooter } from './troubleshooter.js';
import { GarmentProject } from './garmentProject.js';

class App {
  constructor() {
    this.currentLang = localStorage.getItem('stitchable_lang') || 'en';
    this.currentTheme = localStorage.getItem('stitchable_theme') || 'dark';
    this.currentTab = 'curriculum';
    this.currentFilter = 'all';
    this.searchQuery = '';

    // Sub-systems
    this.calculator = new DraftingCalculator(() => this.currentLang);
    this.fabricEstimator = new FabricEstimator(() => this.currentLang);
    this.troubleshooter = new Troubleshooter(() => this.currentLang);
    this.garmentProject = new GarmentProject(() => this.currentLang, this.calculator, this.fabricEstimator);
    this.mentor = new MentorAI(() => this.currentLang, () => this.garmentProject);

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
    this.initGarmentProject();
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
    this.renderProjectStepper();
    this.renderProjectStage();
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
      tab.addEventListener('click', () => {
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
    const sections = ['curriculum', 'project', 'drafting', 'fabric', 'machine', 'mentor'];
    sections.forEach(s => {
      const el = document.getElementById(`section-${s}`);
      if (el) {
        el.style.display = s === tabId ? 'block' : 'none';
      }
    });

    if (tabId === 'mentor') {
      this.toggleMentorDrawer(true);
    } else if (tabId === 'project') {
      this.renderProjectStepper();
      this.renderProjectStage();
      document.getElementById('section-project')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ==========================================
  // SECTION 1: Curriculum Guides Library
  // ==========================================
  renderCurriculum() {
    const grid = document.getElementById('curriculum-grid');
    if (!grid) return;

    let items = curriculumData;

    if (this.currentFilter !== 'all') {
      items = items.filter(item => item.track === this.currentFilter);
    }

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
    headerSubtitle.textContent = item.difficulty ? `${item.difficulty} • ${item.duration}` : '';

    let contentHtml = '';

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
  // SECTION 2: Drafting Calculator
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

    const svgContainer = document.getElementById('calc-svg-container');
    if (svgContainer) {
      svgContainer.innerHTML = this.calculator.generateSvgSchematic(result);
    }

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
  // SECTION 3: Fabric Estimator
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
  // SECTION 4: Troubleshooter (Machine Doctor)
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
  // SECTION 5: Guided Garment Project Workspace
  // ==========================================
  initGarmentProject() {
    // Stage navigation buttons
    ['project-prev-btn', 'project-prev-btn-bottom'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => this.prevProjectStage());
    });

    ['project-next-btn', 'project-next-btn-bottom'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => this.nextProjectStage());
    });

    // Reset button
    document.getElementById('project-reset-btn')?.addEventListener('click', () => {
      if (confirm(this.t('projectResetConfirm'))) {
        this.garmentProject.resetProject();
        this.renderProjectStepper();
        this.renderProjectStage();
      }
    });

    // Print button
    document.getElementById('project-print-btn')?.addEventListener('click', () => {
      window.print();
    });

    this.renderProjectStepper();
    this.renderProjectStage();
  }

  renderProjectStepper() {
    const bar = document.getElementById('project-stepper-bar');
    if (!bar) return;

    const currentStage = this.garmentProject.state.stage;
    const stageNames = [
      this.t('stage1Name'),
      this.t('stage2Name'),
      this.t('stage3Name'),
      this.t('stage4Name'),
      this.t('stage5Name'),
      this.t('stage6Name'),
      this.t('stage7Name')
    ];

    let html = '';
    for (let i = 1; i <= 7; i++) {
      const isCompleted = i < currentStage;
      const isActive = i === currentStage;
      const nodeClass = `step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      const circleContent = isCompleted ? '<i class="fa-solid fa-check"></i>' : i;

      html += `
        <button class="${nodeClass}" onclick="window.stitchableApp.jumpToProjectStage(${i})">
          <div class="step-circle">${circleContent}</div>
          <span>${stageNames[i - 1]}</span>
        </button>
      `;

      if (i < 7) {
        const lineActive = i < currentStage ? 'active' : '';
        html += `<div class="step-connector-line ${lineActive}"></div>`;
      }
    }

    bar.innerHTML = html;

    // Update auto-saved indicator
    const savedIndicator = document.getElementById('project-saved-indicator');
    if (savedIndicator) {
      savedIndicator.textContent = this.t('projectAutoSaved');
    }

    // Update Prev / Next buttons state
    const prevBtns = [document.getElementById('project-prev-btn'), document.getElementById('project-prev-btn-bottom')];
    prevBtns.forEach(btn => {
      if (btn) btn.disabled = currentStage === 1;
    });

    const nextLabels = [
      document.querySelector('#project-next-btn span'),
      document.querySelector('#project-next-btn-bottom span')
    ];
    nextLabels.forEach(lbl => {
      if (lbl) {
        lbl.textContent = currentStage === 7 ? this.t('stage7Name') : this.t('btnNextStage');
      }
    });
  }

  jumpToProjectStage(targetStage) {
    // If moving forward beyond stage 2, validate stage 2 first
    if (targetStage > 2) {
      const valRes = this.garmentProject.validateMeasurements(this.garmentProject.state.measurements);
      if (!valRes.isValid) {
        alert(this.currentLang === 'te' ? 'దయచేసి కొలతలను సరిగ్గా నమోదు చేయండి.' : 'Please enter valid measurements before proceeding.');
        this.garmentProject.setStage(2);
        this.renderProjectStepper();
        this.renderProjectStage();
        return;
      }
    }
    this.garmentProject.setStage(targetStage);
    this.renderProjectStepper();
    this.renderProjectStage();
  }

  nextProjectStage() {
    const cur = this.garmentProject.state.stage;
    if (cur === 2) {
      // Validate measurements form
      const valRes = this.garmentProject.validateMeasurements(this.garmentProject.state.measurements);
      if (!valRes.isValid) {
        this.renderProjectStage(valRes.errors);
        return;
      }
    }
    if (cur < 7) {
      this.garmentProject.setStage(cur + 1);
      this.renderProjectStepper();
      this.renderProjectStage();
      document.getElementById('section-project')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  prevProjectStage() {
    const cur = this.garmentProject.state.stage;
    if (cur > 1) {
      this.garmentProject.setStage(cur - 1);
      this.renderProjectStepper();
      this.renderProjectStage();
      document.getElementById('section-project')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  renderProjectStage(validationErrors = null) {
    const body = document.getElementById('project-stage-body');
    if (!body) return;

    const stage = this.garmentProject.state.stage;
    const selectedGarmentKey = this.garmentProject.state.selectedGarment;
    const garment = this.garmentProject.supportedGarments[selectedGarmentKey];
    const unit = this.garmentProject.state.unit;

    switch (stage) {
      // ----------------------------------------
      // STAGE 1: CHOOSE A GARMENT
      // ----------------------------------------
      case 1: {
        const garments = Object.values(this.garmentProject.supportedGarments);
        body.innerHTML = `
          <div>
            <h4 style="color: var(--text-golden); font-size: 1.35rem; margin-bottom: 0.5rem;">${this.t('stage1Heading')}</h4>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${this.t('stage1Desc')}</p>

            <div class="garment-select-grid">
              ${garments.map(g => {
                const isSelected = g.id === selectedGarmentKey;
                return `
                  <div class="garment-card-selectable ${isSelected ? 'selected' : ''}" onclick="window.stitchableApp.selectProjectGarment('${g.id}')">
                    <div class="garment-selected-badge"><i class="fa-solid fa-check"></i></div>
                    <div>
                      <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">
                        ${g.title[this.currentLang]}
                      </h4>
                      <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
                        ${g.subtitle[this.currentLang]}
                      </p>
                      <div style="font-size: 0.82rem; color: var(--text-secondary); display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <span><i class="fa-regular fa-clock" style="color: var(--accent-gold);"></i> ${g.duration[this.currentLang]}</span>
                        <span><i class="fa-solid fa-gauge" style="color: var(--accent-rose);"></i> ${g.difficulty[this.currentLang]}</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Prerequisites Card for selected garment -->
            <div style="background: var(--bg-card); border: 1px solid var(--border-golden); border-radius: var(--radius-md); padding: 1.75rem; margin-top: 1.5rem;">
              <h5 style="color: var(--accent-gold); font-size: 1.15rem; margin-bottom: 1rem;">
                <i class="fa-solid fa-clipboard-check" style="margin-right: 0.5rem;"></i>${this.t('whatYouNeedTitle')}
              </h5>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                <div>
                  <h6 style="color: var(--text-golden); font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-scissors" style="margin-right: 0.4rem;"></i>${this.t('toolsChecklist')}
                  </h6>
                  <ul style="padding-left: 1.2rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                    ${garment.toolsNeeded[this.currentLang].map(t => `<li>${t}</li>`).join('')}
                  </ul>
                </div>

                <div>
                  <h6 style="color: var(--text-golden); font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-scroll" style="margin-right: 0.4rem;"></i>${this.t('fabricAdvice')}
                  </h6>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    ${garment.fabricRecommendation[this.currentLang]}
                  </p>

                  <h6 style="color: var(--text-golden); font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-circle-dot" style="margin-right: 0.4rem;"></i>${this.t('notionsAdvice')}
                  </h6>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                    ${garment.notions[this.currentLang]}
                  </p>
                </div>
              </div>
            </div>

            <!-- Authentic Transparency Notice -->
            <div style="background: var(--bg-secondary); border-left: 4px solid var(--accent-gold); border-radius: var(--radius-sm); padding: 1rem 1.25rem; margin-top: 1.5rem;">
              <strong style="color: var(--accent-gold);">${this.t('otherGarmentsNoticeTitle')}</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.25rem; line-height: 1.5;">
                ${this.t('otherGarmentsNoticeText')}
              </p>
            </div>
          </div>
        `;
        break;
      }

      // ----------------------------------------
      // STAGE 2: ENTER MEASUREMENTS
      // ----------------------------------------
      case 2: {
        const m = this.garmentProject.state.measurements;
        const errors = validationErrors || {};

        body.innerHTML = `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              <div>
                <h4 style="color: var(--text-golden); font-size: 1.35rem; margin-bottom: 0.3rem;">${this.t('stage2Heading')}</h4>
                <p style="color: var(--text-secondary); font-size: 0.92rem;">${this.t('stage2Desc')}</p>
              </div>

              <!-- Unit Toggle (Inches / cm) -->
              <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-card); padding: 0.4rem 0.8rem; border-radius: var(--radius-full); border: 1px solid var(--border-golden);">
                <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">${this.t('unitToggleLabel')}</span>
                <button class="filter-chip ${unit === 'inches' ? 'active' : ''}" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;" onclick="window.stitchableApp.setProjectUnit('inches')">Inches (\")</button>
                <button class="filter-chip ${unit === 'cm' ? 'active' : ''}" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;" onclick="window.stitchableApp.setProjectUnit('cm')">cm</button>
              </div>
            </div>

            <!-- Measurement Form Grid -->
            <div class="measurement-grid-form">
              <div class="measurement-field ${errors.chest ? 'has-error' : ''}">
                <label class="input-label">${this.t('calcChest')} (${unit})</label>
                <input type="number" id="proj-chest" class="input-text" value="${m.chest}" step="0.5" min="1" max="150"
                  oninput="window.stitchableApp.updateProjectMeasurement('chest', this.value)">
                ${errors.chest ? `<span class="validation-error-text"><i class="fa-solid fa-triangle-exclamation"></i> ${errors.chest}</span>` : ''}
              </div>

              <div class="measurement-field ${errors.waist ? 'has-error' : ''}">
                <label class="input-label">${this.t('calcWaist')} (${unit})</label>
                <input type="number" id="proj-waist" class="input-text" value="${m.waist}" step="0.5" min="1" max="150"
                  oninput="window.stitchableApp.updateProjectMeasurement('waist', this.value)">
                ${errors.waist ? `<span class="validation-error-text"><i class="fa-solid fa-triangle-exclamation"></i> ${errors.waist}</span>` : ''}
              </div>

              <div class="measurement-field ${errors.shoulder ? 'has-error' : ''}">
                <label class="input-label">${this.t('calcShoulder')} (${unit})</label>
                <input type="number" id="proj-shoulder" class="input-text" value="${m.shoulder}" step="0.5" min="1" max="100"
                  oninput="window.stitchableApp.updateProjectMeasurement('shoulder', this.value)">
                ${errors.shoulder ? `<span class="validation-error-text"><i class="fa-solid fa-triangle-exclamation"></i> ${errors.shoulder}</span>` : ''}
              </div>

              <div class="measurement-field ${errors.length ? 'has-error' : ''}">
                <label class="input-label">${this.t('calcLength')} (${unit})</label>
                <input type="number" id="proj-length" class="input-text" value="${m.length}" step="0.5" min="1" max="200"
                  oninput="window.stitchableApp.updateProjectMeasurement('length', this.value)">
                ${errors.length ? `<span class="validation-error-text"><i class="fa-solid fa-triangle-exclamation"></i> ${errors.length}</span>` : ''}
              </div>

              <div class="measurement-field ${errors.hip ? 'has-error' : ''}">
                <label class="input-label">${this.t('calcHip')} (${unit})</label>
                <input type="number" id="proj-hip" class="input-text" value="${m.hip}" step="0.5" min="1" max="180"
                  oninput="window.stitchableApp.updateProjectMeasurement('hip', this.value)">
                ${errors.hip ? `<span class="validation-error-text"><i class="fa-solid fa-triangle-exclamation"></i> ${errors.hip}</span>` : ''}
              </div>
            </div>

            <!-- Beginner Measuring Instructions -->
            <div class="measure-guide-box">
              <h5 style="color: var(--accent-gold); font-size: 1rem; margin-bottom: 0.75rem;">
                <i class="fa-solid fa-circle-question" style="margin-right: 0.4rem;"></i>${this.t('howToMeasureHeading')}
              </h5>
              <div class="measure-guide-item">
                <i class="fa-solid fa-tape measure-guide-icon"></i>
                <span>${this.t('chestGuide')}</span>
              </div>
              <div class="measure-guide-item">
                <i class="fa-solid fa-tape measure-guide-icon"></i>
                <span>${this.t('waistGuide')}</span>
              </div>
              <div class="measure-guide-item">
                <i class="fa-solid fa-tape measure-guide-icon"></i>
                <span>${this.t('shoulderGuide')}</span>
              </div>
              <div class="measure-guide-item">
                <i class="fa-solid fa-tape measure-guide-icon"></i>
                <span>${this.t('lengthGuide')}</span>
              </div>
              <div class="measure-guide-item">
                <i class="fa-solid fa-tape measure-guide-icon"></i>
                <span>${this.t('hipGuide')}</span>
              </div>
            </div>
          </div>
        `;
        break;
      }

      // ----------------------------------------
      // STAGE 3: PREPARE THE PATTERN
      // ----------------------------------------
      case 3: {
        const norm = this.garmentProject.getMeasurementsInInches();
        const calcRes = this.garmentProject.getPatternCalculations();
        const svgContent = this.calculator.generateSvgSchematic(calcRes);

        // Explanations for formulas based on selected garment
        let formulaNotesHtml = '';
        if (selectedGarmentKey === 'blouse') {
          formulaNotesHtml = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div class="formula-box">
                <div class="label">Armhole Depth: Chest / 6 + 0.5\" = ${(norm.chest / 6 + 0.5).toFixed(2)}\"</div>
                <div class="note">This proportional calculation provides ergonomic arm mobility without gaping at the armhole curve.</div>
              </div>
              <div class="formula-box">
                <div class="label">Neck Width: Chest / 12 = ${(norm.chest / 12).toFixed(2)}\"</div>
                <div class="note">Strictly proportional to prevent shoulder slippage on back-neck depths up to 8.5\".</div>
              </div>
              <div class="formula-box">
                <div class="label">Bust Line: Chest / 4 + 1.5\" Ease = ${(norm.chest / 4 + 1.5).toFixed(2)}\"</div>
                <div class="note">1.5\" wearing ease accommodates inhalation and torso expansion comfortably.</div>
              </div>
              <div class="formula-box">
                <div class="label">Side Seam Margin: 1.50\"</div>
                <div class="note">Reserved safety margin inside the side seam for future alterations.</div>
              </div>
            </div>
          `;
        } else if (selectedGarmentKey === 'princess') {
          formulaNotesHtml = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div class="formula-box">
                <div class="label">Bust Apex Point: Chest / 4 + 1.5\" = ${(norm.chest / 4 + 1.5).toFixed(2)}\"</div>
                <div class="note">Coordinates the focal point of the princess curve arc from the shoulder.</div>
              </div>
              <div class="formula-box">
                <div class="label">Center Front Panel Width: ${(norm.chest / 10 + 0.75).toFixed(2)}\"</div>
                <div class="note">Distance from fold to center cup line + 0.5\" seam allowance.</div>
              </div>
              <div class="formula-box">
                <div class="label">Side Cup Dart Intake: ${((norm.chest - norm.waist) / 2 + 0.5).toFixed(2)}\"</div>
                <div class="note">Converts difference between bust and waist into conical 3D cup projection.</div>
              </div>
            </div>
          `;
        } else {
          formulaNotesHtml = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div class="formula-box">
                <div class="label">Armhole Depth: Chest / 6 + 0.5\" = ${(norm.chest / 6 + 0.5).toFixed(2)}\"</div>
                <div class="note">Balances clean armhole curve without puckering.</div>
              </div>
              <div class="formula-box">
                <div class="label">Wearing Ease: +2.0\" to +2.5\"</div>
                <div class="note">Enables comfortable sitting, reaching, and side slit movement.</div>
              </div>
            </div>
          `;
        }

        body.innerHTML = `
          <div>
            <h4 style="color: var(--text-golden); font-size: 1.35rem; margin-bottom: 0.3rem;">${this.t('stage3Heading')}</h4>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${this.t('stage3Desc')}</p>

            <div class="calc-grid-layout">
              <!-- Left: Mathematical Breakdown Table -->
              <div>
                <h5 style="color: var(--text-golden); font-size: 1.05rem; margin-bottom: 0.5rem;">
                  <i class="fa-solid fa-table-list" style="color: var(--accent-gold); margin-right: 0.4rem;"></i>${this.t('breakdownTitle')}
                </h5>

                <table class="breakdown-table">
                  <thead>
                    <tr>
                      <th>${this.t('colPatternDimension')}</th>
                      <th>${this.t('colBodyMeasure')}</th>
                      <th>${this.t('colEase')}</th>
                      <th>Precision Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${calcRes.outputsList.map(row => `
                      <tr>
                        <td><strong>${row.label[this.currentLang] || row.label.en}</strong></td>
                        <td>${norm.chest}\" (${(norm.chest * 2.54).toFixed(1)} cm)</td>
                        <td>${row.label.en.includes('Bust Line') ? '+1.5\"' : (row.label.en.includes('Margin') ? '1.5\" seam' : 'Proportional')}</td>
                        <td style="color: var(--accent-gold); font-weight: 700;">${row.val}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>

                <!-- Beginner Friendly Explanations -->
                <div style="margin-top: 1.5rem;">
                  <h5 style="color: var(--text-golden); font-size: 1.05rem; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-graduation-cap" style="color: var(--accent-gold); margin-right: 0.4rem;"></i>${this.t('whyFormulasTitle')}
                  </h5>
                  ${formulaNotesHtml}
                </div>

                <div style="background: var(--bg-card); border-left: 3px solid var(--accent-rose); padding: 0.85rem 1rem; border-radius: var(--radius-sm); margin-top: 1rem; font-size: 0.82rem; color: var(--text-muted);">
                  ${this.t('formulaVerifNote')}
                </div>
              </div>

              <!-- Right: Live SVG Schematic -->
              <div class="pattern-display-panel">
                <h5 style="color: var(--text-golden); font-size: 1.05rem; margin-bottom: 1rem; align-self: flex-start;">
                  <i class="fa-solid fa-vector-square" style="color: var(--accent-gold); margin-right: 0.5rem;"></i>${this.t('schematicTitle')}
                </h5>
                <div style="width: 100%; display: flex; justify-content: center;">
                  ${svgContent}
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      }

      // ----------------------------------------
      // STAGE 4: ESTIMATE FABRIC
      // ----------------------------------------
      case 4: {
        const fabEst = this.garmentProject.getFabricEstimate();
        const currentWidth = this.garmentProject.state.fabricWidth;

        body.innerHTML = `
          <div>
            <h4 style="color: var(--text-golden); font-size: 1.35rem; margin-bottom: 0.3rem;">${this.t('stage4Heading')}</h4>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${this.t('stage4Desc')}</p>

            <div class="calc-grid-layout">
              <div>
                <!-- Roll Width Selector -->
                <div class="input-field-group">
                  <label class="input-label">${this.t('rollWidthLabel')}</label>
                  <select id="proj-roll-width" class="input-select" onchange="window.stitchableApp.setProjectFabricWidth(this.value)">
                    <option value="32" ${currentWidth === 32 ? 'selected' : ''}>32 inches (Narrow Silk / Traditional Blouse Rubia)</option>
                    <option value="36" ${currentWidth === 36 ? 'selected' : ''}>36 inches (Standard Indian Rubia)</option>
                    <option value="44" ${currentWidth === 44 ? 'selected' : ''}>44 inches (Standard Cotton / Silk / Crepe)</option>
                    <option value="54" ${currentWidth === 54 ? 'selected' : ''}>54 inches (Wider Suiting / Western Fabric)</option>
                    <option value="60" ${currentWidth === 60 ? 'selected' : ''}>60 inches (Extra Wide Western Fabric / Curtain)</option>
                  </select>
                </div>

                <!-- Assumptions Box -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1.5rem;">
                  <h5 style="color: var(--accent-gold); font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-info-circle" style="margin-right: 0.4rem;"></i>${this.t('assumptionsTitle')}
                  </h5>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                    ${this.t('assumptionsNotice')}
                  </p>
                </div>
              </div>

              <!-- Output Box -->
              <div style="background: var(--bg-secondary); border: 1px solid var(--border-golden); border-radius: var(--radius-md); padding: 2rem; display: flex; flex-direction: column; justify-content: center;">
                <span class="card-track-badge" style="width: max-content; margin-bottom: 1rem;">
                  ${this.t('yardageSummaryHeading')}
                </span>
                <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
                  <h2 style="font-size: 2.8rem; font-weight: 900; color: var(--accent-gold);">${fabEst.totalMeters}</h2>
                  <span style="font-size: 1.2rem; color: var(--text-muted);">(${fabEst.totalYards})</span>
                </div>
                <div style="background: var(--bg-card); border-left: 3px solid var(--accent-rose); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
                  <p style="font-size: 0.88rem; color: var(--text-secondary);">${fabEst.bufferNote}</p>
                </div>
                <div>
                  <h5 style="color: var(--text-golden); font-size: 0.95rem; margin-bottom: 0.4rem;">${this.t('fabLayoutAdvice')}</h5>
                  <p style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.6;">${fabEst.layoutAdvice}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      }

      // ----------------------------------------
      // STAGE 5: CUTTING GUIDANCE & SAFETY
      // ----------------------------------------
      case 5: {
        body.innerHTML = `
          <div>
            <h4 style="color: var(--text-golden); font-size: 1.35rem; margin-bottom: 0.3rem;">${this.t('stage5Heading')}</h4>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${this.t('stage5Desc')}</p>

            <!-- Atelier Safety Banner -->
            <div class="atelier-safety-box">
              <h5 style="color: var(--accent-rose); font-size: 1.05rem; font-weight: 700;">
                <i class="fa-solid fa-shield-halved" style="margin-right: 0.5rem;"></i>${this.t('safetyBoxTitle')}
              </h5>
              <div class="safety-rules-grid">
                <div class="safety-rule-item">
                  <i class="fa-solid fa-scissors"></i>
                  <span>${this.t('safetyRule1')}</span>
                </div>
                <div class="safety-rule-item">
                  <i class="fa-solid fa-hand"></i>
                  <span>${this.t('safetyRule2')}</span>
                </div>
                <div class="safety-rule-item">
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <span>${this.t('safetyRule3')}</span>
                </div>
                <div class="safety-rule-item">
                  <i class="fa-solid fa-trash-can"></i>
                  <span>${this.t('safetyRule4')}</span>
                </div>
              </div>
            </div>

            <!-- 4 Structured Cutting Phases -->
            <div class="cutting-phases-container">
              <div class="cut-phase-card">
                <div class="cut-phase-badge"><i class="fa-solid fa-water"></i></div>
                <div>
                  <h5 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.3rem;">${this.t('cutPhase1')}</h5>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${this.t('cutPhase1Text')}</p>
                </div>
              </div>

              <div class="cut-phase-card">
                <div class="cut-phase-badge"><i class="fa-solid fa-pencil"></i></div>
                <div>
                  <h5 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.3rem;">${this.t('cutPhase2')}</h5>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${this.t('cutPhase2Text')}</p>
                </div>
              </div>

              <div class="cut-phase-card">
                <div class="cut-phase-badge"><i class="fa-solid fa-scissors"></i></div>
                <div>
                  <h5 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.3rem;">${this.t('cutPhase3')}</h5>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${this.t('cutPhase3Text')}</p>
                </div>
              </div>

              <div class="cut-phase-card">
                <div class="cut-phase-badge"><i class="fa-solid fa-check-double"></i></div>
                <div>
                  <h5 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.3rem;">${this.t('cutPhase4')}</h5>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${this.t('cutPhase4Text')}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      }

      // ----------------------------------------
      // STAGE 6: STITCHING GUIDANCE & CHECKLIST
      // ----------------------------------------
      case 6: {
        const steps = garment.stitchingSteps[this.currentLang];
        const completedCount = this.garmentProject.getCompletedStepsCount();
        const totalCount = steps.length;
        const pct = Math.round((completedCount / totalCount) * 100);

        body.innerHTML = `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              <div>
                <h4 style="color: var(--text-golden); font-size: 1.35rem; margin-bottom: 0.3rem;">${this.t('stage6Heading')}</h4>
                <p style="color: var(--text-secondary); font-size: 0.92rem;">${this.t('stage6Desc')}</p>
              </div>

              <div style="background: var(--bg-card); padding: 0.5rem 1rem; border-radius: var(--radius-full); border: 1px solid var(--border-golden); font-size: 0.85rem; font-weight: 700; color: var(--accent-gold);">
                ${completedCount} / ${totalCount} (${pct}%)
              </div>
            </div>

            <!-- Progress Meter Bar -->
            <div class="progress-meter-container">
              <div class="progress-track">
                <div class="progress-fill" style="width: ${pct}%;"></div>
              </div>
            </div>

            <!-- Interactive Step Checklist -->
            <div class="stitching-checklist">
              ${steps.map((stepText, idx) => {
                const isDone = this.garmentProject.isStepCompleted(idx);
                return `
                  <div class="stitch-step-row ${isDone ? 'completed' : ''}" onclick="window.stitchableApp.toggleStitchingStep(${idx})">
                    <div class="stitch-step-checkbox">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <span class="stitch-step-text">${stepText}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Tailoring Glossary Accordion -->
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; margin-top: 1.5rem;">
              <h5 style="color: var(--accent-gold); font-size: 1rem; margin-bottom: 0.75rem;">
                <i class="fa-solid fa-book" style="margin-right: 0.4rem;"></i>${this.t('glossaryTitle')}
              </h5>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                <div><strong style="color: var(--text-golden);">Dart Intake:</strong> ${this.t('termDart')}</div>
                <div><strong style="color: var(--text-golden);">Grainline:</strong> ${this.t('termGrain')}</div>
                <div><strong style="color: var(--text-golden);">Stay-Stitching:</strong> ${this.t('termStay')}</div>
                <div><strong style="color: var(--text-golden);">Balance Notch:</strong> ${this.t('termNotch')}</div>
                <div><strong style="color: var(--text-golden);">Pressing vs Ironing:</strong> ${this.t('termPress')}</div>
              </div>
            </div>

            <!-- Authentic Non-Sensor Disclaimer -->
            <div style="background: var(--bg-secondary); border-left: 3px solid var(--accent-rose); padding: 0.8rem 1rem; border-radius: var(--radius-sm); margin-top: 1rem; font-size: 0.82rem; color: var(--text-muted);">
              ${this.t('stitchingDisclaimer')}
            </div>
          </div>
        `;
        break;
      }

      // ----------------------------------------
      // STAGE 7: PROJECT PROGRESS & REVIEW
      // ----------------------------------------
      case 7: {
        const norm = this.garmentProject.getMeasurementsInInches();
        const fabEst = this.garmentProject.getFabricEstimate();
        const completedCount = this.garmentProject.getCompletedStepsCount();
        const totalCount = this.garmentProject.getTotalStepsCount();
        const pct = Math.round((completedCount / totalCount) * 100);

        body.innerHTML = `
          <div>
            <h4 style="color: var(--text-golden); font-size: 1.35rem; margin-bottom: 0.3rem;">${this.t('stage7Heading')}</h4>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${this.t('stage7Desc')}</p>

            <div class="dossier-box">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
                <div>
                  <h3 style="font-size: 1.6rem; color: var(--accent-gold); margin-top: 0.2rem;">${garment.title[this.currentLang]}</h3>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.85rem; color: var(--text-muted);">${this.t('stepsCompletedLabel')}</span>
                  <div style="font-size: 1.4rem; font-weight: 800; color: ${pct === 100 ? '#10b981' : 'var(--accent-gold)'};">
                    ${completedCount} / ${totalCount} (${pct}%)
                  </div>
                </div>
              </div>

              <!-- Metadata Summary Grid -->
              <div class="dossier-meta-grid">
                <div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Chest / Bust</span>
                  <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${norm.chest}\" (${(norm.chest * 2.54).toFixed(1)} cm)</div>
                </div>
                <div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Waist Round</span>
                  <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${norm.waist}\" (${(norm.waist * 2.54).toFixed(1)} cm)</div>
                </div>
                <div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Shoulder Width</span>
                  <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${norm.shoulder}\" (${(norm.shoulder * 2.54).toFixed(1)} cm)</div>
                </div>
                <div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Garment Length</span>
                  <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${norm.length}\" (${(norm.length * 2.54).toFixed(1)} cm)</div>
                </div>
                <div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Fabric Needed</span>
                  <div style="font-size: 1.15rem; font-weight: 700; color: var(--accent-gold);">${fabEst.totalMeters}</div>
                </div>
                <div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Roll Width</span>
                  <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${fabEst.rollWidth}</div>
                </div>
              </div>

              <!-- Notes Area -->
              <div style="margin-top: 1.5rem;">
                <label style="font-size: 0.95rem; font-weight: 700; color: var(--text-golden); margin-bottom: 0.5rem; display: block;">
                  <i class="fa-solid fa-pen-nib" style="margin-right: 0.4rem;"></i>Personal Tailoring Notes
                </label>
                <textarea id="proj-notes" class="project-notes-textarea"
                  placeholder="${this.t('notesPlaceholder')}"
                  oninput="window.stitchableApp.updateProjectNotes(this.value)">${this.garmentProject.state.notes || ''}</textarea>
                <span style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.3rem; display: block;">
                  ${this.t('notesSavedNotice')}
                </span>
              </div>
            </div>
          </div>
        `;
        break;
      }
    }
  }

  selectProjectGarment(garmentId) {
    this.garmentProject.setGarment(garmentId);
    this.renderProjectStage();
  }

  setProjectUnit(unit) {
    this.garmentProject.setUnit(unit);
    this.renderProjectStage();
  }

  updateProjectMeasurement(field, value) {
    const num = parseFloat(value);
    const updated = { ...this.garmentProject.state.measurements, [field]: isNaN(num) ? '' : num };
    this.garmentProject.updateMeasurements(updated);
  }

  setProjectFabricWidth(width) {
    this.garmentProject.setFabricWidth(width);
    this.renderProjectStage();
  }

  toggleStitchingStep(stepIndex) {
    this.garmentProject.toggleStitchingStep(stepIndex);
    this.renderProjectStage();
  }

  updateProjectNotes(notes) {
    this.garmentProject.setNotes(notes);
  }

  // ==========================================
  // SECTION 6: Master Ji AI Mentor
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
