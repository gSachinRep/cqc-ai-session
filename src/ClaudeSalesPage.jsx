import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Outcomes in Practice', href: '#outcomes-in-practice' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'Account Research', href: '#account-research' },
  { label: 'Discovery', href: '#discovery' },
  { label: 'Proposals', href: '#proposals' },
  { label: 'Objections', href: '#objections' },
  { label: 'Pipeline Reviews', href: '#pipeline-reviews' },
  { label: 'Leadership Support', href: '#leadership-support' },
  { label: 'Workflow Automation', href: '#workflow-automation' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'What Changes', href: '#deeper-idea' }
]

const outcomes = [
  { title: 'Design strong sales prompts', detail: 'Claude works better when it knows the account context, buyer role, sales stage, and desired output such as discovery questions, proposal structure, or follow-up email.' },
  { title: 'Use Claude in day-to-day sales work', detail: 'Sales teams get value from account prep, discovery support, proposal drafting, objection handling, pipeline review, and meeting follow-up.' },
  { title: 'Accelerate sales preparation', detail: 'Claude can reduce prep time before customer meetings by synthesizing account notes, public information, and past interactions.' },
  { title: 'Improve consistency of customer-facing drafts', detail: 'Shared prompts and structures make emails, proposals, and briefing notes more consistent across teams.' },
  { title: 'Strengthen sales judgment', detail: 'Claude is most useful when it structures options and surfaces risks while reps and leaders still own the commercial judgment.' },
  { title: 'Reduce repetitive admin work', detail: 'First-draft follow-ups, summaries, and account research are strong places to use Claude so sellers spend more time with customers.' }
]

const augmentationExamples = [
  {
    title: 'From scattered account notes to a meeting brief',
    before: 'A seller searches CRM notes, emails, and public company pages to prepare manually for a customer call.',
    after: 'Claude turns those inputs into a concise account brief with likely priorities, risks, and smart discovery questions.',
    prompt: `Act as an enterprise account strategist.\n\nUsing these account notes and company background, create a meeting brief.\n\nInclude:\n- Likely business priorities\n- Risks or pressure points\n- Relevant past context\n- Five discovery questions\n- Suggested next-step objective`
  },
  {
    title: 'From opportunity notes to a proposal outline',
    before: 'Teams often rewrite the same proposal logic from scratch, even when the buying problem is familiar.',
    after: 'Claude creates a proposal outline with messaging, structure, and differentiation that the sales team can refine quickly.',
    prompt: `Act as a sales proposal partner.\n\nCreate a first-draft proposal outline based on this opportunity.\n\nInclude:\n- Executive summary\n- Problem statement\n- Proposed approach\n- Differentiators\n- Risks or assumptions\n- Suggested next steps`
  }
]

const operatingRoles = [
  { title: 'Synthesizer', detail: 'Reads account notes, research, call summaries, and opportunity history to condense what matters before a seller goes into a conversation.' },
  { title: 'Drafting Partner', detail: 'Creates first drafts of follow-ups, proposal sections, internal deal notes, and executive briefings.' },
  { title: 'Structured Thinking Assistant', detail: 'Helps reps and leaders think more clearly about deal strategy, objections, priorities, and next-step choices.' }
]

