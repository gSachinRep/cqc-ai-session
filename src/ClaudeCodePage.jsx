import React, { useState } from 'react'

const sections = [
  { label: 'Overview', href: '#overview' },
  { label: 'Index', href: '#page-index' },
  { label: 'Learning Outcomes', href: '#learning-outcomes' },
  { label: 'Foundations and Setup', href: '#foundations-and-setup' },
  { label: 'Core Workflow', href: '#module-1' },
  { label: 'Building and Shipping', href: '#module-2' },
  { label: 'Advanced Use Cases', href: '#advanced-use-cases' },
  { label: 'Practice Scenarios', href: '#practice-scenarios' },
  { label: 'When Not To Use', href: '#when-not-to-use' },
  { label: 'Error Recovery', href: '#error-recovery' },
  { label: 'Governance', href: '#governance' },
  { label: 'Prompt Starters', href: '#prompt-starters' }
]

const docsFoundations = [
  {
    title: 'Where Claude Code shows up',
    concept:
      'Claude Code is not only a terminal tool. The official docs position it as a coding system that can show up across terminal, editor, desktop, web, CI, and connected workflows. That matters because people often underestimate it by thinking only in terms of chat plus shell.',
    points: [
      'Use the terminal when you want deep repo access and direct command execution.',
      'Use editor surfaces when you want code and AI side by side while reviewing changes.',
      'Use web or cloud-linked surfaces when you need continuity without staying on one machine.'
    ],
    example:
      'start a refactor in the terminal, inspect the changed files in VS Code, and later check progress from a browser without rebuilding the context from scratch.'
  },
  {
    title: 'What Claude Code is strong at',
    concept:
      'The docs frame Claude Code as a practical implementation partner: it can inspect codebases, write and edit files, run commands, debug issues, automate repetitive work, and help move work toward commits or pull requests. The point is not just answering questions but helping complete work.',
    points: [
      'It is especially useful for repetitive engineering chores that drain time but still need care.',
      'It becomes more valuable when you ask for outcomes, constraints, and checks instead of raw generation.',
      'Its real strength appears when analysis, editing, and command execution happen in one loop.'
    ],
    example:
      'ask Claude Code to find a failing test, trace the likely cause, patch the implementation, rerun the test suite, and summarize what changed.'
  },
  {
    title: 'Memory, instructions, and repeatability',
    concept:
      'Claude Code becomes much more reliable when you stop treating every session as a blank slate. The official docs emphasize persistent guidance through project memory, reusable commands, and conventions that can travel with the repo.',
    points: [
      'CLAUDE.md is where stable project rules and expectations live.',
      'Custom commands reduce repetition for recurring tasks such as review, release prep, or test workflows.',
      'Hooks and automation help move from one-off usage to a dependable team habit.'
    ],
    example:
      'define in CLAUDE.md that every change must preserve API compatibility, keep summaries under 150 words, and run tests before proposing a commit.'
  },
  {
    title: 'Connected workflows with MCP and agents',
    concept:
      'Claude Code becomes more powerful when it can pull in the right context and divide work well. MCP connects outside systems into the workflow, while agents and subagents let Claude split tasks across specialized roles or review lenses.',
    points: [
      'MCP helps Claude use live context from tools rather than relying only on pasted text.',
      'Agents help break a broad request into parallel or specialized analysis streams.',
      'Subagents are useful when the same specialist behavior needs to repeat across projects.'
    ],
    example:
      'connect Jira through MCP, ask one subagent to review architecture risk, another to inspect test gaps, and have Claude combine both into an implementation plan.'
  }
]

const module0Cards = [
  {
    title: 'Introduction',
    concept:
      'Module 0 starts with orientation. Claude Code is introduced as an outcome-driven assistant that works inside real project context. The important mindset shift is that you do not need to know how to code every step yourself; you need to describe what good looks like and learn how Claude sees the workspace.',
    points: [
      'Focus on the outcome before the command sequence.',
      'Start with contained practice projects so the workspace stays understandable.',
      'Use Claude to explain unfamiliar structure before asking it to change anything.'
    ],
    example:
      'open a small internal app folder and ask Claude Code to explain the main files, likely entry points, and the safest first place to make a change.'
  },
  {
    title: 'Installation',
    concept:
      'The installation module is about getting Claude Code working with the least friction possible. The reference course keeps this practical: install, verify, authenticate, and fix blockers quickly so learners get into actual usage instead of stalling in setup.',
    points: [
      'Make sure the machine, terminal, and Claude access are ready first.',
      'Verify installation immediately instead of assuming it worked.',
      'Treat login and permissions as part of onboarding, not as afterthoughts.'
    ],
    example:
      'a participant installs Claude Code, confirms the command is recognized, signs in once, and then opens a starter repository to make sure setup is actually complete.'
  },
  {
    title: 'Start in the right folder',
    concept:
      'Claude Code can only reason over the context it can see. That makes the launch location important. This part of the course teaches learners to start inside the exact project or exercise directory rather than from a broad parent folder with irrelevant noise.',
    points: [
      'The current working directory defines what Claude can inspect easily.',
      'Starting too high in the filesystem creates noisy context and weaker outputs.',
      'A clean practice folder makes it easier to understand what Claude changed.'
    ],
    example:
      'instead of launching Claude Code from Documents, launch it from a folder like meeting-analyzer-prototype so the session starts with focused context.'
  }
]

