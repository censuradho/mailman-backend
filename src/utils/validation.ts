
function useQueryString (obj: any) {
  const newObj = JSON.parse(JSON.stringify(obj))
  return newObj
}

export default useQueryString
