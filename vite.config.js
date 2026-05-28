import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2018',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // CCA
        cca: resolve(__dirname, 'cca/index.html'),
        ccaDomain1: resolve(__dirname, 'cca/domain-1.html'),
        ccaDomain2: resolve(__dirname, 'cca/domain-2.html'),
        ccaDomain3: resolve(__dirname, 'cca/domain-3.html'),
        ccaDomain4: resolve(__dirname, 'cca/domain-4.html'),
        ccaDomain5: resolve(__dirname, 'cca/domain-5.html'),
        ccaSampleQuestions: resolve(__dirname, 'cca/sample-questions.html'),
        // n8n
        n8n: resolve(__dirname, 'n8n/index.html'),
        n8nDeepDive: resolve(__dirname, 'n8n/deep-dive.html'),
        n8nModule1: resolve(__dirname, 'n8n/module-1.html'),
        n8nModule2: resolve(__dirname, 'n8n/module-2.html'),
        n8nModule3: resolve(__dirname, 'n8n/module-3.html'),
        n8nModule4: resolve(__dirname, 'n8n/module-4.html'),
        n8nModule5: resolve(__dirname, 'n8n/module-5.html'),
        n8nModule6: resolve(__dirname, 'n8n/module-6.html'),
        n8nModule7: resolve(__dirname, 'n8n/module-7.html'),
        n8nModule8: resolve(__dirname, 'n8n/module-8.html'),
        n8nModule9: resolve(__dirname, 'n8n/module-9.html'),
        n8nModule10: resolve(__dirname, 'n8n/module-10.html'),
        n8nPracticeExercises: resolve(__dirname, 'n8n/practice-exercises.html'),
        // NotebookLM
        notebooklm: resolve(__dirname, 'notebooklm/index.html'),
        // Vibe Coding
        vibeCoding: resolve(__dirname, 'vibe-coding/index.html'),
        // Playbooks
        claudeFinance: resolve(__dirname, 'playbooks/finance.html'),
        claudeHr: resolve(__dirname, 'playbooks/hr.html'),
        claudeMarketing: resolve(__dirname, 'playbooks/marketing.html'),
        claudeSales: resolve(__dirname, 'playbooks/sales.html'),
        claudeCx: resolve(__dirname, 'playbooks/cx.html'),
        // Tools
        claudeCore: resolve(__dirname, 'tools/core.html'),
        cowork: resolve(__dirname, 'tools/cowork.html'),
        claudeCode: resolve(__dirname, 'tools/code.html'),
        skills: resolve(__dirname, 'tools/skills.html'),
        claudeSlack: resolve(__dirname, 'tools/slack.html'),
        claudeWeb: resolve(__dirname, 'tools/web.html'),
        claudeExcel: resolve(__dirname, 'tools/excel.html'),
        claudePowerpoint: resolve(__dirname, 'tools/powerpoint.html'),
        // Blog
        agentSdkBlog: resolve(__dirname, 'blog/agent-sdk.html'),
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5500,
    strictPort: true
  }
})
