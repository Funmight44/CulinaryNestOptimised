
const API_BASE_URL = 'https://forkify-api.jonas.io/api/v2/recipes'
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000

async function fetchJson(url, { signal } = {}) {
  const cached = cache.get(url)
  if (cached && Date.now() - cached.time < CACHE_TTL) return cached.data
  const response = await fetch(url, { signal })
  const payload = await response.json()

  if (!response.ok || payload.status === 'fail') {
    throw new Error(
      payload.message || 'We could not load recipes. Please try again.'
    )
  }

  cache.set(url, { data: payload.data, time: Date.now() })
  return payload.data
}

export async function searchRecipes(query, { signal } = {}) {
  const params = new URLSearchParams({ search: query })

  const data = await fetchJson(`${API_BASE_URL}?${params}`, { signal })

  return data.recipes || []
}

export async function getRecipe(id, { signal } = {}) {
  const data = await fetchJson(
    `${API_BASE_URL}/${encodeURIComponent(id)}`,
    { signal }
  )

  return data.recipe
}
