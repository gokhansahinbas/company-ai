# Company AI

Company AI is a local-first intent model and evidence-driven runtime architecture. It turns a
human request into a typed plan; VibeOperator applies policy, semantic executors such as PC Relay
perform allowed work, and only effect-after evidence can close the task.

## Preview model

```bash
ollama run gokeyyyn/company-ai:preview
```

This published tag resolves to manifest
`0979316ef32ab44b9afa8cdbcb67de21129734ebd2a0b78993d89f8ab234d16f`; its evaluated source
manifest is `4d071575deed05c382e970d1e3403e58a7055c88be10d171158d0b4771e3a388`. Read the
[model card](MODEL-CARD.md) before use. The preview is a customized runtime package, not a proven
output of the repository's QLoRA pipeline.

## Evidence, not slogans

The 2026-09-27 release candidate passed 100/100 deterministic intent-contract examples with zero
invalid JSON, contract violations, UNKNOWN false positives, execution claims or terminal `DONE`
claims. The receipt is in [evaluation.json](evaluation.json), the reproducible method is in
[BENCHMARK.md](BENCHMARK.md), and `node verify-release.mjs --live` checks both the receipt and the
locally installed published manifest.

This benchmark is narrow. It proves typed intent compilation for its sampled synthetic cases; it
does not prove general intelligence or end-to-end task success.

## Public architecture

The model is the fast semantic layer, not the operator:

```text
request -> Company AI/Jev judgment -> VibeOperator policy -> semantic executor -> effect-after proof
```

Sanitized public exports of the CommerceAI runtime, VibeOperator and PC Relay will be linked here
after their own secret, PII, history, dependency and license reviews. The private monorepo is not
being published directly. See [LINK-GRAPH.md](LINK-GRAPH.md) for the release contract.

## License

Model weights and their embedded notices are Apache-2.0. This documentation and the verification
script are released under Apache-2.0. Downstream users must preserve all upstream notices and
independently validate data, dependency and deployment obligations.
