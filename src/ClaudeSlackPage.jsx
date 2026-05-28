import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Learning Outcomes', href: '#learning-outcomes' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Getting Started', href: '#getting-started' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'How To Work', href: '#how-to-work' },
  { label: 'Slack Workflows', href: '#slack-workflows' },
  { label: 'Slack Connector', href: '#slack-connector' },
  { label: 'Try This Now', href: '#try-this-now' },
  { label: 'When Not To Use', href: '#when-not-to-use' },
  { label: 'Error Recovery', href: '#error-recovery' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'Official Links', href: '#official-links' }
]

const purposeCards = [
  ['What Claude for Slack is best at', 'Claude for Slack is strongest when work is happening inside conversations and the team needs help without leaving Slack.'],
  ['What it changes', 'Instead of copying thread context into another tool, you can ask Claude inside Slack to summarize, draft, explain, or structure next steps in the flow of work.'],
  ['What to watch', 'Slack context feels immediate, but it can still be partial. Ask Claude to distinguish what the thread says from what it is inferring.']
]

const gettingStartedCards = [
  {
    title: 'Claude in Slack',
    detail:
      'This is the Slack app experience itself. On paid Slack plans, admins approve the app, users connect their Claude account, and then they can use Claude in DMs, in the AI assistant panel, or by mentioning @Claude in threads.'
  },
  {
    title: 'Slack connector',
    detail:
      'This is the Claude-side connector. It lets Claude search approved Slack channels, direct messages, and shared files from within Claude conversations when you need richer Slack context in the main Claude product.'
  },
  {
    title: 'Practical setup path',
    detail:
      'Start with the Slack app for everyday drafting and thread help. Add the Slack connector when you want Claude conversations outside Slack to pull in Slack evidence as context.'
  }
]

const howToCards = [
  {
    title: 'Use Claude where the conversation already lives',
    detail:
      'If the work is about a live thread, meeting prep, or a response that needs channel context, start inside Slack rather than recreating the conversation elsewhere.'
  },
  {
    title: 'Ask for structure, not just summary',
    detail:
      'Claude becomes more valuable when asked for decisions, owners, risks, and next actions rather than a plain recap of messages.'
  },
  {
    title: 'Review before posting',
    detail:
      'Claude can draft quickly in a thread, but human review still matters before something is shared broadly, especially for customer-facing, people-sensitive, or high-stakes updates.'
  }
]

const workflowCards = [
  {
    title: 'Thread summarization and action capture',
    concept:
      'Use Claude in long Slack threads to compress noise into decisions, unresolved issues, and action items without losing the storyline.',
    steps: [
      'Mention @Claude in the thread or open the AI assistant panel from that conversation.',
      'Ask for a concise thread summary first.',
      'Then ask for action items, owners, dates, blockers, and unresolved points.',
      'Review the output before posting or sharing elsewhere.'
    ],
    prompt:
      'Summarize this thread into: 1. decisions made, 2. unresolved issues, 3. action items with likely owners, and 4. one short update I can post back to the team.'
  },
  {
    title: 'Drafting updates and announcements',
    concept:
      'Claude is useful for turning rough Slack context into a polished status update, project checkpoint, or internal announcement with the right tone.',
    steps: [
      'Ask Claude to extract the core message from the recent conversation.',
      'Choose the audience: leadership, project team, cross-functional team, or company-wide.',
      'Set tone constraints such as concise, calm, direct, or reassuring.',
      'Do a final pass for anything that needs human tightening before posting.'
    ],
    prompt:
      'Based on this Slack discussion, draft a concise project update for the leadership channel. Include what changed, why it matters, current risks, and the next checkpoint. Keep the tone calm and direct.'
  },
  {
    title: 'Meeting and standup preparation',
    concept:
      'Claude can turn recent Slack activity into a quick prep pack before a standup, client call, or operating review.',
    steps: [
      'Point Claude to the relevant channel or thread activity.',
      'Ask it to pull the top changes, blockers, and open decisions.',
      'Have it organize the output into a meeting agenda or talking points.',
      'Use the result as the starting brief for the actual meeting.'
    ],
    prompt:
      'Using the recent discussion in this channel, prepare a standup brief with progress since the last update, blockers, decisions needed today, and suggested talking points for the lead.'
  },
  {
    title: 'Async coding delegation with Claude Code',
    concept:
      'For teams with Claude Code access enabled, Slack can become the place where a coding task is initiated and then routed into a Claude Code session.',
    steps: [
      'Confirm the organization has Claude Code on the web enabled.',
      'Mention @Claude with a scoped coding task from Slack.',
      'Track progress updates as the task runs remotely.',
      'Review the final implementation and result before merge or deployment.'
    ],
    prompt:
      'Review the issue in this thread and open a Claude Code task to investigate the root cause, propose a fix, and report back with what changed, what still needs review, and any risks before merge.'
  }
]

