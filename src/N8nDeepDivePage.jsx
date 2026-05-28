import React, { useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Why n8n', href: '#why-n8n' },
  { label: 'Tools and Resources', href: '#tools-resources' },
  { label: 'Modules 1-3', href: '#modules-1-3' },
  { label: 'Modules 4-6', href: '#modules-4-6' },
  { label: 'Modules 7-10', href: '#modules-7-10' },
  { label: 'Capstone', href: '#capstone' },
  { label: 'How to Start', href: '#how-to-start' }
]

const overviewCards = [
  ['Course Title', 'AI-Infused Automation Mastery with n8n'],
  ['Subtitle', 'Build Production-Ready AI Agents, RAG Systems, and Intelligent Workflows (No-Code/Low-Code)'],
  ['Target Audience', 'Beginners to intermediate users, including marketers, operations teams, developers, entrepreneurs, and anyone automating business processes with AI.'],
  ['Duration', 'Self-paced, roughly 25-35 hours total across 10 modules plus a capstone, typically completed in 4-8 weeks at 3-5 hours per week.'],
  ['Prerequisites', 'Basic computer skills, an n8n Cloud account or self-hosted instance, and an LLM API key. API or spreadsheet familiarity helps but is not required.']
]

const objectiveCards = [
  'Build and deploy complex n8n workflows.',
  'Infuse AI using LangChain-powered nodes such as AI Agents, Chains, Vector Stores, and Memory.',
  'Create autonomous AI agents that reason, use tools, retrieve knowledge with RAG, and act across hundreds of apps.',
  'Handle real-world automation with error handling, human-in-the-loop controls, and scaling patterns.',
  'Export and import workflows, use templates, and participate in the n8n community.'
]

const whyN8nCards = [
  {
    title: 'Visual automation with serious flexibility',
    detail:
      'n8n combines no-code workflow building with low-code power. It gives learners a canvas that is visual enough for beginners but open enough for real production use.'
  },
  {
    title: 'Self-hostable and privacy-aware',
    detail:
      'Unlike many automation platforms, n8n can be self-hosted. That makes it attractive when teams care about data control, cost, or deployment flexibility.'
  },
  {
    title: 'Native AI building blocks',
    detail:
      'n8n integrates AI agents, vector stores, memory, and tool use directly on the workflow canvas, which makes it ideal for AI-infused automation rather than plain app routing.'
  }
]

const resourceCards = [
  {
    title: 'Official docs and learning path',
    detail:
      'Use docs.n8n.io for the structured learning path, quickstarts, integrations, and AI documentation. This should remain the source of truth while learners build.'
  },
  {
    title: 'Templates and workflow library',
    detail:
      'The n8n workflow gallery is a practical accelerator. Learners can import starter templates for RAG, AI agents, Gmail automation, and business workflows rather than beginning from an empty canvas every time.'
  },
  {
    title: 'Community and videos',
    detail:
      'The official community forum and YouTube playlists are useful once learners begin debugging, customizing, or scaling beyond a guided lab.'
  }
]

const modules13 = [
  {
    title: 'Module 1: Foundations of n8n & Workflow Automation',
    subtitle: '3-4 hours',
    href: '/n8n/module-1.html',
    body:
      'This module introduces the editor, nodes, triggers, executions, credentials, and the basic data-items mindset. Learners build a first workflow and get comfortable with the difference between manual runs and real triggers.',
    bullets: [
      'Topics: Cloud vs self-host, nodes, connections, triggers, credentials, first workflow design.',
      'Hands-on: Build a daily quote or news-to-email workflow from a starter template.',
      'Assignment: Automate one personal workflow such as Sheets to Notion sync.'
    ]
  },
  {
    title: 'Module 2: Core Concepts — Data Flow, Logic & Transformations',
    subtitle: '3 hours',
    href: '/n8n/module-2.html',
    body:
      'This module makes learners comfortable with expressions, JSON, set and list handling, branching logic, merge behavior, and basic JavaScript in the Code node.',
    bullets: [
      'Topics: Expressions, JSON, Set node, Item Lists, IF, Switch, Split In Batches, Merge, Code node, debugging.',
      'Hands-on: Build a contact form processor with validation, cleaning, and branching logic.',
      'Assignment: Add error notifications and fallback handling to the Module 1 workflow.'
    ]
  },
  {
    title: 'Module 3: Integrations, APIs & Webhooks',
    subtitle: '3 hours',
    href: '/n8n/module-3.html',
    body:
      'This module focuses on connecting real systems. Learners practice native nodes, the HTTP Request node, authentication, inbound webhooks, and API best practices like rate limiting and pagination.',
    bullets: [
      'Topics: native integrations, HTTP Request, auth, webhooks, rate limiting, real app connectivity.',
      'Hands-on: Automate Gmail labeling or CRM lead sync.',
      'Assignment: Connect two apps of your choice and document the event flow.'
    ]
  }
]

