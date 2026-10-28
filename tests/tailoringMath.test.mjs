/**
 * Automated Test Suite for StitchAble Deterministic Tailoring Logic
 * Tests:
 * 1. DraftingCalculator formulas (Blouse, Princess, Kameez, Western Top)
 * 2. FabricEstimator roll width conversions & yardage
 * 3. GarmentProject measurement validations (valid, invalid, negative, zero, out-of-bounds, relational)
 * 4. Unit conversions (inches <-> cm)
 * 5. GarmentProject 7-stage transitions, step toggling & notes persistence
 * 6. MentorAI query resolution & active project context
 */

import assert from 'node:assert';
import test from 'node:test';

import { DraftingCalculator } from '../js/draftingCalculator.js';
import { FabricEstimator } from '../js/fabricEstimator.js';
import { GarmentProject } from '../js/garmentProject.js';
import { MentorAI } from '../js/mentorAI.js';

// Setup Mock Environment
const mockGetLangEn = () => 'en';
const mockGetLangTe = () => 'te';

// Polyfill localStorage if running in Node
if (typeof globalThis.localStorage === 'undefined') {
  const store = {};
  globalThis.localStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { for (const k in store) delete store[k]; }
  };
}

test('DraftingCalculator: Traditional Saree Blouse deterministic math', () => {
  const calc = new DraftingCalculator(mockGetLangEn);
  const result = calc.calculate({
    chest: 36,
    waist: 30,
    hip: 38,
    shoulder: 14,
    length: 14.5,
    garmentType: 'blouse'
  });

  // Verify Armhole Depth: Chest / 6 + 0.5" = 36/6 + 0.5 = 6.50"
  assert.strictEqual(result.raw.armholeDepth, 6.5);

  // Verify Neck Width: Chest / 12 = 36/12 = 3.00"
  assert.strictEqual(result.raw.neckWidth, 3);

  // Verify Bust Apex: Chest / 4 + 1.5" = 36/4 + 1.5 = 10.50"
  assert.strictEqual(result.raw.bustApexHeight, 10.5);

  // Verify Bust Line with ease (+1.5"): 36/4 + 1.5 = 10.50"
  const bustLineOutput = result.outputsList.find(o => o.label.en.includes('Bust Line'));
  assert.ok(bustLineOutput.val.startsWith('10.50"'));

  // Verify Waist Quarter (+1" dart): 30/4 + 1 = 8.50"
  const waistOutput = result.outputsList.find(o => o.label.en.includes('Waist'));
  assert.ok(waistOutput.val.startsWith('8.50"'));
});

test('DraftingCalculator: Princess Cut Blouse deterministic math', () => {
  const calc = new DraftingCalculator(mockGetLangEn);
  const result = calc.calculate({
    chest: 36,
    waist: 30,
    hip: 38,
    shoulder: 14,
    length: 14.5,
    garmentType: 'princess'
  });

  // Center Front Panel Width: apexDistanceHalf (36/10 + 0.25 = 3.85) + 0.5 = 4.35"
  const centerPanel = result.outputsList.find(o => o.label.en.includes('Center Front Panel'));
  assert.ok(centerPanel.val.startsWith('4.35"'));

  // Dart Cup Intake: (36 - 30)/2 + 0.5 = 3.50"
  const dartCut = result.outputsList.find(o => o.label.en.includes('Side Cup Dart'));
  assert.ok(dartCut.val.startsWith('3.50"'));
});

test('DraftingCalculator: Plain Kameez deterministic math', () => {
  const calc = new DraftingCalculator(mockGetLangEn);
  const result = calc.calculate({
    chest: 36,
    waist: 30,
    hip: 40,
    shoulder: 14,
    length: 38,
    garmentType: 'kameez'
  });

  // Chest line (+2.0" ease): 36/4 + 2 = 11.00"
  const chestLine = result.outputsList.find(o => o.label.en.includes('Chest Line'));
  assert.ok(chestLine.val.startsWith('11.00"'));

  // Waist line (+1.5" ease): 30/4 + 1.5 = 9.00"
  const waistLine = result.outputsList.find(o => o.label.en.includes('Waist Line'));
  assert.ok(waistLine.val.startsWith('9.00"'));

  // Hip line (+2.0" ease): 40/4 + 2 = 12.00"
  const hipLine = result.outputsList.find(o => o.label.en.includes('Hip Line'));
  assert.ok(hipLine.val.startsWith('12.00"'));
});