const connectorCards = [
  {
    title: 'When to use the Slack connector',
    detail:
      'Use the Slack connector when you are already in Claude and need Slack context pulled into a broader reasoning task, such as preparing a memo, analyzing support trends, or reviewing cross-channel coordination.'
  },
  {
    title: 'Good connector pattern',
    detail:
      'Ask Claude to use Slack as one evidence source among others. For example: Slack plus a policy document, Slack plus a project plan, or Slack plus support metrics.'
  },
  {
    title: 'Why this matters',
    detail:
      'The connector is less about chat convenience and more about grounded context. It makes Claude more useful for work that depends on what the organization has already discussed.'
  }
]

const promptLibrary = [
  'Summarize this Slack thread into decisions, blockers, action items, and the one update I should post back.',
  'Draft a leadership-ready update from this Slack discussion with current status, risks, and next actions.',
  'Turn this channel activity into a meeting-prep brief with priorities, open questions, and stakeholder concerns.',
  'Using Slack context plus the attached document, explain what changed, what is still unclear, and what the team should do next.'
]

const officialLinks = [
  {
    label: 'Claude for Slack',
    href: 'https://claude.com/claude-for-slack'
  },
  {
    label: 'Getting started with Claude in Slack',
    href: 'https://support.claude.com/en/articles/11506255-getting-started-with-claude-in-slack'
  }
]

const learningOutcomes = [
  'Compress long Slack threads into structured decisions, action items, and unresolved issues.',
  'Draft context-aware Slack updates for different audiences without leaving the conversation flow.',
  'Prepare standup and meeting briefs from recent channel activity in minutes rather than manually scanning.',
  'Understand when to use Claude directly inside Slack versus using the Slack connector from Claude.'
]

const tryThisNowCards = [
  {
    title: 'Thread summary — 5 minutes',
    concept: 'Take a real Slack thread from this week and compress it into the structured output your team needs.',
    steps: [
      'Find a Slack thread from the past few days that had meaningful back-and-forth.',
      'Mention @Claude in the thread or open the AI assistant panel.',
      'Use the summarization prompt below.',
      'Review the output and check whether decisions and action items reflect what actually happened.'
    ],
    prompt: 'Summarize this thread into: 1. decisions made, 2. unresolved issues, 3. action items with likely owners and suggested deadlines, and 4. one short update I can post back to the team.'
  },
  {
    title: 'Meeting brief from channel — 10 minutes',
    concept: 'Before your next standup or operating review, let Claude build the prep brief from the relevant channel so you do not need to scan manually.',
    steps: [
      'Go to the channel most relevant to your upcoming meeting.',
      'Ask Claude to pull the top changes, blockers, and open decisions from recent activity.',
      'Have Claude organize the output as priority-ordered talking points.',
      'Use it as your opening brief for the meeting.'
    ],
    prompt: 'Based on recent activity in this channel, prepare a meeting brief with: progress since the last update, current blockers, decisions needed today, and the one thing the lead should address first.'
  }
]