const contentSections = [
  {
    id: 'account-research',
    eyebrow: 'Account Research',
    title: 'Claude for account research and meeting preparation',
    lead: 'Claude helps compress scattered account context into a useful starting brief before a seller walks into a conversation.',
    cards: [
      {
        title: 'Account brief generation',
        concept: 'Claude can synthesize CRM notes, meeting history, and public context into a concise account brief.',
        steps: ['Provide account notes and public context.', 'Ask for priorities, risks, and likely themes.', 'Use the brief to prepare, not to assume certainty.', 'Update the brief after the call so it becomes more useful over time.'],
        prompt: `Act as an account strategist.\n\nCreate a concise account brief using these notes.\n\nInclude:\n- Business context\n- Likely priorities\n- Risks or blockers\n- Stakeholders mentioned\n- Suggested meeting objective`
      },
      {
        title: 'Pre-call question planning',
        concept: 'Claude can generate stronger discovery questions when you give it the account stage and the likely customer problem.',
        steps: ['Specify the buyer role and the call objective.', 'Ask for questions that uncover pain, urgency, and decision criteria.', 'Separate open questions from qualification questions.', 'Adapt the list to the seller’s style before using it live.'],
        prompt: `Generate discovery questions for this upcoming customer conversation.\n\nInclude:\n- Business-priority questions\n- Current-state questions\n- Buying-process questions\n- Risk or objection probes`
      }
    ]
  },
  {
    id: 'discovery',
    eyebrow: 'Discovery',
    title: 'Claude for discovery and deal qualification',
    lead: 'Discovery improves when Claude helps structure what to ask, what to listen for, and how to summarize what was learned.',
    cards: [
      {
        title: 'Discovery summary',
        concept: 'After a customer call, Claude can turn rough notes into a clearer summary of pains, goals, blockers, and next steps.',
        steps: ['Paste or connect call notes.', 'Ask for needs, blockers, buying signals, and next steps.', 'Validate any assumptions before sharing internally.', 'Use the summary as the CRM-ready version of the meeting.'],
        prompt: `Summarize this discovery call.\n\nInclude:\n- Main pains or priorities\n- Current process and limitations\n- Buying signals\n- Risks or blockers\n- Suggested next steps`
      },
      {
        title: 'Qualification support',
        concept: 'Claude can help organize whether an opportunity appears qualified, what is missing, and what should be clarified next.',
        steps: ['Provide the deal notes and qualification framework.', 'Ask Claude to assess what is known and unknown.', 'Use it to surface gaps, not to make the go/no-go decision alone.', 'Follow up on the missing inputs in the next customer interaction.'],
        prompt: `Assess this opportunity against our qualification criteria.\n\nTell me:\n- What appears strong\n- What is still unclear\n- Risks to progression\n- Questions we should answer next`
      }
    ]
  },
  {
    id: 'proposals',
    eyebrow: 'Proposals',
    title: 'Claude for proposals and solution storytelling',
    lead: 'Proposal work becomes faster and more consistent when Claude helps with structure, message flow, and differentiation.',
    cards: [
      {
        title: 'Proposal outline',
        concept: 'Claude can convert opportunity notes into a structured proposal outline that is easier for the team to refine.',
        steps: ['Share the customer problem, offering, and desired proposal tone.', 'Ask for sections and message logic first.', 'Review the outline before asking for full draft content.', 'Check every claim and commitment before sharing externally.'],
        prompt: `Act as a proposal writer.\n\nCreate a proposal outline for this opportunity.\n\nInclude:\n- Executive summary\n- Customer problem\n- Recommended approach\n- Timeline or phases\n- Differentiators\n- Risks and assumptions`
      },
      {
        title: 'Differentiation messaging',
        concept: 'Claude can help sellers sharpen the “why us” story by organizing strengths against the buyer’s situation.',
        steps: ['Provide the buyer context and competitor or status quo concerns.', 'Ask for differentiation points tied to the customer’s priorities.', 'Avoid generic “best in class” claims.', 'Use the output to strengthen proposal and conversation quality.'],
        prompt: `Create a differentiation message for this opportunity.\n\nTie our strengths to:\n- The customer’s likely priorities\n- Their current pain points\n- Risks of doing nothing\n- Why our approach is different`
      }
    ]
  },
  {
    id: 'objections',
    eyebrow: 'Objections',
    title: 'Claude for objection handling and negotiation prep',
    lead: 'Claude is useful when it helps reps think through objections and prepare better responses, not memorize scripts mechanically.',
    cards: [
      {
        title: 'Objection handling prep',
        concept: 'Claude can generate structured responses to common objections such as price, timing, integration, or risk.',
        steps: ['State the objection and deal context.', 'Ask for a calm, consultative response structure.', 'Request likely follow-up concerns as well.', 'Adapt the output to the rep’s real conversation style.'],
        prompt: `Help me prepare for these sales objections.\n\nFor each objection, provide:\n- What the customer may really mean\n- A strong response angle\n- A follow-up question\n- A risk if we answer poorly`
      },
      {
        title: 'Negotiation briefing',
        concept: 'Claude can help reps and leaders organize negotiation considerations before a high-stakes meeting.',
        steps: ['Provide current deal position, asks, and constraints.', 'Ask for likely pressure points and give-get options.', 'Use this as preparation, not as a rigid script.', 'Align internally before the negotiation call.'],
        prompt: `Prepare a negotiation brief for this deal.\n\nInclude:\n- Likely customer asks\n- Our acceptable boundaries\n- Give-get options\n- Risks to margin or scope\n- Recommended posture for the conversation`
      }
    ]
  },
  {
    id: 'pipeline-reviews',
    eyebrow: 'Pipeline Reviews',
    title: 'Claude for pipeline review and forecast thinking',
    lead: 'Pipeline reviews improve when Claude helps structure deal signals, risks, and questions rather than just repeating status updates.',
    cards: [
      {
        title: 'Deal review summary',
        concept: 'Claude can turn messy deal notes into a cleaner review summary for sales leadership.',
        steps: ['Provide deal stage, notes, and risks.', 'Ask for what is solid, what is uncertain, and what needs action.', 'Keep hard forecast calls human-owned.', 'Use the output to sharpen the pipeline meeting.'],
        prompt: `Create a deal review summary for this opportunity.\n\nInclude:\n- Current status\n- Positive signals\n- Risks or unknowns\n- What needs to happen next\n- Questions leadership should ask`
      },
      {
        title: 'Forecast risk framing',
        concept: 'Claude can help explain why the forecast may be at risk and what assumptions are carrying the number.',
        steps: ['Provide forecast notes and dependency details.', 'Ask Claude to separate confirmed progress from hopeful assumptions.', 'Use it to challenge forecast optimism.', 'Review forecast ownership with the rep and manager.'],
        prompt: `Analyze this forecast position.\n\nTell me:\n- What is genuinely supported\n- What depends on assumptions\n- What could slip\n- What actions would improve confidence`
      }
    ]
  },
  {
    id: 'leadership-support',
    eyebrow: 'Leadership Support',
    title: 'Claude for sales leadership support',
    lead: 'Leaders can use Claude to sharpen reviews, planning notes, and cross-functional communication without spending hours on first drafts.',
    cards: [
      {
        title: 'QBR or account-review draft',
        concept: 'Claude can help prepare structured account or quarter review narratives from notes, metrics, and deal movement.',
        steps: ['Provide the review period and input notes.', 'Ask for highlights, misses, lessons, and actions.', 'Use the draft as a working note for the leadership team.', 'Refine with real numbers and judgments before presenting.'],
        prompt: `Draft a sales review note for this period.\n\nInclude:\n- Wins\n- Misses\n- Major deal movement\n- Risks ahead\n- Recommended actions`
      },
      {
        title: 'Cross-functional coordination note',
        concept: 'Claude can help sales leaders draft clearer asks for product, marketing, delivery, or finance when deal progress depends on them.',
        steps: ['Describe the deal situation and needed support.', 'Ask for a concise internal coordination note.', 'Keep asks specific and accountable.', 'Use the note to reduce ambiguity across teams.'],
        prompt: `Write an internal coordination note for this deal.\n\nInclude:\n- Situation summary\n- What support is needed\n- Why it matters\n- Suggested owners and next steps`
      }
    ]
  }
]

