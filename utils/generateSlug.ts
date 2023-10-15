export const generateSlug = (text: string = '') => {
  return encodeURI(text.toLocaleLowerCase().replace(/\s+/g, '-'))
}
