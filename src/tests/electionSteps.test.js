import { describe, it, expect } from 'vitest'
import { ELECTION_STEPS, getStepById, getStepsForPrompt } from '../data/electionSteps'

describe('ELECTION_STEPS data integrity', () => {
  it('has exactly 7 steps', () => {
    expect(ELECTION_STEPS).toHaveLength(7)
  })

  it('every step has required fields', () => {
    const required = ['id', 'title', 'subtitle', 'phase', 'icon', 'color', 'shortDescription']
    ELECTION_STEPS.forEach(step => {
      required.forEach(field => {
        expect(step[field], `Step "${step.id}" missing field "${field}"`).toBeTruthy()
      })
    })
  })

  it('phases are sequential 1-7', () => {
    const phases = ELECTION_STEPS.map(s => s.phase).sort((a, b) => a - b)
    expect(phases).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('all step ids are unique', () => {
    const ids = ELECTION_STEPS.map(s => s.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all colors are valid hex codes', () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/
    ELECTION_STEPS.forEach(step => {
      expect(step.color).toMatch(hexRegex)
    })
  })

  it('every step has at least one FAQ', () => {
    ELECTION_STEPS.forEach(step => {
      expect(step.faqs.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('every step has steps array with items', () => {
    ELECTION_STEPS.forEach(step => {
      expect(Array.isArray(step.steps)).toBe(true)
      expect(step.steps.length).toBeGreaterThan(0)
    })
  })
})

describe('getStepById', () => {
  it('returns correct step for valid id', () => {
    const step = getStepById('voter-registration')
    expect(step).toBeTruthy()
    expect(step.id).toBe('voter-registration')
  })

  it('returns null for unknown id', () => {
    expect(getStepById('not-a-real-step')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(getStepById('')).toBeNull()
  })
})

describe('getStepsForPrompt', () => {
  it('returns array of 7 items', () => {
    const steps = getStepsForPrompt()
    expect(steps).toHaveLength(7)
  })

  it('each item has id, title, phase, shortDescription', () => {
    const steps = getStepsForPrompt()
    steps.forEach(step => {
      expect(step.id).toBeTruthy()
      expect(step.title).toBeTruthy()
      expect(step.phase).toBeTruthy()
      expect(step.shortDescription).toBeTruthy()
    })
  })

  it('does not include fullDescription (keeps prompt lean)', () => {
    const steps = getStepsForPrompt()
    steps.forEach(step => {
      expect(step.fullDescription).toBeUndefined()
    })
  })
})
