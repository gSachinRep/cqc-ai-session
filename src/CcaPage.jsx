import React, { useState } from 'react'

const domainSummaries = [
  {
    id: 'domain-1',
    number: 'Domain 1',
    title: 'Agentic Architecture & Orchestration',
    weight: '27%',
    tasks: 7,
    lead: 'Design agentic loops, multi-agent systems, hooks, session state, and iterative refinement architectures.',
    href: '/cca/domain-1.html'
  },
  {
    id: 'domain-2',
    number: 'Domain 2',
    title: 'Tool Design & MCP Integration',
    weight: '18%',
    tasks: 5,
    lead: 'Write effective tool descriptions, implement structured error responses, configure MCP servers, and apply least privilege principles.',
    href: '/cca/domain-2.html'
  },
  {
    id: 'domain-3',
    number: 'Domain 3',
    title: 'Claude Code Configuration & Workflows',
    weight: '20%',
    tasks: 6,
    lead: 'Configure CLAUDE.md hierarchies, path-specific rules, custom slash commands, skills, and CLI automation.',
    href: '/cca/domain-3.html'
  },
  {
    id: 'domain-4',
    number: 'Domain 4',
    title: 'Prompt Engineering & Structured Output',
    weight: '20%',
    tasks: 6,
    lead: 'Design schemas for tool_use extraction, validation-retry loops, few-shot prompting, prompt chaining, and batch processing.',
    href: '/cca/domain-4.html'
  },
  {
    id: 'domain-5',
    number: 'Domain 5',
    title: 'Context Management & Reliability',
    weight: '15%',
    tasks: 6,
    lead: 'Manage context across long interactions, design escalation patterns, implement error propagation, and preserve information provenance.',
    href: '/cca/domain-5.html'
  }
]

const examScenarios = [
  {
    title: 'Customer Support Resolution Agent',
    primaryDomain: 'Domain 1 & 5',
    description: 'Design a support agent that verifies customer identity, looks up orders, processes refunds, and escalates appropriately. Tests tool sequencing, escalation calibration, and context management.'
  },
  {
    title: 'Code Generation with Claude Code',
    primaryDomain: 'Domain 3',
    description: 'Configure Claude Code for a team development workflow including CLAUDE.md hierarchies, path-specific rules, custom slash commands, plan mode decisions, and CI/CD automation.'
  },
  {
    title: 'Multi-Agent Research System',
    primaryDomain: 'Domain 1 & 5',
    description: 'Orchestrate a coordinator with web search and document analysis subagents. Tests task decomposition breadth, context passing, error propagation, and synthesis with provenance tracking.'
  },
  {
    title: 'Developer Productivity Pipeline',
    primaryDomain: 'Domain 2 & 4',
    description: 'Build a code review agent with structured output, multi-pass analysis, tool design, and validation-retry loops. Tests schema design, few-shot prompting, and attention management.'
  },
  {
    title: 'CI/CD Integration',
    primaryDomain: 'Domain 3 & 4',
    description: 'Run Claude Code in automated pipelines using the -p flag, structure output for downstream processing, and choose between real-time and batch processing based on latency requirements.'
  },
  {
    title: 'Structured Data Extraction',
    primaryDomain: 'Domain 4 & 5',
    description: 'Design extraction pipelines with JSON schemas, validation-retry loops, confidence scoring, human review routing, and batch processing using the Message Batches API.'
  }
]

const examFormat = [
  { label: 'Format', value: 'Multiple choice, scenario-based questions' },
  { label: 'Scoring', value: '100–1000 scale, passing score 720' },
  { label: 'Result', value: 'Pass / Fail' },
  { label: 'Content', value: '5 domains, 30 task statements' },
  { label: 'Version', value: '0.1 — February 2025' }
]