const workflowSteps = ['Claude prepares the account brief.', 'Claude structures discovery questions and follow-up.', 'Claude drafts proposal or objection support.', 'Sales reviews and adapts the output for the actual customer context.', 'The deal moves forward with better preparation and less manual admin work.']

const governance = { allowed: ['Account briefs and discovery prep', 'Drafting follow-up and proposal outlines', 'Structuring pipeline reviews and internal notes'], restricted: ['Sending unchecked customer communication', 'Inventing terms, pricing, or commitments', 'Replacing commercial judgment or approval authority'] }

const promptLibrary = [
  { label: 'Account prep', text: 'Create a concise account brief with priorities, risks, stakeholders, and discovery questions.' },
  { label: 'Discovery', text: 'Summarize this discovery call and list pains, buying signals, blockers, and next steps.' },
  { label: 'Proposal', text: 'Create a proposal outline with executive summary, approach, differentiators, risks, and next steps.' },
  { label: 'Objections', text: 'Help me prepare for these objections with response angle, follow-up question, and risk if answered poorly.' },
  { label: 'Pipeline', text: 'Turn these deal notes into a review summary with signals, risks, questions, and actions.' }
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
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
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
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
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

function PromptCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className="scenario-card collapsible-card">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <strong>{item.title}</strong>
          <small>{item.concept}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <h4>Suggested Steps</h4>
          <ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="section-subhead">
            <div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div>
            <pre>{item.prompt}</pre>
          </div>
        </div>
      ) : null}
    </article>
  )
}

function ClaudeSalesPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#0d9488', '--accent-soft': '#ccfbf1' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude for Sales</p>
          <h1>Claude <span>Sales Playbook</span></h1>
          <p className="lead">
            Sales work is full of account context, conversation prep, proposal logic, objections, and internal coordination. Claude works best here as a copilot for preparation, synthesis, and structured deal thinking.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#purpose">Start here</a>
            <a className="btn" href="/">Back to main tutorial</a>
          </div>
          <div id="page-index" className="panel-card hero-index-card">
            <h3>Index</h3>
            <div className="surface-nav hero-index-nav">
              {sections.filter((section) => section.href !== '#page-index').map((section) => (
                <a key={section.href} className="surface-link" href={section.href}>{section.label}</a>
              ))}
            </div>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>Help sales teams use Claude to prepare faster, think more clearly, and communicate more consistently while keeping deal judgment and customer trust fully human-owned.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for AI-augmented sales" lead="This page focuses on repeatable sales workflows where Claude improves preparation and structure without replacing commercial judgment.">
          <div className="section-subhead">
            <h3>Practical examples of augmentation</h3>
            <div className="scenario-list">
              {augmentationExamples.map((item) => (
                <article key={item.title} className="scenario-card">
                  <h3>{item.title}</h3>
                  <p className="scenario-meta"><strong>Before:</strong> {item.before}</p>
                  <p className="scenario-meta"><strong>With Claude:</strong> {item.after}</p>
                  <div className="prompt-controls"><CopyPrompt prompt={item.prompt} /></div>
                  <pre>{item.prompt}</pre>
                </article>
              ))}
            </div>
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="outcomes-in-practice" eyebrow="Outcomes in Practice" title="What these outcomes mean in sales" lead="These are practical improvements in how sales teams prepare, communicate, and review deals.">
          <div className="notes-grid">{outcomes.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="operating-model" eyebrow="Operating Model" title="The sales + Claude operating model" lead="Claude supports preparation and structured thinking while reps and leaders keep relationship judgment and commercial accountability.">
          <div className="notes-grid">{operatingRoles.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        {contentSections.map((section) => (
          <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}>
            <div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div>
          </CollapsibleSection>
        ))}
        <CollapsibleSection id="workflow-automation" eyebrow="Workflow Automation" title="Sales workflow automation with Claude" lead="Claude becomes more valuable when it is built into prep, follow-up, and review loops rather than used only ad hoc.">
          <div className="timeline">{workflowSteps.map((step, index) => <article key={step} className="timeline-card"><p className="timeline-time">Step {index + 1}</p><p>{step}</p></article>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="governance" eyebrow="Governance" title="Governance guidelines" lead="Define where Claude is appropriate in deal workflows and where review is mandatory.">
          <div className="scenario-list">
            <PromptCard item={{ title: 'Allowed uses', concept: 'Use Claude to support account prep, follow-up drafting, and internal deal review.', steps: governance.allowed, prompt: 'Use Claude to prepare account briefs, structure proposal outlines, and summarize discovery notes while keeping final judgment and outbound communication under human control.' }} />
            <PromptCard item={{ title: 'Restricted uses', concept: 'Do not let Claude make commitments or replace commercial judgment.', steps: governance.restricted, prompt: 'Do not send AI-generated pricing, contractual commitments, or customer-facing claims without human review and approval.' }} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="Sales prompt library quick reference" lead="These are easy starters for common sales workflows.">
          <div className="scenario-list">{promptLibrary.map((item) => <PromptCard key={item.label} item={{ title: item.label, concept: 'Copy and adapt this prompt for common sales work.', steps: ['Add account and buyer context.', 'Set the stage and objective.', 'Review before external use.'], prompt: item.text }} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="deeper-idea" eyebrow="What Changes" title="The deeper idea behind this playbook" lead="Sales spends less time on admin stitching and more time on strategic preparation, listening, and deal judgment.">
          <div className="notes-grid">
            <InfoCard title="From note assembler to deal strategist" detail="Claude handles more of the synthesis and drafting so sellers can focus more on customer understanding and deal quality." tone="model-note" />
            <InfoCard title="Sales as the relationship-intelligence layer" detail="With AI support, sales can move faster on preparation while still preserving the human trust and judgment that actually closes business." tone="model-note" />
          </div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}

export default ClaudeSalesPage
