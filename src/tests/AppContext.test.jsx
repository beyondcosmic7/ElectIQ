import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider, useAppContext } from '../context/AppContext'

function TestConsumer() {
  const { state, dispatch } = useAppContext()
  return (
    <div>
      <span data-testid="active-step">{state.activeStep ?? 'null'}</span>
      <span data-testid="error">{state.error ?? 'null'}</span>
      <span data-testid="streaming">{String(state.isStreaming)}</span>
      <span data-testid="checklist-count">
        {Object.values(state.checklist).filter(Boolean).length}
      </span>
      <button onClick={() => dispatch({ type: 'SET_ACTIVE_STEP', payload: 'voting-day' })}>
        Set Step
      </button>
      <button onClick={() => dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: 'voter-registration' })}>
        Toggle Checklist
      </button>
      <button onClick={() => dispatch({ type: 'SET_ERROR', payload: 'Test error' })}>
        Set Error
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR_ERROR' })}>
        Clear Error
      </button>
    </div>
  )
}

describe('AppContext', () => {
  const renderWithProvider = () =>
    render(<AppProvider><TestConsumer /></AppProvider>)

  it('initializes with null activeStep', () => {
    renderWithProvider()
    expect(screen.getByTestId('active-step').textContent).toBe('null')
  })

  it('SET_ACTIVE_STEP updates activeStep', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Set Step'))
    expect(screen.getByTestId('active-step').textContent).toBe('voting-day')
  })

  it('TOGGLE_CHECKLIST_ITEM increments completed count', () => {
    renderWithProvider()
    expect(screen.getByTestId('checklist-count').textContent).toBe('0')
    fireEvent.click(screen.getByText('Toggle Checklist'))
    expect(screen.getByTestId('checklist-count').textContent).toBe('1')
  })

  it('TOGGLE_CHECKLIST_ITEM toggles back to false', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Toggle Checklist'))
    fireEvent.click(screen.getByText('Toggle Checklist'))
    expect(screen.getByTestId('checklist-count').textContent).toBe('0')
  })

  it('SET_ERROR sets error message', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Set Error'))
    expect(screen.getByTestId('error').textContent).toBe('Test error')
  })

  it('CLEAR_ERROR removes error', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Set Error'))
    fireEvent.click(screen.getByText('Clear Error'))
    expect(screen.getByTestId('error').textContent).toBe('null')
  })

  it('isStreaming initializes as false', () => {
    renderWithProvider()
    expect(screen.getByTestId('streaming').textContent).toBe('false')
  })
})
