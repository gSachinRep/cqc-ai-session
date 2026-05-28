import React, { useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Customer Support Agent', href: '#scenario-1' },
  { label: 'Code Generation', href: '#scenario-2' },
  { label: 'Multi-Agent Research', href: '#scenario-3' },
  { label: 'CI/CD Integration', href: '#scenario-4' }
]

const scenarios = [
  {
    id: 'scenario-1',
    title: 'Customer Support Resolution Agent',
    lead: 'Questions from this scenario test tool sequencing, escalation calibration, and context management in a support agent that handles customer identity verification, order lookups, and refund processing.',
    questions: [
      {
        number: 1,
        question: 'Production data shows that in 12% of cases, your agent skips get_customer entirely and calls lookup_order using only the customer\'s stated name, occasionally leading to misidentified accounts and incorrect refunds. What change would most effectively address this reliability issue?',
        options: [
          { letter: 'A', text: 'Add a programmatic prerequisite that blocks lookup_order and process_refund calls until get_customer has returned a verified customer ID.' },
          { letter: 'B', text: 'Enhance the system prompt to state that customer verification via get_customer is mandatory before any order operations.' },
          { letter: 'C', text: 'Add few-shot examples showing the agent always calling get_customer first, even when customers volunteer order details.' },
          { letter: 'D', text: 'Implement a routing classifier that analyses each request and enables only the subset of tools appropriate for that request type.' }
        ],
        correct: 'A',
        explanation: 'When a specific tool sequence is required for critical business logic (like verifying customer identity before processing refunds), programmatic enforcement provides deterministic guarantees that prompt-based approaches cannot. Options B and C rely on probabilistic LLM compliance, which is insufficient when errors have financial consequences. Option D addresses tool availability rather than tool ordering, which is not the actual problem.'
      },
      {
        number: 2,
        question: 'Production logs show the agent frequently calls get_customer when users ask about orders (e.g., "check my order #12345"), instead of calling lookup_order. Both tools have minimal descriptions ("Retrieves customer information" / "Retrieves order details") and accept similar identifier formats. What is the most effective first step to improve tool selection reliability?',
        options: [
          { letter: 'A', text: 'Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5-8 examples showing order-related queries routing to lookup_order.' },
          { letter: 'B', text: 'Expand each tool\'s description to include input formats it handles, example queries, edge cases, and boundaries explaining when to use it vs similar tools.' },
          { letter: 'C', text: 'Implement a routing layer that parses user input before each turn and pre-selects the appropriate tool based on detected keywords and identifier patterns.' },
          { letter: 'D', text: 'Consolidate both tools into a single lookup_entity tool that accepts any identifier and internally determines which backend to query.' }
        ],
        correct: 'B',
        explanation: 'Tool descriptions are the primary mechanism LLMs use for tool selection. When descriptions are minimal, models lack the context to differentiate between similar tools. Option B directly addresses this root cause with a low-effort, high-leverage fix. Few-shot examples (A) add token overhead without fixing the underlying issue. A routing layer (C) is over-engineered and bypasses the LLM\'s natural language understanding. Consolidating tools (D) is a valid architectural choice but requires more effort than a "first step" warrants when the immediate problem is inadequate descriptions.'
      },
      {
        number: 3,
        question: 'Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates straightforward cases (standard damage replacements with photo evidence) while attempting to autonomously handle complex situations requiring policy exceptions. What is the most effective way to improve escalation calibration?',
        options: [
          { letter: 'A', text: 'Add explicit escalation criteria to your system prompt with few-shot examples demonstrating when to escalate vs resolve autonomously.' },
          { letter: 'B', text: 'Have the agent self-report a confidence score (1-10) before each response and automatically route requests to humans when confidence falls below a threshold.' },
          { letter: 'C', text: 'Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent begins processing.' },
          { letter: 'D', text: 'Implement sentiment analysis to detect customer frustration levels and automatically escalate when negative sentiment exceeds a threshold.' }
        ],
        correct: 'A',
        explanation: 'Adding explicit escalation criteria with few-shot examples directly addresses the root cause: unclear decision boundaries. This is the proportionate first response before adding infrastructure. Option B fails because LLM self-reported confidence is poorly calibrated — the agent is already incorrectly confident on hard cases. Option C is over-engineered, requiring labelled data and ML infrastructure when prompt optimisation has not been tried. Option D solves a different problem entirely; sentiment does not correlate with case complexity, which is the actual issue.'
      }
    ]
  },
  {
    id: 'scenario-2',
    title: 'Code Generation with Claude Code',
    lead: 'Questions from this scenario test Claude Code configuration: CLAUDE.md hierarchies, custom slash commands, path-specific rules, plan mode decisions, and CI/CD integration.',
    questions: [
      {
        number: 4,
        question: 'You want to create a custom /review slash command that runs your team\'s standard code review checklist. This command should be available to every developer when they clone or pull the repository. Where should you create this command file?',
        options: [
          { letter: 'A', text: 'In the .claude/commands/ directory in the project repository.' },
          { letter: 'B', text: 'In ~/.claude/commands/ in each developer\'s home directory.' },
          { letter: 'C', text: 'In the CLAUDE.md file at the project root.' },
          { letter: 'D', text: 'In a .claude/config.json file with a commands array.' }
        ],
        correct: 'A',
        explanation: 'Project-scoped custom slash commands should be stored in the .claude/commands/ directory within the repository. These commands are version-controlled and automatically available to all developers when they clone or pull the repo. Option B (~/.claude/commands/) is for personal commands that are not shared via version control. Option C (CLAUDE.md) is for project instructions and context, not command definitions. Option D describes a configuration mechanism that does not exist in Claude Code.'
      },
      {
        number: 5,
        question: 'You have been assigned to restructure the team\'s monolithic application into microservices. This will involve changes across dozens of files and requires decisions about service boundaries and module dependencies. Which approach should you take?',
        options: [
          { letter: 'A', text: 'Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes.' },
          { letter: 'B', text: 'Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries.' },
          { letter: 'C', text: 'Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured.' },
          { letter: 'D', text: 'Begin in direct execution mode and only switch to plan mode if you encounter unexpected complexity during implementation.' }
        ],
        correct: 'A',
        explanation: 'Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, and architectural decisions — exactly what monolith-to-microservices restructuring requires. It enables safe codebase exploration and design before committing to changes. Option B risks costly rework when dependencies are discovered late. Option C assumes you already know the right structure without exploring the code. Option D ignores that the complexity is already stated in the requirements, not something that might emerge later.'
      },
      {
        number: 6,
        question: 'Your codebase has distinct areas with different coding conventions: React components use functional style with hooks, API handlers use async/await with specific error handling, and database models follow a repository pattern. Test files are spread throughout the codebase alongside the code they test (e.g., Button.test.tsx next to Button.tsx), and you want all tests to follow the same conventions regardless of location. What is the most maintainable way to ensure Claude automatically applies the correct conventions when generating code?',
        options: [
          { letter: 'A', text: 'Create rule files in .claude/rules/ with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths.' },
          { letter: 'B', text: 'Consolidate all conventions in the root CLAUDE.md file under headers for each area, relying on Claude to infer which section applies.' },
          { letter: 'C', text: 'Create skills in .claude/skills/ for each code type that include the relevant conventions in their SKILL.md files.' },
          { letter: 'D', text: 'Place a separate CLAUDE.md file in each subdirectory containing that area\'s specific conventions.' }
        ],
        correct: 'A',
        explanation: '.claude/rules/ with glob patterns (e.g., **/*.test.tsx) allows conventions to be automatically applied based on file paths regardless of directory location — essential for test files spread throughout the codebase. Option B relies on inference rather than explicit matching, making it unreliable. Option C requires manual skill invocation or relies on Claude choosing to load them, contradicting the need for deterministic "automatic" application based on file paths. Option D cannot easily handle files spread across many directories since CLAUDE.md files are directory-bound.'
      }
    ]
  },
  {
    id: 'scenario-3',
    title: 'Multi-Agent Research System',
    lead: 'Questions from this scenario test coordinator-subagent orchestration, task decomposition, context passing, error propagation, and synthesis with provenance tracking.',
    questions: [
      {
        number: 7,
        question: 'After running the system on the topic "impact of AI on creative industries," you observe that each subagent completes successfully: the web search agent finds relevant articles, the document analysis agent summarises papers correctly, and the synthesis agent produces coherent output. However, the final reports cover only visual arts, completely missing music, writing, and film production. When you examine the coordinator\'s logs, you see it decomposed the topic into three subtasks: "AI in digital art creation," "AI in graphic design," and "AI in photography." What is the most likely root cause?',
        options: [
          { letter: 'A', text: 'The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives from other agents.' },
          { letter: 'B', text: 'The coordinator agent\'s task decomposition is too narrow, resulting in subagent assignments that do not cover all relevant domains of the topic.' },
          { letter: 'C', text: 'The web search agent\'s queries are not comprehensive enough and need to be expanded to cover more creative industry sectors.' },
          { letter: 'D', text: 'The document analysis agent is filtering out sources related to non-visual creative industries due to overly restrictive relevance criteria.' }
        ],
        correct: 'B',
        explanation: 'The coordinator\'s logs reveal the root cause directly: it decomposed "creative industries" into only visual arts subtasks (digital art, graphic design, photography), completely omitting music, writing, and film. The subagents executed their assigned tasks correctly — the problem is what they were assigned. Options A, C, and D incorrectly blame downstream agents that are working correctly within their assigned scope.'
      },
      {
        number: 8,
        question: 'The web search subagent times out while researching a complex topic. You need to design how this failure information flows back to the coordinator agent. Which error propagation approach best enables intelligent recovery?',
        options: [
          { letter: 'A', text: 'Return structured error context to the coordinator including the failure type, the attempted query, any partial results, and potential alternative approaches.' },
          { letter: 'B', text: 'Implement automatic retry logic with exponential backoff within the subagent, returning a generic "search unavailable" status only after all retries are exhausted.' },
          { letter: 'C', text: 'Catch the timeout within the subagent and return an empty result set marked as successful.' },
          { letter: 'D', text: 'Propagate the timeout exception directly to a top-level handler that terminates the entire research workflow.' }
        ],
        correct: 'A',
        explanation: 'Structured error context gives the coordinator the information it needs to make intelligent recovery decisions — whether to retry with a modified query, try an alternative approach, or proceed with partial results. Option B\'s generic status hides valuable context from the coordinator, preventing informed decisions. Option C suppresses the error by marking failure as success, which prevents any recovery and risks incomplete research outputs. Option D terminates the entire workflow unnecessarily when recovery strategies could succeed.'
      },
      {
        number: 9,
        question: 'During testing, you observe that the synthesis agent frequently needs to verify specific claims while combining findings. Currently, when verification is needed, the synthesis agent returns control to the coordinator, which invokes the web search agent, then re-invokes synthesis with results. This adds 2-3 round trips per task and increases latency by 40%. Your evaluation shows that 85% of these verifications are simple fact-checks (dates, names, statistics) while 15% require deeper investigation. What is the most effective approach to reduce overhead while maintaining system reliability?',
        options: [
          { letter: 'A', text: 'Give the synthesis agent a scoped verify_fact tool for simple lookups, while complex verifications continue delegating to the web search agent through the coordinator.' },
          { letter: 'B', text: 'Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end of its pass, which then sends them all to the web search agent at once.' },
          { letter: 'C', text: 'Give the synthesis agent access to all web search tools so it can handle any verification need directly without round-trips through the coordinator.' },
          { letter: 'D', text: 'Have the web search agent proactively cache extra context around each source during initial research, anticipating what the synthesis agent might need to verify.' }
        ],
        correct: 'A',
        explanation: 'Option A applies the principle of least privilege by giving the synthesis agent only what it needs for the 85% common case (simple fact verification) while preserving the existing coordination pattern for complex cases. Option B\'s batching approach creates blocking dependencies since synthesis steps may depend on earlier verified facts. Option C over-provisions the synthesis agent, violating separation of concerns. Option D relies on speculative caching that cannot reliably predict what the synthesis agent will need to verify.'
      }
    ]
  },
  {
    id: 'scenario-4',
    title: 'CI/CD Integration & Structured Data Extraction',
    lead: 'Questions from this scenario test Claude Code CLI automation, batch processing decisions, multi-pass review architectures, and structured extraction pipeline design.',
    questions: [
      {
        number: 10,
        question: 'Your pipeline script runs claude "Analyze this pull request for security issues" but the job hangs indefinitely. Logs indicate Claude Code is waiting for interactive input. What is the correct approach to run Claude Code in an automated pipeline?',
        options: [
          { letter: 'A', text: 'Add the -p flag: claude -p "Analyze this pull request for security issues"' },
          { letter: 'B', text: 'Set the environment variable CLAUDE_HEADLESS=true before running the command.' },
          { letter: 'C', text: 'Redirect stdin from /dev/null: claude "Analyze this pull request for security issues" < /dev/null' },
          { letter: 'D', text: 'Add the --batch flag: claude --batch "Analyze this pull request for security issues"' }
        ],
        correct: 'A',
        explanation: 'The -p (or --print) flag is the documented way to run Claude Code in non-interactive mode. It processes the prompt, outputs the result to stdout, and exits without waiting for user input — exactly what CI/CD pipelines require. The other options reference non-existent features (CLAUDE_HEADLESS environment variable, --batch flag) or use Unix workarounds that do not properly address Claude Code\'s command syntax.'
      },
      {
        number: 11,
        question: 'Your team wants to reduce API costs for automated analysis. Currently, real-time Claude calls power two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes switching both to the Message Batches API for its 50% cost savings. How should you evaluate this proposal?',
        options: [
          { letter: 'A', text: 'Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks.' },
          { letter: 'B', text: 'Switch both workflows to batch processing with status polling to check for completion.' },
          { letter: 'C', text: 'Keep real-time calls for both workflows to avoid batch result ordering issues.' },
          { letter: 'D', text: 'Switch both to batch processing with a timeout fallback to real-time if batches take too long.' }
        ],
        correct: 'A',
        explanation: 'The Message Batches API offers 50% cost savings but has processing times up to 24 hours with no guaranteed latency SLA. This makes it unsuitable for blocking pre-merge checks where developers wait for results, but ideal for overnight batch jobs like technical debt reports. Option B is wrong because relying on "often faster" completion is not acceptable for blocking workflows. Option C reflects a misconception — batch results can be correlated using custom_id fields. Option D adds unnecessary complexity when the simpler solution is matching each API to its appropriate use case.'
      },
      {
        number: 12,
        question: 'A pull request modifies 14 files across the stock tracking module. Your single-pass review analysing all files together produces inconsistent results: detailed feedback for some files but superficial comments for others, obvious bugs missed, and contradictory feedback — flagging a pattern as problematic in one file while approving identical code elsewhere in the same PR. How should you restructure the review?',
        options: [
          { letter: 'A', text: 'Split into focused passes: analyse each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow.' },
          { letter: 'B', text: 'Require developers to split large PRs into smaller submissions of 3-4 files before the automated review runs.' },
          { letter: 'C', text: 'Switch to a higher-tier model with a larger context window to give all 14 files adequate attention in one pass.' },
          { letter: 'D', text: 'Run three independent review passes on the full PR and only flag issues that appear in at least two of the three runs.' }
        ],
        correct: 'A',
        explanation: 'Splitting reviews into focused passes directly addresses the root cause: attention dilution when processing many files at once. File-by-file analysis ensures consistent depth, while a separate integration pass catches cross-file issues. Option B shifts burden to developers without improving the system. Option C misunderstands that larger context windows do not solve attention quality issues — the problem is not context size but attention dilution. Option D would actually suppress detection of real bugs by requiring consensus on issues that may only be caught intermittently.'
      }
    ]
  }
]