const prepSteps = [
  { title: 'Build an agent with the Claude Agent SDK', detail: 'Implement a complete agentic loop with tool calling, error handling, and session management. Practice spawning subagents and passing context between them.' },
  { title: 'Configure Claude Code for a real project', detail: 'Set up CLAUDE.md with a configuration hierarchy, create path-specific rules in .claude/rules/, build custom skills with frontmatter options, and integrate at least one MCP server.' },
  { title: 'Design and test MCP tools', detail: 'Write tool descriptions that clearly differentiate similar tools. Implement structured error responses with error categories and retryable flags. Test tool selection reliability with ambiguous requests.' },
  { title: 'Build a structured data extraction pipeline', detail: 'Use tool_use with JSON schemas, implement validation-retry loops, design schemas with optional/nullable fields, and practice batch processing with the Message Batches API.' },
  { title: 'Practice prompt engineering techniques', detail: 'Write few-shot examples for ambiguous scenarios. Define explicit review criteria to reduce false positives. Design multi-pass review architectures for large code reviews.' },
  { title: 'Study context management patterns', detail: 'Practice extracting structured facts from verbose tool outputs, implementing scratchpad files for long sessions, and designing subagent delegation to manage context limits.' },
  { title: 'Review escalation and human-in-the-loop patterns', detail: 'Understand when to escalate (policy gaps, customer requests, inability to progress) versus resolve autonomously. Practice designing human review workflows with confidence-based routing.' }
]

const outOfScope = [
  'Fine-tuning Claude models or training custom models',
  'Claude API authentication, billing, or account management',
  'Detailed implementation of specific programming languages beyond tool and schema configuration',
  'Deploying or hosting MCP servers (infrastructure, networking, container orchestration)',
  'Constitutional AI, RLHF, or safety training methodologies',
  'Computer use (browser automation, desktop interaction)',
  'Vision/image analysis capabilities',
  'Streaming API implementation or server-sent events',
  'Rate limiting, quotas, or API pricing calculations',
  'OAuth, API key rotation, or authentication protocol details'
]

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Exam Format', href: '#exam-format' },
  { label: 'Domains', href: '#domains' },
  { label: 'Exam Scenarios', href: '#exam-scenarios' },
  { label: 'Sample Questions', href: '/cca/sample-questions.html' },
  { label: 'How to Prepare', href: '#how-to-prepare' },
  { label: 'Out of Scope', href: '#out-of-scope' }
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

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className={`note-card collapsible-card ${tone}`}>
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}>
        <div className="collapse-copy">
          <strong>{title}</strong>
          <small>{detail}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}
    </article>
  )
}