const module1Cards = [
  {
    title: 'Course introduction',
    concept:
      'Module 1 is where Claude Code becomes a working method rather than a newly installed tool. The focus shifts to how Claude sees files, how you reference context precisely, how you navigate long sessions, and how you get repeatable output quality.',
    points: [
      'This module teaches operating habits, not just features.',
      'The goal is to make work reproducible across sessions and teammates.',
      'Most value comes from learning how to frame tasks, not memorizing commands.'
    ],
    example:
      'a learner moves from “what is this codebase?” to “read these files and produce a one-page onboarding note for the next team member.”'
  },
  {
    title: 'Visual workspace',
    concept:
      'A visual workspace lowers anxiety and improves control. The course emphasizes that learners should see the files Claude is working with, inspect changes visually, and use an editor or file explorer alongside Claude Code rather than working blindly from a single terminal pane.',
    points: [
      'Seeing the file tree helps learners understand repo shape faster.',
      'Visual review makes change verification easier.',
      'A dual-pane setup turns Claude Code into a paired workflow instead of a black box.'
    ],
    example:
      'keep VS Code open next to Claude Code while it creates a summary file, then inspect the new file immediately before asking for the next step.'
  },
  {
    title: 'Working with files',
    concept:
      'File references are one of the most important operational skills in Claude Code. Referencing exactly the right file, folder, or template is what turns a vague request into a grounded one. This is where the @-style workflow becomes important conceptually: precise context beats broad description.',
    points: [
      'Reference the exact sources you want Claude to use.',
      'Use templates when output format matters.',
      'Bring in folders when the relationship across files matters more than a single document.'
    ],
    example:
      'point Claude to a requirements folder and a reporting template, then ask it to generate a draft operating review in the house format instead of inventing one.'
  },
  {
    title: 'Commands and navigation',
    concept:
      'Long sessions need maintenance. Commands for clearing, compacting, resuming, and navigating context help keep Claude Code useful over time. Without this, sessions degrade because too much stale or irrelevant context accumulates.',
    points: [
      'Compact when the conversation gets long and repetitive.',
      'Resume thoughtfully rather than starting from scratch if the context is still valuable.',
      'Treat session hygiene as part of output quality.'
    ],
    example:
      'after a long debugging run, compact the session into the key findings and continue from that cleaner state instead of dragging the whole transcript forward.'
  },
  {
    title: 'Agents',
    concept:
      'Agents help decompose complex work. Instead of having one monolithic response do everything, Claude can use parallel analysis paths or specialized review lenses. This is useful when a task has multiple dimensions such as product, architecture, risk, and UX.',
    points: [
      'Use agents when one task naturally splits into different lenses.',
      'Parallel review often surfaces gaps a single pass would miss.',
      'Agents are most helpful when you define each role clearly.'
    ],
    example:
      'ask one agent to assess implementation risk, another to inspect data model design, and a third to critique end-user flow before synthesizing the outputs.'
  },
  {
    title: 'Custom subagents',
    concept:
      'Subagents are reusable specialists. They are useful when the same kind of analysis or generation repeats often enough that you want consistent behavior. This is where Claude Code starts to feel like an operating system for repeated work, not just a one-time helper.',
    points: [
      'Create subagents for recurring review patterns.',
      'Keep their role narrow enough to stay reliable.',
      'Define expected output shape so they become reusable by the whole team.'
    ],
    example:
      'create a release-readiness subagent that always checks migration risk, rollout steps, customer impact, and missing observability before approving a deployment plan.'
  },
  {
    title: 'Project memory',
    concept:
      'Project memory keeps stable instructions out of the chat thread and inside the repository context. The course emphasizes CLAUDE.md because it helps Claude maintain standards, architecture assumptions, and output conventions across multiple sessions.',
    points: [
      'Store durable project rules in CLAUDE.md, not in repeated prompts.',
      'Keep memory concise enough that it is easy to maintain.',
      'Update memory when the project meaningfully changes.'
    ],
    example:
      'record that summaries must be executive-friendly, API fields should remain snake_case, and the preferred test command is npm run test:ci.'
  }
]

