import { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * React Error Boundary — catches runtime errors in component tree.
 * Prevents full app crash; shows recoverable error UI instead.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ElectIQ] Component error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '3rem', color: '#DC2626', marginBottom: '1rem' }}
          >
            error
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#64748B', marginBottom: '1.5rem', maxWidth: '300px' }}>
            ElectIQ encountered an unexpected error. 
            Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1.5rem',
              background: '#3B5BDB',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}
