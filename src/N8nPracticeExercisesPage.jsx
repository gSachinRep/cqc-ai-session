import React, { useEffect, useState } from 'react'

const sections = [
  { label: 'Index', href: '#page-index' },
  { label: 'Overview', href: '#overview' },
  { label: 'Assignment 1', href: '#assignment-1' },
  { label: 'Assignment 2', href: '#assignment-2' },
  { label: 'Assignment 3', href: '#assignment-3' },
  { label: 'Instructor Tips', href: '#instructor-tips' }
]

// ─── Workflow JSON objects (JS objects rendered via JSON.stringify — no template literal interpolation) ───

const workflow1 = {
  nodes: [
    {
      parameters: {
        httpMethod: "POST",
        path: "new-lead",
        responseMode: "onReceived",
        options: {}
      },
      name: "Webhook",
      type: "n8n-nodes-base.webhook",
      typeVersion: 1,
      id: "1"
    },
    {
      parameters: {
        jsCode: "const lead = $input.first().json;\n\n// Capitalize first and last names\nconst formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();\nconst firstName = formatName(lead.firstName);\nconst lastName = formatName(lead.lastName);\n\n// Extract domain\nconst domain = lead.email.split('@')[1].toLowerCase();\n\n// Check for B2B\nconst freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];\nconst isB2B = !freeProviders.includes(domain);\n\nreturn {\n  FullName: `${firstName} ${lastName}`,\n  Email: lead.email,\n  CompanyDomain: domain,\n  isB2B: isB2B\n};"
      },
      name: "Normalize & Evaluate",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      id: "2"
    }
  ],
  connections: {
    "Webhook": {
      main: [
        [{ node: "Normalize & Evaluate", type: "main", index: 0 }]
      ]
    }
  }
}

