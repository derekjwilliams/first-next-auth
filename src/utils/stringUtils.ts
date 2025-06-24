// src/utils/stringUtils.ts

import cronstrue from 'cronstrue'
import dayjs from 'dayjs'
import { CronExpressionParser } from 'cron-parser'
import 'dayjs/plugin/utc'
import 'dayjs/plugin/timezone'

import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

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

/**
 * Calculates the next occurrence of a given cron expression.
 *
 * @param cronExpression The cron string (e.g., "0 0 * * *").
 * @param fromDate The date from which to start searching for the next occurrence. Defaults to current time.
 * @param tz The timezone for cron evaluation (e.g., 'UTC', 'America/New_York'). Defaults to 'UTC'.
 * @returns A Day.js object representing the next occurrence, or null if invalid or no future occurrences.
 */
export function getNextCronOccurrence(
  cronExpression: string | null | undefined,
  fromDate: Date | string | dayjs.Dayjs = dayjs(),
): dayjs.Dayjs | null {
  if (!cronExpression || cronExpression.trim() === '') {
    return null
  }

  try {
    const options = {
      currentDate: dayjs(fromDate).toDate(), // Pass a native Date object
    }

    const interval = CronExpressionParser.parse(cronExpression, options)
    const next = interval.next().toDate()

    // next.value is a special cron-parser Date object, convert it to native Date then Day.js
    return dayjs(next)
  } catch (error: any) {
    console.error(`Error parsing or getting next occurrence for cron expression "${cronExpression}":`, error.message)
    return null
  }
}
