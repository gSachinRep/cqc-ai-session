import React, { useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Examples', href: '#examples' },
  { label: '1.1 Agentic Loops', href: '#ts-1-1' },
  { label: '1.2 Multi-Agent Systems', href: '#ts-1-2' },
  { label: '1.3 Task Tool & Subagents', href: '#ts-1-3' },
  { label: '1.4 Hooks & Interception', href: '#ts-1-4' },
  { label: '1.5 Session State & Recovery', href: '#ts-1-5' },
  { label: '1.6 Iterative Refinement', href: '#ts-1-6' },
  { label: '1.7 Context Passing & Isolation', href: '#ts-1-7' }
]

const taskStatements = [
  {
    id: 'ts-1-1',
    number: '1.1',
    title: 'Design and implement agentic loops with appropriate control flow',
    lead: 'Build loops that correctly handle stop_reason values, manage multi-turn tool execution, and avoid infinite loops.',
    knowledge: [
      'stop_reason handling: "tool_use" means the model wants to call a tool and the loop should continue; "end_turn" means the model has finished and the loop should exit',
      'Multi-turn tool execution: the pattern of sending tool results back in subsequent API calls to continue the conversation',
      'Agentic loop control flow: checking stop_reason before deciding whether to execute tools or present the final response',
      'Avoiding infinite loops and state tracking: implementing turn limits, tracking tool call history, and detecting cycles',
      'Trade-offs between sequential and parallel tool execution: sequential is safer and easier to debug; parallel reduces latency for independent operations'
    ],
    skills: [
      'Implementing loops that continue until stop_reason equals "end_turn", correctly routing "tool_use" responses to tool execution',
      'Checking stop_reason before tool execution to ensure the model has actually requested a tool call',
      'Building multi-issue support agents that decompose complex customer requests into separate tool calls, handle each, and synthesise a unified response',
      'Implementing state tracking (turn counters, visited tool call sets) to prevent infinite loops in production agentic systems',
      'Designing parallel subagent execution when tasks are independent and latency reduction is a priority'
    ]
  },
  {
    id: 'ts-1-2',
    number: '1.2',
    title: 'Orchestrate multi-agent systems using coordinator-subagent patterns',
    lead: 'Design coordinator agents that decompose tasks, delegate to subagents with explicit context, and synthesise results.',
    knowledge: [
      'How to pass context to subagents: inject findings directly into the subagent\'s initial prompt rather than relying on automatic context inheritance from the coordinator',
      'Why subagents need explicit context: subagents do not automatically inherit the coordinator\'s conversation history — they only see what is explicitly included in their prompt',
      'The coordinator\'s role in decomposing complex tasks into subtasks, delegating each subtask to appropriate subagents, and synthesising the results',
      'When to use parallel vs sequential subagent execution: parallel for independent research tasks that do not depend on each other\'s results; sequential when each step depends on the previous'
    ],
    skills: [
      'Designing coordinator agents that decompose complex tasks into clear, well-scoped subtasks with appropriate subagent assignments',
      'Injecting relevant coordinator findings directly into subagent prompts so each subagent has the context it needs without inheriting the full conversation',
      'Implementing parallel subagent execution via multiple Task tool calls in a single coordinator response to reduce overall latency',
      'Designing synthesis steps that combine subagent findings into coherent final outputs while preserving source attribution',
      'Implementing iterative refinement loops where coordinator evaluates subagent output and re-delegates when quality thresholds are not met'
    ]
  },
  {
    id: 'ts-1-3',
    number: '1.3',
    title: 'Implement and configure the Task tool for subagent delegation',
    lead: 'Use the Task tool to spawn subagents with appropriate allowedTools, context isolation, and structured output requirements.',
    knowledge: [
      'The Task tool as the primary mechanism for spawning subagents within the Claude Agent SDK, enabling coordinators to delegate work to isolated agent instances',
      'allowedTools configuration: restricting which tools a subagent can access, applying the principle of least privilege to agent capabilities',
      'How context isolation works in subagents: each subagent starts with only the context provided in its prompt, not the coordinator\'s conversation history',
      'Difference between user-scoped and project-scoped tool permissions and when each applies'
    ],
    skills: [
      'Configuring the Task tool with appropriate allowedTools to restrict subagent capabilities to only what is needed for their specific task',
      'Designing subagent prompts that include all necessary context — task description, relevant data, output format requirements — so subagents can work independently',
      'Implementing a coordinator that uses the Task tool to spawn multiple subagents, collects their outputs, and synthesises results',
      'Structuring subagent output formats so the coordinator can reliably parse and combine findings from multiple agents'
    ]
  },
  {
    id: 'ts-1-4',
    number: '1.4',
    title: 'Design hooks and tool interception patterns',
    lead: 'Use PostToolUse hooks and programmatic interception to enforce business rules deterministically rather than relying on prompt-based compliance.',
    knowledge: [
      'PostToolUse hooks: mechanisms that execute after a tool call completes, enabling inspection of tool results and enforcement of downstream constraints',
      'Tool call interception for business logic enforcement: blocking or redirecting subsequent tool calls based on programmatic conditions',
      'How to implement programmatic prerequisites: requiring a specific tool to have been called (and returned a verified result) before allowing subsequent tool calls',
      'Hooks as deterministic enforcement vs prompt-based approaches: programmatic gates provide guaranteed compliance that prompt instructions alone cannot deliver when errors have financial or safety consequences'
    ],
    skills: [
      'Implementing PostToolUse hooks that inspect tool results and enforce business rules (e.g., blocking order operations until customer identity is verified)',
      'Creating programmatic gates that block subsequent tool calls until prerequisite tools have returned verified results',
      'Designing tool interception patterns for compliance and business rule enforcement that go beyond what system prompt instructions can reliably achieve',
      'Using hooks to redirect workflows to escalation paths when thresholds or policy conditions are triggered'
    ]
  },
  {
    id: 'ts-1-5',
    number: '1.5',
    title: 'Manage session state and implement crash recovery',
    lead: 'Use fork_session, named sessions, and structured state manifests to preserve work across context boundaries and recover from failures.',
    knowledge: [
      'fork_session for context isolation: creating a new session branch that inherits current context but prevents exploration output from polluting the main coordinator context',
      'Session naming and resumption: using named sessions to enable reliable resumption of work across interruptions or failures',
      'Structured state persistence for crash recovery: each agent exports its current state to a known location at regular intervals so a coordinator can resume from the last checkpoint',
      'How to design manifests that coordinators load on resume: structured summaries of completed work, current position in the task, and pending steps'
    ],
    skills: [
      'Implementing fork_session to isolate subagent exploration from the main coordinator context, preventing verbose exploration output from consuming the coordinator\'s context budget',
      'Designing state manifests for crash recovery that capture enough information for a coordinator to resume mid-task without restarting from scratch',
      'Building coordinators that load and inject state manifests when resuming interrupted workflows',
      'Managing named sessions to enable reliable session resumption when long-running tasks span multiple context windows or time periods'
    ]
  },
  {
    id: 'ts-1-6',
    number: '1.6',
    title: 'Design iterative refinement architectures',
    lead: 'Build multi-pass review systems, interview patterns, and test-driven iteration loops to improve output quality systematically.',
    knowledge: [
      'Interview pattern for requirements gathering: asking clarifying questions before beginning execution to avoid misunderstanding the task and producing outputs that miss the actual need',
      'Test-driven iteration using input/output examples: defining expected outputs for sample inputs and iterating on prompts until the model produces outputs matching those examples',
      'Sequential vs parallel issue resolution: sequential when each issue depends on resolving the previous; parallel when issues are independent and simultaneous resolution is more efficient',
      'Multi-pass review architectures for attention management: splitting large reviews into focused passes (one pass per concern) to prevent attention dilution when analysing many files or issues at once'
    ],
    skills: [
      'Designing interview patterns that gather requirements and constraints before beginning execution, reducing costly rework from misunderstood requirements',
      'Implementing test-driven refinement using concrete input/output examples to measure and improve prompt quality systematically',
      'Building multi-pass review systems that separate file-level analysis from integration-level analysis, ensuring consistent depth across all items',
      'Structuring parallel vs sequential issue decomposition based on whether subtasks have dependencies'
    ]
  },
  {
    id: 'ts-1-7',
    number: '1.7',
    title: 'Implement subagent context passing and isolation',
    lead: 'Pass exactly the context each subagent needs, no more and no less, to maintain isolation between parallel agents and prevent context budget overrun.',
    knowledge: [
      'Subagents do not automatically inherit conversation context from the coordinator — each subagent starts fresh with only what is explicitly provided in its initial prompt',
      'Why explicit context injection is necessary: relying on automatic context inheritance produces subagents that lack required information or inherit irrelevant context that wastes their context budget',
      'How context isolation prevents contamination between parallel subagents: each subagent sees only its own findings, preventing one agent\'s results from biasing another\'s analysis',
      'Designing subagent outputs for downstream processing: structuring findings so the coordinator can reliably extract, compare, and combine results from multiple subagents'
    ],
    skills: [
      'Extracting only the relevant context for each subagent from the coordinator\'s knowledge, avoiding over-provision of context that wastes subagent context budgets',
      'Structuring subagent prompts to include all necessary information — task scope, relevant data, output format requirements — as a self-contained prompt',
      'Designing subagent output formats (structured JSON, claim-source pairs, annotated findings) that the coordinator can reliably process without ambiguity',
      'Implementing parallel subagent execution while managing each subagent\'s context budget so no single subagent exhausts its window on irrelevant inherited context'
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

export default function CcaDomain1Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#4f46e5', '--accent-soft': '#e0e7ff' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CCA Foundations — Domain 1</p>
          <h1>Agentic Architecture <span>&amp; Orchestration</span></h1>
          <p className="lead">
            The largest domain at 27% of the exam. Covers agentic loop design, coordinator-subagent orchestration, the Task tool, PostToolUse hooks, session state management, iterative refinement, and context passing.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#ts-1-1">Start studying</a>
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
            <h3>Domain 1 at a Glance</h3>
            <div className="model-list">
              <div className="model-row"><strong>Weight</strong><span>27% of exam</span></div>
              <div className="model-row"><strong>Task Statements</strong><span>7 (1.1 – 1.7)</span></div>
              <div className="model-row"><strong>Key Technologies</strong><span>Claude Agent SDK, Task tool, PostToolUse hooks, fork_session, stop_reason</span></div>
              <div className="model-row"><strong>Primary Scenario</strong><span>Customer Support Resolution Agent, Multi-Agent Research System</span></div>
            </div>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="overview"
          eyebrow="Domain Overview"
          title="What this domain covers and why it matters"
          lead="Domain 1 tests whether you can design reliable, production-quality agentic systems — not just write a loop that works in the happy path."
        >
          <div className="notes-grid">
            {[
              ['The core challenge', 'Most agentic loop failures are not model failures — they are control flow failures. This domain tests whether you can design loops that handle all stop_reason values correctly, track state to prevent infinite loops, and pass context between agents without relying on automatic inheritance.'],
              ['Why hooks beat prompts for enforcement', 'When business rules must always be followed (e.g., verify identity before processing a refund), programmatic enforcement via PostToolUse hooks provides deterministic guarantees that prompt instructions alone cannot. The exam tests whether you choose the right enforcement mechanism for the stakes involved.'],
              ['Coordinator-subagent decomposition', 'The exam will present scenarios where the coordinator decomposes tasks incorrectly (too narrow, missing domains) or passes context incorrectly (relying on automatic inheritance). You need to identify the root cause and the most proportionate fix.'],
              ['Iterative refinement over one-shot', 'Multi-pass review architectures, interview patterns, and test-driven iteration are all tested. The core insight is that attention dilution in single-pass analysis of large inputs produces inconsistent quality — splitting into focused passes solves this.']
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
          title="Code patterns for agentic loops, context passing, and hooks"
          lead="These examples show correct and incorrect implementations for the most exam-tested patterns in Domain 1."
        >
          <ExampleCard
            variant="correct"
            label="Correct — Agentic Loop"
            title="Check stop_reason to control the loop"
            code={`# CORRECT: check stop_reason to decide what to do next
while True:
    response = client.messages.create(
        model="claude-opus-4-5",
        tools=tools,
        messages=messages
    )
    messages.append({"role": "assistant", "content": response.content})

    if response.stop_reason == "end_turn":
        # Model finished — present final response and exit
        break
    elif response.stop_reason == "tool_use":
        # Model wants a tool — execute it and return the result
        tool_results = execute_tools(response.content)
        messages.append({"role": "user", "content": tool_results})
    else:
        break  # Unknown stop_reason — safe exit`}
            note='Key rule: "tool_use" means continue the loop; "end_turn" means exit. Always check stop_reason before deciding what to do — never assume.'
          />
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Agentic Loop"
            title="Missing exit condition causes stuck loop"
            code={`# INCORRECT: only handles tool_use — never exits cleanly on end_turn
for _ in range(10):  # Turn limit as a patch, not a real fix
    response = client.messages.create(...)
    if response.stop_reason == "tool_use":
        tool_results = execute_tools(response.content)
        messages.append({"role": "user", "content": tool_results})
    # BUG: no else branch — when stop_reason is "end_turn" the loop
    # continues, fires another API call, and produces an empty confused response`}
            note='This pattern wastes API calls and can produce garbled final responses. Always have an explicit exit for "end_turn".'
          />
          <ExampleCard
            variant="correct"
            label="Correct — Context Passing"
            title="Inject context explicitly into the subagent prompt"
            code={`# CORRECT: subagent receives all context it needs in its own prompt
findings = "Customer: Jane Smith (ID: C-4521) · Order #8810 · $134.00 · shipped 2024-01-10"

subagent_prompt = f"""You are a returns specialist. Case context:
{findings}

Task: Determine return eligibility and draft a response.
Output JSON: {{ "eligible": bool, "reason": str, "draft_response": str }}
"""
result = sdk.run_agent(
    prompt=subagent_prompt,
    allowed_tools=["lookup_return_policy"]
)`}
            note="Subagents start fresh — they only see what you put in their prompt. Always inject the coordinator's findings explicitly."
          />
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Context Passing"
            title="Relying on automatic context inheritance (does not work)"
            code={`# INCORRECT: assumes subagent inherits the coordinator's context — it does NOT
result = sdk.run_agent(
    prompt="Determine return eligibility and draft a response.",
    allowed_tools=["lookup_return_policy"]
    # Missing: customer name, order ID, amount, everything the subagent needs.
    # The subagent will ask for information it should already have,
    # or fabricate plausible-sounding but incorrect data.
)`}
            note="Subagents do NOT inherit the coordinator's conversation history. This is one of the most common multi-agent mistakes tested on the exam."
          />
          <ExampleCard
            variant="pattern"
            label="Pattern — PostToolUse Hook"
            title="Programmatic prerequisite enforcement (deterministic, not prompt-based)"
            code={`# HOOK: blocks process_refund until get_customer has verified the customer
def post_tool_use_hook(tool_name, tool_result, session):
    if tool_name == "process_refund":
        verified_id = session.get("verified_customer_id")
        if not verified_id:
            return {
                "block": True,
                "message": "Identity must be verified before refunds. Call get_customer first.",
                "redirect": "escalation_workflow"
            }
    # Store verified ID after get_customer succeeds
    if tool_name == "get_customer" and tool_result.get("verified"):
        session["verified_customer_id"] = tool_result["customer_id"]
    return {"block": False}`}
            note="Prompt instructions like 'always verify before refunding' are probabilistic. A hook that blocks the tool call is deterministic. For financial operations, use the hook."
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
              <div className="note-card-header"><h3>Domain 2</h3><p>Tool Design &amp; MCP Integration — 18%</p></div>
              <a className="btn" href="/cca/domain-2.html">Study Domain 2</a>
            </article>
            <article className="note-card model-note">
              <div className="note-card-header"><h3>CCA Overview</h3><p>Return to the exam guide hub</p></div>
              <a className="btn" href="/cca/">Back to overview</a>
            </article>
          </div>
        </section>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