const workflow2 = {
  nodes: [
    {
      parameters: {},
      name: "Incoming Ticket",
      type: "n8n-nodes-base.manualTrigger",
      typeVersion: 1,
      id: "1"
    },
    {
      parameters: {
        url: "https://api.openai.com/v1/chat/completions",
        authentication: "predefinedCredentialType",
        nodeCredentialType: "openApi",
        sendBody: true,
        bodyParameters: {
          parameters: [
            { name: "model", value: "gpt-4" },
            {
              name: "messages",
              value: "=[{\"role\": \"system\", \"content\": \"Classify the message. Respond ONLY with one of: Urgent_Outage, Bug_Report, Feature_Request.\"}, {\"role\": \"user\", \"content\": \"{{$json.message}}\"}]"
            }
          ]
        },
        options: {}
      },
      name: "AI Classification",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4,
      id: "2"
    },
    {
      parameters: {
        rules: {
          values: [
            {
              conditions: {
                options: { caseSensitive: true, leftValue: "", typeValidation: "strict" },
                conditions: [
                  {
                    id: "1",
                    leftValue: "={{$json.choices[0].message.content}}",
                    rightValue: "Urgent_Outage",
                    operator: { type: "string", operation: "equals" }
                  }
                ],
                combinator: "and"
              },
              renameOutput: true,
              outputKey: "Urgent"
            },
            {
              conditions: {
                options: { caseSensitive: true, leftValue: "", typeValidation: "strict" },
                conditions: [
                  {
                    id: "2",
                    leftValue: "={{$json.choices[0].message.content}}",
                    rightValue: "Bug_Report",
                    operator: { type: "string", operation: "equals" }
                  }
                ],
                combinator: "and"
              },
              renameOutput: true,
              outputKey: "Bug"
            },
            {
              conditions: {
                options: { caseSensitive: true, leftValue: "", typeValidation: "strict" },
                conditions: [
                  {
                    id: "3",
                    leftValue: "={{$json.choices[0].message.content}}",
                    rightValue: "Feature_Request",
                    operator: { type: "string", operation: "equals" }
                  }
                ],
                combinator: "and"
              },
              renameOutput: true,
              outputKey: "Feature"
            }
          ]
        },
        fallbackOutput: 3,
        options: {}
      },
      name: "Route by Intent",
      type: "n8n-nodes-base.switch",
      typeVersion: 3,
      id: "3"
    },
    {
      parameters: {
        keepOnlySet: true,
        values: {
          string: [
            { name: "ticketId", value: "={{ $('Incoming Ticket').item.json.ticketId }}" },
            { name: "assignedCategory", value: "Urgent_Outage" },
            { name: "routedDestination", value: "Slack_Urgent_Channel" }
          ],
          boolean: [{ name: "requiresHumanReview", value: false }]
        },
        options: {}
      },
      name: "Set Urgent Payload",
      type: "n8n-nodes-base.set",
      typeVersion: 2,
      id: "4"
    },
    {
      parameters: {
        keepOnlySet: true,
        values: {
          string: [
            { name: "ticketId", value: "={{ $('Incoming Ticket').item.json.ticketId }}" },
            { name: "assignedCategory", value: "Bug_Report" },
            { name: "routedDestination", value: "Jira_Bug_Queue" }
          ],
          boolean: [{ name: "requiresHumanReview", value: false }]
        },
        options: {}
      },
      name: "Set Bug Payload",
      type: "n8n-nodes-base.set",
      typeVersion: 2,
      id: "5"
    },
    {
      parameters: {
        keepOnlySet: true,
        values: {
          string: [
            { name: "ticketId", value: "={{ $('Incoming Ticket').item.json.ticketId }}" },
            { name: "assignedCategory", value: "Feature_Request" },
            { name: "routedDestination", value: "ProductBoard_Backlog" }
          ],
          boolean: [{ name: "requiresHumanReview", value: false }]
        },
        options: {}
      },
      name: "Set Feature Payload",
      type: "n8n-nodes-base.set",
      typeVersion: 2,
      id: "6"
    },
    {
      parameters: {
        keepOnlySet: true,
        values: {
          string: [
            { name: "ticketId", value: "={{ $('Incoming Ticket').item.json.ticketId }}" },
            { name: "assignedCategory", value: "Manual_Review" },
            { name: "routedDestination", value: "Zendesk_Triage_Queue" }
          ],
          boolean: [{ name: "requiresHumanReview", value: true }]
        },
        options: {}
      },
      name: "Fallback Payload",
      type: "n8n-nodes-base.set",
      typeVersion: 2,
      id: "7"
    }
  ],
  connections: {
    "Incoming Ticket": {
      main: [[{ node: "AI Classification", type: "main", index: 0 }]]
    },
    "AI Classification": {
      main: [[{ node: "Route by Intent", type: "main", index: 0 }]]
    },
    "Route by Intent": {
      main: [
        [{ node: "Set Urgent Payload", type: "main", index: 0 }],
        [{ node: "Set Bug Payload", type: "main", index: 0 }],
        [{ node: "Set Feature Payload", type: "main", index: 0 }],
        [{ node: "Fallback Payload", type: "main", index: 0 }]
      ]
    }
  }
}

