import React, { useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Examples', href: '#examples' },
  { label: '2.1 Tool Descriptions', href: '#ts-2-1' },
  { label: '2.2 Structured Errors', href: '#ts-2-2' },
  { label: '2.3 MCP Resources & Tools', href: '#ts-2-3' },
  { label: '2.4 MCP Server Config', href: '#ts-2-4' },
  { label: '2.5 Least Privilege', href: '#ts-2-5' }
]

const taskStatements = [
  {
    id: 'ts-2-1',
    number: '2.1',
    title: 'Write effective tool descriptions for reliable selection',
    lead: 'Rich tool descriptions are the primary mechanism the model uses for tool selection. Minimal descriptions cause selection errors; well-crafted descriptions fix most reliability issues.',
    knowledge: [
      'Tool descriptions as the primary mechanism LLMs use for tool selection — the model reads descriptions to decide which tool fits the current request',
      'How minimal descriptions cause selection errors: when two tools have similar names and sparse descriptions, the model lacks the context to differentiate them correctly',
      'When to split vs consolidate tools: split when two tools serve different semantic intents and users will provide different context for each; consolidate when the underlying operation is identical and distinction is only internal routing',
      'Naming conventions to reduce ambiguity: tool names should clearly signal their domain and action (lookup_order vs get_customer) so names alone reduce selection confusion'
    ],
    skills: [
      'Writing rich tool descriptions that include: the tool\'s purpose, what types of inputs it handles, example queries that should route to it, edge cases it covers, and explicit boundary conditions distinguishing it from similar tools',
      'Differentiating tools with overlapping functionality by specifying in each description the exact conditions under which it — and not the similar tool — should be selected',
      'Testing tool selection reliability by submitting ambiguous requests and verifying the model selects the correct tool; iterating on descriptions until selection is consistent',
      'Deciding between splitting and consolidating tools based on whether the selection confusion is caused by semantic ambiguity (fix with descriptions) or genuinely overlapping scope (fix with consolidation)'
    ]
  },
  {
    id: 'ts-2-2',
    number: '2.2',
    title: 'Implement structured error responses in tools',
    lead: 'Structured errors with errorCategory and isRetryable give the coordinator the information it needs to make intelligent recovery decisions rather than terminating or silently failing.',
    knowledge: [
      'errorCategory types: transient (timeouts, temporary service unavailability — retry may succeed), validation (malformed input — retry with corrections), permission (access denied — retrying without changes will not help)',
      'isRetryable boolean: signals to the coordinator whether retrying the same tool call is likely to produce a different result',
      'Structured vs generic error messages: generic messages like "search unavailable" hide the information coordinators need; structured errors including failure type, what was attempted, and partial results enable intelligent recovery',
      'How structured errors enable coordinator recovery decisions: with errorCategory and isRetryable, the coordinator can choose to retry transient failures, ask for clarification on validation failures, or escalate permission failures without guessing'
    ],
    skills: [
      'Implementing structured error responses that include errorCategory (transient/validation/permission), isRetryable boolean, a human-readable description of what failed, and any partial results or alternative approaches available',
      'Distinguishing access failures (e.g., timeout, service down) from valid empty results (e.g., search returned no matches) so the coordinator can make appropriate decisions — retrying a valid empty result wastes resources',
      'Designing tools that implement local recovery for transient failures before propagating an error, only surfacing errors that the tool itself cannot resolve',
      'Ensuring error responses include what was attempted and partial results so the coordinator can proceed with partial information and annotate gaps rather than terminating the workflow'
    ]
  },
  {
    id: 'ts-2-3',
    number: '2.3',
    title: 'Design MCP resources and tools appropriately',
    lead: 'MCP resources are for content the model reads; MCP tools are for actions the model executes. The distinction affects how Claude discovers and uses each.',
    knowledge: [
      'MCP resources for content catalogs: resources expose data that Claude reads (documentation, product catalogs, reference material) — they are not invoked like functions but read like files',
      'MCP tools for actions: tools are invoked to perform operations (search, update, create, delete) — they accept parameters and return results',
      'The isError flag for tool errors: MCP tools should set isError: true in their response when returning an error, enabling the model to distinguish error responses from valid results',
      'Description quality for adoption: both resources and tools require clear descriptions for Claude to discover and use them correctly; poorly described resources are never accessed; poorly described tools are misselected or misused'
    ],
    skills: [
      'Designing MCP resources for content that Claude should read as reference material (documentation, catalogs, policies) and MCP tools for operations that have side effects or require dynamic parameters',
      'Writing resource descriptions that aid discovery — specifying what the resource contains, when to access it, and what kind of questions it can answer',
      'Implementing the isError flag correctly in MCP tool responses so the model treats error responses as errors rather than processing them as valid results',
      'Testing MCP tool selection with realistic queries to verify Claude selects the correct tool and uses resources when appropriate rather than invoking tools for read-only access'
    ]
  },
  {
    id: 'ts-2-4',
    number: '2.4',
    title: 'Configure MCP servers in project and user scope',
    lead: 'Project-scoped MCP configuration in .mcp.json is shared with the team via version control. User-scoped configuration in ~/.claude.json is personal and not shared.',
    knowledge: [
      '.mcp.json for project-scoped configuration: MCP server definitions placed in .mcp.json at the project root are available to all team members who clone the repository',
      '~/.claude.json for user-scoped configuration: personal MCP servers (experimental tools, personal credentials) are configured in the user-level config file and are not shared via version control',
      'Environment variable expansion for credentials: MCP server configurations support environment variable references (e.g., ${API_KEY}) so credentials are not hardcoded in version-controlled config files',
      'Multi-server simultaneous access: Claude Code supports accessing multiple MCP servers simultaneously, allowing a project to combine a shared team server with personal experimental servers'
    ],
    skills: [
      'Configuring project-scoped MCP servers in .mcp.json with environment variable expansion for credentials, enabling team sharing without exposing secrets in version control',
      'Configuring user-scoped personal MCP servers in ~/.claude.json for experimental tools that should not affect other team members',
      'Using environment variable references in MCP configurations to keep credentials out of committed configuration files',
      'Verifying that both project-scoped and user-scoped MCP servers are simultaneously accessible and that Claude correctly selects between them based on tool descriptions'
    ]
  },
  {
    id: 'ts-2-5',
    number: '2.5',
    title: 'Apply principle of least privilege to tool design',
    lead: 'Give agents access to only the tools they need for their specific task. Over-provisioning increases attack surface and reduces reliability by introducing selection confusion.',
    knowledge: [
      'Scoped tools vs broad access: designing separate tools for distinct operations (lookup vs update vs delete) rather than a single broad tool that handles all operations with internal routing',
      'Over-provisioning risks: giving an agent access to tools it does not need introduces selection confusion (the model may choose wrong tools) and increases the risk of unintended side effects',
      'How tool scope affects agent reliability and security: narrower tool sets produce more predictable agent behaviour and reduce the blast radius of errors or prompt injection attempts'
    ],
    skills: [
      'Designing tools with minimal necessary permissions — each tool exposes only the operations required for its declared purpose, not broader system access',
      'Splitting broad tools into scoped tools for specific subagent use cases (e.g., giving a synthesis subagent a read-only verify_fact tool rather than full web search access)',
      'Configuring allowedTools in Task tool or MCP server configuration to restrict each agent to only the tools it legitimately needs for its assigned task',
      'Evaluating existing tool designs to identify over-provisioning and refactoring to more scoped alternatives without changing the system\'s overall capability'
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

export default function CcaDomain2Page() {
  return (
    <div className="page-shell" style={{ '--accent': '#4f46e5', '--accent-soft': '#e0e7ff' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CCA Foundations — Domain 2</p>
          <h1>Tool Design <span>&amp; MCP Integration</span></h1>
          <p className="lead">
            18% of the exam. Covers writing effective tool descriptions, implementing structured error responses, designing MCP resources and tools, configuring MCP server scope, and applying least privilege principles to agent tool access.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#ts-2-1">Start studying</a>
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
            <h3>Domain 2 at a Glance</h3>
            <div className="model-list">
              <div className="model-row"><strong>Weight</strong><span>18% of exam</span></div>
              <div className="model-row"><strong>Task Statements</strong><span>5 (2.1 – 2.5)</span></div>
              <div className="model-row"><strong>Key Technologies</strong><span>MCP servers, tool descriptions, errorCategory, isRetryable, .mcp.json, ~/.claude.json, allowedTools</span></div>
              <div className="model-row"><strong>Primary Scenario</strong><span>Customer Support Agent, Developer Productivity Pipeline</span></div>
            </div>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="overview"
          eyebrow="Domain Overview"
          title="What this domain covers and why it matters"
          lead="Domain 2 tests whether you can design tools and MCP integrations that are reliable, well-scoped, and correctly configured — not just tools that work in the happy path."
        >
          <div className="notes-grid">
            {[
              ['Tool descriptions are the fix for most selection errors', 'When an agent repeatedly selects the wrong tool, the root cause is almost always inadequate descriptions — not model capability. Adding rich descriptions (purpose, example queries, boundary conditions) is the lowest-effort, highest-leverage fix before adding infrastructure like routing layers.'],
              ['Structured errors beat generic error messages', 'Generic errors like "search unavailable" prevent the coordinator from making intelligent recovery decisions. Structured errors with errorCategory and isRetryable give coordinators the information they need to retry transient failures, escalate validation failures, or proceed with partial results.'],
              ['Resources vs tools in MCP', 'The MCP distinction between resources (content to read) and tools (actions to execute) is tested directly. Resources are for reference material the model reads passively; tools are for operations with parameters and return values. Using the wrong type degrades discovery and behaviour.'],
              ['Project vs user MCP scope', 'Understanding that .mcp.json is version-controlled and shared while ~/.claude.json is personal is tested in scenario questions about team MCP configuration. Environment variable expansion for credentials is a related concept — credentials should never be hardcoded in version-controlled config.']
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
          title="Tool descriptions, structured errors, and MCP configuration"
          lead="Side-by-side comparisons of the most exam-tested patterns in Domain 2."
        >
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Tool Description"
            title="Minimal descriptions cause selection errors"
            code={`// Two tools with minimal descriptions — model cannot differentiate them
{
  "name": "get_customer",
  "description": "Retrieves customer information"
}
{
  "name": "lookup_order",
  "description": "Retrieves order details"
}`}
            note='When a user says "check my order #12345", the model has no basis to choose lookup_order over get_customer. Both could plausibly match.'
          />
          <ExampleCard
            variant="correct"
            label="Correct — Tool Description"
            title="Rich descriptions with purpose, examples, and boundaries"
            code={`{
  "name": "get_customer",
  "description": "Looks up verified customer identity and account details by customer
ID or email. USE THIS FIRST before any order, refund, or account operation.
Do NOT use for order-specific lookups — use lookup_order for that.
Example queries: 'verify account john@example.com', 'get customer C-1234'.",
  "input_schema": {
    "type": "object",
    "properties": {
      "identifier": {
        "type": "string",
        "description": "Customer ID (e.g. 'C-1234') or email address"
      }
    },
    "required": ["identifier"]
  }
}`}
            note="A good description answers: What does this tool do? When should I use it (not another tool)? What are example inputs? What are the boundaries?"
          />
          <ExampleCard
            variant="incorrect"
            label="Incorrect — Error Response"
            title="Generic error hides context from coordinator"
            code={`def lookup_order(order_id):
    try:
        return db.query(order_id)
    except TimeoutError:
        return {"error": "search unavailable"}
    # Coordinator receives "search unavailable" and cannot decide:
    # - Should I retry? (Maybe — but I don't know if it's transient)
    # - Is there partial data? (No way to tell)
    # - Is this a bug or normal? (Cannot distinguish)`}
          />
          <ExampleCard
            variant="correct"
            label="Correct — Error Response"
            title="Structured error context enables intelligent recovery"
            code={`def lookup_order(order_id):
    try:
        result = db.query(order_id)
        if not result:
            # Valid empty result — NOT an error
            return {"found": False, "query": order_id}
        return {"found": True, "order": result}
    except TimeoutError:
        return {
            "isError": True,
            "errorCategory": "transient",   # timeout — worth retrying
            "isRetryable": True,
            "attempted": f"order lookup: {order_id}",
            "partialResults": None,
            "alternatives": ["retry same query", "try customer ID instead"]
        }
    except PermissionError:
        return {
            "isError": True,
            "errorCategory": "permission",  # access denied — retrying won't help
            "isRetryable": False,
            "attempted": f"order lookup: {order_id}",
            "message": "Escalate to Tier 2 — access denied for this order"
        }`}
            note="errorCategory + isRetryable let the coordinator choose: retry (transient), correct input (validation), or escalate (permission). Distinguish access failures from valid empty results."
          />
          <ExampleCard
            variant="pattern"
            label="Pattern — MCP Configuration"
            title=".mcp.json (project/team) vs ~/.claude.json (personal)"
            code={`// .mcp.json — version-controlled, shared with entire team
{
  "mcpServers": {
    "support-tools": {
      "command": "node",
      "args": ["./tools/support-mcp.js"],
      "env": {
        "DATABASE_URL": "\${DATABASE_URL}",
        "API_KEY": "\${SUPPORT_API_KEY}"
      }
    }
  }
}

// ~/.claude.json — personal, NOT committed to version control
{
  "mcpServers": {
    "my-dev-tools": {
      "command": "python",
      "args": ["-m", "my_experimental_server"]
    }
  }
}`}
            note="Use environment variable references (${VAR}) in .mcp.json so credentials are never committed. Both servers are active simultaneously — Claude can use both at once."
          />
          <ExampleCard
            variant="pattern"
            label="Pattern — MCP Design"
            title="Resource for content the model reads · Tool for actions it executes"
            code={`// RESOURCE — Claude reads this like a file (no parameters, no side effects)
server.resource("return-policy", "Return & Refund Policy Documentation", async () => ({
  contents: [{ uri: "policy://returns", mimeType: "text/markdown",
    text: await fs.readFile("./policies/returns.md", "utf-8") }]
}))

// TOOL — Claude calls this to perform an action (parameters, side effects)
server.tool("process_refund", {
  description: "Process a refund. Requires verified customer ID from get_customer.",
  inputSchema: {
    type: "object",
    properties: {
      customer_id: { type: "string" },
      order_id:    { type: "string" },
      amount:      { type: "number" }
    },
    required: ["customer_id", "order_id", "amount"]
  }
}, async ({ customer_id, order_id, amount }) => {
  const result = await refundService.process(customer_id, order_id, amount)
  return { content: [{ type: "text", text: JSON.stringify(result) }] }
})`}
            note="Resources answer 'what should Claude know?' Tools answer 'what should Claude do?' Using tools for passive lookups adds unnecessary invocation overhead."
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
              <div className="note-card-header"><h3>Domain 1</h3><p>Agentic Architecture &amp; Orchestration — 27%</p></div>
              <a className="btn" href="/cca/domain-1.html">Study Domain 1</a>
            </article>
            <article className="note-card model-note">
              <div className="note-card-header"><h3>Domain 3</h3><p>Claude Code Configuration &amp; Workflows — 20%</p></div>
              <a className="btn" href="/cca/domain-3.html">Study Domain 3</a>
            </article>
          </div>
        </section>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
