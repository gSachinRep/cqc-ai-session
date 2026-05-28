import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Outcomes in Practice', href: '#outcomes-in-practice' },
  { label: 'Operating Model', href: '#operating-model' },
  { label: 'Talent Acquisition', href: '#talent-acquisition' },
  { label: 'Performance', href: '#performance-management' },
  { label: 'Communication', href: '#employee-communication' },
  { label: 'Knowledge Assistants', href: '#knowledge-assistants' },
  { label: 'Workforce Insights', href: '#workforce-insights' },
  { label: 'Learning and Development', href: '#learning-and-development' },
  { label: 'Workflow Automation', href: '#workflow-automation' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Library', href: '#prompt-library' },
  { label: 'What Changes', href: '#deeper-idea' }
]

const learningOutcomes = [
  {
    title: 'Design powerful prompts that generate accurate, professional HR outputs',
    detail:
      'This means HR teams learn to give Claude enough business context, role framing, constraints, and output structure so the response is usable in a real HR workflow rather than generic.'
  },
  {
    title: 'Use Claude confidently as an AI assistant for everyday HR work',
    detail:
      'Confidence comes from repeatable use cases such as drafting, summarizing, comparing, and structuring text-heavy work, while knowing where human review still matters.'
  },
  {
    title: 'Write clear, compliant, and well-structured job descriptions in minutes',
    detail:
      'Claude can accelerate the first draft by organizing responsibilities, qualifications, and inclusive language into a consistent format that HR can refine with hiring managers.'
  },
  {
    title: 'Create role-specific screening questions and selection criteria',
    detail:
      'Instead of reusing generic interview questions, teams can ask Claude to generate competency-based screening logic aligned to the role and the capabilities that matter most.'
  },
  {
    title: 'Analyze, compare, and shortlist resumes using structured AI workflows',
    detail:
      'Claude is useful for summarizing candidate evidence, surfacing concerns, and creating neutral comparison views that improve shortlist discussions without making the decision itself.'
  },
  {
    title: 'Build behavioral and competency-based interview question sets',
    detail:
      'Claude can generate question banks grouped by capability areas, with each question tied to what it is intended to evaluate, making interview design more rigorous and reusable.'
  },
  {
    title: 'Draft HR policies and employee handbook sections faster and with consistency',
    detail:
      'Where policies follow recurring structures, Claude can create cleaner first drafts and standard sections so HR spends more time reviewing intent and less time formatting.'
  },
  {
    title: 'Draft internal HR emails, announcements, and communications',
    detail:
      'Claude helps HR move faster on employee updates, manager notes, onboarding communication, and policy messaging while controlling tone and clarity across audiences.'
  },
  {
    title: 'Standardize HR documentation across the organization',
    detail:
      'Using shared prompt patterns and templates makes outputs more consistent across recruiters, HRBPs, L&D partners, and service lines.'
  },
  {
    title: 'Reduce manual writing and administrative workload',
    detail:
      'Claude is most useful when it absorbs the first-pass drafting and synthesis effort so HR professionals can focus more on people judgment, coaching, and stakeholder alignment.'
  },
  {
    title: 'Improve consistency, clarity, and quality of HR outputs',
    detail:
      'A structured AI workflow reduces uneven writing quality, missing sections, and unstructured notes, especially when the same work repeats across teams.'
  },
  {
    title: 'Apply ethical and responsible AI use in HR contexts',
    detail:
      'This includes bias awareness, data minimization, transparent use, and strong human oversight in sensitive workflows such as hiring, performance, and employee relations.'
  },
  {
    title: 'Support better hiring and people decisions using AI',
    detail:
      'Claude should support stronger inputs to decisions by improving structure and synthesis, while the final judgment remains with HR and business leaders.'
  },
  {
    title: 'Maintain human judgment while using AI as a productivity tool',
    detail:
      'AI should not replace fairness, context, empathy, or accountability. The value comes from reducing mechanical work while preserving human responsibility.'
  },
  {
    title: 'Create clear, professional employee communications such as announcements, updates, policy changes, and onboarding messages',
    detail:
      'Claude can help tailor language for employee understanding, explain what is changing, and keep communication direct, empathetic, and easier to scale.'
  }
]

