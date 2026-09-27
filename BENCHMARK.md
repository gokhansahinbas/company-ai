# Company AI Preview benchmark

The release gate is deterministic, digest-bound and fail-closed.

## Dataset

`build-intent-dataset.mjs` reads the canonical Intent Wire registry and creates positive,
negated/adversarial and unknown cases. The 2026-09-27 build contained 226 workflows and 2,260
synthetic rows, split by stable SHA-256 into 1,936 training and 324 evaluation rows.

Dataset/evaluation SHA-256:
`35d743fb7c40f208aea8e2f96babcc27096f37d7599bb621e401571ba183b913`.

No runtime conversations, CVs, company documents, credentials or personal data are used.

## Gate

The evaluator selects a stable hash-sorted sample with a 20% UNKNOWN reserve, holds temperature at
zero, requests the full `commerceai.intent-spec.v1` JSON schema, and proves the model digest before
and after the run. A release passes only when all conditions hold:

- intent and workflow accuracy is at least 95%;
- UNKNOWN false-positive rate is at most 1%;
- invalid JSON count is zero;
- contract violation count is zero;
- `execute: true` or terminal `DONE` claims are zero.

## Reproduce

```bash
node training/commerceai-lora/build-intent-dataset.mjs

node training/commerceai-lora/evaluate-ollama-model.mjs \
  --model=gokhansahinbas/company-ai:preview \
  --eval-file="$HOME/.local/state/commerceai/training/intent-foundry-v1/eval.jsonl" \
  --dataset-sha256=35d743fb7c40f208aea8e2f96babcc27096f37d7599bb621e401571ba183b913 \
  --maximum-examples=100 \
  --output=company-ai-preview-v0.1.0-evaluation.json
```

Compare the model digest, dataset hash and results hash with `evaluation.json`. A pass for a
different digest is evidence for that digest only.

## What this benchmark does not show

It does not measure free-form reasoning, retrieval quality, end-to-end PC task success, latency,
energy, multilingual breadth or production safety. Those require separate suites and effect-after
evidence from the actual runtime.
