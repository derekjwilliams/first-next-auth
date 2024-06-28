export default function classNames(...args: (string | { [key: string]: boolean })[]): string {
  const classes: string[] = []

  for (const arg of args) {
    if (typeof arg === 'string') {
      classes.push(arg.trim())
    } else {
      const argObj = arg as { [key: string]: boolean }
      for (const key in argObj) {
        if (argObj.hasOwnProperty(key) && argObj[key]) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}
