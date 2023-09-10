export const calcPagination = (current: number, max: number) => {
  const items: (number | null)[] = [1]

  let prev = current === 1 ? null : current - 1,
    next = current === max ? null : current + 1

  if (current === 1 && max === 1) return { current, prev, next, items }
  if (current > 3) items.push(null)

  let r = 1,
    r1 = current - r,
    r2 = current + r

  for (let i = r1 > 1 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i)

  if (r2 + 1 < max) items.push(null)
  if (r2 < max) items.push(max)

  return { current, prev, next, items }
}