function QuestionCard({ q }) {
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <article className="scenario-card collapsible-card" style={{ marginBottom: '1rem' }}>
      <div style={{ padding: '1.25rem 1.25rem 1rem' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Question {q.number}</p>
        <p style={{ lineHeight: '1.7', margin: '0 0 1rem', fontWeight: '500' }}>{q.question}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          {q.options.map((opt) => (
            <div
              key={opt.letter}
              style={{
                padding: '0.6rem 0.875rem',
                borderRadius: '6px',
                background: showAnswer && opt.letter === q.correct ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.03)',
                border: showAnswer && opt.letter === q.correct ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(0,0,0,0.08)',
                lineHeight: '1.5',
                fontSize: '0.9rem'
              }}
            >
              <strong>{opt.letter})</strong> {opt.text}
            </div>
          ))}
        </div>
        <button
          className="btn"
          type="button"
          onClick={() => setShowAnswer((v) => !v)}
          style={{ marginBottom: showAnswer ? '1rem' : '0' }}
        >
          {showAnswer ? 'Hide answer' : 'Show answer'}
        </button>
        {showAnswer ? (
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
            <p style={{ margin: '0 0 0.5rem', fontWeight: '700', color: '#16a34a' }}>Correct Answer: {q.correct}</p>
            <p style={{ margin: 0, lineHeight: '1.7', color: '#444', fontSize: '0.9rem' }}>{q.explanation}</p>
          </div>
        ) : null}
      </div>
    </article>
  )
}

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

