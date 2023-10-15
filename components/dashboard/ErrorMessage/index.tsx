export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="my-auto text-center">
      <h2 className="mb-3 text-3xl font-bold text-red-400">Something went wrong.</h2>
      <p className="mb-3 text-gray-200">Oops, something went wrong. Please try again later.</p>
      {message && <p className="mb-3 text-sm text-gray-400">Error message: {message}</p>}
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm text-gray-300 hover:bg-blue-800"
      >
        Refresh page
      </button>
    </div>
  )
}
