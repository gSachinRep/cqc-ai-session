import React, { Component, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown render error' }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '16px', color: '#b42318' }}>
          UI runtime error: {this.state.message}
        </div>
      )
    }
    return this.props.children
  }
}

const root = document.getElementById('root')

try {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  )
} catch (error) {
  root.innerHTML = `<div style="font-family: Arial, sans-serif; padding: 16px; color: #b42318;">Fatal startup error: ${
    error?.message || 'Unknown'
  }</div>`
}