const whenNotToUseCards = [
  ['Not for HR-sensitive or employee relations content', 'Threads involving performance, disciplinary actions, or employee grievances should not be summarized or drafted by AI without HR guidance and proper process.'],
  ['Not for posting without human review', 'Do not treat Claude as an autopilot for Slack. AI-drafted messages going to large channels, customers, or executive stakeholders need a human review step before they go out.'],
  ['Not for legal or compliance threads', 'Conversations in legal-hold channels, compliance reviews, or regulatory discussions should not be processed by AI without specific guidance from your legal or compliance team.'],
  ['Not when context is too old or fragmented', 'If the relevant thread is weeks old, spread across many channels, or relies on context shared offline, Claude will have an incomplete picture. Provide the missing context explicitly or use a different approach.']
]

const errorRecoveryCards = [
  { title: 'Summary misses important context from the thread', detail: 'Copy the specific messages Claude missed and share them as follow-up context. Ask Claude to revise the output with the additional information.' },
  { title: 'Drafted message has the wrong tone', detail: 'Ask Claude to rewrite with a direction: "Rewrite this to be more direct and less passive" or "Make this warmer without losing the sense of urgency."' },
  { title: 'Action items are vague or missing owners', detail: 'Ask explicitly: "Assign a likely owner and a suggested deadline to each action item based on the thread context and who was involved."' },
  { title: 'Claude draws conclusions not in the thread', detail: 'Ask Claude to flag what it is inferring versus what the thread explicitly states. Review those inferences carefully before sharing the output.' }
]

const governanceCards = [
  { title: 'Check channel data classification before using AI', detail: 'Not all Slack channels are appropriate for AI summarization. Channels with HR data, legal matters, financial information, or customer-specific content may have data handling restrictions.' },
  { title: 'Never share customer PII from Slack threads', detail: 'Do not paste customer names, contact details, support case specifics, or any personally identifiable information from Slack into a Claude conversation without data handling approval.' },
  { title: 'Human review before broad or sensitive posts', detail: 'Any AI-drafted Slack message going to a large audience, external parties, or sensitive stakeholders must be reviewed by a human before posting.' },
  { title: 'Confirm admin approval for workspace rollout', detail: 'If you are rolling out Claude for Slack across a team or workspace, get IT and security admin approval first to ensure the integration meets your organization\'s data and access policies.' }
]

function CopyPrompt({ prompt }) {
  const [copyState, setCopyState] = useState('idle')
  useEffect(() => {
    if (copyState === 'idle') return undefined
    const timeoutId = window.setTimeout(() => setCopyState('idle'), 1600)
    return () => window.clearTimeout(timeoutId)
  }, [copyState])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <button className="prompt-copy-btn" type="button" onClick={handleCopy}>
      <span aria-hidden="true">📋</span>
      <span>{copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Retry' : 'Copy'}</span>
    </button>
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
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
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
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <div className="model-row">
            <span>{detail}</span>
          </div>
        </div>
      ) : null}
    </article>
  )
}

function PromptCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className="scenario-card collapsible-card">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((v) => !v)}>
        <div className="collapse-copy">
          <strong>{item.title}</strong>
          <small>{item.concept}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <h4>Suggested Steps</h4>
          <ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="section-subhead">
            <div className="prompt-controls">
              <CopyPrompt prompt={item.prompt} />
            </div>
            <pre>{item.prompt}</pre>
          </div>
        </div>
      ) : null}
    </article>
  )
}

