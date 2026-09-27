# Public release link contract

The public distribution is intentionally bidirectional:

1. The immutable model page links to the Company AI source repository, model card, benchmark
   method and exact evidence revision.
2. Company AI, CommerceAI, VibeOperator and PC Relay READMEs link to
   `gokhansahinbas/company-ai:preview`, not to a mutable `latest` tag.
3. Every runtime repository states which layer owns routing, policy, execution and proof.
4. Release pages never claim that private root repositories were opened directly. Public exports
   are built from an allowlist and pass secret, PII, license and history scans before publication.
5. A future fine-tuned tag must link to its base revision, dataset manifest, consent/license basis,
   adapter hash, merge/quantization receipt and held-out evaluation. It must not reuse the preview
   evidence.

Planned public graph:

```text
Ollama model page <-> company-ai
                        |-- commerceai-runtime
                        |-- vibeoperator
                        `-- pc-relay
```

The private `gokhansahinbas/commerceai` repository is the current engineering source of truth. It
is not itself approved for public release.