const augmentationExamples = [
  {
    title: 'From messy notes to a performance review',
    before:
      'A manager shares scattered bullet notes, mixed praise, and vague concerns. HR usually spends time rewriting and organizing the feedback before a useful review exists.',
    after:
      'Claude turns those notes into a structured draft with achievements, development areas, and recommendations, allowing HR and the manager to focus on fairness, tone, and coaching value.',
    prompt:
      `Act as an HR performance advisor.\n\nConvert the following manager notes into a balanced performance review draft.\n\nInclude:\n- Achievements\n- Areas for improvement\n- Development recommendations\n\nKeep the tone constructive, professional, and specific.`
  },
  {
    title: 'From policy library to clear employee answer',
    before:
      'Employees ask policy questions and HR has to search handbook sections, leave rules, and exception notes manually before responding.',
    after:
      'Claude reviews the policy documents, finds the relevant section, and drafts a clear employee-facing answer while explicitly stating when the policy does not cover the question.',
    prompt:
      `You are an HR policy assistant.\n\nUse the uploaded policy documents to answer this employee question clearly and politely.\n\nIf the answer is not explicitly found in the policies, say that clearly and suggest the right HR contact or next step.`
  },
  {
    title: 'From candidate pile to structured shortlist discussion',
    before:
      'Recruiters and hiring managers manually scan multiple resumes and rely on memory or inconsistent notes when deciding who should move forward.',
    after:
      'Claude produces a concise comparison of strengths, concerns, role relevance, and interview focus areas so the hiring team can have a more structured shortlist discussion.',
    prompt:
      `Compare these candidate resumes against the role requirements.\n\nFor each candidate, summarize:\n- Key strengths\n- Relevant experience\n- Potential concerns\n- Suggested interview focus areas\n\nEnd with a neutral shortlist discussion summary.`
  }
]

const operatingRoles = [
  {
    title: 'Synthesizer',
    detail: 'Reads policies, feedback, resumes, surveys, and other HR text to condense large volumes into useful patterns and concise summaries.'
  },
  {
    title: 'Drafting Partner',
    detail: 'Creates first drafts of HR documents, policy sections, communications, training material, and hiring artifacts so teams do not start from a blank page.'
  },
  {
    title: 'Structured Thinking Assistant',
    detail: 'Helps HR leaders reason through messy people problems, organize options, identify risks, and structure decisions more clearly.'
  }
]

