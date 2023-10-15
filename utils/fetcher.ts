const fetcher = async <T>(
  url: string,
  options?: RequestInit | undefined,
): Promise<{ data: T; error: null } | { data: null; error: Error }> => {
  if (url.startsWith('/')) url = 'http://localhost:3000' + url

  return await fetch(url, options).then(async (response) => {
    try {
      if (!response.ok) {
        return { data: null, error: new Error(response?.statusText) }
      }

      const data = (await response.json()) as T

      return { data, error: null }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { data: null, error: new Error(error.message) }
      }

      return { data: null, error: new Error('Unknown error') }
    }
  })
}

export { fetcher }
