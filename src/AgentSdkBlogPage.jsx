import React from 'react'

/* ─────────────────────────────────────────────
   Shared article typography helpers
───────────────────────────────────────────── */
const A = {
  page: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '0 1.5rem 4rem',
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    color: '#1a1a1a',
    lineHeight: '1.75'
  },
  eyebrow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '1.25rem'
  },
  tag: {
    fontSize: '0.78rem',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    padding: '0.25rem 0.65rem',
    borderRadius: '99px',
    background: 'rgba(0,0,0,0.07)',
    color: '#444'
  },
  h1: {
    fontSize: 'clamp(1.9rem, 5vw, 2.75rem)',
    fontWeight: '800',
    lineHeight: '1.18',
    letterSpacing: '-0.03em',
    marginBottom: '1rem',
    color: '#111'
  },
  lead: {
    fontSize: '1.15rem',
    color: '#444',
    lineHeight: '1.7',
    marginBottom: '1.5rem'
  },
  meta: {
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '0.88rem',
    color: '#777',
    borderTop: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5',
    padding: '0.85rem 0',
    marginBottom: '2.5rem'
  },
  h2: {
    fontSize: '1.55rem',
    fontWeight: '760',
    letterSpacing: '-0.02em',
    color: '#111',
    marginTop: '2.75rem',
    marginBottom: '0.85rem',
    lineHeight: '1.25'
  },
  h3: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#222',
    marginTop: '1.75rem',
    marginBottom: '0.6rem',
    lineHeight: '1.3'
  },
  p: {
    fontSize: '1.02rem',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '1.15rem'
  },
  li: {
    fontSize: '1.02rem',
    lineHeight: '1.75',
    color: '#333',
    marginBottom: '0.85rem'
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #e8e8e8',
    margin: '2.5rem 0'
  }
}

