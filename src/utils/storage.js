const PREFIX = 'fitness_'

export function saveDay(dateKey, type, data) {
  const key = `${PREFIX}${dateKey}_${type}`
  localStorage.setItem(key, JSON.stringify(data))
}

export function loadDay(dateKey, type) {
  const key = `${PREFIX}${dateKey}_${type}`
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : null
}

export function loadAllOfType(type, days) {
  const results = {}
  for (const d of days) {
    const data = loadDay(d, type)
    if (data) results[d] = data
  }
  return results
}

export function saveBodyComp(data) {
  const history = loadBodyCompHistory()
  const existing = history.findIndex(h => h.date === data.date)
  if (existing >= 0) {
    history[existing] = data
  } else {
    history.push(data)
    history.sort((a, b) => a.date.localeCompare(b.date))
  }
  localStorage.setItem(`${PREFIX}body_comp_history`, JSON.stringify(history))
}

export function loadBodyCompHistory() {
  const raw = localStorage.getItem(`${PREFIX}body_comp_history`)
  return raw ? JSON.parse(raw) : []
}
