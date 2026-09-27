#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(directory, 'release.json'), 'utf8'));
const evaluation = JSON.parse(fs.readFileSync(path.join(directory, release.evaluation.receipt), 'utf8'));

function assert(condition, code) {
  if (!condition) throw new Error(code);
}

assert(release.schema === 'company-ai.model-release.v1', 'RELEASE_SCHEMA_INVALID');
assert(evaluation.schema === 'commerceai.model-evaluation.v1', 'EVALUATION_SCHEMA_INVALID');
assert(evaluation.releaseAlias === release.model, 'RELEASE_ALIAS_MISMATCH');
assert(evaluation.modelDigest === release.modelDigest, 'MODEL_DIGEST_MISMATCH');
assert(evaluation.datasetSha256 === release.dataset.sha256, 'DATASET_DIGEST_MISMATCH');
assert(evaluation.examples === release.evaluation.sampleSize, 'SAMPLE_SIZE_MISMATCH');
assert(evaluation.accuracy >= release.evaluation.minimumAccuracy, 'ACCURACY_GATE_FAILED');
assert(evaluation.unknownFalsePositiveRate <= release.evaluation.maximumUnknownFalsePositiveRate,
  'UNKNOWN_FALSE_POSITIVE_GATE_FAILED');
assert(!release.evaluation.requireZeroInvalidJson || evaluation.invalidJson === 0,
  'INVALID_JSON_GATE_FAILED');
assert(!release.evaluation.requireZeroContractViolations || evaluation.contractViolations === 0,
  'CONTRACT_GATE_FAILED');
assert(!release.evaluation.requireZeroDoneViolations || evaluation.doneViolations === 0,
  'DONE_AUTHORITY_GATE_FAILED');
assert(evaluation.gatesPassed === true, 'EVALUATION_NOT_PASSED');

if (process.argv.includes('--live')) {
  const response = await fetch('http://127.0.0.1:11434/api/tags');
  assert(response.ok, 'OLLAMA_UNAVAILABLE');
  const body = await response.json();
  const matches = (body.models || []).filter((item) => item.name === release.model);
  assert(matches.length === 1, 'RELEASE_MODEL_NOT_UNIQUE');
  assert(matches[0].digest === release.modelDigest, 'LIVE_MODEL_DIGEST_MISMATCH');
}

process.stdout.write(`${JSON.stringify({
  ok: true,
  release: release.release,
  model: release.model,
  modelDigest: release.modelDigest,
  evaluationExamples: evaluation.examples,
  accuracy: evaluation.accuracy,
  gatesPassed: true,
  liveChecked: process.argv.includes('--live'),
}, null, 2)}\n`);
