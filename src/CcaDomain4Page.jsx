import React, { useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Examples', href: '#examples' },
  { label: '4.1 Schema Design for tool_use', href: '#ts-4-1' },
  { label: '4.2 Validation & Retry Loops', href: '#ts-4-2' },
  { label: '4.3 Few-Shot Prompting', href: '#ts-4-3' },
  { label: '4.4 Prompt Chaining', href: '#ts-4-4' },
  { label: '4.5 Iterative Refinement', href: '#ts-4-5' },
  { label: '4.6 Batch Processing', href: '#ts-4-6' }
]

const taskStatements = [
  {
    id: 'ts-4-1',
    number: '4.1',
    title: 'Design schemas for reliable structured output via tool_use',
    lead: 'Use tool_use (not system prompt instructions) for guaranteed structured extraction. Schema design choices — required vs optional vs nullable — directly affect whether the model hallucinates absent information.',
    knowledge: [
      'tool_use for structured extraction: using the tool call mechanism (not system prompt formatting instructions) to guarantee structured JSON output from the model',
      'tool_choice "any" or forced tool selection: configuring tool_choice to force the model to call a specific tool, ensuring structured output even when the model might otherwise choose to respond in natural language',
      'Required vs optional fields: required fields must always be present; optional fields may be omitted. Marking fields as required when information may be absent causes the model to fabricate values to satisfy the schema',
      'Nullable fields to prevent hallucination: fields that may legitimately have no value should be nullable (type: ["string", "null"]) rather than required string, enabling the model to return null rather than fabricating a value',
      '"other" + detail string patterns for open enumerations: when an enum cannot cover all valid values, adding an "other" option with a paired free-text detail field preserves structured routing while accommodating novel values',
      'Strict mode for syntax error elimination: enabling strict schema mode prevents syntax errors in the model\'s JSON output, trading flexibility for guaranteed parsability'
    ],
    skills: [
      'Designing JSON schemas with required fields for always-present information, optional fields for sometimes-present information, and nullable fields for information that may legitimately be absent',
      'Using tool_choice to force tool invocation when the goal is guaranteed structured output, preventing the model from responding in unstructured natural language',
      'Implementing "other" + detail string patterns in enumerations to handle novel values without breaking downstream parsing',
      'Testing schemas with edge case documents (missing fields, unusual formats, ambiguous values) to verify the model returns null rather than fabricating absent information',
      'Using strict mode to eliminate JSON syntax errors in production extraction pipelines where parsability is required'
    ]
  },
  {
    id: 'ts-4-2',
    number: '4.2',
    title: 'Implement validation and retry loops',
    lead: 'Validation-retry architecture catches extraction errors automatically. Understanding when retries will succeed (format issues) vs fail (absent information) prevents infinite retry loops.',
    knowledge: [
      'Pydantic for semantic validation beyond JSON schema: Pydantic validators can enforce business rules (e.g., date ranges, cross-field consistency) that JSON schema cannot express, catching semantic errors that pass schema validation',
      'Validation-retry architecture: when validation fails, send a follow-up API request that includes the original document, the failed extraction, and the specific validation error, asking the model to correct its output',
      'When retries succeed vs fail: retries succeed for format mismatches (the model used the wrong format but the information is present); retries fail for absent information (the model cannot fabricate information that is not in the source)',
      'What to include in retry prompts: the original document, the failed extraction attempt, the specific validation error, and a request to correct only the failing aspect — not to re-extract from scratch'
    ],
    skills: [
      'Implementing validation-retry loops that catch schema validation failures and send correction requests with the failed extraction and specific error',
      'Designing retry prompts that include the original document, the failed extraction, and the error message to enable targeted correction rather than full re-extraction',
      'Distinguishing retryable validation failures (format mismatches, wrong field type) from non-retryable failures (information absent from source document) to avoid infinite retry loops',
      'Building validation pipelines that use Pydantic for semantic validation after JSON schema validation, catching errors that structurally valid but semantically incorrect extractions would otherwise propagate'
    ]
  },
  {
    id: 'ts-4-3',
    number: '4.3',
    title: 'Use few-shot examples for ambiguous scenarios',
    lead: 'Few-shot examples should target boundary cases and ambiguous inputs — not all inputs. Broad few-shot coverage adds token overhead without improving performance on clear cases.',
    knowledge: [
      'Few-shot targeting for ambiguous cases: examples are most valuable for inputs where the correct behaviour is non-obvious — boundary conditions, edge cases, and scenarios where the model would otherwise generalise incorrectly',
      'Format demonstration via examples: showing the model the exact output format through examples is more reliable than describing the format in instructions when the format is complex or unusual',
      'False positive reduction: few-shot examples can demonstrate when NOT to flag issues, helping models avoid over-flagging in code review, content moderation, or anomaly detection tasks',
      'Generalisation to novel patterns: well-chosen examples help the model generalise the underlying principle to novel cases rather than memorising specific surface patterns'
    ],
    skills: [
      'Writing few-shot examples that target the specific boundary conditions and ambiguous cases where the model\'s default behaviour is incorrect',
      'Using examples to demonstrate complex output formats (e.g., nested JSON, specific citation formats, multi-field structured extractions) where format description alone is insufficient',
      'Testing that examples reduce false positives without causing the model to miss genuine issues — verifying the model generalises the principle rather than memorising surface patterns',
      'Keeping few-shot examples focused on ambiguous cases rather than covering all input types, to avoid unnecessary token overhead for clear cases the model handles correctly without examples'
    ]
  },
  {
    id: 'ts-4-4',
    number: '4.4',
    title: 'Design prompt chaining for complex tasks',
    lead: 'Split complex single-pass tasks into focused sequential passes when single-pass analysis produces inconsistent quality across items. Use parallel chains when subtasks are independent.',
    knowledge: [
      'Sequential task decomposition into focused passes: splitting a complex task (e.g., reviewing 14 files) into separate focused passes (one pass per file for local issues, then one integration pass for cross-file issues)',
      'When single-pass analysis produces inconsistent quality: when a model processes many items in a single context, attention dilution causes some items to receive detailed analysis and others to receive superficial treatment',
      'Multi-pass review for attention management: file-by-file analysis ensures consistent depth; a separate integration pass then examines cross-file patterns that require seeing all files together',
      'Parallel vs sequential decomposition: use sequential chains when each pass depends on previous results; use parallel chains (multiple independent API calls) when subtasks do not depend on each other and latency reduction is a priority'
    ],
    skills: [
      'Decomposing complex reviews into focused passes: an initial pass for local, file-specific issues followed by a second pass for integration-level patterns that require cross-file context',
      'Designing file-by-file analysis passes that ensure consistent analysis depth across all items in a large input set, preventing attention dilution from producing inconsistent results',
      'Implementing parallel prompt chains for independent subtasks, measuring the latency improvement compared to sequential execution',
      'Choosing between sequential and parallel decomposition based on whether subtasks have data dependencies on each other\'s results'
    ]
  },
  {
    id: 'ts-4-5',
    number: '4.5',
    title: 'Apply iterative refinement techniques',
    lead: 'Test-driven iteration using concrete input/output examples and the interview pattern for progressive requirements gathering are the most effective refinement approaches for complex extraction tasks.',
    knowledge: [
      'Input/output examples for test-driven refinement: defining expected outputs for a representative set of inputs, then iterating on prompts until the model consistently produces outputs matching those expected outputs',
      'Interview pattern for progressive requirements gathering: asking clarifying questions about edge cases, format requirements, and decision rules before attempting extraction, building a shared understanding of the task before committing to a prompt design',
      'Iterative improvement based on failure analysis: systematically analysing cases where the model produces incorrect outputs to identify the underlying pattern causing errors, then targeting those patterns specifically in prompt revisions'
    ],
    skills: [
      'Defining concrete input/output example pairs to drive prompt refinement, using them as a test suite that reveals when prompt changes improve or regress performance',
      'Implementing the interview pattern for complex extraction tasks by asking the model clarifying questions about edge cases and format preferences before designing the extraction prompt',
      'Analysing extraction failures systematically to identify whether errors are caused by format misunderstanding, missing context, ambiguous instructions, or genuinely absent information — and addressing the root cause in prompt revisions'
    ]
  },
  {
    id: 'ts-4-6',
    number: '4.6',
    title: 'Optimise batch processing with the Message Batches API',
    lead: 'The Message Batches API offers 50% cost savings but has up to 24-hour processing time with no latency SLA. It is appropriate only for workflows that can tolerate deferred results.',
    knowledge: [
      'Message Batches API 50% cost savings: batch processing reduces API costs by half compared to real-time requests, making it economically attractive for high-volume workloads',
      'Up to 24-hour processing window, no guaranteed latency SLA: batch requests may take up to 24 hours to complete — the API does not guarantee faster completion even when server load is low',
      'No multi-turn tool calling support in batch mode: the Message Batches API does not support agentic loops with tool calling — only single-turn requests are supported',
      'custom_id for request/response correlation: each request in a batch includes a custom_id field that is preserved in the response, enabling correct matching of responses to the original requests even when responses arrive out of order',
      'When batch vs real-time is appropriate: batch for deferred, latency-tolerant workloads (overnight reports, bulk processing); real-time for blocking user-facing workflows or operations where a developer or user is waiting for the result'
    ],
    skills: [
      'Evaluating workflow latency tolerance to determine whether batch processing is appropriate — identifying which workflows can accept up to 24-hour processing and which require real-time responses',
      'Implementing batch submission with custom_id tracking to correctly correlate batch responses with original requests, especially for failed items that require resubmission',
      'Handling batch failures by custom_id — identifying which specific requests failed, diagnosing the failure cause (e.g., document too large), and resubmitting with modifications',
      'Choosing between Message Batches API and real-time API for each workflow based on latency requirements rather than applying batch processing universally for cost savings'
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

export default function CcaDomain4Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#4f46e5', '--accent-soft': '#e0e7ff' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CCA Foundations — Domain 4</p>
          <h1>Prompt Engineering <span>&amp; Structured Output</span></h1>
          <p className="lead">
            20% of the exam. Covers tool_use schema design for reliable structured extraction, validation-retry loops, few-shot prompting for ambiguous cases, prompt chaining for attention management, iterative refinement, and Message Batches API optimisation.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#ts-4-1">Start studying</a>
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
            <h3>Domain 4 at a Glance</h3>
            <div className="model-list">
              <div className="model-row"><strong>Weight</strong><span>20% of exam</span></div>
              <div className="model-row"><strong>Task Statements</strong><span>6 (4.1 – 4.6)</span></div>
              <div className="model-row"><strong>Key Technologies</strong><span>tool_use, tool_choice, JSON Schema, Pydantic, Message Batches API, few-shot prompting, prompt chaining, custom_id</span></div>
              <div className="model-row"><strong>Primary Scenario</strong><span>Structured Data Extraction, Developer Productivity Pipeline</span></div>
            </div>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="overview"
          eyebrow="Domain Overview"
          title="What this domain covers and why it matters"
          lead="Domain 4 tests structured output design, validation architecture, and the prompt engineering decisions that separate reliable production systems from brittle one-shot solutions."
        >
          <div className="notes-grid">
            {[
              ['tool_use is not optional for guaranteed structured output', 'System prompt instructions to "respond in JSON" are unreliable — the model may deviate when it encounters unusual inputs. tool_use with tool_choice forces the model to use the schema, providing guaranteed structure. This is the single most important distinction for structured extraction pipelines.'],
              ['Nullable fields prevent hallucination', 'Marking a field as required when the source document may not contain that information causes the model to fabricate a value to satisfy the schema. The fix is nullable fields (type: ["string", "null"]) — the model returns null instead of fabricating. This is tested directly in extraction scenarios.'],
              ['Batch API is for latency-tolerant workflows only', 'The Message Batches API offers 50% cost savings but has no latency SLA (up to 24 hours). Questions will present workflows where some operations are blocking (pre-merge checks) and some are deferred (overnight reports). The correct answer always matches each workflow to the appropriate API based on its latency requirement.'],
              ['Multi-pass review beats single-pass for large inputs', 'When a model processes 14 files in a single context, attention dilution produces inconsistent results — some files receive detailed analysis, others receive superficial comments. Splitting into file-by-file passes (local issues) and then an integration pass (cross-file patterns) ensures consistent depth and catches different issue types at the right granularity.']
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
          title="Schema design, validation loops, few-shot targeting, and multi-pass review"
          lead="The most exam-tested prompt engineering patterns — with correct and incorrect implementations side by side."
        >
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Schema Design"
            title="Required field on absent information causes hallucination"
            code={`# RISKY: "delivery_date" is required but many orders have no delivery date yet.
# The model will fabricate a plausible date rather than leave a required field empty.
{
  "name": "extract_order",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id":      { "type": "string" },
      "amount":        { "type": "number" },
      "delivery_date": { "type": "string" }   # may not exist in document
    },
    "required": ["order_id", "amount", "delivery_date"]  # forces hallucination
  }
}`}
          />
          <ExampleCard
            variant="correct"
            label="Correct — Schema Design"
            title="Nullable fields + only required what is guaranteed to exist"
            code={`# CORRECT: nullable type allows null when information is absent.
# Model returns null instead of fabricating.
{
  "name": "extract_order",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": { "type": "string" },
      "amount":   { "type": "number" },
      "delivery_date": {
        "type": ["string", "null"],   # nullable — returns null if absent
        "description": "Delivery date if shipped, null if pending"
      },
      "status": {
        "type": "string",
        "enum": ["pending", "shipped", "delivered", "cancelled", "other"],
        "description": "Use 'other' for statuses not in the list"
      },
      "status_detail": {
        "type": ["string", "null"],
        "description": "Required when status is 'other' — describe the actual status"
      }
    },
    "required": ["order_id", "amount"]   # only fields always present
  }
}`}
            note='Rule: only mark fields "required" if they are GUARANTEED to be in every source document. For everything else: nullable. Add an "other" + detail field to enums to handle novel values without breaking parsers.'
          />
          <ExampleCard
            variant="pattern"
            label="Pattern — Validation-Retry Loop"
            title="Include the failed extraction + specific error in the retry prompt"
            code={`def extract_with_retry(document: str, max_retries: int = 2):
    messages = [{"role": "user", "content": document}]

    for attempt in range(max_retries + 1):
        response = client.messages.create(
            model="claude-opus-4-5",
            tools=[extraction_tool],
            tool_choice={"type": "tool", "name": "extract_order"},
            messages=messages
        )
        extracted = get_tool_result(response)

        try:
            validated = OrderSchema(**extracted)   # Pydantic semantic validation
            return validated                       # Success
        except ValidationError as e:
            if attempt >= max_retries:
                raise ExtractionError(f"Max retries exceeded: {e}")

            # Add failed attempt + error to context — targeted correction, not re-extraction
            messages.append({"role": "assistant", "content": response.content})
            messages.append({
                "role": "user",
                "content": f"Validation failed:\\n{e}\\n\\nCorrect only the invalid fields."
            })`}
            note="Retries work for format mismatches (wrong field type, wrong date format). They fail for absent information — if the data is not in the document, retrying cannot create it. Distinguish the two cases before retrying."
          />
          <ExampleCard
            variant="correct"
            label="Correct — Few-Shot Targeting"
            title="Target examples at boundary cases, not all inputs"
            code={`system_prompt = """Extract order intent from customer messages.

# Few-shot examples — for BOUNDARY CASES ONLY
# (clear cases like "refund order 1234" do not need examples)

User: "I want to return order 1234 please"
→ { "intent": "return_request", "order_id": "1234", "amount": null }

User: "order 1234 refund $50"
→ { "intent": "refund_request", "order_id": "1234", "amount": 50.00 }

User: "what happened to my package"
→ { "intent": "status_inquiry", "order_id": null, "amount": null }
# NOTE: do NOT invent an order_id when the user did not provide one.

User: "I ordered the wrong size, item 9876, can I exchange?"
→ { "intent": "exchange_request", "order_id": "9876", "amount": null }
"""`}
            note="Few-shot examples are valuable for boundary cases where the model would otherwise generalise incorrectly. Adding examples for clear, unambiguous cases wastes tokens without improving accuracy."
          />
          <ExampleCard
            variant="pattern"
            label="Pattern — Multi-Pass Review"
            title="File-by-file local pass then integration pass for 14+ file PRs"
            code={`# SINGLE-PASS (wrong for large PRs — causes attention dilution):
# prompt = f"Review all 14 files: {all_files}"
# → detailed comments on files 1-3, superficial on files 4-14

# MULTI-PASS (correct):

# Pass 1: file-by-file local analysis — consistent depth across all files
file_reviews = []
for file in changed_files:
    review = client.messages.create(messages=[{
        "role": "user",
        "content": f"Review {file.name} for LOCAL issues only "
                   f"(logic errors, security, null checks, style):\\n{file.content}"
    }])
    file_reviews.append(f"## {file.name}\\n{review.content[0].text}")

# Pass 2: integration analysis — cross-file concerns
integration = client.messages.create(messages=[{
    "role": "user",
    "content": f"Review CROSS-FILE issues (data flow, shared state, "
               f"API contracts, consistency):\\n{'\\n'.join(file_reviews)}"
}])`}
            note="Pass 1 catches local bugs consistently across all files. Pass 2 catches cross-file patterns that require seeing the full picture. Neither pass is redundant — they target different issue types."
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
              <div className="note-card-header"><h3>Domain 3</h3><p>Claude Code Configuration &amp; Workflows — 20%</p></div>
              <a className="btn" href="/cca/domain-3.html">Study Domain 3</a>
            </article>
            <article className="note-card model-note">
              <div className="note-card-header"><h3>Domain 5</h3><p>Context Management &amp; Reliability — 15%</p></div>
              <a className="btn" href="/cca/domain-5.html">Study Domain 5</a>
            </article>
          </div>
        </section>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
