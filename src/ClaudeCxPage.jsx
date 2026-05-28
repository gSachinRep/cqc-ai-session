import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Outcomes in Practice', href: '#outcomes-in-practice' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'Support Responses', href: '#support-responses' },
  { label: 'Escalations', href: '#escalations' },
  { label: 'Knowledge Assistants', href: '#knowledge-assistants' },
  { label: 'Journey Design', href: '#journey-design' },
  { label: 'Voice of Customer', href: '#voice-of-customer' },
  { label: 'Retention and Recovery', href: '#retention-and-recovery' },
  { label: 'Workflow Automation', href: '#workflow-automation' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'What Changes', href: '#deeper-idea' }
]

const outcomes = [
  { title: 'Design strong CX prompts', detail: 'Claude performs better when it knows the customer situation, service context, tone expectation, and desired output such as response draft, escalation summary, or insight note.' },
  { title: 'Use Claude in everyday service work', detail: 'Customer experience teams get value from response drafting, note summarization, escalation support, policy interpretation, and insight synthesis.' },
  { title: 'Improve response consistency', detail: 'Claude helps teams standardize tone, structure, and clarity across channels while still allowing human judgment on sensitive cases.' },
  { title: 'Reduce manual case handling work', detail: 'Support teams can use Claude to handle the first pass of drafting, summarizing, and triaging so more energy goes into solving the customer problem.' },
  { title: 'Strengthen service judgment', detail: 'Claude is useful when it clarifies what happened, what the customer needs, and what the next best action may be, while final judgment stays human.' },
  { title: 'Turn customer text into insight faster', detail: 'Complaints, feedback, and service notes become more useful when Claude helps identify themes, friction, and retention opportunities.' }
]

const augmentationExamples = [
  {
    title: 'From messy ticket history to a clean escalation brief',
    before: 'A manager has to read a long thread, multiple notes, and past interactions before understanding why a case is now urgent.',
    after: 'Claude turns the thread into a concise escalation summary with issue history, customer impact, and recommended next action.',
    prompt: `Act as a customer escalation manager.\n\nSummarize this case history.\n\nInclude:\n- What happened\n- What the customer is experiencing now\n- What has already been tried\n- Risks if we delay\n- Recommended next action`
  },
  {
    title: 'From policy text to a customer-friendly response',
    before: 'Agents often have to decode policy wording before they can answer clearly and empathetically.',
    after: 'Claude turns policy-heavy guidance into a clearer customer-facing response while keeping the boundaries of the policy intact.',
    prompt: `Use this service policy to draft a customer-friendly response.\n\nKeep the answer:\n- Clear\n- Empathetic\n- Accurate to policy\n- Explicit about what we can and cannot do`
  }
]

const operatingRoles = [
  { title: 'Synthesizer', detail: 'Reads ticket threads, case notes, feedback, and surveys to condense customer situations and patterns quickly.' },
  { title: 'Drafting Partner', detail: 'Creates first drafts of support responses, escalation notes, callback summaries, and service communication.' },
  { title: 'Structured Thinking Assistant', detail: 'Helps teams organize root causes, next-best actions, and service improvements more clearly.' }
]