test('DraftingCalculator: Western Panel Top deterministic math', () => {
  const calc = new DraftingCalculator(mockGetLangEn);
  const result = calc.calculate({
    chest: 36,
    waist: 30,
    hip: 38,
    shoulder: 14,
    length: 25,
    garmentType: 'top'
  });

  // Bust line (+2.5" ease): 36/4 + 2.5 = 11.50"
  const bustLine = result.outputsList.find(o => o.label.en.includes('Bust Line'));
  assert.ok(bustLine.val.startsWith('11.50"'));

  // Mandarin collar stand height = 1.25"
  const collarStand = result.outputsList.find(o => o.label.en.includes('Collar Stand'));
  assert.ok(collarStand.val.startsWith('1.25"'));

  // Front button placket extension = 0.75"
  const placket = result.outputsList.find(o => o.label.en.includes('Placket Extension'));
  assert.ok(placket.val.startsWith('0.75"'));
});

test('FabricEstimator: Roll width and yardage conversions', () => {
  const estimator = new FabricEstimator(mockGetLangEn);

  // Standard 44" roll width for Plain Blouse
  const blouse44 = estimator.estimate({
    garmentType: 'plain-blouse',
    rollWidth: '44',
    heightCategory: 'medium',
    sizeCategory: 'm'
  });
  assert.strictEqual(blouse44.totalMeters, '1.25 Meters');

  // Narrow 32" roll width requires higher length multiplier (1.35)
  const blouse32 = estimator.estimate({
    garmentType: 'plain-blouse',
    rollWidth: '32',
    heightCategory: 'medium',
    sizeCategory: 'm'
  });
  assert.ok(parseFloat(blouse32.totalMeters) >= parseFloat(blouse44.totalMeters));

  // Plain Kameez standard estimate
  const kameez44 = estimator.estimate({
    garmentType: 'plain-kameez',
    rollWidth: '44',
    heightCategory: 'medium',
    sizeCategory: 'm'
  });
  assert.strictEqual(kameez44.totalMeters, '2.50 Meters');

  // Western Top standard estimate
  const top44 = estimator.estimate({
    garmentType: 'western-top',
    rollWidth: '44',
    heightCategory: 'medium',
    sizeCategory: 'm'
  });
  assert.ok(parseFloat(top44.totalMeters) >= 1.75);
});

test('GarmentProject: Measurement validation rules', () => {
  const calc = new DraftingCalculator(mockGetLangEn);
  const fab = new FabricEstimator(mockGetLangEn);
  const project = new GarmentProject(mockGetLangEn, calc, fab);

  // 1. Valid standard measurements
  const validRes = project.validateMeasurements({
    chest: 36,
    waist: 30,
    shoulder: 14,
    length: 14.5,
    hip: 38
  }, 'inches');
  assert.strictEqual(validRes.isValid, true);
  assert.strictEqual(Object.keys(validRes.errors).length, 0);

  // 2. Missing measurements
  const missingRes = project.validateMeasurements({
    chest: '',
    waist: 30,
    shoulder: 14,
    length: 14.5,
    hip: 38
  }, 'inches');
  assert.strictEqual(missingRes.isValid, false);
  assert.ok(missingRes.errors.chest);

  // 3. Zero and negative measurements
  const zeroRes = project.validateMeasurements({
    chest: 0,
    waist: -5,
    shoulder: 14,
    length: 14.5,
    hip: 38
  }, 'inches');
  assert.strictEqual(zeroRes.isValid, false);
  assert.ok(zeroRes.errors.chest);
  assert.ok(zeroRes.errors.waist);

  // 4. Implausible measurements (chest 100 on blouse)
  const implausibleRes = project.validateMeasurements({
    chest: 100,
    waist: 30,
    shoulder: 14,
    length: 14.5,
    hip: 38
  }, 'inches');
  assert.strictEqual(implausibleRes.isValid, false);
  assert.ok(implausibleRes.errors.chest);

  // 5. Relational error: waist significantly exceeding chest
  const relationalRes = project.validateMeasurements({
    chest: 30,
    waist: 48,
    shoulder: 13,
    length: 14,
    hip: 36
  }, 'inches');
  assert.strictEqual(relationalRes.isValid, false);
  assert.ok(relationalRes.errors.waist);
});