export default function CcaPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#4f46e5', '--accent-soft': '#e0e7ff' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude Certified Architect — Foundations</p>
          <h1>CCA <span>Exam Guide</span></h1>
          <p className="lead">
            The Claude Certified Architect Foundations exam tests your ability to design, configure, and orchestrate Claude-based systems — from agentic loops and MCP integration to prompt engineering and context management.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#domains">Explore domains</a>
            <a className="btn" href="/">Back to main tutorial</a>
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
            <h3>Exam at a Glance</h3>
            <div className="model-list">
              {examFormat.map((item) => (
                <div key={item.label} className="model-row">
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </header>

      <main>
        <section id="domains" className="section">
          <div className="section-heading">
            <p className="eyebrow">Exam Domains</p>
            <h2>Five domains — 30 task statements</h2>
            <p className="lead">
              Each domain has a percentage weighting that reflects how much of the exam it covers. Open any domain to study its task statements, knowledge requirements, and skills.
            </p>
          </div>
          <div className="notes-grid">
            {domainSummaries.map((domain) => (
              <article key={domain.id} className="note-card model-note">
                <div className="note-card-header">
                  <h3>{domain.number} — {domain.weight}</h3>
                  <p><strong>{domain.title}</strong></p>
                  <p>{domain.lead}</p>
                  <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>{domain.tasks} task statements</p>
                </div>
                <a className="btn" href={domain.href}>Study domain</a>
              </article>
            ))}
          </div>
        </section>

        <CollapsibleSection
          id="exam-format"
          eyebrow="Exam Format"
          title="How the CCA Foundations exam works"
          lead="Multiple choice, scenario-based format with a 720 passing score on a 100–1000 scale."
        >
          <div className="notes-grid">
            <InfoCard
              title="Scenario-based multiple choice"
              detail="Questions are drawn from six real-world scenarios: Customer Support Resolution Agent, Code Generation with Claude Code, Multi-Agent Research System, Developer Productivity Pipeline, CI/CD Integration, and Structured Data Extraction. Each question presents a concrete production situation and asks you to select the best approach."
              tone="prompt-note"
            />
            <InfoCard
              title="Scoring and passing"
              detail="The exam is scored on a 100–1000 scale. The passing score is 720. Results are reported as Pass or Fail. There is no partial credit — each question has one correct answer."
              tone="prompt-note"
            />
            <InfoCard
              title="Exam weighting"
              detail="Domain 1 (Agentic Architecture & Orchestration) carries the most weight at 27%. Domains 3 and 4 (Claude Code Configuration and Prompt Engineering) each carry 20%. Domain 2 (Tool Design & MCP) carries 18%. Domain 5 (Context Management) carries 15%."
              tone="model-note"
            />
            <InfoCard
              title="What is tested"
              detail="The exam focuses on practical architecture and configuration decisions — not implementation of specific programming languages, infrastructure deployment, or Claude's internal training. You are expected to know which design choice is most appropriate given a production scenario, not to memorise API syntax."
              tone="model-note"
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="exam-scenarios"
          eyebrow="Exam Scenarios"
          title="The six scenarios used across the exam"
          lead="All questions are grounded in one of these six real-world production scenarios. Understanding each scenario helps you read questions with appropriate context."
        >
          <div className="notes-grid">
            {examScenarios.map((scenario) => (
              <InfoCard
                key={scenario.title}
                title={`${scenario.title} — ${scenario.primaryDomain}`}
                detail={scenario.description}
                tone="prompt-note"
              />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="how-to-prepare"
          eyebrow="How to Prepare"
          title="Exam preparation recommendations from Anthropic"
          lead="These seven steps represent the most effective preparation path based on the exam content domains."
        >
          <div className="scenario-list">
            {prepSteps.map((step, i) => (
              <article key={step.title} className="scenario-card">
                <div className="collapse-copy">
                  <strong style={{ fontSize: '0.95rem' }}>{i + 1}. {step.title}</strong>
                  <p style={{ margin: '0.5rem 0 0', lineHeight: '1.6', color: '#444' }}>{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="out-of-scope"
          eyebrow="Out of Scope"
          title="Topics that will NOT appear on the exam"
          lead="These are related areas explicitly excluded from CCA Foundations. You do not need to study them."
        >
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.9', margin: '0' }}>
            {outOfScope.map((item) => (
              <li key={item} style={{ marginBottom: '0.4rem' }}>{item}</li>
            ))}
          </ul>
        </CollapsibleSection>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Domain Study Guides</p>
            <h2>Study each domain in depth</h2>
            <p className="lead">
              Open a domain page to review every task statement with its full knowledge requirements and skills breakdown.
            </p>
          </div>
          <div className="notes-grid">
            {domainSummaries.map((domain) => (
              <article key={`nav-${domain.id}`} className="note-card model-note">
                <div className="note-card-header">
                  <h3>{domain.number}</h3>
                  <p><strong>{domain.title}</strong></p>
                  <p style={{ fontSize: '0.85rem', color: '#888' }}>{domain.weight} of exam · {domain.tasks} task statements</p>
                </div>
                <a className="btn" href={domain.href}>Open study guide</a>
              </article>
            ))}
            <article className="note-card prompt-note">
              <div className="note-card-header">
                <h3>Sample Questions</h3>
                <p><strong>Practice exam questions with answers</strong></p>
                <p style={{ fontSize: '0.85rem', color: '#888' }}>12 questions across all 6 exam scenarios with explanations</p>
              </div>
              <a className="btn" href="/cca/sample-questions.html">Open practice questions</a>
            </article>
          </div>
        </section>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
