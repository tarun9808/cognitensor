// export const sortHandler = (data, target) => {
//   let clone = [...data];
//   if (target === "asc") return clone.sort((a, b) => (a > b ? 1 : -1));
//   else if (target === "dsc") return clone.sort((a, b) => (a > b ? -1 : 1));
//   else return clone;
// };


export const sortHandler = (data, slug, type) => {
  console.log("Slug=>",slug,"type=>",type);
  slug = slug.toLowerCase();
  let clone = [...data];
  if (type === "asc") {
    return clone.sort((a, b) => (a[slug] > b[slug] ? 1 : -1));
  } else if (type === "dsc")
    return clone.sort((a, b) => (a[slug] < b[slug] ? 1 : -1));
  else return clone;
};