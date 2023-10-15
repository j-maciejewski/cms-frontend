const url = 'http://localhost:3000/api'

export default async function () {
  const res = await fetch(url).then((res) => res.text())

  return <>{JSON.stringify(res)}</>
}
