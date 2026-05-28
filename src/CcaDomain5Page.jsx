import React, { useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Examples', href: '#examples' },
  { label: '5.1 Context Preservation', href: '#ts-5-1' },
  { label: '5.2 Escalation Patterns', href: '#ts-5-2' },
  { label: '5.3 Error Propagation', href: '#ts-5-3' },
  { label: '5.4 Codebase Context Management', href: '#ts-5-4' },
  { label: '5.5 Human Review & Confidence', href: '#ts-5-5' },
  { label: '5.6 Information Provenance', href: '#ts-5-6' }
]

const taskStatements = [
  {
    id: 'ts-5-1',
    number: '5.1',
    title: 'Manage conversation context to preserve critical information across long interactions',
    lead: 'Progressive summarisation loses critical facts. Persistent "case facts" blocks and trimmed tool outputs preserve what matters without exhausting the context window.',
    knowledge: [
      'Progressive summarisation risks: when conversation history is summarised to save context, numerical values, specific dates, customer-stated expectations, and order numbers are condensed into vague summaries that lose the precision required for accurate downstream processing',
      'The "lost in the middle" effect: models reliably process information at the beginning and end of long inputs but may miss or underweight findings from sections in the middle — position matters for important information',
      'How tool results accumulate and consume tokens disproportionately: a tool result might return 40 fields when only 5 are relevant to the current task — accumulating verbose tool outputs quickly fills the context window with low-value tokens',
      'The importance of passing complete conversation history in subsequent API requests: omitting earlier turns from multi-turn conversations breaks the agent\'s ability to maintain coherent context across a session'
    ],
    skills: [
      'Extracting transactional facts (amounts, dates, order numbers, statuses, customer-stated commitments) into a persistent "case facts" block that is included in each subsequent prompt outside the summarised history, so critical specifics survive summarisation',
      'Extracting and persisting structured issue data (order IDs, amounts, issue types, resolution status) into a separate context layer for multi-issue sessions, preventing issue details from being lost as the conversation grows',
      'Trimming verbose tool outputs to retain only the fields relevant to the current task before they accumulate in context — for example, keeping only return-relevant fields from an order lookup that returns 40 fields',
      'Placing key findings summaries at the beginning of aggregated inputs and organising detailed results with explicit section headers to mitigate the "lost in the middle" position effect',
      'Requiring subagents to include metadata (dates, source locations, methodological context) in their structured outputs so downstream synthesis agents have the context they need'
    ]
  },
  {
    id: 'ts-5-2',
    number: '5.2',
    title: 'Design effective escalation and ambiguity resolution patterns',
    lead: 'Escalation triggers must be explicit, not inferred from sentiment. The model should escalate for policy gaps, explicit human requests, and inability to progress — not for detected frustration.',
    knowledge: [
      'Appropriate escalation triggers: customer requests for a human agent (regardless of case complexity), policy exceptions or gaps where the policy does not address the specific situation, and inability to make meaningful progress after attempting resolution',
      'The distinction between explicit human agent requests vs offering to resolve: when a customer explicitly requests a human, the agent must transfer immediately without first attempting investigation; when the customer has not requested a human, the agent may offer resolution for issues within its capability',
      'Why sentiment-based escalation is unreliable: LLM self-reported confidence is poorly calibrated — an agent that is confidently wrong is already incorrectly confident on hard cases. Sentiment (frustration level) does not correlate reliably with case complexity, which is the actual determinant of whether escalation is needed',
      'How multiple customer matches require clarification: when a tool lookup returns multiple potential matches for a customer, the agent should request additional identifiers rather than selecting based on heuristics, which risks misidentifying accounts'
    ],
    skills: [
      'Adding explicit escalation criteria to the system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously, providing the model with concrete decision boundaries rather than relying on its judgment',
      'Implementing immediate human agent transfer when a customer explicitly requests one, without first attempting investigation or resolution — respecting the explicit preference overrides any other consideration',
      'Acknowledging customer frustration while offering resolution for issues within the agent\'s capability, escalating only if the customer reiterates their preference for a human after the offer',
      'Escalating when policy is ambiguous or silent on the customer\'s specific request (e.g., competitor price matching when policy only addresses own-site adjustments) rather than making judgment calls in policy gaps',
      'Instructing the agent to request additional identifiers when tool results return multiple potential matches, rather than selecting based on heuristics that risk misidentification'
    ]
  },
  {
    id: 'ts-5-3',
    number: '5.3',
    title: 'Implement error propagation strategies across multi-agent systems',
    lead: 'Structured error context enables intelligent coordinator recovery. Silently suppressing errors or returning generic status messages prevents recovery and risks producing incomplete outputs without annotation.',
    knowledge: [
      'Structured error context as enabling intelligent coordinator recovery decisions: errors that include failure type, what was attempted, partial results, and alternative approaches give the coordinator what it needs to choose between retrying, trying an alternative, or proceeding with partial results',
      'The distinction between access failures (timeouts needing retry decisions) and valid empty results (successful queries with no matches): conflating these prevents the coordinator from making the appropriate response — retry vs accept empty',
      'Why generic error statuses hide valuable context: "search unavailable" tells the coordinator nothing about whether to retry, try a different query, or proceed without this data source',
      'Why silently suppressing errors (returning empty results as success) and terminating entire workflows on single failures are both anti-patterns: suppression produces undetected incomplete outputs; termination discards all work for a single component failure'
    ],
    skills: [
      'Returning structured error context that includes: failure type (access failure vs validation failure), what was attempted, any partial results obtained before failure, and potential alternative approaches the coordinator might try',
      'Distinguishing access failures from valid empty results in error reporting — using explicit status fields or separate response structures so the coordinator can make appropriate decisions',
      'Having subagents implement local recovery for transient failures (retry with backoff) before propagating an error, only surfacing errors they cannot resolve themselves — including what was attempted and any partial results',
      'Structuring synthesis output with coverage annotations indicating which findings are well-supported and which topic areas have gaps due to unavailable sources, so consumers of the synthesis know what to trust'
    ]
  },
  {
    id: 'ts-5-4',
    number: '5.4',
    title: 'Manage context effectively in large codebase exploration',
    lead: 'Extended codebase sessions degrade — the model begins referencing "typical patterns" rather than specific classes discovered earlier. Scratchpad files, subagent delegation, and /compact counteract this degradation.',
    knowledge: [
      'Context degradation in extended sessions: as context fills, models begin giving inconsistent answers and referencing generic patterns rather than the specific classes, functions, or files discovered earlier in the session',
      'The role of scratchpad files for persisting key findings across context boundaries: writing important discoveries to files allows the agent to reference them in later turns without relying on context window retention',
      'Subagent delegation for isolating verbose exploration output: spawning subagents to investigate specific questions keeps verbose exploration output out of the main coordinator context, preserving the coordinator\'s context budget for high-level coordination',
      'Structured state persistence for crash recovery: each agent exports its current state (completed work, position in task, pending steps) to a known file location so a coordinator can load and resume from the last checkpoint after a failure'
    ],
    skills: [
      'Spawning subagents to investigate specific questions ("find all test files," "trace refund flow dependencies") while the main coordinator preserves its context for high-level understanding rather than accumulating verbose exploration output',
      'Having agents maintain scratchpad files recording key findings (class names, function signatures, dependency patterns) and referencing these files in subsequent questions rather than relying on context window retention',
      'Summarising key findings from one exploration phase before spawning sub-agents for the next phase, injecting those summaries into each sub-agent\'s initial context',
      'Designing crash recovery using structured agent state exports (manifests) that the coordinator loads on resume and injects into agent prompts, enabling resumption without restarting from scratch',
      'Using /compact to reduce context usage during extended exploration sessions when the context fills with verbose discovery output and the model begins showing signs of context degradation'
    ]
  },
  {
    id: 'ts-5-5',
    number: '5.5',
    title: 'Design human review workflows and confidence calibration',
    lead: 'Aggregate accuracy metrics can mask poor performance on specific document types. Stratified sampling and field-level confidence scores enable targeted human review rather than uniform oversight.',
    knowledge: [
      'The risk that aggregate accuracy metrics mask poor performance: a 97% overall accuracy rate may hide 60% accuracy on a specific document type or field — aggregate metrics are insufficient for validating production readiness of extraction pipelines',
      'Stratified random sampling for measuring error rates: sampling from high-confidence extractions (not just low-confidence ones) detects novel error patterns and validates that confidence calibration is accurate',
      'Field-level confidence scores calibrated using labeled validation sets: confidence scores that are not calibrated against labeled data are unreliable — the model may report high confidence on incorrect extractions',
      'The importance of validating accuracy by document type and field segment before automating high-confidence extractions: different document formats and field types have different error rates; validation must be segmented to detect these differences'
    ],
    skills: [
      'Implementing stratified random sampling of high-confidence extractions for ongoing error rate measurement, not just reviewing low-confidence items — detecting novel error patterns that confidence thresholds would not flag',
      'Analysing accuracy by document type and field to verify consistent performance across all segments before reducing human review coverage for high-confidence extractions',
      'Having models output field-level confidence scores, then calibrating review thresholds against labeled validation sets rather than relying on uncalibrated model confidence',
      'Routing extractions with low model confidence or from ambiguous/contradictory source documents to human review, prioritising limited reviewer capacity on the cases most likely to contain errors'
    ]
  },
  {
    id: 'ts-5-6',
    number: '5.6',
    title: 'Preserve information provenance and handle uncertainty in multi-source synthesis',
    lead: 'Source attribution is lost when summaries are compressed without preserving claim-source mappings. Conflicting sources require annotation — not arbitrary selection of one value.',
    knowledge: [
      'How source attribution is lost during summarisation: when subagent findings are compressed into narrative summaries, the link between specific claims and their source documents is severed, preventing downstream verification',
      'The importance of structured claim-source mappings that synthesis agents must preserve and merge when combining findings from multiple subagents',
      'How to handle conflicting statistics from credible sources: annotating conflicts with source attribution rather than arbitrarily selecting one value, preserving both values and letting the consumer decide how to reconcile',
      'Temporal data requiring publication/collection dates: time-stamped data from different periods may appear contradictory but are actually measuring different time points — including dates in structured outputs prevents temporal differences from being misinterpreted as contradictions'
    ],
    skills: [
      'Requiring subagents to output structured claim-source mappings (source URLs, document names, relevant excerpts) that synthesis agents preserve through the synthesis step rather than discarding during compression',
      'Structuring synthesis reports with explicit sections distinguishing well-established findings (consistent across sources) from contested findings (conflicting across credible sources), preserving original source characterisations',
      'Completing document analysis with conflicting values explicitly annotated (both values with their sources), letting the coordinator decide how to reconcile rather than making the decision during extraction',
      'Requiring subagents to include publication or data collection dates in structured outputs so downstream agents can correctly interpret whether differences represent genuine contradictions or temporal variation',
      'Rendering different content types appropriately in synthesis outputs (financial data as tables, news as prose, technical findings as structured lists) rather than converting everything to a uniform format that loses semantic structure'
    ]
  }
]