const contentSections = [
  {
    id: 'support-responses',
    eyebrow: 'Support Responses',
    title: 'Claude for support and service communication',
    lead: 'Claude helps agents and leads respond more clearly and consistently, especially when cases are text-heavy or emotionally charged.',
    cards: [
      {
        title: 'Response drafting',
        concept: 'Claude can draft customer responses that are clearer and more structured than rushed first-pass replies, while still needing human review.',
        steps: ['Provide the case summary and the service boundary.', 'Ask for a tone that is clear, empathetic, and precise.', 'Make sure Claude does not promise unsupported outcomes.', 'Review before sending.'],
        prompt: `Draft a response to this customer issue.\n\nKeep the tone:\n- Empathetic\n- Clear\n- Action-oriented\n\nInclude:\n- Acknowledgment of the issue\n- What we know so far\n- What happens next`
      },
      {
        title: 'Thread summarization',
        concept: 'Claude can summarize long ticket threads into the version that a new agent or manager actually needs.',
        steps: ['Provide the full case history or note set.', 'Ask for a concise issue summary and current status.', 'Request unresolved questions and next steps.', 'Use the summary to reduce re-reading overhead.'],
        prompt: `Summarize this customer thread.\n\nInclude:\n- Original issue\n- What actions have already been taken\n- Current status\n- Open questions\n- Recommended next step`
      }
    ]
  },
  {
    id: 'escalations',
    eyebrow: 'Escalations',
    title: 'Claude for escalations and service recovery',
    lead: 'Escalation work improves when Claude helps structure the case, identify what matters, and support a calmer recovery response.',
    cards: [
      {
        title: 'Escalation brief',
        concept: 'Claude can prepare a cleaner escalation note for managers or cross-functional teams when a case needs urgent attention.',
        steps: ['Provide the history, impact, and urgency.', 'Ask for root issue, current state, and action needed.', 'Use the brief to align stakeholders quickly.', 'Keep the final escalation call human-owned.'],
        prompt: `Create an escalation brief for this case.\n\nInclude:\n- Case history\n- Customer impact\n- Why it escalated\n- Risks if unresolved\n- Recommended owner and next action`
      },
      {
        title: 'Service recovery response',
        concept: 'Claude can help draft calmer recovery communication after a service failure, refund issue, or trust-damaging experience.',
        steps: ['Describe the failure and service boundary.', 'Ask for a response that acknowledges impact and sets expectations clearly.', 'Review carefully for accuracy and tone.', 'Use it as a starting point for recovery outreach.'],
        prompt: `Draft a service recovery message for this customer situation.\n\nThe response should:\n- Acknowledge the failure\n- Show accountability\n- Explain next steps\n- Avoid overpromising`
      }
    ]
  },
  {
    id: 'knowledge-assistants',
    eyebrow: 'Knowledge Assistants',
    title: 'Claude for knowledge and policy support',
    lead: 'CX teams often need to interpret policy, process, and product information quickly. Claude becomes useful when it is grounded in trusted source material.',
    cards: [
      {
        title: 'Knowledge-grounded answer support',
        concept: 'Claude can answer service questions using approved articles, policies, and process notes while explicitly saying when the answer is unclear.',
        steps: ['Provide or connect the approved knowledge sources.', 'Ask Claude to answer only from those sources.', 'Require it to say when the answer is not found.', 'Use it to support agents, not replace service judgment.'],
        prompt: `You are a customer support knowledge assistant.\n\nAnswer this question using only the approved knowledge sources.\n\nIf the answer is not clearly in the sources, say that and suggest the next escalation path.`
      }
    ]
  },
  {
    id: 'journey-design',
    eyebrow: 'Journey Design',
    title: 'Claude for customer journey and service design',
    lead: 'Claude can help teams think through customer journeys, friction points, and redesign ideas when service work spans multiple handoffs.',
    cards: [
      {
        title: 'Journey friction mapping',
        concept: 'Claude can turn complaints, support notes, and CX observations into a clearer map of where customers are getting stuck.',
        steps: ['Provide journey notes, complaints, or cross-team observations.', 'Ask for major friction points and likely causes.', 'Use the output to structure improvement work.', 'Validate with frontline teams before acting.'],
        prompt: `Analyze this customer journey feedback.\n\nIdentify:\n- Main friction points\n- Where the handoffs break down\n- Likely causes\n- Suggested CX improvements`
      },
      {
        title: 'Cross-functional journey redesign support',
        concept: 'Claude can help translate service issues into a structured redesign brief for product, operations, and support teams.',
        steps: ['Describe the current experience and the main customer pain.', 'Ask for a redesign brief with owners and dependencies.', 'Use Claude to organize the problem, not to oversimplify it.', 'Refine with the real process owners.'],
        prompt: `Create a customer journey redesign brief for this issue.\n\nInclude:\n- Current experience\n- Customer pain points\n- Root cause hypotheses\n- Suggested future-state improvements\n- Teams that need to be involved`
      }
    ]
  },
  {
    id: 'voice-of-customer',
    eyebrow: 'Voice of Customer',
    title: 'Claude for voice-of-customer synthesis',
    lead: 'Claude is strong at turning large volumes of comments, tickets, and survey text into patterns that teams can actually act on.',
    cards: [
      {
        title: 'Feedback theme analysis',
        concept: 'Claude can summarize customer feedback into recurring themes, praise, risks, and improvement areas.',
        steps: ['Provide comments, surveys, or open-text notes.', 'Ask for themes and action implications.', 'Separate positive signals from urgent concerns.', 'Use it to support prioritization, not just reporting.'],
        prompt: `Analyze these customer feedback comments.\n\nInclude:\n- Top themes\n- Positive signals\n- Risks or pain points\n- Suggested service or product actions`
      },
      {
        title: 'Complaint pattern review',
        concept: 'Claude can help identify complaint patterns and likely root causes across many support cases.',
        steps: ['Provide complaint notes or tagged case summaries.', 'Ask Claude for repeated issues and likely root drivers.', 'Use the results in service improvement review.', 'Validate against operational data where possible.'],
        prompt: `Review these complaint summaries.\n\nTell me:\n- The most repeated complaint categories\n- Likely root causes\n- Which issues feel most urgent\n- What CX should investigate first`
      }
    ]
  },
  {
    id: 'retention-and-recovery',
    eyebrow: 'Retention and Recovery',
    title: 'Claude for retention and recovery actions',
    lead: 'When service problems create churn risk, Claude can help structure retention outreach and recovery options more clearly.',
    cards: [
      {
        title: 'At-risk account summary',
        concept: 'Claude can turn support history and feedback into a concise view of why a customer may now be at risk.',
        steps: ['Provide service history and risk signals.', 'Ask for likely risk drivers and intervention ideas.', 'Use it to prepare for outreach or save motion.', 'Keep final customer strategy with the team.'],
        prompt: `Summarize why this customer may be at risk.\n\nInclude:\n- Service history highlights\n- Repeated friction\n- Signs of churn risk\n- Suggested recovery actions`
      },
      {
        title: 'Retention outreach draft',
        concept: 'Claude can help draft a calmer, clearer recovery note when a relationship needs repair.',
        steps: ['Describe the issue and what can realistically be offered.', 'Ask for an empathetic but specific note.', 'Review carefully for promises and accuracy.', 'Use it as the base for outreach.'],
        prompt: `Draft a retention-focused recovery message for this customer.\n\nThe note should:\n- Acknowledge the issue\n- Rebuild trust\n- Clarify what happens next\n- Stay realistic about what we can commit to`
      }
    ]
  }
]