const module2Cards = [
  {
    title: 'Vibe coding overview',
    concept:
      'Vibe coding is not random generation. In the reference flow, it means describing the product outcome, clarifying requirements, and letting Claude help scaffold and iterate quickly. The value comes from short feedback loops rather than one giant prompt.',
    points: [
      'Start with the job to be done, not the UI library.',
      'Treat the first version as a thinking artifact.',
      'Iterate through observation, screenshot feedback, and focused fixes.'
    ],
    example:
      'define a meeting-overload analyzer, let Claude scaffold a first interface, then refine it based on what feels missing after the first preview.'
  },
  {
    title: 'Setup',
    concept:
      'The setup stage in vibe coding is about creating the right build loop. Learners need a clean project folder, a predictable preview command, and a simple way to inspect what Claude changed. Good setup reduces confusion later when debugging starts.',
    points: [
      'Initialize in a clean folder with a simple preview path.',
      'Keep screenshots and notes during iteration.',
      'Make sure the local run loop is working before asking for many changes.'
    ],
    example:
      'scaffold a fresh prototype folder, confirm the local dev server runs, and only then ask Claude to start adding screens and logic.'
  },
  {
    title: 'Plan',
    concept:
      'Planning protects vibe coding from becoming low-quality improvisation. Before building, Claude should help clarify users, inputs, outputs, edge cases, and success criteria. The better this planning step is, the less rework follows.',
    points: [
      'Have Claude interview you before coding.',
      'Define who uses the app and what decision it helps make.',
      'Capture constraints early, especially around data, trust, and time.'
    ],
    example:
      'before building a proposal accelerator, ask Claude to clarify who fills it out, what must be entered, and what a useful first draft should contain.'
  },
  {
    title: 'Build and iterate',
    concept:
      'This is the core execution loop: generate, preview, inspect, refine. Claude Code works best when feedback is specific and grounded in what the user actually sees. Screenshots, console output, and precise criticism create faster improvement than broad statements like “make it better.”',
    points: [
      'Describe what is wrong in terms of layout, logic, or missing behavior.',
      'Prefer small iteration loops over huge redesign requests.',
      'Use the preview to evaluate user experience, not just technical correctness.'
    ],
    example:
      'tell Claude that the dashboard cards feel crowded on mobile, the chart labels are clipped, and the submit button is hard to find, then ask for one focused improvement pass.'
  },
  {
    title: 'GitHub',
    concept:
      'Versioning is the handoff point between experimentation and dependable progress. The course includes GitHub because prototypes become easier to review, recover, share, and continue once they are versioned. This matters especially in workshops where several people may want to revisit a promising build later.',
    points: [
      'Push when the prototype reaches a meaningful checkpoint.',
      'Use commits to preserve iteration milestones.',
      'Versioned work is easier to demo, review, and recover.'
    ],
    example:
      'once the first working team pulse dashboard is stable, push it to GitHub so another participant can critique the UI and continue building from the same base.'
  },
  {
    title: 'Go live',
    concept:
      'Deployment changes the quality of feedback. A live URL lets stakeholders use the prototype directly, which creates better signal than screenshots or verbal walkthroughs. This final step is about getting from local proof-of-concept to something other people can actually touch.',
    points: [
      'Use lightweight deployment for fast workshop sharing.',
      'Collect feedback based on real interaction, not imagined usage.',
      'Treat go-live as a learning tool, not only a production milestone.'
    ],
    example:
      'publish a small internal proposal accelerator to Vercel so business stakeholders can try it in a browser and react to the actual workflow.'
  }
]