const workflow3 = {
  nodes: [
    {
      parameters: {
        rule: { interval: [{ field: "days" }] }
      },
      name: "Daily Schedule",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.1,
      id: "1"
    },
    {
      parameters: {
        jsCode: "return [\n  {\"dealId\": \"D-01\", \"amount\": 15000, \"accountId\": \"A-123\"},\n  {\"dealId\": \"D-02\", \"amount\": 5000,  \"accountId\": \"A-456\"},\n  {\"dealId\": \"D-03\", \"amount\": 25000, \"accountId\": \"A-789\"}\n];"
      },
      name: "Mock API Data",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      id: "2"
    },
    {
      parameters: { options: {} },
      name: "Loop Deals",
      type: "n8n-nodes-base.loop",
      typeVersion: 1,
      id: "3"
    },
    {
      parameters: {
        workflowId: "SUB_WORKFLOW_ID_HERE",
        mode: "each"
      },
      name: "Get Account Exec",
      type: "n8n-nodes-base.executeWorkflow",
      typeVersion: 1,
      id: "4"
    },
    {
      parameters: {
        conditions: {
          number: [
            {
              value1: "={{$json.amount}}",
              operation: "largerEqual",
              value2: 10000
            }
          ]
        }
      },
      name: "Filter High Value",
      type: "n8n-nodes-base.filter",
      typeVersion: 1,
      id: "5"
    },
    {
      parameters: {
        jsCode: "const items = $input.all().map(item => item.json);\n\nlet totalRevenue = 0;\nconst topDeals = [];\n\nitems.forEach(deal => {\n  totalRevenue += deal.amount;\n  topDeals.push({\n    dealId: deal.dealId,\n    amount: deal.amount,\n    accountExecutive: deal.accountExecutive\n  });\n});\n\nreturn {\n  reportDate: new Date().toISOString().split('T')[0],\n  qualifyingDealsCount: items.length,\n  totalRevenue: totalRevenue,\n  topDeals: topDeals\n};"
      },
      name: "Aggregate Report",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      id: "6"
    }
  ],
  connections: {
    "Daily Schedule": {
      main: [[{ node: "Mock API Data", type: "main", index: 0 }]]
    },
    "Mock API Data": {
      main: [[{ node: "Loop Deals", type: "main", index: 0 }]]
    },
    "Loop Deals": {
      main: [
        [],
        [{ node: "Get Account Exec", type: "main", index: 0 }]
      ]
    },
    "Get Account Exec": {
      main: [[{ node: "Loop Deals", type: "main", index: 0 }]]
    },
    "Filter High Value": {
      main: [[{ node: "Aggregate Report", type: "main", index: 0 }]]
    }
  }
}

// ─── Sub-workflow reference for Assignment 3 ───
const subWorkflow3 = {
  nodes: [
    {
      parameters: {},
      name: "Execute Workflow Trigger",
      type: "n8n-nodes-base.executeWorkflowTrigger",
      typeVersion: 1,
      id: "1"
    },
    {
      parameters: {
        jsCode: "const accountMap = {\n  \"A-123\": \"Alice\",\n  \"A-456\": \"Bob\",\n  \"A-789\": \"Charlie\"\n};\n\nconst deal = $input.first().json;\nconst accountExecutive = accountMap[deal.accountId] || \"Unknown\";\n\nreturn { ...deal, accountExecutive };"
      },
      name: "Lookup Account Exec",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      id: "2"
    }
  ],
  connections: {
    "Execute Workflow Trigger": {
      main: [[{ node: "Lookup Account Exec", type: "main", index: 0 }]]
    }
  }
}

// ─── Assignment data ───

