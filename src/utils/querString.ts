import qs from 'querystring'

export function parse (query: string) {
  const result = query.split('?')[1]
  return qs.parse(result)
}

