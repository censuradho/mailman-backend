export default function cleanObject <T>(obj: any): T {
  for (let o in obj) {
    Object.keys(obj)
    .filter(k => obj[k] != null) // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === "object"
          ? { ...newObj, [k]: cleanObject(obj[k]) } // Recurse.
          : { ...newObj, [k]: obj[k] }, // Copy value.
      {}
    )
  }
  return obj
}

// function cleanObject (obj) {
//   for (let o in obj) {
//     Object.keys(obj)
//     .filter(k => obj[k] != null) // Remove undef. and null.
//     .reduce(
//       (newObj, k) =>
//         typeof obj[k] === "object" && isEmpty(obj[k])
//           ? { ...newObj, [k]: cleanObject(obj[k]) } // Recurse.
//           : { ...newObj, [k]: obj[k] }, // Copy value.
//       {}
//     )
//     cleanObject(obj[o])
//     if (Object.keys(obj[o]).length === 0) {
//       delete obj[o]; // The object had no properties, so delete that property
//     }
//   }
//   return obj
// }