const assignments = [
  {
    id: 'assignment-1',
    number: 1,
    title: 'Lead Capture and Data Normalization',
    level: 'Easy',
    levelColor: '#16a34a',
    levelBg: '#f0fdf4',
    duration: '20 minutes',
    scenario: 'The Marketing team receives new leads via a webhook whenever a user submits a form on an external landing page. However, the data is often messy. They need this data cleaned, formatted, and prepared for insertion into a CRM.',
    requirements: [
      'Create a workflow triggered by a POST webhook.',
      'Normalize the user\'s name — e.g. "jOhN dOe" should become "John Doe".',
      'Extract the company domain from the email address.',
      'Edge Case: If the email is from a free provider (@gmail.com, @yahoo.com), flag with isB2B: false. Otherwise isB2B: true.'
    ],
    hints: [
      'Use n8n\'s Edit Fields (Set) node or a Code node. If using JavaScript, string methods like .toLowerCase(), .replace(), and .split(\'@\') will be your best friends.',
      'To check for free email providers, use an array in JavaScript: [\'gmail.com\', \'yahoo.com\'].includes(domain), or use an If node with a regex match.'
    ],
    steps: [
      'Add a Webhook node configured to listen for POST requests and return an immediate 200 OK response.',
      'Route the webhook output into a Code node (or Edit Fields node) to apply string transformations for proper name capitalization and domain extraction.',
      'Implement conditional logic via the Code node or an If node to evaluate the extracted domain and append the boolean isB2B flag to the payload.'
    ],
    input: {
      firstName: "jOhN",
      lastName: "dOe",
      email: "john.doe@startup.io"
    },
    output: {
      FullName: "John Doe",
      Email: "john.doe@startup.io",
      CompanyDomain: "startup.io",
      isB2B: true
    },
    workflow: workflow1,
    solutionNotes: [
      'The formatName helper capitalises the first character and lowercases the rest — handles any casing variation.',
      'domain = email.split(\'@\')[1].toLowerCase() extracts the company domain reliably.',
      'The freeProviders array check is easy to extend — just add more domains as needed.',
      'The Webhook node uses responseMode: "onReceived" so the caller gets an immediate 200 OK rather than waiting for the Code node to complete.'
    ]
  },
  {
    id: 'assignment-2',
    number: 2,
    title: 'AI-Powered Support Triage & Routing',
    level: 'Medium',
    levelColor: '#d97706',
    levelBg: '#fffbeb',
    duration: '40 minutes',
    scenario: 'The Tier 1 support team is overwhelmed by the volume of incoming tickets. You need to build a system that intercepts incoming support tickets, uses an LLM to classify the intent, and routes the ticket to the appropriate channel.',
    requirements: [
      'Receive a JSON payload representing a support ticket.',
      'Pass the ticket message to an AI node to classify intent.',
      'Prompt the AI to classify into exactly one of three categories: Urgent_Outage, Bug_Report, or Feature_Request.',
      'Route workflow execution based on the AI\'s classification.',
      'Edge Case: LLMs can hallucinate — include a fallback route for any response that does not exactly match the three expected categories (route to Manual_Review).'
    ],
    hints: [
      'Use the Basic LLM Chain or OpenAI node. In your system prompt, explicitly instruct the model: "Respond ONLY with one of the following exact strings..."',
      'The Switch node is perfect for routing. Ensure you configure the "Fallback" or "Default" routing output on the Switch node to catch unexpected AI outputs.',
      'Set fallbackOutput to the index of the fallback branch (3 in this solution, after the three explicit routes) so all unmatched responses flow there automatically.'
    ],
    steps: [
      'Connect a trigger node to an OpenAI (or equivalent AI) node. Configure the prompt to evaluate the incoming message variable and output a classification string.',
      'Connect the output of the AI node to a Switch node. Create three explicit routing rules based on string matching for the expected categories.',
      'Add Set nodes to the end of all four branches (3 explicit + 1 fallback) to format the final alert payload simulating a message sent to Slack, Jira, or Zendesk.'
    ],
    input: {
      ticketId: "TK-8842",
      message: "Our production database just went offline and all customers are seeing 500 errors. We are losing transactions!"
    },
    output: {
      ticketId: "TK-8842",
      assignedCategory: "Urgent_Outage",
      routedDestination: "Slack_Urgent_Channel",
      requiresHumanReview: false
    },
    workflow: workflow2,
    solutionNotes: [
      'The Switch node uses caseSensitive: true and typeValidation: "strict" — this is intentional. The AI prompt must return exact strings, and the switch enforces that strictly.',
      'fallbackOutput: 3 means branch index 3 (the fourth output) is the fallback. All AI responses that don\'t match Urgent_Outage, Bug_Report, or Feature_Request land here.',
      'The HTTP Request node simulates the OpenAI API call. In production, swap this for the native OpenAI or AI node with credentials configured.',
      'Each Set node uses $("Incoming Ticket").item.json.ticketId to trace the original ticket ID through the routing branches — a critical pattern for auditability.'
    ]
  },
  {
    id: 'assignment-3',
    number: 3,
    title: 'Scheduled Data Aggregation & Sub-Workflows',
    level: 'Hard',
    levelColor: '#dc2626',
    levelBg: '#fef2f2',
    duration: '75 minutes',
    scenario: 'Revenue Operations needs a daily summary report of high-value closed-won deals. Data comes from an internal API returning arrays of deals. You must iterate through deals, enrich them via a sub-workflow, filter them, and aggregate the results into a single report payload.',
    requirements: [
      'Trigger the workflow on a daily schedule.',
      'Process an array of deal objects by iterating through the list.',
      'For each deal, use an Execute Workflow node to call a separate sub-workflow that returns the Account Executive\'s name based on the accountId, appending it to the deal object.',
      'Filter out any deals where the amount is less than $10,000.',
      'Aggregate remaining high-value deals into a single summary object containing: total deal count, sum of revenue, and an array of enriched deal objects.'
    ],
    hints: [
      'To iterate over an array in n8n, use the Loop node. It processes items one at a time through the inner branch.',
      'To consolidate individual items back into a single array after a loop, use the Item Lists node (Aggregate operation) or a Code node with $input.all().',
      'The sub-workflow must start with an Execute Workflow Trigger node — this is what receives the deal data passed from the parent workflow.',
      'After the Loop node completes, the items on the "done" output (output 0) represent all processed deals. Connect the Filter node there, not to the loop body output.'
    ],
    steps: [
      'Create a Schedule Trigger node. Connect it to a Code node that outputs a simulated array of deal JSON objects.',
      'Use a Loop node to process items one by one. Inside the loop body (output 1), connect an Execute Workflow node to pass the accountId to a secondary sub-workflow, which returns the accountExecutive name merged into the deal.',
      'After the loop finishes (output 0), connect a Filter node to drop deals under $10,000, then connect an Aggregate Code node to calculate totalRevenue and structure the final report object.'
    ],
    input: [
      { dealId: "D-01", amount: 15000, accountId: "A-123" },
      { dealId: "D-02", amount: 5000, accountId: "A-456" },
      { dealId: "D-03", amount: 25000, accountId: "A-789" }
    ],
    output: {
      reportDate: "2026-03-16",
      qualifyingDealsCount: 2,
      totalRevenue: 40000,
      topDeals: [
        { dealId: "D-01", amount: 15000, accountExecutive: "Alice" },
        { dealId: "D-03", amount: 25000, accountExecutive: "Charlie" }
      ]
    },
    workflow: workflow3,
    subWorkflow: subWorkflow3,
    solutionNotes: [
      'The Loop node has two outputs: output 1 is the loop body (runs once per item), output 0 is the "done" signal (fires after all items are processed). Connect Filter to output 0.',
      'The sub-workflow uses a hardcoded accountMap for the simulation. In production, replace the Code node with an HTTP Request to your CRM API.',
      'The spread operator ...deal in the sub-workflow return ensures all original deal fields are preserved when accountExecutive is appended.',
      '$input.all() in the Aggregate node collects every item that passed through the Filter node into a single array, enabling totalRevenue accumulation in a single forEach loop.'
    ]
  }
]