export default function CcaSampleQuestionsPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#4f46e5', '--accent-soft': '#e0e7ff' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CCA Foundations — Practice Questions</p>
          <h1>Sample <span>Exam Questions</span></h1>
          <p className="lead">
            12 practice questions drawn from the official CCA Foundations exam guide. These questions illustrate the scenario-based format and difficulty level of the real exam. Each answer includes the explanation from Anthropic's exam guide.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#scenario-1">Start practice</a>
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
            <h3>How to use these questions</h3>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: 0 }}>
              <li>Read the scenario and question carefully before looking at options.</li>
              <li>Choose your answer before clicking "Show answer."</li>
              <li>Read the full explanation — it explains why wrong options are wrong, not just why the right option is right.</li>
              <li>Use the domain study pages to go deeper on any concept you are unsure about.</li>
            </ul>
          </div>
        </aside>
      </header>

      <main>
        {scenarios.map((scenario) => (
          <CollapsibleSection
            key={scenario.id}
            id={scenario.id}
            eyebrow="Exam Scenario"
            title={scenario.title}
            lead={scenario.lead}
          >
            <div className="scenario-list">
              {scenario.questions.map((q) => <QuestionCard key={q.number} q={q} />)}
            </div>
          </CollapsibleSection>
        ))}

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Continue Studying</p>
            <h2>Return to domain study guides</h2>
          </div>
          <div className="notes-grid">
            {[
              { title: 'Domain 1', detail: 'Agentic Architecture & Orchestration — 27%', href: '/cca-domain-1.html' },
              { title: 'Domain 2', detail: 'Tool Design & MCP Integration — 18%', href: '/cca-domain-2.html' },
              { title: 'Domain 3', detail: 'Claude Code Configuration & Workflows — 20%', href: '/cca-domain-3.html' },
              { title: 'Domain 4', detail: 'Prompt Engineering & Structured Output — 20%', href: '/cca-domain-4.html' },
              { title: 'Domain 5', detail: 'Context Management & Reliability — 15%', href: '/cca-domain-5.html' },
              { title: 'CCA Overview', detail: 'Exam guide hub with all domains and preparation steps', href: '/cca.html' }
            ].map((item) => (
              <article key={item.title} className="note-card model-note">
                <div className="note-card-header">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <a className="btn" href={item.href}>Open</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