/* ─────────────────────────────────────────────
   Agent loop diagram
───────────────────────────────────────────── */
function AgentLoopDiagram() {
  const steps = [
    { label: 'Gather Context', sub: 'File system · Semantic search\nSubagents · Compaction', color: '#f0f4ff', border: '#c7d5ff', text: '#2c4db3' },
    { label: 'Take Action',    sub: 'Custom tools · Bash scripts\nCode generation · MCPs', color: '#f0fdf4', border: '#bbf0c7', text: '#166534' },
    { label: 'Verify Work',    sub: 'Rules-based · Visual feedback\nLLM-as-judge',          color: '#fff7ed', border: '#fed7aa', text: '#9a3412' }
  ]
  return (
    <div style={{ margin: '2rem 0', background: '#f9f9f9', border: '2px solid #e5e5e5', borderRadius: '18px', padding: '2rem 1.5rem' }}>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>The Agent Loop</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <div style={{
              flex: '1 1 160px',
              minWidth: '140px',
              maxWidth: '210px',
              background: step.color,
              border: `2px solid ${step.border}`,
              borderRadius: '14px',
              padding: '1rem 1rem 0.85rem',
              textAlign: 'center'
            }}>
              <p style={{ fontWeight: '760', fontSize: '0.97rem', color: step.text, margin: '0 0 0.35rem' }}>{step.label}</p>
              <p style={{ fontSize: '0.78rem', color: '#555', margin: 0, whiteSpace: 'pre-line', lineHeight: '1.55' }}>{step.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <div style={{ fontSize: '1.4rem', color: '#bbb', userSelect: 'none', flexShrink: 0 }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>repeat</span>
        <div style={{ fontSize: '1.1rem', color: '#bbb', lineHeight: 1 }}>↺</div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Agent type card
───────────────────────────────────────────── */
function AgentCard({ icon, title, detail }) {
  return (
    <div style={{
      border: '2px solid #e8e8e8',
      borderRadius: '14px',
      padding: '1.1rem 1.25rem',
      background: '#fff',
      display: 'grid',
      gap: '0.4rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.3rem' }}>{icon}</span>
        <strong style={{ fontSize: '0.97rem', color: '#111' }}>{title}</strong>
      </div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', lineHeight: '1.65' }}>{detail}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Illustrated callout block (replaces diagrams)
───────────────────────────────────────────── */
function Callout({ icon = '💡', label, children, accent = '#f0f4ff', border = '#c7d5ff' }) {
  return (
    <div style={{ background: accent, border: `2px solid ${border}`, borderRadius: '14px', padding: '1.1rem 1.3rem', margin: '1.5rem 0', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '1.2rem', marginTop: '0.1rem', flexShrink: 0 }}>{icon}</span>
      <div style={{ fontSize: '0.92rem', lineHeight: '1.7', color: '#333' }}>
        {label && <strong style={{ display: 'block', marginBottom: '0.35rem', color: '#222' }}>{label}</strong>}
        {children}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Section divider with heading
───────────────────────────────────────────── */
function SectionHeading({ children }) {
  return <h2 style={A.h2}>{children}</h2>
}
function SubHeading({ children }) {
  return <h3 style={A.h3}>{children}</h3>
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function AgentSdkBlogPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Back nav */}
      <div style={{ borderBottom: '1px solid #eee', padding: '0.75rem 1.5rem' }}>
        <a href="/" style={{ fontSize: '0.88rem', color: '#666', textDecoration: 'none', fontWeight: '500' }}>← Back to training hub</a>
      </div>

      <article style={A.page}>

        {/* ── Header ─────────────────────────────── */}
        <div style={{ paddingTop: '2.5rem' }}>
          <div style={A.eyebrow}>
            <span style={A.tag}>Claude Code</span>
            <span style={A.tag}>Agents</span>
          </div>

          <h1 style={A.h1}>Building agents with the Claude Agent SDK</h1>

          <p style={A.lead}>
            The Claude Agent SDK is a collection of tools that helps developers build powerful agents on top of Claude Code. In this article, we walk through how to get started and share our best practices.
          </p>

          <div style={A.meta}>
            <span>September 29, 2025</span>
            <span style={{ color: '#ddd' }}>|</span>
            <span>5 min read</span>
            <span style={{ color: '#ddd' }}>|</span>
            <span>Claude Code · Claude Platform</span>
            <span style={{ color: '#ddd' }}>|</span>
            <span>By Thariq Shihipar</span>
          </div>
        </div>

        {/* ── Introduction ───────────────────────── */}
        <p style={A.p}>
          Last year, we shared lessons in building effective agents alongside our customers. Since then, we've released Claude Code, an agentic coding solution that we originally built to support developer productivity at Anthropic.
        </p>
        <p style={A.p}>
          Over the past several months, Claude Code has become far more than a coding tool. At Anthropic, we've been using it for deep research, video creation, and note-taking, among countless other non-coding applications. In fact, it has begun to power almost all of our major agent loops.
        </p>
        <p style={A.p}>
          In other words, the agent harness that powers Claude Code (the Claude Code SDK) can power many other types of agents, too. To reflect this broader vision, we're renaming the Claude Code SDK to the <strong>Claude Agent SDK</strong>.
        </p>
        <p style={A.p}>
          In this post, we'll highlight why we built the Claude Agent SDK, how to build your own agents with it, and share the best practices that have emerged from our team's own deployments.
        </p>

        <hr style={A.hr} />

        {/* ── Giving Claude a Computer ───────────── */}
        <SectionHeading>Giving Claude a Computer</SectionHeading>

        <p style={A.p}>
          The key design principle behind Claude Code is that Claude needs the same tools that programmers use every day. It needs to be able to find appropriate files in a codebase, write and edit files, lint the code, run it, debug, edit, and sometimes take these actions iteratively until the code succeeds.
        </p>
        <p style={A.p}>
          We found that by giving Claude access to the user's computer (via the terminal), it had what it needed to write code like programmers do.
        </p>
        <p style={A.p}>
          But this has also made Claude in Claude Code effective at non-coding tasks. By giving it tools to run bash commands, edit files, create files and search files, Claude can read CSV files, search the web, build visualizations, interpret metrics, and do all sorts of other digital work — in short, create general-purpose agents with a computer.
        </p>

        <Callout icon="🖥️" label="Core design principle" accent="#f5f5f5" border="#ddd">
          The key design principle behind the Claude Agent SDK is to give your agents a computer, allowing them to work like humans do.
        </Callout>

        <hr style={A.hr} />

        {/* ── Creating New Types of Agents ──────── */}
        <SectionHeading>Creating New Types of Agents</SectionHeading>

        <p style={A.p}>
          We believe giving Claude a computer unlocks the ability to build agents that are more effective than before. For example, with our SDK, developers can build:
        </p>

        <div style={{ display: 'grid', gap: '0.85rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', margin: '1.5rem 0 2rem' }}>
          <AgentCard
            icon="📊"
            title="Finance agents"
            detail="Build agents that can understand your portfolio and goals, as well as help you evaluate investments by accessing external APIs, storing data and running code to make calculations."
          />
          <AgentCard
            icon="🗓️"
            title="Personal assistant agents"
            detail="Build agents that can help you book travel and manage your calendar, as well as schedule appointments, put together briefs, and more by connecting to your internal data sources and tracking context across applications."
          />
          <AgentCard
            icon="💬"
            title="Customer support agents"
            detail="Build agents that can handle high ambiguity user requests, like customer service tickets, by collecting and reviewing user data, connecting to external APIs, messaging users back and escalating to humans when needed."
          />
          <AgentCard
            icon="🔬"
            title="Deep research agents"
            detail="Build agents that can conduct comprehensive research across large document collections by searching through file systems, analyzing and synthesizing information from multiple sources, cross-referencing data across files, and generating detailed reports."
          />
        </div>

        <p style={A.p}>
          And much more. At its core, the SDK gives you the primitives to build agents for whatever workflow you're trying to automate.
        </p>

        <hr style={A.hr} />

        {/* ── Building Your Agent Loop ──────────── */}
        <SectionHeading>Building Your Agent Loop</SectionHeading>

        <p style={A.p}>
          In Claude Code, Claude often operates in a specific feedback loop: <strong>gather context → take action → verify work → repeat.</strong>
        </p>

        <AgentLoopDiagram />

        <p style={A.p}>
          This offers a useful way to think about other agents, and the capabilities they should be given. To illustrate this, we'll walk through the example of how we might build an email agent in the Claude Agent SDK.
        </p>

        {/* ── Gather Context ────────────────────── */}
        <SectionHeading>Gather Context</SectionHeading>

        <p style={A.p}>
          When developing an agent, you want to give it more than just a prompt: it needs to be able to fetch and update its own context. Here's how features in the SDK can help.
        </p>

        <SubHeading>Agentic Search and the File System</SubHeading>

        <p style={A.p}>
          The file system represents information that could be pulled into the model's context.
        </p>
        <p style={A.p}>
          When Claude encounters large files, like logs or user-uploaded files, it will decide which way to load these into its context by using bash scripts like <code style={{ background: '#f3f3f3', padding: '0.1em 0.4em', borderRadius: '5px', fontSize: '0.92em', fontFamily: 'monospace' }}>grep</code> and <code style={{ background: '#f3f3f3', padding: '0.1em 0.4em', borderRadius: '5px', fontSize: '0.92em', fontFamily: 'monospace' }}>tail</code>. In essence, the folder and file structure of an agent becomes a form of context engineering.
        </p>

        <Callout icon="📁" label="Email agent example — file system structure" accent="#f0fdf4" border="#bbf0c7">
          Our email agent might store previous conversations in a folder called <code style={{ background: 'rgba(0,0,0,0.06)', padding: '0.1em 0.35em', borderRadius: '4px', fontSize: '0.9em', fontFamily: 'monospace' }}>Conversations/</code>. This would allow it to search previous exchanges for its context when asked about them — without loading everything into the context window at once.
        </Callout>

        <SubHeading>Semantic Search</SubHeading>

        <p style={A.p}>
          Semantic search is usually faster than agentic search, but less accurate, more difficult to maintain, and less transparent. It involves 'chunking' the relevant context, embedding these chunks as vectors, and then searching for concepts by querying those vectors.
        </p>
        <p style={A.p}>
          Given its limitations, we suggest starting with agentic search, and only adding semantic search if you need faster results or more variations.
        </p>

        <SubHeading>Subagents</SubHeading>

        <p style={A.p}>
          Claude Agent SDK supports subagents by default. Subagents are useful for two main reasons. First, they enable <strong>parallelisation</strong>: you can spin up multiple subagents to work on different tasks simultaneously. Second, they help <strong>manage context</strong>: subagents use their own isolated context windows, and only send relevant information back to the orchestrator, rather than their full context. This makes them ideal for tasks that require sifting through large amounts of information where most of it won't be useful.
        </p>

        <Callout icon="⚡" label="Email agent example — parallel subagents" accent="#f0f4ff" border="#c7d5ff">
          When designing our email agent, we might give it a 'search subagent' capability. The email agent could then spin off multiple search subagents in parallel — each running different queries against your email history — and have them return only the relevant excerpts rather than full email threads.
        </Callout>

        <SubHeading>Compaction</SubHeading>

        <p style={A.p}>
          When agents are running for long periods of time, context maintenance becomes critical. The Claude Agent SDK's <strong>compact feature</strong> automatically summarizes previous messages when the context limit approaches, so your agent won't run out of context. This is built on Claude Code's <code style={{ background: '#f3f3f3', padding: '0.1em 0.4em', borderRadius: '5px', fontSize: '0.92em', fontFamily: 'monospace' }}>/compact</code> slash command.
        </p>

        <hr style={A.hr} />

        {/* ── Take Action ───────────────────────── */}
        <SectionHeading>Take Action</SectionHeading>

        <p style={A.p}>
          Once you've gathered context, you'll want to give your agent flexible ways of taking action.
        </p>

        <SubHeading>Tools</SubHeading>

        <p style={A.p}>
          Tools are the primary building blocks of execution for your agent. Tools are prominent in Claude's context window, making them the primary actions Claude will consider when deciding how to complete a task. This means you should be conscious about how you design your tools to maximise context efficiency.
        </p>
        <p style={A.p}>
          As such, your tools should be primary actions you want your agent to take. For our email agent, we might define tools like <code style={{ background: '#f3f3f3', padding: '0.1em 0.4em', borderRadius: '5px', fontSize: '0.92em', fontFamily: 'monospace' }}>fetchInbox</code> or <code style={{ background: '#f3f3f3', padding: '0.1em 0.4em', borderRadius: '5px', fontSize: '0.92em', fontFamily: 'monospace' }}>searchEmails</code> as the agent's primary, most frequent actions.
        </p>

        <SubHeading>Bash &amp; Scripts</SubHeading>

        <p style={A.p}>
          Bash is useful as a general-purpose tool to allow the agent to do flexible work using a computer.
        </p>

        <Callout icon="📎" label="Email agent example — processing attachments" accent="#fff7ed" border="#fed7aa">
          In our email agent, the user might have important information stored in their attachments. Claude could write code to download the PDF, convert it to text, and search across it to find useful information by calling appropriate functions.
        </Callout>

        <SubHeading>Code Generation</SubHeading>

        <p style={A.p}>
          The Claude Agent SDK excels at code generation — and for good reason. Code is precise, composable, and infinitely reusable, making it an ideal output for agents that need to perform complex operations reliably.
        </p>
        <p style={A.p}>
          When building agents, consider: which tasks would benefit from being expressed as code? Often, the answer unlocks significant capabilities.
        </p>
        <p style={A.p}>
          For example, our recent launch of file creation in Claude.AI relies entirely on code generation. Claude writes Python scripts to create Excel spreadsheets, PowerPoint presentations, and Word documents, ensuring consistent formatting and complex functionality that would be difficult to achieve any other way.
        </p>

        <Callout icon="✉️" label="Email agent example — rule creation through code" accent="#f0fdf4" border="#bbf0c7">
          In our email agent, we might want to allow users to create rules for inbound emails. To achieve this, we could have Claude write code to run on that event — a small script that checks each incoming message against the user's defined criteria and routes it appropriately.
        </Callout>

        <SubHeading>MCPs</SubHeading>

        <p style={A.p}>
          The Model Context Protocol (MCP) provides standardised integrations to external services, handling authentication and API calls automatically. This means you can connect your agent to tools like Slack, GitHub, Google Drive, or Asana without writing custom integration code or managing OAuth flows yourself.
        </p>
        <p style={A.p}>
          For our email agent, we might want to search Slack messages to understand team context, or check Asana tasks to see if someone has already been assigned to handle a customer request. With MCP servers, these integrations work out of the box — your agent can simply call tools like <code style={{ background: '#f3f3f3', padding: '0.1em 0.4em', borderRadius: '5px', fontSize: '0.92em', fontFamily: 'monospace' }}>search_slack_messages</code> or <code style={{ background: '#f3f3f3', padding: '0.1em 0.4em', borderRadius: '5px', fontSize: '0.92em', fontFamily: 'monospace' }}>get_asana_tasks</code> and the MCP handles the rest.
        </p>
        <p style={A.p}>
          The growing MCP ecosystem means you can quickly add new capabilities to your agents as pre-built integrations become available, letting you focus on agent behaviour.
        </p>

        <hr style={A.hr} />

        {/* ── Verify Your Work ─────────────────── */}
        <SectionHeading>Verify Your Work</SectionHeading>

        <p style={A.p}>
          The Claude Agent SDK finishes the agentic loop by evaluating its work. Agents that can check and improve their own output are fundamentally more reliable — they catch mistakes before they compound, self-correct when they drift, and get better as they iterate.
        </p>
        <p style={A.p}>
          The key is giving Claude concrete ways to evaluate its work. Here are three approaches we've found effective:
        </p>

        <SubHeading>Defining Rules</SubHeading>

        <p style={A.p}>
          The best form of feedback is providing clearly defined rules for an output, then explaining which rules failed and why.
        </p>
        <p style={A.p}>
          Code linting is an excellent form of rules-based feedback. The more in-depth the feedback, the better. For instance, it is usually better to generate TypeScript and lint it than to generate pure JavaScript, because it provides multiple additional layers of feedback.
        </p>

        <Callout icon="✅" label="Email agent example — rules-based verification" accent="#f0f4ff" border="#c7d5ff">
          When generating an email, you may want Claude to check that the email address is valid (if not, throw an error) and that the user has sent an email to them before (if so, throw a warning).
        </Callout>

        <SubHeading>Visual Feedback</SubHeading>

        <p style={A.p}>
          When using an agent to complete visual tasks, like UI generation or testing, visual feedback (in the form of screenshots or renders) can be helpful. For example, if sending an email with HTML formatting, you could screenshot the generated email and provide it back to the model for visual verification and iterative refinement.
        </p>
        <p style={A.p}>
          The model would then check whether the visual output matches what was requested across several dimensions:
        </p>

        <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.25rem' }}>
          <li style={A.li}><strong>Layout</strong> — Are elements positioned correctly? Is spacing appropriate?</li>
          <li style={A.li}><strong>Styling</strong> — Do colours, fonts, and formatting appear as intended?</li>
          <li style={A.li}><strong>Content hierarchy</strong> — Is information presented in the right order with proper emphasis?</li>
          <li style={A.li}><strong>Responsiveness</strong> — Does it look broken or cramped?</li>
        </ul>

        <p style={A.p}>
          Using an MCP server like Playwright, you can automate this visual feedback loop — taking screenshots of rendered HTML, capturing different viewport sizes, and even testing interactive elements — all within your agent's workflow.
        </p>

        <Callout icon="📸" label="Visual feedback from an LLM" accent="#f5f5f5" border="#ddd">
          Visual feedback from a large-language model can provide helpful guidance to your agent — particularly for formatting-sensitive outputs like HTML email, dashboards, or generated documents.
        </Callout>

        <SubHeading>LLM as a Judge</SubHeading>

        <p style={A.p}>
          You can also have another language model "judge" the output of your agent based on fuzzy rules. This is generally not a very robust method, and can have heavy latency trade-offs, but for applications where any boost in performance is worth the cost, it can be helpful.
        </p>

        <Callout icon="⚖️" label="Email agent example — tone judging" accent="#fff7ed" border="#fed7aa">
          Our email agent might have a separate subagent judge the tone of its drafts, to see if they fit well with the user's previous messages and communication style.
        </Callout>

        <hr style={A.hr} />

        {/* ── Testing and Improving ─────────────── */}
        <SectionHeading>Testing and Improving Your Agent</SectionHeading>

        <p style={A.p}>
          After you've gone through the agent loop a few times, we recommend testing your agent, and ensuring that it's well-equipped for its tasks. The best way to improve an agent is to look carefully at its output, especially the cases where it fails, and to put yourself in its shoes: does it have the right tools for the job?
        </p>
        <p style={A.p}>
          Here are some other questions to ask as you're evaluating whether or not your agent is well-equipped to do its job:
        </p>

        <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem' }}>
          <li style={A.li}>If your agent <strong>misunderstands the task</strong>, it might be missing key information. Can you alter the structure of your search APIs to make it easier to find what it needs to know?</li>
          <li style={A.li}>If your agent <strong>fails at a task repeatedly</strong>, can you add a formal rule in your tool calls to identify and fix the failure?</li>
          <li style={A.li}>If your agent <strong>can't fix its errors</strong>, can you give it more useful or creative tools to approach the problem differently?</li>
          <li style={A.li}>If your agent's <strong>performance varies</strong> as you add features, build a representative test set for programmatic evaluations (or evals) based on customer usage.</li>
        </ul>

        <hr style={A.hr} />

        {/* ── Getting Started ───────────────────── */}
        <SectionHeading>Getting Started</SectionHeading>

        <p style={A.p}>
          The Claude Agent SDK makes it easier to build autonomous agents by giving Claude access to a computer where it can write files, run commands, and iterate on its work.
        </p>
        <p style={A.p}>
          With the agent loop in mind — gathering context, taking action, and verifying work — you can build reliable agents that are easy to deploy and iterate on.
        </p>

        <div style={{ background: '#f0f4ff', border: '2px solid #c7d5ff', borderRadius: '16px', padding: '1.5rem 1.75rem', margin: '1.5rem 0' }}>
          <p style={{ margin: '0 0 0.85rem', fontWeight: '700', color: '#2c4db3', fontSize: '1rem' }}>Ready to build?</p>
          <p style={{ margin: '0 0 1rem', fontSize: '0.95rem', color: '#444', lineHeight: '1.7' }}>
            You can get started with the Claude Agent SDK today. For developers who are already building on the SDK, we recommend migrating to the latest version by following the official migration guide at{' '}
            <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2c4db3', fontWeight: '600' }}>docs.anthropic.com</a>.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://docs.anthropic.com/en/docs/claude-code/sdk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#2c4db3', color: '#fff', padding: '0.55rem 1.15rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }}
            >
              View SDK docs →
            </a>
            <a
              href="/cca/"
              style={{ background: '#fff', color: '#2c4db3', border: '2px solid #c7d5ff', padding: '0.55rem 1.15rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }}
            >
              Study for CCA certification
            </a>
          </div>
        </div>

        <hr style={A.hr} />

        {/* ── Acknowledgements ─────────────────── */}
        <p style={{ fontSize: '0.88rem', color: '#888', lineHeight: '1.7' }}>
          <strong style={{ color: '#555' }}>Acknowledgements</strong><br />
          Written by Thariq Shihipar with notes and editing from Molly Vorwerck, Suzanne Wang, Alex Isken, Cat Wu, Keir Bradwell, Alexander Bricken &amp; Ashwin Bhat.
        </p>

      </article>
    </div>
  )
}