const instructorTips = [
  'Distribute only the assignment brief (scenario, requirements, input/output) during the exercise. Reveal the solution JSON only during the debrief or answer key review.',
  'For Assignment 1, a common mistake is using a template literal for the FullName return value inside a Code node string — remind students that the n8n Code node runs JavaScript, and template literals inside the jsCode string are evaluated at workflow runtime, not at import time.',
  'For Assignment 2, students often forget to set the fallback output on the Switch node. This is the most important edge case — emphasise it before they start.',
  'For Assignment 3, the most common confusion is which Loop output to connect the Filter node to. Draw the distinction between "loop body" (output 1, runs per-item) and "loop done" (output 0, runs once) on the whiteboard first.',
  'All three solution workflow JSONs can be imported directly into n8n via the canvas Import from JSON option (or drag-and-drop). This lets you demonstrate the reference solution live.'
]

// ─── Components ───

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

function CopyButton({ text, label = 'Copy JSON' }) {
  const [state, setState] = useState('idle')
  useEffect(() => {
    if (state === 'idle') return undefined
    const id = window.setTimeout(() => setState('idle'), 1800)
    return () => window.clearTimeout(id)
  }, [state])
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
  }
  return (
    <button className="prompt-copy-btn" type="button" onClick={handleCopy}>
      <span aria-hidden="true">📋</span>
      <span>{state === 'copied' ? 'Copied!' : state === 'failed' ? 'Retry' : label}</span>
    </button>
  )
}