const contentSections = [
  {
    id: 'talent-acquisition',
    eyebrow: 'Talent Acquisition',
    title: 'Claude for recruitment and hiring',
    lead:
      'Recruitment is full of repetitive writing and analysis work. Claude is useful here when it helps structure hiring workflows, not when it acts like the decision maker.',
    cards: [
      {
        title: 'Job description creation',
        concept:
          'Claude helps HR teams generate consistent, well-structured job descriptions quickly. This is useful when multiple roles need to be drafted or refreshed while keeping format, tone, and inclusion language consistent.',
        steps: [
          'Start with the business context, role level, function, and reporting line.',
          'Ask for required sections such as role overview, responsibilities, required skills, preferred qualifications, and culture statement.',
          'Explicitly ask for inclusive and unbiased language.',
          'Review the draft with the hiring manager before publishing.'
        ],
        prompt:
          `Act as an experienced HR recruiter.\n\nCreate a job description for a Senior Data Engineer in a financial services company.\n\nInclude:\n- Role overview\n- Key responsibilities\n- Required skills\n- Preferred qualifications\n- Culture statement\n\nEnsure the description avoids biased language and promotes diversity.`
      },
      {
        title: 'Interview question generator',
        concept:
          'Claude can create structured interview questions and evaluation logic for different roles. The most useful pattern is to ask for both the question and what it is intended to evaluate so the panel knows why each question exists.',
        steps: [
          'Specify the target role and the capability areas you want to assess.',
          'Ask for questions grouped by category rather than as one mixed list.',
          'Include the evaluation purpose of each question.',
          'Optionally ask Claude to create a simple interview scorecard alongside the questions.'
        ],
        prompt:
          `Act as a hiring expert.\n\nGenerate structured interview questions for a Product Manager role.\n\nInclude:\n- 5 behavioral questions\n- 5 problem-solving questions\n- 5 leadership questions\n\nProvide what each question is intended to evaluate.`
      },
      {
        title: 'Resume analysis',
        concept:
          'Claude becomes valuable as a resume synthesis tool when it structures evidence, concerns, and interview focus areas. It should support triage and comparison, not replace human hiring judgment.',
        steps: [
          'Provide the role context and the candidate resume or notes.',
          'Ask for strengths, concerns, relevance, and interview focus areas.',
          'Keep the output concise so recruiters can compare candidates efficiently.',
          'Use the output as a discussion aid, not as an automated decision.'
        ],
        prompt:
          `Review the following candidate resume and summarize:\n\n1. Key strengths\n2. Relevant experience for the role\n3. Potential concerns\n4. Suggested interview focus areas\n\nProvide a concise hiring evaluation summary.`
      }
    ]
  },
  {
    id: 'performance-management',
    eyebrow: 'Performance',
    title: 'Claude for performance management',
    lead:
      'Managers often struggle to articulate clear performance feedback. Claude helps convert rough notes into structured, balanced, and more thoughtful development-oriented outputs.',
    cards: [
      {
        title: 'Performance review draft',
        concept:
          'Claude can transform manager notes into clearer review language while preserving a constructive and professional tone. This is especially useful when feedback is scattered, overly blunt, or too vague.',
        steps: [
          'Start from manager notes, examples, and performance context.',
          'Ask for achievements, improvement areas, and development recommendations in separate sections.',
          'Set the tone as constructive and professional.',
          'Have the manager and HR partner review the output before it is used formally.'
        ],
        prompt:
          `Act as an HR performance management advisor.\n\nBased on the following notes from a manager, draft a balanced performance review.\n\nInclude:\n- Achievements\n- Areas of improvement\n- Development recommendations\n\nEnsure the tone is constructive and professional.`
      },
      {
        title: 'Development plan creation',
        concept:
          'Claude can help turn general development intent into a clearer growth plan with skills, learning activities, coaching support, and simple progress measures.',
        steps: [
          'Define the employee level, role, and target growth direction.',
          'Ask for a time-bound plan rather than generic advice.',
          'Include skills, activities, coaching, and progress measures.',
          'Adapt the plan with the manager based on actual opportunities and role context.'
        ],
        prompt:
          `Act as a leadership development coach.\n\nCreate a 6-month development plan for a mid-level engineering manager.\n\nInclude:\n- Skills to develop\n- Suggested learning activities\n- Coaching opportunities\n- Metrics for progress`
      }
    ]
  },
  {
    id: 'employee-communication',
    eyebrow: 'Communication',
    title: 'Claude for employee communication',
    lead:
      'HR communication needs clarity, empathy, and precision. Claude is useful here because it can manage tone, structure, and message clarity across different employee audiences.',
    cards: [
      {
        title: 'Policy communication',
        concept:
          'Claude can turn policy changes into clearer employee-facing communication by separating what is changing, why it matters, and what employees need to do next.',
        steps: [
          'Provide the policy change and the intended employee audience.',
          'Ask Claude to keep the language clear and friendly.',
          'Require sections for what is changing, why it is happening, and required action.',
          'Review carefully for accuracy before sending.'
        ],
        prompt:
          `Act as an HR communications specialist.\n\nExplain the company's new hybrid work policy to employees.\n\nWrite in clear and friendly language.\n\nInclude:\n- What is changing\n- Why the change is happening\n- What employees need to do`
      },
      {
        title: 'Change management messaging',
        concept:
          'Claude can help draft sensitive internal announcements in a tone that is more transparent and empathetic than typical corporate communication. This is especially useful when HR needs a first draft that is calm, human, and structured.',
        steps: [
          'Describe the organizational change and the audience.',
          'Ask for a tone that is transparent, empathetic, and reassuring.',
          'Explicitly tell Claude to avoid jargon and vague promises.',
          'Review the draft with leadership and legal or employee-relations stakeholders where needed.'
        ],
        prompt:
          `Draft an internal announcement explaining a restructuring initiative.\n\nEnsure the tone is transparent, empathetic, and reassuring.\n\nAvoid corporate jargon.`
      }
    ]
  },
  {
    id: 'knowledge-assistants',
    eyebrow: 'Knowledge Assistants',
    title: 'Claude for HR knowledge assistants',
    lead:
      'HR teams manage large policy libraries and recurring employee questions. Claude becomes useful as a policy interpreter when it is grounded in the right source documents and is allowed to say when an answer is not found.',
    cards: [
      {
        title: 'Policy Q&A assistant',
        concept:
          'Claude can function as an internal HR policy assistant when it is pointed to policy sources such as the employee handbook, leave policy, travel policy, or compliance guidelines. The key is source grounding and explicit uncertainty handling.',
        steps: [
          'Upload or connect the relevant HR policies.',
          'Prime Claude to answer only from those documents.',
          'Require it to say clearly when the answer is not found.',
          'Use this as a first-response layer, with HR review for complex or sensitive cases.'
        ],
        prompt:
          `You are an HR policy assistant.\n\nAnswer employee questions using the uploaded HR policies.\n\nIf the answer is not found in the policies, say so clearly.`
      }
    ]
  },
  {
    id: 'workforce-insights',
    eyebrow: 'Workforce Insights',
    title: 'Claude for workforce insights',
    lead:
      'Claude is particularly strong at analyzing qualitative text. That makes it useful for survey comments, exit interviews, and other narrative-heavy HR signals that are hard to summarize manually at scale.',
    cards: [
      {
        title: 'Employee survey analysis',
        concept:
          'Claude can turn hundreds of employee comments into patterns, themes, risks, and suggested actions. This is useful when HR wants faster synthesis without losing signal from narrative feedback.',
        steps: [
          'Provide survey comments or free-text responses.',
          'Ask Claude to separate themes, positive signals, risks, and actions.',
          'Use it to create a first synthesis, then validate against the raw comments.',
          'Share only appropriately anonymized data.'
        ],
        prompt:
          `Analyze the following employee survey responses.\n\nIdentify:\n- Key themes\n- Positive signals\n- Risks or concerns\n- Suggested HR actions`
      },
      {
        title: 'Exit interview insights',
        concept:
          'Claude can help identify recurring attrition drivers and organizational patterns across exit data. It is useful when HR wants to move from anecdotal interpretation to more structured pattern recognition.',
        steps: [
          'Provide exit interview notes or summaries.',
          'Ask for attrition drivers, cultural issues, management concerns, and retention improvements.',
          'Use Claude to organize the signals, then validate against actual retention context and business knowledge.',
          'Avoid exposing personally sensitive information beyond what is necessary.'
        ],
        prompt:
          `Analyze the following exit interview notes.\n\nIdentify:\n- Major reasons for attrition\n- Cultural issues\n- Management concerns\n- Suggested retention improvements`
      }
    ]
  },
  {
    id: 'learning-and-development',
    eyebrow: 'Learning and Development',
    title: 'Claude for learning and development',
    lead:
      'Claude can help HR and L&D teams design learning paths, workshop structures, and skill-building programs faster by turning role transitions or capability goals into structured development journeys.',
    cards: [
      {
        title: 'Learning path creation',
        concept:
          'Claude can convert a role transition or capability goal into a more structured learning journey. This is useful when HR needs a first version of a career path or upskilling plan.',
        steps: [
          'Define the starting role, target role, and business context.',
          'Ask for skills, learning topics, and practice activities.',
          'Keep the plan focused on real capability growth rather than generic content.',
          'Review with business leaders or L&D specialists before rollout.'
        ],
        prompt:
          `Act as a corporate learning strategist.\n\nCreate a learning path for aspiring Product Managers transitioning from engineering roles.\n\nInclude:\n- Core skills to develop\n- Recommended learning topics\n- Practice activities`
      },
      {
        title: 'Training content generator',
        concept:
          'Claude can help structure workshops and training sessions by drafting learning objectives, session flow, and activities. It is useful for speeding up instructional drafting without skipping design review.',
        steps: [
          'Specify the workshop topic and audience.',
          'Ask for learning objectives, session structure, and activities.',
          'Have Claude propose a logical sequence rather than just a bullet list.',
          'Refine with an L&D lens before delivery.'
        ],
        prompt:
          `Create a training outline for a workshop on "Effective Feedback Conversations."\n\nInclude:\n- Learning objectives\n- Session structure\n- Activities`
      }
    ]
  }
]