const modules46 = [
  {
    title: 'Module 4: Introduction to AI in n8n — LLMs & Chains',
    subtitle: '3 hours',
    href: '/n8n/module-4.html',
    body:
      'Learners see the distinction between plain LLM calls and agents. They start with chat models, simple chains, prompt structure, and output formatting before moving into agentic behavior.',
    bullets: [
      'Topics: LLMs vs agents, chat models, simple chains, system prompts, output formatting.',
      'Hands-on: Build a classification or summarization chain.',
      'Key concept: cluster nodes and how root plus sub-nodes work in n8n AI flows.'
    ]
  },
  {
    title: 'Module 5: Your First AI Chat Agent',
    subtitle: '4 hours',
    href: '/n8n/module-5.html',
    body:
      'This module follows the official tutorial flow closely. Learners work with Chat Trigger, AI Agent, chat models, system messages, and memory, then customize the agent into a more useful assistant.',
    bullets: [
      'Topics: Chat Trigger, AI Agent, credentials, system prompts, memory, persistence.',
      'Hands-on: Follow the official build-an-AI-chat-agent tutorial, then customize the assistant personality and memory behavior.',
      'Assignment: Turn the agent into a task or reminder assistant connected to a messaging app.'
    ]
  },
  {
    title: 'Module 6: AI Agents Deep Dive — Tools, Reasoning & Autonomy',
    subtitle: '4 hours',
    href: '/n8n/module-6.html',
    body:
      'The course now shifts from “chatting” to “acting.” Learners add tools, reasoning loops, custom workflow tools, and external actions so the agent can fetch, write, or decide inside a larger automation.',
    bullets: [
      'Topics: tool calling, built-in tools, Call n8n Workflow Tool, output parsers, multi-step reasoning.',
      'Hands-on: Build an agent that can search, send, and retrieve using connected tools.',
      'Assignment: Create an autonomous research or meeting-prep agent.'
    ]
  }
]

const modules710 = [
  {
    title: 'Module 7: Retrieval-Augmented Generation (RAG)',
    subtitle: '5 hours',
    href: '/n8n/module-7.html',
    body:
      'This module teaches how to ground agents in company data. Learners work with embeddings, document loaders, text splitters, vector stores, ingestion pipelines, and retrieval patterns.',
    bullets: [
      'Topics: vector stores, embeddings, document loaders, chunking, ingestion, querying, metadata filtering.',
      'Hands-on: Build a complete RAG flow using a starter template and connect it to PDFs or Drive.',
      'Assignment: Create a company knowledge base Q&A bot.'
    ]
  },
  {
    title: 'Module 8: Advanced Techniques & Production Patterns',
    subtitle: '4 hours',
    href: '/n8n/module-8.html',
    body:
      'This module is where workflows become enterprise-ready. It covers human-in-the-loop review, advanced memory, multi-agent coordination, retries, evaluations, and vector database tuning.',
    bullets: [
      'Topics: advanced memory, multi-agent orchestration, approvals, retries, evaluations, LangChain Code node.',
      'Hands-on: Add a human review checkpoint and build a multi-tool analysis workflow.',
      'Outcome: workflows that are more trustworthy and resilient.'
    ]
  },
  {
    title: 'Module 9: Real-World Use Cases & Capstone Projects',
    subtitle: '5+ hours',
    href: '/n8n/module-9.html',
    body:
      'Learners now choose several business-facing projects such as email processors, CRM assistants, content pipelines, or support automation and turn them into documented, tested workflows.',
    bullets: [
      'Choose 3 or more projects such as AI email processing, CRM assistants, content pipelines, or sales call analysis.',
      'Deliverable: a tested workflow plus a short demo walkthrough.',
      'Goal: prove business value, not just technical novelty.'
    ]
  },
  {
    title: 'Module 10: Deployment, Scaling, Security & Next Steps',
    subtitle: '2 hours',
    href: '/n8n/module-10.html',
    body:
      'The final module teaches what it takes to go live: production endpoints, monitoring, workers, security, credential handling, versioning, collaboration, and monetization pathways.',
    bullets: [
      'Topics: deployment, webhooks, workers, monitoring, credentials, privacy, export/import, collaboration.',
      'Final focus: how to go from workflow demo to durable operating system.',
      'Capstone preparation: define the production version of your chosen AI-infused system.'
    ]
  }
]