const advancedUseCases = [
  {
    title: 'Building Unit Tests with Claude Code',
    concept:
      'Claude Code is useful for generating or improving unit tests when you need broader coverage without manually writing every case. The strongest pattern is to ask for behavior-based coverage, failure paths, and edge cases rather than mechanically mirroring implementation lines.',
    points: [
      'Start by asking Claude to explain what the current code is supposed to guarantee before it writes any tests.',
      'Have it identify uncovered branches, risky edge cases, and weak assertions in existing tests.',
      'Ask for tests that prove business behavior, not only technical execution.',
      'Always rerun the suite and ask Claude to explain what still remains untested.'
    ],
    steps: [
      'Select one service, utility, or controller with meaningful logic.',
      'Ask Claude Code to inspect the file and summarize the key behaviors that need test coverage.',
      'Have Claude generate the missing unit tests and explain the purpose of each group.',
      'Run the tests, fix failures, and ask Claude to point out remaining blind spots.'
    ],
    example:
      'Inspect a pricing rules service, add Jest tests for discount thresholds and invalid input handling, then explain what business rule could still break even after the current coverage passes.',
    prompt:
      'Review this file and identify the behaviors that should be covered by unit tests. Then generate missing tests for success cases, edge cases, and failure paths. Keep the tests readable, explain what each group is validating, and tell me what risks would still remain after these tests pass.'
  },
  {
    title: 'Creating Docker Containers with Claude',
    concept:
      'Claude can scaffold Dockerfiles, docker-compose setups, and container-oriented run instructions. This is useful when teams need a reproducible environment quickly for demos, onboarding, or cross-machine consistency.',
    points: [
      'Use Claude to understand the app runtime, package manager, ports, and environment variables first.',
      'Ask for a minimal working container before asking for production hardening.',
      'Have Claude explain the image structure so participants understand what it generated.',
      'Use containerization as a way to make a project portable, not just impressive.'
    ],
    steps: [
      'Ask Claude to inspect the project and infer the runtime requirements.',
      'Generate a Dockerfile and, if needed, a compose file for local use.',
      'Build and run the container locally, then share the build or runtime errors back with Claude.',
      'Refine the setup until another participant could run it with minimal effort.'
    ],
    example:
      'Containerize a React and Node prototype with one Dockerfile for the app and one compose file that starts the API, frontend, and environment variables consistently.',
    prompt:
      'Inspect this project and create a clean Docker setup for local development. I want a Dockerfile, any supporting compose configuration that is needed, and clear run instructions. Explain the runtime assumptions, exposed ports, and environment variables so another teammate can understand the setup.'
  },
  {
    title: "Debugging Claude's Docker Implementation",
    concept:
      'The first Docker setup is often incomplete. Claude Code is helpful not just for generating the configuration but for tracing why the container fails to build, boot, or connect to dependent services. This is a strong exercise because it shows how to use Claude as a debugger rather than a one-shot generator.',
    points: [
      'Share the exact error output instead of only saying the container failed.',
      'Ask Claude to reason from the Dockerfile, compose config, and logs together.',
      'Prefer the smallest safe fix so learners can understand cause and effect.',
      'Have Claude explain why the issue happened, not just how to patch it.'
    ],
    steps: [
      'Run the container build or compose startup until it fails.',
      'Paste the relevant logs and the current config into Claude Code.',
      'Ask Claude to isolate the likely cause before editing files.',
      'Apply the fix, rerun the build, and ask Claude to document the lesson learned.'
    ],
    example:
      'A container builds successfully but crashes because the start command points to the wrong entry file; Claude identifies the mismatch between build output and runtime command and corrects it.',
    prompt:
      'My Docker setup is failing. Read the Dockerfile, compose config, and error output. Identify the most likely root cause, propose the smallest safe fix, explain why the issue happened, and tell me what to rerun to confirm the fix worked.'
  },
  {
    title: 'Switching to Production-Grade Infrastructure (nginx, PostgreSQL)',
    concept:
      'A prototype often begins with defaults, but Claude can help evolve it toward more realistic infrastructure. That means introducing a proper web server, persistent database, and clearer separation between app, proxy, and data layers.',
    points: [
      'Treat this as an architecture upgrade, not just a dependency swap.',
      'Ask Claude to explain what changes in operations, configuration, and deployment when you move from demo defaults to production-style components.',
      'Separate concerns clearly: app logic, web serving, and data storage should not blur together.',
      'Use this exercise to teach participants how Claude can support infrastructure thinking, not just feature building.'
    ],
    steps: [
      'Start from a working prototype with simple defaults.',
      'Ask Claude to propose a migration path to nginx and PostgreSQL.',
      'Have it update configs, connection handling, and local run instructions.',
      'Review the new architecture and ask Claude to summarize operational trade-offs.'
    ],
    example:
      'Replace in-memory state in a dashboard app with PostgreSQL-backed persistence and add nginx as the front-facing layer for static assets and reverse proxying.',
    prompt:
      'This prototype works locally with lightweight defaults, but I want to move it toward a more production-grade setup using nginx and PostgreSQL. Propose the target architecture, update the configuration and application changes required, and explain the operational trade-offs introduced by this shift.'
  },
  {
    title: 'Adding Security Scans with Claude and npm audit',
    concept:
      'Claude Code can help wire security checks into the project workflow by running scans, interpreting results, and suggesting practical remediation steps. This is especially useful when vulnerability output is noisy or confusing for learners.',
    points: [
      'Use Claude to translate raw scan output into a prioritized action list.',
      'Separate urgent exploitable issues from lower-risk dependency noise.',
      'Ask whether the fix is a package upgrade, a code change, or a conscious risk acceptance.',
      'Use this exercise to teach judgment, not just tool usage.'
    ],
    steps: [
      'Run npm audit or the project’s chosen dependency scan.',
      'Paste the results into Claude Code or let Claude inspect them directly.',
      'Ask Claude to group findings by severity and likely action.',
      'Implement the safest fixes first and re-run the scan.'
    ],
    example:
      'npm audit reports several vulnerabilities; Claude helps distinguish one direct high-severity package issue from multiple low-value transitive warnings and proposes a realistic remediation sequence.',
    prompt:
      'Analyze these npm audit results and turn them into a practical remediation plan. Separate urgent issues from lower-priority noise, explain the likely fix path for each important finding, and tell me which changes I should make first so I improve security without breaking the app.'
  },
  {
    title: 'Continuous Integration (CI) of our Unit Tests and Security Scans',
    concept:
      'Once tests and security checks exist, Claude can help package them into CI so they run consistently. This is where a prototype starts becoming operationally dependable instead of relying on manual discipline.',
    points: [
      'CI should reflect the quality gates the team actually cares about.',
      'Keep the first workflow simple enough to debug easily.',
      'Ask Claude to explain each pipeline step so participants understand the automation they are adding.',
      'Use CI as a trust-building layer, not a ceremonial badge.'
    ],
    steps: [
      'Confirm tests and scans work locally first.',
      'Ask Claude to create a CI workflow that installs dependencies and runs those checks.',
      'Commit the workflow and trigger a run.',
      'Review the results and tighten the failure conditions only after the basic path is stable.'
    ],
    example:
      'Create a GitHub Actions pipeline that runs npm install, Jest tests, and npm audit on every push so the team stops relying on local memory for quality checks.',
    prompt:
      'Create a simple CI workflow for this project that installs dependencies, runs the unit tests, executes npm audit, and clearly fails when serious issues are found. Keep the workflow readable and explain the purpose of each stage.'
  },
  {
    title: "Debugging Claude's Implementation of Continuous Integration",
    concept:
      'Generated CI pipelines often need debugging. Claude Code is useful for reading workflow files, analyzing failure logs, and correcting sequencing or environment mistakes. This is one of the best exercises for showing that AI-generated automation still needs disciplined review.',
    points: [
      'Use the failing log as a primary source, not as an afterthought.',
      'Ask Claude to distinguish between workflow syntax issues, environment mismatch, pathing problems, and flaky tests.',
      'Prefer targeted fixes before broad rewrites.',
      'Have Claude explain how to confirm the pipeline is now genuinely stable.'
    ],
    steps: [
      'Trigger the pipeline and capture the exact failure logs.',
      'Share the workflow file and the failure output with Claude Code.',
      'Ask for a diagnosis ordered by likelihood, then apply the smallest safe fix.',
      'Re-run the workflow and ask Claude what remaining failure modes are still plausible.'
    ],
    example:
      'The pipeline fails only in CI because a script assumes a local path and a Node version; Claude identifies the environment mismatch and updates the workflow accordingly.',
    prompt:
      'This CI workflow is failing. Read the workflow file and the failure logs, identify the most likely cause, explain whether the problem is configuration, environment, or test behavior, and propose the smallest safe fix. Then tell me how to verify that the pipeline is stable.'
  },
  {
    title: 'Analyzing and Improving Page Speed with Claude Code',
    concept:
      'Claude can help analyze performance reports, trace likely bottlenecks, and propose front-end improvements. The best use of Claude here is to combine tool output with user-experience judgment so the fixes improve real experience rather than only a score.',
    points: [
      'Bring Lighthouse or other performance findings into the conversation.',
      'Ask Claude to rank improvements by user impact, not just numerical score.',
      'Have it separate quick wins from structural changes.',
      'Use this to teach participants that AI can reason across performance, UX, and implementation trade-offs.'
    ],
    steps: [
      'Run a page speed or Lighthouse report against the app.',
      'Share the findings with Claude and ask for prioritized recommendations.',
      'Implement one or two meaningful fixes first.',
      'Re-test and compare what improved in both score and user experience.'
    ],
    example:
      'Claude prioritizes large-image optimization and render-blocking script cleanup before deeper refactors because those changes will improve first paint most visibly for users.',
    prompt:
      'Analyze these page speed findings and prioritize the fixes by actual user impact. Separate quick wins from deeper structural work, explain the likely performance benefit of each recommendation, and tell me which two improvements I should make first.'
  },
  {
    title: 'Creating Architecture Diagrams with Claude',
    concept:
      'Claude Code can translate a working system into understandable architecture diagrams and plain-language explanations. This is useful for onboarding, review sessions, and communicating technical design to non-engineering stakeholders.',
    points: [
      'Ask Claude to infer the major components and data flows before drawing anything.',
      'Use diagram generation as a communication tool, not only as technical documentation.',
      'Have Claude explain the diagram in plain language after generating it.',
      'This is especially effective when participants need to present a system they did not originally build.'
    ],
    steps: [
      'Ask Claude to inspect the project structure and identify the core components.',
      'Request a Mermaid architecture diagram that shows systems, flows, and dependencies.',
      'Review the diagram for accuracy and missing context.',
      'Refine the diagram and ask Claude for a short narrative walkthrough.'
    ],
    example:
      'Claude produces a Mermaid diagram showing browser, frontend app, API layer, PostgreSQL, and external auth provider, then explains the request flow in business-friendly language.',
    prompt:
      'Inspect this project and create a Mermaid architecture diagram that shows the major components, data flows, and external dependencies. After the diagram, explain it in plain language so a non-engineering stakeholder can understand how the system works.'
  },
  {
    title: 'Using Subagents in Claude Code',
    concept:
      'Subagents become especially valuable in larger builds where different specialist lenses repeat. They help separate concerns such as security, UX, architecture, and testing so each review stays focused and reusable.',
    points: [
      'Use subagents when the same review pattern repeats often enough to deserve a reusable specialist.',
      'Keep each subagent narrow and explicit about what good output looks like.',
      'Run multiple subagents before major merges or demos to surface weak spots early.',
      'This teaches participants how Claude Code can support team-like review workflows.'
    ],
    steps: [
      'Define the specialist roles you want repeated, such as UI review or release risk review.',
      'Describe the scope and expected outputs for each subagent clearly.',
      'Run those subagents against a feature or prototype.',
      'Synthesize the findings into a final action plan.'
    ],
    example:
      'Create one subagent for design polish, one for test depth, and one for deployment risk, then run all three against a feature before preparing a stakeholder demo.',
    prompt:
      'Help me design a set of focused subagents for this project. I want separate specialists for UX quality, test coverage, and release risk. Define what each one should review, what output it should return, and then show me how to apply them to the current feature.'
  },
  {
    title: 'Using MCP in Claude Code (Model Context Protocol)',
    concept:
      'MCP lets Claude work with broader context than the local repo alone. It is useful when implementation depends on external systems such as ticketing tools, internal docs, design systems, or business data. This is often what turns Claude from helpful to truly context-aware.',
    points: [
      'Use MCP when the repo alone does not contain enough truth to make a reliable decision.',
      'Connect only the context that materially improves the task at hand.',
      'Ask Claude to explain how the external context changes the implementation recommendation.',
      'This is a strong advanced exercise because it shows Claude working as part of a larger system, not in isolation.'
    ],
    steps: [
      'Identify the outside system that holds the missing context, such as tickets or design specs.',
      'Connect that system through MCP in the approved setup.',
      'Ask Claude to combine the external context with the codebase.',
      'Review whether the resulting recommendation is more grounded, specific, and actionable.'
    ],
    example:
      'Claude reads the acceptance criteria from a ticketing system through MCP, compares them with the current implementation, and identifies exactly which changes are still missing in the repo.',
    prompt:
      'Use the connected MCP context together with the local codebase to evaluate this task. Read the external requirements, compare them with the current implementation, identify what is missing or inconsistent, and propose the safest next implementation plan.'
  }
]