export default function ClaudeSlackPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude for Slack</p>
          <h1>
            Claude <span>Slack Playbook</span>
          </h1>
          <p className="lead">
            Use Claude inside Slack when the work is conversational, fast-moving, and already happening
            in channels, threads, and direct messages.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#purpose">
              Start here
            </a>
            <a className="btn" href="/">
              Back to main tutorial
            </a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections
                .filter((section) => section.href !== '#page-index')
                .map((section) => (
                  <a key={section.href} className="surface-link" href={section.href}>
                    {section.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>
              Help teams use Claude in Slack for thread synthesis, better updates, meeting prep, and
              fast in-context support without breaking the flow of work.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="learning-outcomes"
          eyebrow="Learning Outcomes"
          title="What you will be able to do by the end of this module"
          lead="These are the practical skills this playbook is designed to build."
        >
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', margin: '0' }}>
            {learningOutcomes.map((o) => (
              <li key={o} style={{ marginBottom: '0.5rem' }}>{o}</li>
            ))}
          </ol>
        </CollapsibleSection>

        <CollapsibleSection
          id="purpose"
          eyebrow="Purpose"
          title="Practical guide for Claude for Slack"
          lead="This page focuses on how Claude helps directly inside workplace conversations and how that differs from the Slack connector in Claude."
        >
          <div className="notes-grid">
            {purposeCards.map(([title, detail]) => (
              <InfoCard key={title} title={title} detail={detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="getting-started"
          eyebrow="Getting Started"
          title="Understand the two Slack experiences"
          lead="Anthropic now supports both the Claude app inside Slack and the Slack connector inside Claude."
        >
          <div className="notes-grid">
            {gettingStartedCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="operating-model"
          eyebrow="Operating Model"
          title="How to think about Claude for Slack"
          lead="Slack is the right surface when context is live, conversational, and distributed across people rather than documents."
        >
          <div className="notes-grid">
            {[
              ['Conversation-native help', 'Claude for Slack is most useful when the thread itself is the context that matters.'],
              ['Human review before posting', 'Treat Claude as a drafter and structurer in Slack, not as an autopilot for public responses.'],
              ['Use the right surface', 'Use Slack for in-thread support and the Slack connector when deeper reasoning in Claude needs Slack evidence.']
            ].map(([title, detail]) => (
              <InfoCard key={title} title={title} detail={detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="how-to-work"
          eyebrow="How To Work"
          title="How to use Claude effectively in Slack"
          lead="These habits keep Slack-based AI support practical, fast, and reviewable."
        >
          <div className="notes-grid">
            {howToCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="slack-workflows"
          eyebrow="Slack Workflows"
          title="High-value ways to use Claude directly inside Slack"
          lead="These are the practical patterns most teams will reach for first."
        >
          <div className="scenario-list">
            {workflowCards.map((item) => (
              <PromptCard key={item.title} item={item} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="slack-connector"
          eyebrow="Slack Connector"
          title="When to bring Slack into Claude"
          lead="The connector is useful when Slack is one important evidence source inside a larger Claude workflow."
        >
          <div className="notes-grid">
            {connectorCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="try-this-now"
          eyebrow="Try This Now"
          title="Quick exercises you can run immediately"
          lead="These 5-10 minute exercises let you practice Slack-specific Claude patterns on real work."
        >
          <div className="scenario-list">
            {tryThisNowCards.map((item) => (
              <PromptCard key={item.title} item={item} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="when-not-to-use"
          eyebrow="When Not To Use"
          title="Situations where Claude for Slack is the wrong tool"
          lead="These limits protect your team, your data, and the trust of colleagues who use these channels."
        >
          <div className="notes-grid">
            {whenNotToUseCards.map(([title, detail]) => (
              <InfoCard key={title} title={title} detail={detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="error-recovery"
          eyebrow="Error Recovery"
          title="What to do when outputs are not working"
          lead="These patterns help you recover when Claude does not produce the Slack output you need."
        >
          <div className="notes-grid">
            {errorRecoveryCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="governance"
          eyebrow="Governance"
          title="Safe and responsible use of Claude for Slack"
          lead="These guidelines apply whenever Slack data contains anything sensitive or consequential."
        >
          <div className="notes-grid">
            {governanceCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="prompt-library"
          eyebrow="Prompt Library"
          title="Claude for Slack quick-reference prompts"
          lead="These are good starter prompts for channel and thread-based work."
        >
          <div className="scenario-list">
            {promptLibrary.map((prompt) => (
              <article key={prompt} className="scenario-card">
                <div className="prompt-controls">
                  <CopyPrompt prompt={prompt} />
                </div>
                <pre>{prompt}</pre>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="official-links"
          eyebrow="Official Links"
          title="Official Claude for Slack resources"
          lead="Use these if you want the current product page and Slack help-center setup guidance."
        >
          <div className="download-grid">
            {officialLinks.map((link) => (
              <a key={link.href} className="download-chip" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </CollapsibleSection>
      </main>

      <a className="floating-index" href="#page-index">
        Index
      </a>
    </div>
  )
}
