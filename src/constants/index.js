export const DEFAULT_LEVEL = 0
export const MIN_LEVEL = 0
export const MAX_LEVEL = 4
export const LEVEL_COLOR_MAPPER = level =>
  level === -1
    ? 'gray'
    : ['blue', 'green', '#FF9800', 'pink', 'red'][level]