const scenarios = [
  {
    title: 'Scenario 1: Inherit an unfamiliar codebase',
    objective:
      'Combine Modules 0 and 1 to understand the repo, identify important files, and build a reliable starting mental model.',
    starter:
      'I am new to this repository. Explain the main folders, identify the likely entry points, tell me what the app appears to do, and create a short onboarding note for the next teammate.'
  },
  {
    title: 'Scenario 2: Build a lightweight internal app in one working session',
    objective:
      'Use Module 2 to plan, scaffold, iterate, and prepare a prototype that can be reviewed by business stakeholders.',
    starter:
      'Interview me to define the requirements for a lightweight internal app. Then scaffold the first version, explain how I can preview it locally, and help me improve it based on screenshots and feedback.'
  },
  {
    title: 'Scenario 3: Add quality and reliability to a promising prototype',
    objective:
      'Use the advanced workflows to add tests, containerization, security checks, and a CI path to an app that already works locally.',
    starter:
      'Review this prototype and propose the next steps to make it more dependable. I want unit tests, a Docker setup, npm audit checks, and a simple CI workflow. Start with the safest sequence and explain trade-offs.'
  }
]

const promptStarters = [
  {
    title: 'Orient me inside the repo',
    prompt:
      'Explain the structure of this project, identify the most important files, and suggest the first three things I should inspect before making any change.'
  },
  {
    title: 'Use project memory correctly',
    prompt:
      'Read the project instructions in CLAUDE.md, inspect the latest files, and produce the standard output in the format and tone defined there.'
  },
  {
    title: 'Run a parallel review',
    prompt:
      'Use parallel agents: one reviews architecture risk, one reviews test gaps, and one reviews UX issues. Then synthesize the findings into one action plan ordered by severity.'
  },
  {
    title: 'Plan before coding',
    prompt:
      'Before writing code, interview me to clarify the users, workflow, edge cases, and success criteria for this app. Then produce a concise build plan.'
  },
  {
    title: 'Move from prototype to dependable app',
    prompt:
      'Review this prototype and suggest the next engineering upgrades: tests, containerization, CI, security checks, and deployment readiness. Recommend the best order and explain why.'
  }
]

