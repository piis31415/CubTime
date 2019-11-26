import _merge from 'lodash/merge'
import moment from 'moment'

let today = moment().format('YYYY-MM-DD')
let restorePrefs = (key, defaults) => _merge(defaults, JSON.parse(localStorage.getItem(key)) || {})

export default {
  dimming: false,
  loading: true,
  schedule: {},
  // Restore saved preferences to overwrite default lunches and classes
  lunches: restorePrefs('lunches', { 'Monday': 1, 'Tuesday': 1, 'Wednesday': 1, 'Thursday': 1, 'Friday': 1 }),
  classes: restorePrefs('classes', { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '' }),
  letters: restorePrefs('letters', { 1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G'}),
  // Design constants
  sizing: 1.2,
  colors: ['#22a353', '#1e8e48', '#19793e', '#156433', '#114f28', '#0c3a1e', '#082513'],
  // Check if client is crawler so it doesn't see a countdown in the title!
  isCrawler: /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent),
  // Set default dates to determine week to display
  displayDate: today, today,
  // Set default countdown so checking each blocks begins with the first one
  countdown: { i: 0 },
  // Queue for next countdown call (a timeout Promise)
  queue: null
}