function JsonBlock({ obj, label }) {
  const text = JSON.stringify(obj, null, 2)
  return (
    <div style={{ position: 'relative', marginTop: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        {label ? <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span> : <span />}
        <CopyButton text={text} />
      </div>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.1rem 1.25rem', fontSize: '0.78rem', lineHeight: 1.65, overflowX: 'auto', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{text}</pre>
    </div>
  )
}

function IoBlock({ input, output }) {
  const inputText = JSON.stringify(input, null, 2)
  const outputText = JSON.stringify(output, null, 2)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input</span>
          <CopyButton text={inputText} label="Copy" />
        </div>
        <pre style={{ background: '#0f172a', color: '#86efac', borderRadius: '10px', padding: '1rem 1.1rem', fontSize: '0.76rem', lineHeight: 1.6, overflowX: 'auto', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{inputText}</pre>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expected Output</span>
          <CopyButton text={outputText} label="Copy" />
        </div>
        <pre style={{ background: '#0f172a', color: '#fcd34d', borderRadius: '10px', padding: '1rem 1.1rem', fontSize: '0.76rem', lineHeight: 1.6, overflowX: 'auto', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{outputText}</pre>
      </div>
    </div>
  )
}

function SolutionPanel({ workflow, subWorkflow, notes }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: isOpen ? '#1e3a5f' : '#1e293b',
          color: '#94a3b8', border: '1.5px solid #334155',
          borderRadius: '8px', padding: '0.55rem 1rem',
          fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
          transition: 'all 0.15s'
        }}
      >
        <span aria-hidden="true">{isOpen ? '🔓' : '🔒'}</span>
        <span>{isOpen ? 'Hide Answer Key' : 'Show Answer Key — Workflow JSON'}</span>
      </button>
      {isOpen && (
        <div style={{ marginTop: '1rem', padding: '1.25rem', background: '#0f172a', border: '1.5px solid #1e3a5f', borderRadius: '12px' }}>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 1rem' }}>
            Copy the JSON below and paste it into the n8n canvas via <strong style={{ color: '#94a3b8' }}>Import from JSON</strong> (or drag-and-drop the file onto the canvas). n8n will automatically arrange the nodes.
          </p>
          <JsonBlock obj={workflow} label="Main Workflow JSON" />
          {subWorkflow && (
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0 0 0.5rem' }}>
                Sub-workflow (create as a separate workflow and copy its ID into the <code style={{ color: '#7dd3fc' }}>SUB_WORKFLOW_ID_HERE</code> field in the main workflow):
              </p>
              <JsonBlock obj={subWorkflow} label="Sub-Workflow JSON" />
            </div>
          )}
          {notes && notes.length > 0 && (
            <div style={{ marginTop: '1.5rem', padding: '1rem 1.2rem', background: '#1e293b', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd', margin: '0 0 0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Solution Notes</p>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {notes.map((note, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.35rem' }}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AssignmentSection({ a }) {
  return (
    <CollapsibleSection
      id={a.id}
      eyebrow={`Assignment ${a.number} · ${a.level} · ${a.duration}`}
      title={a.title}
      lead={a.scenario}
    >
      {/* Requirements */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted, #6b7280)', marginBottom: '0.6rem' }}>Requirements</h4>
        <ul style={{ paddingLeft: '1.3rem', margin: 0 }}>
          {a.requirements.map((r, i) => (
            <li key={i} style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.25rem' }}>{r}</li>
          ))}
        </ul>
      </div>

      {/* Hints */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem 1.2rem', background: 'var(--surface-alt, #f8fafc)', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Hints</p>
        <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
          {a.hints.map((h, i) => (
            <li key={i} style={{ fontSize: '0.87rem', lineHeight: 1.7, marginBottom: '0.2rem' }}>{h}</li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted, #6b7280)', marginBottom: '0.6rem' }}>Build Steps</h4>
        <ol style={{ paddingLeft: '1.3rem', margin: 0 }}>
          {a.steps.map((s, i) => (
            <li key={i} style={{ fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '0.4rem' }}>{s}</li>
          ))}
        </ol>
      </div>

      {/* Input / Output */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted, #6b7280)', marginBottom: '0.6rem' }}>Input / Expected Output</h4>
        <IoBlock input={a.input} output={a.output} />
      </div>

      {/* Solution */}
      <SolutionPanel workflow={a.workflow} subWorkflow={a.subWorkflow} notes={a.solutionNotes} />
    </CollapsibleSection>
  )
}

const levelBadgeStyle = (a) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  background: a.levelBg,
  color: a.levelColor,
  border: `1.5px solid ${a.levelColor}`,
  borderRadius: '999px',
  padding: '0.2rem 0.7rem',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.04em'
})

export default function N8nPracticeExercisesPage() {
  return (
    <div className="page-shell" style={{ '--accent': '#ea580c', '--accent-soft': '#fed7aa' }}>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">n8n Curriculum</p>
          <h1>Practice Exercises <span>& Solution Answer Keys</span></h1>
          <p className="lead">Three progressive assignments covering data normalization, AI-powered routing, and scheduled sub-workflow orchestration. Each assignment includes a scenario brief, build steps, I/O specification, and an importable n8n workflow JSON answer key.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#assignment-1">Start Assignment 1</a>
            <a className="btn" href="/n8n/deep-dive.html">Back to Deep Dive</a>
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
            <h3>Assignment Levels</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {assignments.map((a) => (
                <a key={a.id} href={`#${a.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={levelBadgeStyle(a)}>{a.level}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>{a.title}</p>
                      <p style={{ margin: '0.1rem 0 0', fontSize: '0.76rem', color: 'var(--text-muted, #6b7280)' }}>{a.duration}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </header>

      <main>
        <CollapsibleSection
          id="overview"
          eyebrow="Overview"
          title="AI-Infused Automation Workflows curriculum"
          lead="Building robust, scalable pipelines in n8n requires not just knowing how to connect nodes, but also how to handle data transformations, inject AI decision-making, and manage complex flow control."
        >
          <div className="notes-grid">
            {[
              ['Purpose', 'These assignments are designed to test practical n8n engineering skills, progressing from fundamental data handling to advanced orchestration with sub-workflows.'],
              ['How to use', 'Students receive the scenario, requirements, hints, and I/O specification. The workflow JSON answer key is hidden behind a toggle — reveal it only during the debrief or for self-assessment.'],
              ['Importing a solution', 'Open n8n, click the canvas, then use the top-right menu → Import from JSON, or simply drag-and-drop the JSON file onto the canvas. n8n will auto-arrange the nodes.']
            ].map(([title, detail]) => (
              <article key={title} className="note-card model-note">
                <div className="model-row"><strong>{title}</strong></div>
                <div className="model-row"><span>{detail}</span></div>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        {assignments.map((a) => (
          <AssignmentSection key={a.id} a={a} />
        ))}

        <CollapsibleSection
          id="instructor-tips"
          eyebrow="💡 Instructor Tips"
          title="Facilitation notes for running these exercises"
          lead="Use these coaching notes to avoid common blockers and keep the class moving."
        >
          <div className="tips-grid">
            {instructorTips.map((tip, i) => (
              <article key={i} className="tip-card"><p>{tip}</p></article>
            ))}
          </div>
        </CollapsibleSection>
      </main>

      <a className="floating-index" href="#page-index">Index</a>
    </div>
  )
}