const workflowSteps = ['Claude summarizes the case history.', 'Claude drafts response or escalation notes.', 'Claude identifies patterns across customer feedback.', 'CX teams review and decide the right service action.', 'The organization learns faster from service issues and customer signals.']

const governance = { allowed: ['Drafting support responses and summaries', 'Structuring escalations and service briefs', 'Synthesizing feedback and complaint patterns'], restricted: ['Autonomous commitments to customers', 'Replacing human review in sensitive cases', 'Using AI output as final root-cause truth without validation'] }

const promptLibrary = [
  { label: 'Support', text: 'Draft a clear and empathetic response to this issue with acknowledgment, what we know, and what happens next.' },
  { label: 'Escalation', text: 'Create an escalation brief with history, impact, risks, and recommended next action.' },
  { label: 'Knowledge', text: 'Answer this customer question using only approved policy and knowledge sources, and say clearly if the answer is not found.' },
  { label: 'Voice of Customer', text: 'Summarize these customer comments into themes, pain points, and suggested improvement actions.' },
  { label: 'Retention', text: 'Explain why this customer may be at risk and suggest realistic recovery actions.' }
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

function ClaudeCxPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#0d9488', '--accent-soft': '#ccfbf1' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude for Customer Experience</p>
          <h1>Claude <span>Customer Experience Playbook</span></h1>
          <p className="lead">
            Customer experience work is full of tickets, policy interpretation, empathy, escalations, and feedback loops. Claude works best as a copilot for clarity, synthesis, and structured service action.
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
            <p>Help CX teams use Claude to respond more clearly, escalate more intelligently, learn faster from customer signals, and improve service consistency without losing empathy or judgment.</p>
          </div>
        </aside>
      </header>
      <main>
        <CollapsibleSection id="purpose" eyebrow="Purpose" title="Practical guide for AI-augmented customer experience" lead="This page focuses on repeatable service workflows where Claude improves clarity and speed without replacing human care or accountability.">
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
        <CollapsibleSection id="outcomes-in-practice" eyebrow="Outcomes in Practice" title="What these outcomes mean in customer experience" lead="These are practical improvements in how CX teams respond, learn, and improve service.">
          <div className="notes-grid">{outcomes.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="operating-model" eyebrow="Operating Model" title="The customer experience + Claude operating model" lead="Claude supports synthesis and drafting while teams keep empathy, promises, and service decisions under human control.">
          <div className="notes-grid">{operatingRoles.map((item) => <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />)}</div>
        </CollapsibleSection>
        {contentSections.map((section) => (
          <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}>
            <div className="scenario-list">{section.cards.map((item) => <PromptCard key={item.title} item={item} />)}</div>
          </CollapsibleSection>
        ))}
        <CollapsibleSection id="workflow-automation" eyebrow="Workflow Automation" title="Customer experience workflow automation with Claude" lead="Claude becomes more useful when it is embedded into service loops, escalation loops, and insight loops.">
          <div className="timeline">{workflowSteps.map((step, index) => <article key={step} className="timeline-card"><p className="timeline-time">Step {index + 1}</p><p>{step}</p></article>)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="governance" eyebrow="Governance" title="Governance guidelines" lead="Define where Claude is appropriate in service workflows and where review is mandatory.">
          <div className="scenario-list">
            <PromptCard item={{ title: 'Allowed uses', concept: 'Use Claude to support response drafts, case summaries, and insight synthesis.', steps: governance.allowed, prompt: 'Use Claude to draft support responses, summarize escalations, and synthesize customer feedback while keeping final judgment and sending decisions with the team.' }} />
            <PromptCard item={{ title: 'Restricted uses', concept: 'Do not let Claude make commitments or replace human review in sensitive customer cases.', steps: governance.restricted, prompt: 'Do not use AI to make unsupported promises, replace escalation judgment, or treat AI output as final truth without validation.' }} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection id="prompt-library" eyebrow="Prompt Library" title="Customer experience prompt library quick reference" lead="These are practical starters for common CX workflows.">
          <div className="scenario-list">{promptLibrary.map((item) => <PromptCard key={item.label} item={{ title: item.label, concept: 'Copy and adapt this prompt for everyday CX work.', steps: ['Add case history and context.', 'Set service boundaries and tone.', 'Review before customer use.'], prompt: item.text }} />)}</div>
        </CollapsibleSection>
        <CollapsibleSection id="deeper-idea" eyebrow="What Changes" title="The deeper idea behind this playbook" lead="CX spends less time reconstructing cases and more time solving customer problems and improving journeys.">
          <div className="notes-grid">
            <InfoCard title="From case processor to service strategist" detail="Claude handles more of the summarization and drafting so CX teams can focus more on resolution quality, empathy, and service improvement." tone="model-note" />
            <InfoCard title="CX as the customer-intelligence layer" detail="With AI support, customer experience can turn service interactions into faster organizational learning without losing the human quality customers care about." tone="model-note" />
          </div>
        </CollapsibleSection>
      </main>
      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}

export default ClaudeCxPage