test('GarmentProject: Unit conversion, stage progression & persistence', () => {
  const calc = new DraftingCalculator(mockGetLangEn);
  const fab = new FabricEstimator(mockGetLangEn);
  const project = new GarmentProject(mockGetLangEn, calc, fab);

  // Set unit to cm
  project.setUnit('cm');
  assert.strictEqual(project.state.unit, 'cm');
  assert.strictEqual(project.state.measurements.chest, 91.4);

  // Convert back to inches
  project.setUnit('inches');
  assert.strictEqual(project.state.unit, 'inches');
  assert.strictEqual(Math.round(project.state.measurements.chest), 36);

  // Stage transition
  assert.strictEqual(project.state.stage, 1);
  project.setStage(3);
  assert.strictEqual(project.state.stage, 3);
  project.setStage(7);
  assert.strictEqual(project.state.stage, 7);

  // Step completion toggle
  assert.strictEqual(project.isStepCompleted(0), false);
  project.toggleStitchingStep(0);
  assert.strictEqual(project.isStepCompleted(0), true);
  assert.strictEqual(project.getCompletedStepsCount(), 1);
  project.toggleStitchingStep(0);
  assert.strictEqual(project.isStepCompleted(0), false);

  // Personal notes persistence
  project.setNotes('Kalamkari silk blouse test');
  assert.strictEqual(project.state.notes, 'Kalamkari silk blouse test');

  // Verify persistence reload
  const reloadedProject = new GarmentProject(mockGetLangEn, calc, fab);
  assert.strictEqual(reloadedProject.state.notes, 'Kalamkari silk blouse test');
  assert.strictEqual(reloadedProject.state.stage, 7);
});

test('MentorAI: Context awareness with active project and expert answers', async () => {
  const calc = new DraftingCalculator(mockGetLangEn);
  const fab = new FabricEstimator(mockGetLangEn);
  const project = new GarmentProject(mockGetLangEn, calc, fab);
  const mentor = new MentorAI(mockGetLangEn, () => project);

  // Test active project question
  const projectDoubt = await mentor.askQuestion('Explain my project armhole calculation');
  assert.ok(projectDoubt.content.includes('Armhole Depth'));
  assert.ok(projectDoubt.content.includes('36 / 6 + 0.5'));

  // Test why ease is necessary
  const easeDoubt = await mentor.askQuestion('Why is wearing ease necessary?');
  assert.ok(easeDoubt.content.includes('Wearing Ease'));

  // Test beginner mistakes explanation
  const mistakesDoubt = await mentor.askQuestion('What are common beginner tailoring mistakes?');
  assert.ok(mistakesDoubt.content.includes('Grainline') || mistakesDoubt.content.includes('Pre-Washing'));

  // Test machine doctor question
  const threadDoubt = await mentor.askQuestion('Why does my upper thread break?');
  assert.ok(threadDoubt.content.includes('Tension'));

  // Test bilingual Telugu response
  const mentorTe = new MentorAI(mockGetLangTe, () => project);
  const teDoubt = await mentorTe.askQuestion('భుజం ఎందుకు జారిపోతుంది?');
  assert.ok(teDoubt.content.includes('మెడ వెడల్పు'));
});
