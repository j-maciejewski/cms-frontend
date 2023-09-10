import Link from 'next/link'

export default function () {
  return (
    <div className="flex flex-col justify-center items-center grow">
      <h4 className="mb-2">Sekcja której szukasz nie istnieje</h4>
      <Link href="/">
        <button>Wróć na stronę główną</button>
      </Link>
    </div>
  )
}