const workflowSteps = [
  'Step 1: Claude drafts the job description.',
  'Step 2: Claude generates interview questions and scorecard logic.',
  'Step 3: Claude summarizes resumes and structures candidate comparison.',
  'Step 4: Claude organizes interview notes and themes.',
  'Step 5: HR makes the hiring decision.'
]


const governance = {
  allowed: [
    'Drafting HR communication',
    'Creating training content',
    'Summarizing documents'
  ],
  restricted: [
    'Final hiring decisions',
    'Promotion recommendations',
    'Disciplinary decisions'
  ]
}

const promptLibrary = [
  { label: 'Recruitment', text: 'Create behavioral interview questions for a senior developer.' },
  { label: 'Performance', text: 'Convert these feedback notes into a structured performance review.' },
  { label: 'Communication', text: 'Draft an announcement explaining a benefits change.' },
  { label: 'Learning', text: 'Create a learning path for new team leaders.' },
  { label: 'Analytics', text: 'Summarize themes from these employee feedback comments.' }
]

function CopyPrompt({ prompt }) {
  const [copyState, setCopyState] = useState('idle')

  useEffect(() => {
    if (copyState === 'idle') {
      return undefined
    }
    const timeoutId = window.setTimeout(() => setCopyState('idle'), 1600)
    return () => window.clearTimeout(timeoutId)
  }, [copyState])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('copied')
    } catch (error) {
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
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
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

function HrPromptCard({ item }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="scenario-card collapsible-card">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
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
          <ol>
            {item.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
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

function ClaudeHrPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#0d9488', '--accent-soft': '#ccfbf1' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude for HR</p>
          <h1>
            Claude <span>HR Playbook</span>
          </h1>
          <p className="lead">
            Imagine the HR function as a giant knowledge organism: policies, performance feedback, job descriptions,
            employee stories, compliance rules, and learning plans. Claude works best here when HR teams use it as a
            structured copilot for reasoning, drafting, and synthesis rather than as a generic prompt toy.
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
              {sections.filter((section) => section.href !== '#page-index').map((section) => (
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
              Enable HR teams to use Claude as a copilot for decision support, documentation, communication, and
              workforce insights while keeping ethical and compliant usage central.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="purpose"
          eyebrow="Purpose"
          title="Practical guide for AI-augmented human resources"
          lead="This page is designed as a repeatable HR playbook: practical prompts, reusable workflows, and clear guardrails so HR professionals become augmented thinkers rather than prompt typists."
        >
          <div className="section-subhead">
            <h3>Practical examples of augmentation</h3>
            <div className="scenario-list">
              {augmentationExamples.map((item) => (
                <article key={item.title} className="scenario-card">
                  <h3>{item.title}</h3>
                  <p className="scenario-meta">
                    <strong>Before:</strong> {item.before}
                  </p>
                  <p className="scenario-meta">
                    <strong>With Claude:</strong> {item.after}
                  </p>
                  <div className="prompt-controls">
                    <CopyPrompt prompt={item.prompt} />
                  </div>
                  <pre>{item.prompt}</pre>
                </article>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="outcomes-in-practice"
          eyebrow="Outcomes in Practice"
          title="What these learning outcomes really mean"
          lead="These outcomes are not just course promises. Each one points to a specific kind of improvement in how HR teams write, analyze, communicate, and make people decisions with AI support."
        >
          <div className="notes-grid">
            {learningOutcomes.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="prompt-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="operating-model"
          eyebrow="Operating Model"
          title="The HR + Claude operating model"
          lead="Claude works best in HR when its role is clear. It should assist but never replace HR judgment, especially in sensitive areas such as hiring, promotions, and employee relations."
        >
          <div className="notes-grid">
            {operatingRoles.map((role) => (
              <InfoCard key={role.title} title={role.title} detail={role.detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        {contentSections.map((section) => (
          <CollapsibleSection key={section.id} id={section.id} eyebrow={section.eyebrow} title={section.title} lead={section.lead}>
            <div className="scenario-list">
              {section.cards.map((item) => (
                <HrPromptCard key={item.title} item={item} />
              ))}
            </div>
          </CollapsibleSection>
        ))}

        <CollapsibleSection
          id="workflow-automation"
          eyebrow="Workflow Automation"
          title="HR workflow automation with Claude"
          lead="Claude becomes more powerful when embedded into workflows. The example below shows how AI-assisted hiring reduces administrative workload while keeping the decision with HR."
        >
          <div className="timeline">
            {workflowSteps.map((step, index) => (
              <article key={step} className="timeline-card">
                <p className="timeline-time">Step {index + 1}</p>
                <p>{step.replace(/^Step \d+: /, '')}</p>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="governance"
          eyebrow="Governance"
          title="Governance guidelines"
          lead="Organizations should define clear rules for where Claude is appropriate and where it must remain strictly advisory."
        >
          <div className="scenario-columns">
            <HrPromptCard item={{ title: 'Allowed uses', concept: 'Use Claude where it improves drafting, structuring, and summarization without taking over final authority.', steps: governance.allowed, prompt: 'Use Claude to draft HR communication, create training content, and summarize documents while preserving human review.' }} />
            <HrPromptCard item={{ title: 'Restricted uses', concept: 'Keep Claude strictly advisory in high-stakes people decisions where human accountability must remain explicit.', steps: governance.restricted, prompt: 'Do not use Claude as the final authority for hiring, promotion, or disciplinary decisions. Use it only to structure information for human review.' }} />
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="prompt-library"
          eyebrow="Prompt Library"
          title="HR prompt library quick reference"
          lead="These are reusable starters that teams can adapt for common HR workflows."
        >
          <div className="scenario-list">
            {promptLibrary.map((item) => (
              <HrPromptCard key={item.label} item={{ title: item.label, concept: 'Copy and adapt this quick-reference prompt for common HR work.', steps: ['Use this as a starting point.', 'Add business context and constraints.', 'Review the output before using it.'], prompt: item.text }} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="deeper-idea"
          eyebrow="What Changes"
          title="The deeper idea behind this playbook"
          lead="AI changes the division of labor in HR: less effort spent on first-draft text production, more effort on judgment, empathy, and people strategy."
        >
          <div className="notes-grid">
            <InfoCard
              title="From document creator to people strategist"
              detail="HR has historically been document-heavy and communication-heavy. Claude can handle drafting, summarizing, and structuring information while humans stay focused on judgment, empathy, and leadership decisions."
              tone="model-note"
            />
            <InfoCard
              title="HR as the organizational intelligence layer"
              detail="The HR professional of the AI era becomes less of a document creator and more of a people strategist supported by intelligent tools. That shift can turn HR into the organizational intelligence layer that understands the workforce."
              tone="model-note"
            />
          </div>
        </CollapsibleSection>
      </main>

      <a className="floating-index" href="#page-index">
        Index
      </a>
    </div>
  )
}

export default ClaudeHrPage