function CollapsibleSection({ id, eyebrow, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section id={id} className="section collapsible-card section-collapse-shell">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}>
        <div className="collapse-copy">
          <span className="eyebrow">{eyebrow}</span>
          <strong>{title}</strong>
          <small>{lead}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}
    </section>
  )
}

function TaskCard({ ts }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section id={ts.id} className="section collapsible-card section-collapse-shell">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}>
        <div className="collapse-copy">
          <span className="eyebrow">Task Statement {ts.number}</span>
          <strong>{ts.title}</strong>
          <small>{ts.lead}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? (
        <div className="collapse-body section-collapse-body">
          <h4 style={{ marginBottom: '0.75rem' }}>Knowledge of:</h4>
          <ul style={{ paddingLeft: '1.4rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            {ts.knowledge.map((k) => <li key={k} style={{ marginBottom: '0.5rem' }}>{k}</li>)}
          </ul>
          <h4 style={{ marginBottom: '0.75rem' }}>Skills in:</h4>
          <ul style={{ paddingLeft: '1.4rem', lineHeight: '1.8', margin: 0 }}>
            {ts.skills.map((s) => <li key={s} style={{ marginBottom: '0.5rem' }}>{s}</li>)}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

function ExampleCard({ label, title, code, note, variant = 'neutral' }) {
  const styles = {
    correct:   { bg: 'rgba(34,197,94,0.07)',  border: 'rgba(34,197,94,0.35)',  lc: '#15803d' },
    incorrect: { bg: 'rgba(239,68,68,0.07)',  border: 'rgba(239,68,68,0.35)',  lc: '#dc2626' },
    pattern:   { bg: 'rgba(59,130,246,0.07)', border: 'rgba(59,130,246,0.35)', lc: '#2563eb' },
    neutral:   { bg: 'rgba(0,0,0,0.03)',      border: 'rgba(0,0,0,0.12)',      lc: '#555'    }
  }
  const s = styles[variant] || styles.neutral
  return (
    <div style={{ marginBottom: '1.25rem', border: `2px solid ${s.border}`, borderRadius: '14px', padding: '1rem 1.1rem', background: s.bg }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: '700', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: s.lc }}>{label}</span>
        {title && <strong style={{ fontSize: '0.88rem' }}>{title}</strong>}
      </div>
      <pre style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.55' }}>{code}</pre>
      {note && <div className="note-callout" style={{ marginTop: '0.75rem', fontWeight: '500', fontSize: '0.84rem', lineHeight: '1.6' }}>{note}</div>}
    </div>
  )
}

export default function CcaDomain5Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#4f46e5', '--accent-soft': '#e0e7ff' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CCA Foundations — Domain 5</p>
          <h1>Context Management <span>&amp; Reliability</span></h1>
          <p className="lead">
            15% of the exam. Covers context preservation in long sessions, escalation and ambiguity resolution patterns, structured error propagation, codebase exploration context management, human review workflow design, and information provenance in multi-source synthesis.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#ts-5-1">Start studying</a>
            <a className="btn" href="/cca/">Back to CCA overview</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((s) => s.href !== '#page-index').map((s) => (
                <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Domain 5 at a Glance</h3>
            <div className="model-list">
              <div className="model-row"><strong>Weight</strong><span>15% of exam</span></div>
              <div className="model-row"><strong>Task Statements</strong><span>6 (5.1 – 5.6)</span></div>
              <div className="model-row"><strong>Key Technologies</strong><span>Case facts blocks, scratchpad files, /compact, escalation criteria, structured error context, confidence calibration, claim-source mappings</span></div>
              <div className="model-row"><strong>Primary Scenario</strong><span>Customer Support Agent, Multi-Agent Research System, Structured Data Extraction</span></div>
            </div>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="overview"
          eyebrow="Domain Overview"
          title="What this domain covers and why it matters"
          lead="Domain 5 tests whether you can design systems that remain reliable under the real-world pressures of long sessions, multi-source synthesis, and failure recovery."
        >
          <div className="notes-grid">
            {[
              ['Context degradation is a design problem, not a model limitation', 'When an agent loses track of specific facts discovered earlier in a session, the fix is not a better model — it is a different context management design. Persistent case facts blocks, scratchpad files, and subagent delegation are the engineering solutions. This domain tests whether you know which technique to apply in which situation.'],
              ['Escalation must be explicit, not inferred', 'The exam consistently penalises sentiment-based escalation (escalating when frustration is detected) because sentiment does not correlate with case complexity. The correct escalation triggers are explicit: customer requests a human, policy is ambiguous, or the agent cannot make progress. These should be documented in the system prompt with few-shot examples.'],
              ['Structured errors enable recovery; generic errors prevent it', 'When a subagent returns "search unavailable," the coordinator cannot decide whether to retry, try an alternative, or proceed with partial results. When it returns structured error context (failure type, what was attempted, partial results, alternative approaches), the coordinator can make an intelligent decision. This domain tests whether you can design for coordinator recovery.'],
              ['Source provenance must be preserved through synthesis', 'Multi-source research systems that summarise subagent findings lose source attribution. The fix — requiring structured claim-source mappings in subagent outputs and preserving them through synthesis — is tested in the Multi-Agent Research scenario. Conflicting sources require annotation with both values, not arbitrary selection.']
            ].map(([title, detail]) => (
              <article key={title} className="note-card prompt-note">
                <div className="note-card-header">
                  <strong>{title}</strong>
                  <p style={{ margin: '0.5rem 0 0', lineHeight: '1.6', color: '#444' }}>{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="examples"
          eyebrow="Practical Examples"
          title="Case facts, escalation criteria, error propagation, and provenance"
          lead="Concrete implementations of the context and reliability patterns most tested in Domain 5."
        >
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Context Preservation"
            title="No case facts block — critical details lost to summarisation"
            code={`# Session prompt WITHOUT case facts block
system_prompt = """You are a customer support agent. Help the customer."""

# After 10 turns of conversation, progressive summarisation kicks in.
# The summary might read: "Customer asked about an order issue."
# Gone: the order number, the $134.00 amount, the customer's specific complaint,
# the commitment made in turn 3. The agent now asks for information it was given.`}
          />
          <ExampleCard
            variant="correct"
            label="Correct — Context Preservation"
            title="Persistent case facts block outside the summarised history"
            code={`def build_prompt(case_facts: dict, conversation_summary: str) -> str:
    # Case facts block is injected fresh into EVERY turn — never summarised away
    return f"""## CASE FACTS — preserve exactly, do not summarise
Customer: {case_facts['name']} (ID: {case_facts['customer_id']})
Order: #{case_facts['order_id']} · \${case_facts['amount']} · {case_facts['order_date']}
Issue type: {case_facts['issue_type']}
Customer stated: "{case_facts['verbatim_statement']}"
Commitment made: {case_facts.get('commitment', 'none')}

## Conversation summary (summarised for context efficiency)
{conversation_summary}

## Current task
Continue resolving the customer's issue using the case facts above."""`}
            note="The case facts block is the difference between an agent that loses track after 5 turns and one that stays accurate for 50 turns. Put it above the summarised history — never inside it."
          />
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Escalation Criteria"
            title="Vague escalation instruction — model uses uncalibrated judgment"
            code={`# VAGUE: relies on the model's judgment, which is poorly calibrated for escalation
system_prompt = """
Escalate complex cases or when the customer seems frustrated.
"""
# Result: escalates standard damage replacements (seems complex)
#         handles policy exceptions autonomously (confident it can)
# — the exact inverse of what is wanted`}
          />
          <ExampleCard
            variant="correct"
            label="Correct — Escalation Criteria"
            title="Explicit rules with few-shot examples — deterministic decisions"
            code={`system_prompt = """
## Escalation Rules — follow exactly

ALWAYS escalate immediately (no investigation first):
- Customer explicitly requests a human agent (any phrasing)
- Policy is silent on the customer's specific request
  (e.g. competitor price matching — our policy only covers own-site adjustments)
- You cannot make meaningful progress after one resolution attempt

NEVER escalate based on:
- Customer frustration or negative sentiment alone
- Perceived case complexity alone

## Examples
"I want to speak to a human." → ESCALATE immediately
"This is ridiculous! I need my refund." → RESOLVE (standard refund), acknowledge frustration
"Can you match Amazon's price?" → ESCALATE (policy gap — not covered)
"I've been waiting 3 weeks, why?" → RESOLVE — check order status, provide update
"""`}
            note="Few-shot examples in the escalation section are essential — they demonstrate the decision boundary between frustration (resolve) and policy gap (escalate), which the model would otherwise confuse."
          />
          <ExampleCard
            variant="correct"
            label="Correct — Error Propagation"
            title="Structured error context enables coordinator recovery"
            code={`# Subagent returns structured error — coordinator can make intelligent decisions
def web_search_subagent(query: str):
    try:
        results = search_api.query(query, timeout=10)
        if not results:
            return {"found": False, "query": query}   # valid empty — NOT an error
        return {"found": True, "results": results}
    except TimeoutError:
        return {
            "isError": True,
            "errorCategory": "transient",
            "isRetryable": True,
            "attempted": query,
            "partialResults": None,
            "alternatives": [f"narrower query: '{query.split()[0]}'"]
        }

# Coordinator uses the structured context to recover
def coordinator(topic):
    result = web_search_subagent(topic)
    if result.get("isError") and result["isRetryable"]:
        result = web_search_subagent(result["alternatives"][0])
    if result.get("isError"):
        # Proceed with partial results and annotate the gap
        return synthesize(results=[], coverage_gap=f"web search unavailable: {topic}")
    return synthesize(results=result["results"])`}
            note='Distinguish "access failure (timeout)" from "valid empty result (no matches)." The coordinator retries transient failures, accepts empty results, and annotates gaps — it should never silently omit missing coverage.'
          />
          <ExampleCard
            variant="pattern"
            label="Pattern — Information Provenance"
            title="Structured claim-source mappings survive synthesis"
            code={`# Each subagent outputs structured claim-source pairs — not narrative summaries
def document_analysis_subagent(document, source_url):
    extraction = extract_claims(document)
    return {
        "findings": [
            {
                "claim": "AI adoption in creative industries grew 34% in 2023",
                "source_url": source_url,
                "source_name": "McKinsey Creative AI Report 2024",
                "publication_date": "2024-03-15",
                "evidence_excerpt": "...adoption rates across visual, audio, and written...",
                "confidence": "high"
            }
        ]
    }

# Synthesis agent PRESERVES source mappings — does NOT compress into narrative
def synthesis_agent(all_findings):
    # Conflicting statistics: annotate both, let consumer decide
    return {
        "well_established": [...],     # consistent across sources
        "contested": [
            {
                "claim": "Market size",
                "source_a": {"value": "$4.2B", "source": "Gartner", "date": "2024-Q1"},
                "source_b": {"value": "$2.8B", "source": "IDC",     "date": "2023-Q4"},
                "note": "Temporal difference — different measurement periods"
            }
        ]
    }`}
            note="Never let the synthesis step compress findings into narrative prose — source attribution is permanently lost. Conflicting statistics from credible sources should both appear with attribution, not be resolved by picking one."
          />
        </CollapsibleSection>

        {taskStatements.map((ts) => <TaskCard key={ts.id} ts={ts} />)}

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Navigation</p>
            <h2>Continue studying</h2>
          </div>
          <div className="notes-grid">
            <article className="note-card model-note">
              <div className="note-card-header"><h3>Domain 4</h3><p>Prompt Engineering &amp; Structured Output — 20%</p></div>
              <a className="btn" href="/cca/domain-4.html">Study Domain 4</a>
            </article>
            <article className="note-card prompt-note">
              <div className="note-card-header"><h3>Sample Questions</h3><p>Practice with 12 exam-style questions and explanations</p></div>
              <a className="btn" href="/cca/sample-questions.html">Open practice questions</a>
            </article>
          </div>
        </section>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