const learningOutcomes = [
  'Navigate an unfamiliar codebase and understand its structure using Claude Code before making changes.',
  'Write, edit, and test code with Claude Code acting as an implementation partner across files and commands.',
  'Use CLAUDE.md project memory and custom commands to make Claude Code repeatable across team workflows.',
  'Connect outside tools and context through MCP and use agents or subagents to parallelize complex tasks.',
  'Move from a working prototype to a more production-ready implementation with tests, CI, and safety checks.'
]

const whenNotToUseCards = [
  ['Verify before running commands on production', 'Claude Code can run real terminal commands. Always review proposed commands before executing them on production systems, databases, or anything with irreversible effects.'],
  ['Not for work requiring deep proprietary context only humans have', 'Claude Code works from what it can read in the repo. If decisions require institutional knowledge, customer context, or undocumented agreements, supplement with that context explicitly.'],
  ['Not a replacement for code review', 'Claude Code helps write and iterate, but changes going into shared codebases still need peer review. Treat its output as a strong first draft, not a merged change.'],
  ['Not for security-sensitive changes without scrutiny', 'Authentication, authorization, cryptography, and access control changes require extra human scrutiny. AI can introduce subtle security issues in these areas even when the code looks correct.']
]

const errorRecoveryCards = [
  { title: 'Claude Code starts going in the wrong direction', detail: 'Stop and restart the task with clearer constraints. Add a CLAUDE.md rule or inline note about what the approach must preserve or avoid.' },
  { title: 'A proposed command seems risky', detail: 'Ask Claude to explain the exact effect of the command before running it. If it modifies data, sends requests, or affects external systems, review explicitly.' },
  { title: 'Output does not match your style or conventions', detail: 'Add your project\'s conventions to CLAUDE.md. Claude Code becomes much more consistent once it has persistent style and architecture guidance to follow.' },
  { title: 'Tests pass but something still feels wrong', detail: 'Ask Claude to explain the change in plain terms: what it does, what could break, and what it explicitly did not touch. This surfaces blind spots before they cause problems.' }
]

