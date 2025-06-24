// src/utils/stringUtils.ts

import cronstrue from 'cronstrue'
import dayjs from 'dayjs'

const CURRENCY_SYMBOL = '$' //TODO localization in the far future :)

export function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}
export function snakeToPascalCase(value: string) {
  const result = value.toLowerCase().replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''))
  return result.charAt(0).toUpperCase() + result.slice(1)
}

// From https://stackoverflow.com/questions/54246477/how-to-convert-camelcase-to-snake-case
export function pascalToSnakeCase(value: string) {
  if (value) {
    return value.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, '$1_').toLowerCase()
  }
  return ''
}

export function pascalToSpacedTerm(value: string) {
  let result = ''
  if (value) {
    result = value.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, '$1 ')
  }
  return result
}

export function formatCurrency(value: number | null | undefined) {
  if (value === null || typeof value === 'undefined') {
    return 'N/A'
  }
  return `${CURRENCY_SYMBOL}${value.toFixed(2)}`
}

export function formatDate(value: Date | null | undefined) {
  if (value === null || typeof value === 'undefined') {
    return 'N/A'
  }
  return dayjs(value).format('MM/DD/YYYY')
}
export function formatRecurringDateCron(value: string | null | undefined) {
  if (value === null || typeof value === 'undefined') {
    return 'N/A'
  }
  return cronstrue.toString(value)
}
