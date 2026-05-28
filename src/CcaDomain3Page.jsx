import React, { useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Examples', href: '#examples' },
  { label: '3.1 CLAUDE.md Hierarchies', href: '#ts-3-1' },
  { label: '3.2 Path-Specific Rules', href: '#ts-3-2' },
  { label: '3.3 Custom Slash Commands', href: '#ts-3-3' },
  { label: '3.4 Skills Configuration', href: '#ts-3-4' },
  { label: '3.5 Plan Mode vs Direct Execution', href: '#ts-3-5' },
  { label: '3.6 CLI for Automation', href: '#ts-3-6' }
]

const taskStatements = [
  {
    id: 'ts-3-1',
    number: '3.1',
    title: 'Configure CLAUDE.md hierarchies for team development',
    lead: 'CLAUDE.md files stack hierarchically — user level provides personal defaults, project level provides team-wide standards, and directory level adds area-specific instructions.',
    knowledge: [
      'CLAUDE.md hierarchy: user-level (~/.claude/CLAUDE.md) provides personal defaults, project-level (repository root CLAUDE.md) provides team-wide standards, directory-level CLAUDE.md files add context-specific instructions for specific areas of the codebase',
      '@import patterns for modular configuration: including separate files within CLAUDE.md to keep configurations manageable and allow different team members to own different sections',
      'How directory-level CLAUDE.md files work: placing a CLAUDE.md in a subdirectory adds instructions that apply when Claude is working in that directory, in addition to instructions from higher levels in the hierarchy',
      'Inheritance behaviour: all levels of CLAUDE.md are active simultaneously — Claude combines instructions from user, project, and directory levels rather than using only the most specific'
    ],
    skills: [
      'Creating a project-level CLAUDE.md with universal coding standards, testing conventions, and project context that applies to all team members',
      'Using @import to reference separate configuration files, allowing different team members to manage their area\'s conventions and keeping the root CLAUDE.md concise',
      'Adding directory-level CLAUDE.md files for areas with distinct conventions (e.g., a different coding style in legacy code, stricter rules in security-sensitive directories)',
      'Verifying that hierarchy inheritance works correctly — instructions from all levels are applied, more specific levels add to rather than replace higher-level instructions'
    ]
  },
  {
    id: 'ts-3-2',
    number: '3.2',
    title: 'Implement path-specific rules using .claude/rules/',
    lead: 'Rules files use YAML frontmatter with glob patterns to apply instructions only when Claude is editing files that match the specified paths — they are not always loaded like CLAUDE.md.',
    knowledge: [
      '.claude/rules/ files with YAML frontmatter: rule files placed in this directory are only loaded when the file being edited matches the glob patterns specified in the frontmatter',
      'Glob patterns for path-scoping: the paths: field in YAML frontmatter accepts glob patterns (e.g., "**/*.test.*", "src/api/**/*") that determine when the rule activates',
      'How rules load only when editing matching files: unlike CLAUDE.md which is always active, rules files activate conditionally based on the file path — enabling path-specific conventions without polluting all interactions',
      'Key difference from CLAUDE.md: CLAUDE.md instructions are always included; rules files are conditionally included based on file path matching, making them appropriate for conventions that only apply to specific file types or directories'
    ],
    skills: [
      'Creating rule files in .claude/rules/ with YAML frontmatter specifying paths: glob patterns that match the intended file scope',
      'Writing rules that enforce conventions for specific code areas (e.g., async/await patterns for API handlers, repository pattern for database models, hook conventions for React components)',
      'Testing that rules load conditionally — verifying a rule activates when editing a matching file and does not activate when editing a non-matching file',
      'Designing rules for test files spread across a codebase using glob patterns like "**/*.test.*" that match by filename pattern regardless of directory location'
    ]
  },
  {
    id: 'ts-3-3',
    number: '3.3',
    title: 'Create and configure custom slash commands',
    lead: 'Project-scoped commands in .claude/commands/ are version-controlled and available to all team members. Personal commands in ~/.claude/commands/ are for individual use only.',
    knowledge: [
      '.claude/commands/ for project-scoped commands: slash command files placed here are version-controlled with the repository and automatically available to all developers who clone or pull the repo',
      '~/.claude/commands/ for personal commands: slash commands placed in the user-level directory are available only to that user and are not shared via version control',
      'CLAUDE.md vs .claude/commands/ distinction: CLAUDE.md provides always-active project instructions; .claude/commands/ defines callable slash commands that are invoked explicitly by name',
      'Version control for team access: storing commands in .claude/commands/ (project-scoped) means the team benefits from shared commands without each member configuring them individually'
    ],
    skills: [
      'Creating project-scoped custom slash commands in .claude/commands/ with appropriate command definitions for team-wide workflows (e.g., /review, /release-notes, /standup)',
      'Structuring commands for team sharing via version control, ensuring commands work correctly in any team member\'s environment',
      'Distinguishing project vs personal command scope and choosing the correct location based on whether the command should be shared or personal',
      'Verifying that project-scoped commands are available after cloning or pulling the repository without additional configuration'
    ]
  },
  {
    id: 'ts-3-4',
    number: '3.4',
    title: 'Design and configure Claude Code skills',
    lead: 'Skills in .claude/skills/ use SKILL.md frontmatter to configure context isolation, tool restrictions, and argument parameterisation — enabling reusable, scoped agent capabilities.',
    knowledge: [
      'Skills in .claude/skills/ with SKILL.md frontmatter: skills are reusable agent configurations invoked by name, with frontmatter controlling their behaviour',
      'context: fork for isolation: the fork context setting creates an isolated session for the skill, preventing the skill\'s intermediate steps from polluting the main conversation context',
      'allowed-tools restrictions: skills can restrict which tools are available during their execution, applying least privilege within a skill\'s scope',
      'argument-hint for parameterisation: the argument-hint frontmatter field defines how the skill accepts user arguments, enabling parameterised invocation'
    ],
    skills: [
      'Creating skills with context: fork to ensure the skill runs in an isolated context, keeping intermediate reasoning and tool calls out of the main conversation',
      'Configuring allowed-tools in skill SKILL.md frontmatter to restrict each skill to only the tools it needs, improving reliability and security',
      'Verifying that skills run in isolation — checking that the main conversation context is not polluted by the skill\'s tool calls or intermediate steps',
      'Designing parameterised skills using argument-hint that accept caller-provided arguments for flexible, reusable skill invocations'
    ]
  },
  {
    id: 'ts-3-5',
    number: '3.5',
    title: 'Choose between plan mode and direct execution',
    lead: 'Plan mode is for complex tasks with multiple valid approaches and architectural decisions. Direct execution is for single-file changes and tasks with clear, unambiguous implementation paths.',
    knowledge: [
      'When plan mode provides value: complex multi-file changes, architectural decisions with multiple valid approaches, refactoring tasks where the right approach is unclear before exploring the codebase',
      'Direct execution for single-file changes: straightforward edits where the implementation path is unambiguous and exploration is not required before making changes',
      'Plan mode prevents costly rework: entering plan mode before a large refactor enables codebase exploration and approach design before any changes are made, avoiding rework when dependencies are discovered late',
      'Plan mode is not for trivial tasks: using plan mode for single-file fixes or changes with obvious implementations adds overhead without value — direct execution is more efficient'
    ],
    skills: [
      'Assessing task complexity to choose between plan mode and direct execution — identifying whether a task involves architectural decisions, multiple valid approaches, or dependencies that require exploration',
      'Using plan mode for large-scale refactoring, service boundary decisions, and multi-file library migrations where committing to an approach before understanding dependencies risks costly rework',
      'Using direct execution for single-file bug fixes, obvious enhancements, and tasks where the implementation is clear and exploration adds no value',
      'Explaining plan mode value to team members: its benefit is not in the plan output itself but in the safe codebase exploration that precedes committing to changes'
    ]
  },
  {
    id: 'ts-3-6',
    number: '3.6',
    title: 'Use Claude Code CLI effectively for automation',
    lead: 'The -p (--print) flag enables non-interactive mode for CI/CD pipelines. --output-format json and --json-schema support structured output for downstream processing. /compact manages context during long sessions.',
    knowledge: [
      '-p (--print) flag for non-interactive mode: the documented way to run Claude Code in CI/CD pipelines — processes the prompt, outputs to stdout, and exits without waiting for user input',
      '--output-format json for structured CI output: requests JSON-formatted output from Claude Code for downstream parsing by pipeline scripts',
      '--json-schema for structured output: provides a JSON schema to Claude Code, constraining its output to match the schema for reliable downstream processing',
      '/compact for context management: the /compact command summarises the conversation history to reduce context usage when the context window fills with verbose discovery output during long sessions',
      '/memory for cross-session persistence: the /memory command enables persisting key facts across sessions so Claude Code can resume with relevant context'
    ],
    skills: [
      'Using the -p flag in CI/CD pipeline scripts to run Claude Code in non-interactive mode, preventing pipeline hangs caused by Claude Code waiting for user input',
      'Configuring --output-format json and --json-schema for structured CI output that downstream pipeline steps can reliably parse',
      'Implementing /compact during long codebase exploration sessions when the context window fills with verbose tool output and Claude Code begins giving inconsistent answers',
      'Using /memory to persist project context across sessions so long-running analysis work can be resumed without restarting from scratch'
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

export default function CcaDomain3Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#4f46e5', '--accent-soft': '#e0e7ff' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CCA Foundations — Domain 3</p>
          <h1>Claude Code <span>Configuration &amp; Workflows</span></h1>
          <p className="lead">
            20% of the exam. Covers CLAUDE.md hierarchies, path-specific rules with .claude/rules/, custom slash commands, skill configuration with frontmatter, plan mode vs direct execution decisions, and CLI automation with the -p flag.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#ts-3-1">Start studying</a>
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
            <h3>Domain 3 at a Glance</h3>
            <div className="model-list">
              <div className="model-row"><strong>Weight</strong><span>20% of exam</span></div>
              <div className="model-row"><strong>Task Statements</strong><span>6 (3.1 – 3.6)</span></div>
              <div className="model-row"><strong>Key Technologies</strong><span>CLAUDE.md, .claude/rules/, .claude/commands/, .claude/skills/, plan mode, -p flag, /compact, /memory</span></div>
              <div className="model-row"><strong>Primary Scenario</strong><span>Code Generation with Claude Code, CI/CD Integration</span></div>
            </div>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="overview"
          eyebrow="Domain Overview"
          title="What this domain covers and why it matters"
          lead="Domain 3 tests your ability to configure Claude Code correctly for real team workflows — not just use it interactively."
        >
          <div className="notes-grid">
            {[
              ['CLAUDE.md vs .claude/rules/ — the key distinction', 'CLAUDE.md is always active — its instructions apply to every interaction. Rules files in .claude/rules/ are conditional — they activate only when the file being edited matches the specified glob pattern. Use CLAUDE.md for universal project standards; use rules files for conventions that only apply to specific file types or directories.'],
              ['Project vs user scope throughout the domain', 'The scope distinction appears in CLAUDE.md hierarchies (project vs user level), slash commands (.claude/commands/ vs ~/.claude/commands/), and MCP configuration (.mcp.json vs ~/.claude.json). The pattern is consistent: project-level is version-controlled and team-shared; user-level is personal and not shared.'],
              ['Plan mode is about exploration before commitment', 'The value of plan mode is not the plan document itself — it is the safe codebase exploration that happens before any changes are committed. For tasks involving architectural decisions or multi-file changes, exploring first prevents discovering blocking dependencies after changes are already in flight.'],
              ['The -p flag is the only correct way to run Claude Code in CI', 'Questions about automating Claude Code in pipelines have one correct answer: the -p (--print) flag. CLAUDE_HEADLESS, --batch, and stdin redirection are all incorrect. The -p flag outputs the result to stdout and exits without waiting for user input — exactly what pipelines require.']
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
          title="CLAUDE.md files, path-scoped rules, slash commands, and CI automation"
          lead="The most exam-tested configuration patterns in Domain 3 — correct files, paths, and commands."
        >
          <ExampleCard
            variant="pattern"
            label="Pattern — CLAUDE.md Hierarchy"
            title="Project root + directory-level + @import for modular config"
            code={`# /CLAUDE.md — project root, always active for all team members
# @import pulls in separate owned files
@import ./docs/coding-standards.md
@import ./docs/testing-conventions.md

## Project Overview
Customer support agent backend. Node 20+, TypeScript strict mode.

## Git Workflow
Run \`npm test\` before every commit. Branch names: feature/*, fix/*, chore/*.
Never commit .env files or API keys.

---
# /src/api/CLAUDE.md — directory-level, active only when working in src/api/
All functions in this directory must:
- Use async/await exclusively (no .then()/.catch())
- Return { data, error } shape — never throw to caller
- Log via: import { log } from '../logger'`}
            note="All levels are active simultaneously — they stack. Directory-level CLAUDE.md adds to (not replaces) project-level. @import keeps the root file short while letting other areas own their conventions."
          />
          <ExampleCard
            variant="correct"
            label="Correct — Path-Scoped Rules"
            title=".claude/rules/ files load only when editing matching files"
            code={`# .claude/rules/test-conventions.md
# Only loads when editing test files — NOT active during normal code edits
---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/__tests__/**"
---

All test files must follow these conventions:
- Use describe/it blocks (not test())
- Mock external dependencies with vi.mock() — we use Vitest, not Jest
- Each test: Arrange / Act / Assert comment structure
- No console.log in test files — use vi.fn() spies instead`}
            note="This is the correct solution when test files are spread throughout the codebase. A rules file with '**/*.test.*' matches by filename pattern regardless of directory location — CLAUDE.md subdirectory files cannot do this."
          />
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Rules vs CLAUDE.md"
            title="Putting path-specific rules in CLAUDE.md pollutes all sessions"
            code={`# INCORRECT: test conventions in root CLAUDE.md — always loaded,
# even when working on API handlers, database models, or config files.
# This wastes context and confuses Claude when writing non-test code.

# /CLAUDE.md (wrong place for test-only rules)
Test files: use describe/it, vi.mock(), Arrange/Act/Assert.
API files: use async/await, return { data, error }.
Database files: follow repository pattern, use transactions.
React components: functional style, hooks only, no class components.
# ... 200 more lines of context loaded on every single interaction`}
            note="Rules files are the right tool when conventions only apply to specific file types. CLAUDE.md is for always-applicable instructions."
          />
          <ExampleCard
            variant="pattern"
            label="Pattern — Custom Slash Command"
            title=".claude/commands/ for team-shared commands"
            code={`# .claude/commands/review.md
# Version-controlled — available to all team members automatically

Review this diff for:

1. **Security** — SQL injection, XSS, auth bypass, exposed secrets
2. **Error handling** — unhandled promise rejections, missing try/catch,
   error messages that leak internal details to callers
3. **Performance** — N+1 queries, missing pagination, sync ops in async handlers
4. **Logic correctness** — off-by-one errors, incorrect null checks, race conditions

For each issue:
- Severity: critical | high | medium | low
- File and line number
- What the problem is
- Recommended fix`}
            note="Store in .claude/commands/ (project root, version-controlled) for team sharing. Store in ~/.claude/commands/ for personal commands only you use."
          />
          <ExampleCard
            variant="incorrect"
            label="Incorrect — CI/CD Pipeline"
            title="Running Claude Code without -p hangs the pipeline"
            code={`# INCORRECT — hangs indefinitely waiting for user input
claude "Analyze this PR for security vulnerabilities"

# Pipeline job output:
# [claude] Ready. How can I help you? _
# (waiting... job times out after 10 minutes)`}
          />
          <ExampleCard
            variant="correct"
            label="Correct — CI/CD Pipeline"
            title="Use -p (--print) for non-interactive mode"
            code={`# CORRECT — processes prompt, outputs to stdout, exits immediately
claude -p "Analyze this PR for security vulnerabilities"

# For structured output (machine-readable JSON for downstream steps):
claude -p "Review this code" --output-format json

# For structured output matching a specific schema:
claude -p "Extract PR metadata" --output-format json --json-schema ./pr-schema.json`}
            note='The -p flag is the ONLY correct way to run Claude Code in CI/CD pipelines. CLAUDE_HEADLESS=true and --batch do not exist. Redirecting stdin from /dev/null does not work.'
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
              <div className="note-card-header"><h3>Domain 4</h3><p>Prompt Engineering &amp; Structured Output — 20%</p></div>
              <a className="btn" href="/cca/domain-4.html">Study Domain 4</a>
            </article>
          </div>
        </section>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