const governanceCards = [
  { title: 'Scope terminal access carefully', detail: 'Claude Code can run commands. Limit the files and directories it can operate in for sensitive projects, and always review proposed commands before confirming.' },
  { title: 'Use CLAUDE.md to encode team guardrails', detail: 'Project-level instructions in CLAUDE.md are the right place to capture what Claude should never change, what tests must pass, and what patterns the codebase requires.' },
  { title: 'Code review still applies', detail: 'All AI-generated code entering a shared or production codebase should go through your standard review process. Speed is not a reason to skip peer review for consequential changes.' },
  { title: 'MCP connections require the same security thinking as any integration', detail: 'MCP servers connected to Claude Code can access external systems. Apply the same access-control and credential hygiene standards you would to any production integration.' }
]

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
      {isOpen ? (
        <div className="collapse-body">
          <div className="model-row"><span>{detail}</span></div>
        </div>
      ) : null}
    </article>
  )
}

function CopyPrompt({ prompt }) {
  const [copyState, setCopyState] = useState('idle')

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1600)
    } catch (error) {
      setCopyState('failed')
      window.setTimeout(() => setCopyState('idle'), 1600)
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

function CollapsibleCard({ title, concept, points, steps, example, prompt, showExample = true, tone = 'prompt-note' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className={`note-card collapsible-card ${tone}`}>
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <strong>{title}</strong>
          <small>{concept}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          {points ? (
            <div className="model-list">
              {points.map((point) => (
                <div key={point} className="model-row">
                  <span>{point}</span>
                </div>
              ))}
            </div>
          ) : null}
          {steps ? (
            <div className="section-subhead">
              <h4>Suggested Steps</h4>
              <ol>
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          ) : null}
          {showExample ? (
            <div className="note-callout">
              <strong>Example:</strong> {example}
            </div>
          ) : null}
          {prompt ? (
            <div className="section-subhead">
              <div className="prompt-controls">
                <CopyPrompt prompt={prompt} />
              </div>
              <pre>{prompt}</pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

function PromptCard({ title, objective, prompt }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="scenario-card collapsible-card">
      <button className="collapse-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <div className="collapse-copy">
          <strong>{title}</strong>
          <small>{objective}</small>
        </div>
        <span className="collapse-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? (
        <div className="collapse-body">
          <div className="prompt-controls">
            <CopyPrompt prompt={prompt} />
          </div>
          <pre>{prompt}</pre>
        </div>
      ) : null}
    </article>
  )
}

function ClaudeCodePage() {
  return (
    <div className="page-shell" style={{ '--accent': '#d97706', '--accent-soft': '#fef3c7' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Claude Code</p>
          <h1>
            Learn <span>Claude Code</span>
          </h1>
          <p className="lead">
            This page follows the reference learning path much more closely while updating the examples for workshop
            participants who want to build, review, and operationalize real work with Claude Code.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#overview">
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
              Help learners understand the reference course flow, then stretch it into stronger practical usage with
              examples that feel relevant beyond software-only teams.
            </p>
          </div>
        </aside>
      </header>

      <main>
        <section id="overview" className="section">
          <div className="section-heading">
            <p className="eyebrow">Overview</p>
            <h2>How this tutorial is organized</h2>
            <p className="lead">
              We move in the same order as the learning path: get oriented, understand the working mechanics, then use
              Claude Code to build, iterate, and operationalize more serious projects.
            </p>
          </div>
          <div className="timeline">
            <article className="timeline-card">
              <p className="timeline-time">Getting Started</p>
              <h3>Get started</h3>
              <p>Understand what Claude Code is, install it, and start inside the right project folder.</p>
            </article>
            <article className="timeline-card">
              <p className="timeline-time">Core Workflow</p>
              <h3>Learn the mechanics</h3>
              <p>Work with files, commands, agents, subagents, and project memory in a repeatable way.</p>
            </article>
            <article className="timeline-card">
              <p className="timeline-time">Building and Shipping</p>
              <h3>Build with it</h3>
              <p>Use vibe coding thoughtfully to plan, build, iterate, version, and deploy a useful prototype.</p>
            </article>
            <article className="timeline-card">
              <p className="timeline-time">Advanced</p>
              <h3>Harden the work</h3>
              <p>Add tests, containers, security checks, CI, performance tuning, and richer system context.</p>
            </article>
            <article className="timeline-card">
              <p className="timeline-time">Practice</p>
              <h3>Use it live</h3>
              <p>Run workshop scenarios and prompt starters that let participants try the workflows directly.</p>
            </article>
          </div>
        </section>

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
          id="foundations-and-setup"
          eyebrow="Foundations and Setup"
          title="What Claude Code is, where it fits, and how to start well"
          lead="This opening section combines the product foundations with the first setup habits learners should get comfortable with."
        >
          <div className="notes-grid">
            {docsFoundations.map((item) => (
              <CollapsibleCard
                key={item.title}
                title={item.title}
                concept={item.concept}
                points={item.points}
                example={item.example}
                tone="model-note"
              />
            ))}
            {module0Cards.map((item) => (
              <CollapsibleCard key={item.title} title={item.title} concept={item.concept} points={item.points} example={item.example} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="module-1"
          eyebrow="Core Workflow"
          title="Fundamentals that make Claude Code dependable"
          lead="This is the operating core: files, navigation, agents, reusable specialists, and persistent memory."
        >
          <div className="notes-grid">
            {module1Cards.map((item) => (
              <CollapsibleCard key={item.title} title={item.title} concept={item.concept} points={item.points} example={item.example} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="module-2"
          eyebrow="Building and Shipping"
          title="Vibe coding, iteration, and getting to a usable prototype"
          lead="These cards keep the reference flow but make the examples more practical for workshop participants."
        >
          <div className="notes-grid">
            {module2Cards.map((item) => (
              <CollapsibleCard key={item.title} title={item.title} concept={item.concept} points={item.points} example={item.example} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="advanced-use-cases"
          eyebrow="Advanced Use Cases"
          title="How Claude Code moves from prototype helper to engineering partner"
          lead="These are the workflows people usually ask for next once the basic build loop is working."
        >
          <div className="notes-grid">
            {advancedUseCases.map((item) => (
              <CollapsibleCard
                key={item.title}
                title={item.title}
                concept={item.concept}
                points={item.points}
                steps={item.steps}
                example={item.example}
                prompt={item.prompt}
                showExample={false}
                tone="model-note"
              />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="practice-scenarios"
          eyebrow="Practice Scenarios"
          title="Exercises learners can run directly"
          lead="Each scenario gives a realistic objective and a starter prompt participants can copy into Claude Code."
        >
          <div className="scenario-list">
            {scenarios.map((scenario) => (
              <PromptCard key={scenario.title} title={scenario.title} objective={scenario.objective} prompt={scenario.starter} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="when-not-to-use"
          eyebrow="When Not To Use"
          title="Situations where caution or a different approach is needed"
          lead="Claude Code is powerful — these boundaries help keep that power safe and reviewable."
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
          title="What to do when Claude Code goes wrong"
          lead="These patterns help you course-correct quickly without losing work or making things worse."
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
          title="Safe and responsible use of Claude Code"
          lead="These practices apply whenever Claude Code has access to real projects, systems, or shared codebases."
        >
          <div className="notes-grid">
            {governanceCards.map((item) => (
              <InfoCard key={item.title} title={item.title} detail={item.detail} tone="model-note" />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="prompt-starters"
          eyebrow="Prompt Starters"
          title="Reusable prompts aligned to the learning path"
          lead="These are good entry points when someone knows the job they want done but is not sure how to start the conversation."
        >
          <div className="scenario-list">
            {promptStarters.map((item) => (
              <PromptCard key={item.title} title={item.title} objective="Copy, adapt, and run this starter in Claude Code." prompt={item.prompt} />
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

export default ClaudeCodePage