const capstoneCards = [
  {
    title: 'Final Capstone',
    detail:
      'Build and deploy one full AI-infused system for your role or business, such as support automation, operations coordination, marketing workflows, or an internal knowledge assistant.'
  },
  {
    title: 'Expected Deliverables',
    detail:
      'A documented workflow, a short demo, notes on error handling and approval logic, and a clear explanation of the business value created.'
  },
  {
    title: 'What good looks like',
    detail:
      'A strong capstone is reliable, scoped, and reviewable. It should solve a real problem, not just showcase many nodes.'
  }
]

const startCards = [
  {
    title: 'Step 1',
    detail: 'Sign up at n8n.io and start with Cloud if you want the fastest beginner path.'
  },
  {
    title: 'Step 2',
    detail: 'Import a starter AI template such as Build your first AI agent or a RAG starter flow.'
  },
  {
    title: 'Step 3',
    detail: 'Work through Modules 1 to 3 before trying to build production-grade agents. The automation foundation will make everything after it easier.'
  }
]

function CollapsibleSection({ id, eyebrow, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return <section id={id} className="section collapsible-card section-collapse-shell"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><small>{lead}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body section-collapse-body">{children}</div> : null}</section>
}

function InfoCard({ title, detail, tone = 'model-note' }) {
  const [isOpen, setIsOpen] = useState(false)
  return <article className={`note-card collapsible-card ${tone}`}><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{title}</strong><small>{detail}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><div className="model-row"><span>{detail}</span></div></div> : null}</article>
}

function ModuleCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return <article className="scenario-card collapsible-card"><button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}><div className="collapse-copy"><strong>{item.title}</strong><small>{item.subtitle}</small></div><span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span></button>{isOpen ? <div className="collapse-body"><p>{item.body}</p><h4>What learners do</h4><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>{item.href ? <div className="section-subhead"><a className="btn primary" href={item.href}>Open module page</a></div> : null}</div> : null}</article>
}

export default function N8nDeepDivePage() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Deep Dive</p>
          <h1>AI-Infused Automation <span>Mastery with n8n</span></h1>
          <p className="lead">A structured deep-dive program for learners who want to move from first workflows to production-ready AI agents, RAG systems, and intelligent automations in n8n.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#overview">Start here</a>
            <a className="btn" href="/n8n/">Back to n8n page</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((s) => s.href !== '#page-index').map((s) => <a key={s.href} className="surface-link" href={s.href}>{s.label}</a>)}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Help learners progress from beginner-friendly workflow automation into deployed AI-infused systems with tools, memory, retrieval, approvals, and production patterns.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="overview" eyebrow="Overview" title="Course framing and learning outcomes" lead="This program is designed as a complete path rather than a one-off tutorial.">
          <div className="notes-grid">{overviewCards.map(([title, detail]) => <InfoCard key={title} title={title} detail={detail} tone="model-note" />)}</div>
          <div className="section-subhead">
            <h4>By the end, learners will be able to</h4>
            <ul>{objectiveCards.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="why-n8n" eyebrow="Why n8n" title="Why this platform is worth a deeper program" lead="n8n is not just another automation tool. It is a strong foundation for private, visual, AI-enabled workflow systems.">
          <div className="notes-grid">{whyN8nCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="tools-resources" eyebrow="Tools and Resources" title="What learners will use throughout the program" lead="The program stays hands-on by leaning on docs, templates, videos, and community examples rather than abstract theory.">
          <div className="notes-grid">{resourceCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="modules-1-3" eyebrow="Modules 1-3" title="Foundations, logic, and integrations" lead="The first phase builds the automation baseline that everything AI-related depends on.">
          <div className="scenario-list">{modules13.map((item) => <ModuleCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="modules-4-6" eyebrow="Modules 4-6" title="LLMs, chat agents, and agentic workflows" lead="The second phase introduces AI systematically, starting with simple chains and moving into tools and autonomy.">
          <div className="scenario-list">{modules46.map((item) => <ModuleCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="modules-7-10" eyebrow="Modules 7-10" title="RAG, production patterns, projects, and deployment" lead="The final phase turns isolated AI experiments into grounded systems that can be used in the real world.">
          <div className="scenario-list">{modules710.map((item) => <ModuleCard key={item.title} item={item} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="capstone" eyebrow="Capstone" title="What the final project should prove" lead="The capstone is where learners turn the course into a real business or role-specific system.">
          <div className="notes-grid">{capstoneCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="how-to-start" eyebrow="How to Start" title="A practical way to begin today" lead="This keeps the program from feeling too large on day one.">
          <div className="notes-grid">{startCards.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
