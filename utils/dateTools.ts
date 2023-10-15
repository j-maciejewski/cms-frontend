export const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp))

  return `${date.toLocaleTimeString().slice(0, -3)} ${date.toLocaleDateString()}`
}
