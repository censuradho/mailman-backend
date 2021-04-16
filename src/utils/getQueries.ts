function getQueries (array: string[], query: any) {
  return array.reduce((prev, cur) => query[cur] ? ({
    ...prev,
    [cur]: query[cur]
  }) : ({ ...prev }),{})
}

export default getQueries
