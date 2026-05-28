import React, { useState } from 'react'

const skillExamples = [
  {
    title: 'Board Brief Reviewer',
    description:
      'A skill that teaches Claude how your team wants board pre-reads evaluated: short, executive-first, risk-aware, and focused on decision quality.'
  },
  {
    title: 'Proposal Storyline Coach',
    description:
      'A skill that helps Claude turn raw pursuit notes into a strong proposal narrative with expected sections, differentiators, and executive tone.'
  }
]

const setupSteps = [
  'Create or open a Claude project where you want the skill to live.',
  'Add a clear skill name and write the purpose in one sentence.',
  'Define what the skill should always do: role, style, guardrails, expected output shape, and what good looks like.',
  'Add examples so Claude can see the pattern you want, not just the instruction.',
  'Test the skill on a small real task, refine the wording, and remove anything vague or duplicative.'
]

const practiceExercises = [
  {
    title: 'Exercise 1: Build a Meeting Summary Skill',
    objective:
      'Create a reusable Claude skill that always turns meeting notes into a structured output: decisions, actions, owners, risks, and next checkpoints.',
    steps: [
      'Write the purpose of the skill in one sentence.',
      'Define the output format and tone.',
      'Add one example input and example output.',
      'Test it on a second meeting note and refine the skill instructions.'
    ]
  },
  {
    title: 'Exercise 2: Build a Strategy Pressure-Test Skill',
    objective:
      'Create a skill that forces Claude to critique business proposals with a skeptical leadership lens rather than just improving the writing.',
    steps: [
      'Define the review dimensions: assumptions, risks, second-order effects, missing evidence, and executive questions.',
      'Specify the response structure you want every time.',
      'Add one sample proposal and a model critique.',
      'Use it on a fresh project idea and compare the first critique with the revised one.'
    ]
  }
]

const sections = [
  { label: 'What Skills Are', href: '#what-skills-are' },
  { label: 'Why They Help', href: '#why-they-help' },
  { label: 'How To Configure', href: '#configure-skills' },
  { label: 'Practice', href: '#practice-exercises' }
]

function SkillsPage() {
  const [showExamplePrompt, setShowExamplePrompt] = useState(false)

  const examplePrompt = `You are using the Strategy Pressure-Test skill.

Review the proposal as a skeptical leadership team.

Always return:
1. Core business problem
2. Weakest assumption
3. Top 3 risks
4. Questions a CFO, operator, and CHRO would ask
5. One recommendation to strengthen the proposal`

  return (
    <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude Skills</p>
          <h1>
            Build Reusable <span>Claude Skills</span>
          </h1>
          <p className="lead">
            This page explains what Claude Skills are, how they help, how to configure them, and gives participants two
            hands-on exercises to practice.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#what-skills-are">
              Start here
            </a>
            <a className="btn" href="/">
              Back to main tutorial
            </a>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-card">
            <h3>Index</h3>
            <div className="surface-nav">
              {sections.map((section) => (
                <a key={section.href} className="surface-link" href={section.href}>
                  {section.label}
                </a>
              ))}
            </div>
          </div>
          <div className="panel-card accent">
            <h3>Goal</h3>
            <p>
              Help participants move from one-off prompting to reusable AI behavior that reflects their team’s standards.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <section id="what-skills-are" className="section">
          <div className="section-heading">
            <p className="eyebrow">Concept</p>
            <h2>What are Skills in Claude?</h2>
            <p className="lead">
              A skill is a reusable instruction pattern that teaches Claude how you want it to behave for a recurring
              kind of work. Instead of rewriting the same framing every time, you encode the role, quality bar, expected
              output, and examples once and reuse them.
            </p>
          </div>
          <div className="notes-grid">
            <article className="note-card prompt-note">
              <div className="note-card-header">
                <h3>Conceptual view</h3>
                <p>
                  Think of a skill as a reusable operating pattern for Claude. It reduces setup effort, increases
                  consistency, and helps teams work with a shared standard rather than personal prompting style.
                </p>
              </div>
            </article>
            <article className="note-card model-note">
              <div className="note-card-header">
                <h3>Actual examples</h3>
                <div className="model-list">
                  {skillExamples.map((example) => (
                    <div key={example.title} className="model-row">
                      <strong>{example.title}</strong>
                      <span>{example.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="why-they-help" className="section">
          <div className="section-heading">
            <p className="eyebrow">Value</p>
            <h2>How do Skills help?</h2>
          </div>
          <div className="model-list">
            <div className="model-row">
              <strong>Consistency</strong>
              <span>Skills help every participant or team get outputs with the same structure and quality bar.</span>
            </div>
            <div className="model-row">
              <strong>Speed</strong>
              <span>They remove repeated setup prompting and let people start closer to the real task.</span>
            </div>
            <div className="model-row">
              <strong>Team leverage</strong>
              <span>One good skill can be reused across many similar situations instead of each person improvising.</span>
            </div>
            <div className="model-row">
              <strong>Better evaluation</strong>
              <span>When the output shape is stable, teams can compare quality, improve the skill, and build trust.</span>
            </div>
          </div>
        </section>

        <section id="configure-skills" className="section">
          <div className="section-heading">
            <p className="eyebrow">Setup</p>
            <h2>How to configure skills</h2>
            <p className="lead">Keep the setup practical. A good skill is specific enough to guide Claude but simple enough to maintain.</p>
          </div>
          <div className="scenario-columns">
            <div className="setup-card">
              <h3>Configuration steps</h3>
              <ol>
                {setupSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="setup-card">
              <h3>Mini example</h3>
              <div className="prompt-controls">
                <button className="prompt-copy-btn" type="button" onClick={() => navigator.clipboard.writeText(examplePrompt)}>
                  <span aria-hidden="true">📋</span>
                  <span>Copy</span>
                </button>
                <button className="prompt-toggle-btn" type="button" onClick={() => setShowExamplePrompt((current) => !current)}>
                  {showExamplePrompt ? 'Hide example' : 'Show example'}
                </button>
              </div>
              {showExamplePrompt ? <pre>{examplePrompt}</pre> : <div className="prompt-placeholder">Example hidden</div>}
            </div>
          </div>
        </section>

        <section id="practice-exercises" className="section">
          <div className="section-heading">
            <p className="eyebrow">Practice</p>
            <h2>Participant exercises</h2>
            <p className="lead">These two exercises help participants move from understanding the concept to actually building and testing a skill.</p>
          </div>
          <div className="scenario-list">
            {practiceExercises.map((exercise) => (
              <article key={exercise.title} className="scenario-card">
                <h3>{exercise.title}</h3>
                <p className="scenario-meta">
                  <strong>Objective:</strong> {exercise.objective}
                </p>
                <h4>Steps</h4>
                <ol>
                  {exercise.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default SkillsPage
