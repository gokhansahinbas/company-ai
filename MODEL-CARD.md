# Company AI Preview v0.1.0

Company AI is a local-first model package for compiling human requests into the typed intent
contract used by CommerceAI, VibeOperator and PC Relay. The model proposes a plan; it does not
receive terminal, browser, tool or `DONE` authority. VibeOperator validates policy and an executor
must produce effect-after evidence before work is considered complete.

## Install

```bash
ollama run gokhansahinbas/company-ai:preview
```

The preview is a 35.5B sparse model package in GGUF Q4_K_M format. The immutable Ollama digest is
`4d071575deed05c382e970d1e3403e58a7055c88be10d171158d0b4771e3a388` and its local package size is
22,621,314,995 bytes. A GPU with roughly 24 GB VRAM can run the tested 10,240-token configuration;
systems with less memory may spill to CPU and run more slowly.

## What is proven

- The package runs locally through Ollama on an NVIDIA RTX 4500 Ada 24 GB.
- The exact digest passed a deterministic 100-example intent-contract benchmark. The committed
  receipt reports intent/workflow accuracy, invalid JSON, contract violations, false-positive
  UNKNOWN routing and forbidden execution/`DONE` claims.
- The source dataset is synthetic and generated from 226 registered workflows. It contains no
  runtime user data.
- The package carries the Apache-2.0 license text exposed by Ollama.

## Claim boundary

This preview is a customized runtime package built on Qwen-family weights. Its current weight
lineage does **not** prove that it is the output of the repository's Company AI QLoRA pipeline.
The repository contains a separately proven synthetic QLoRA training/evaluation pipeline, but its
adapter is not this model. Do not describe this preview as a production Company AI fine-tune.

The benchmark measures typed intent compilation, not broad intelligence, tool success, production
quality, privacy compliance or business outcomes. The model may be wrong. High-impact actions
require deterministic policy, human approval where applicable, and executor evidence.

## Architecture and source

- Company AI release and benchmark sources:
  <https://github.com/gokhansahinbas/company-ai>
- CommerceAI and VibeOperator runtime (public export planned):
  <https://github.com/gokhansahinbas/commerceai>
- PC Relay semantic executor (public export planned):
  <https://github.com/gokhansahinbas/pc-relay>

Public repositories must link back to the immutable model tag, this model card and the benchmark
receipt. The model page must link back to the source revision that generated its evidence.

## Intended use

- Typed routing into a known intent/workflow registry.
- Local-first enterprise assistants where data boundaries are explicit.
- Plan generation for a separately governed semantic executor.
- Reproducible demonstrations of intent-to-policy-to-proof orchestration.

## Out of scope

- Autonomous execution based only on model text.
- Treating a model response or worker completion message as proof.
- Training on personal, employer or customer data without provenance and explicit permission.
- Medical, legal, financial, hiring or safety-critical decisions without qualified human review.

## License and attribution

The model package exposes Apache License 2.0. Downstream publishers remain responsible for
preserving upstream notices, validating every included artifact's lineage and complying with laws
and third-party data terms.
