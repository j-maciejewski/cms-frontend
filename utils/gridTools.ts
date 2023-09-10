export const getGrid = (searchParams: { [key: string]: string | string[] | undefined }) => {
  const grid: any = {}

  if (searchParams?.page) grid.page = parseInt(searchParams?.page as string)
  if (searchParams?.limit) grid.limit = parseInt(searchParams?.limit as string)
  if (searchParams?.fullText)
    grid.filter = {
      fullText: searchParams?.fullText as string,
    }

  return grid
}

export enum FilterOperators {
  RANGE = 'RANGE',
  LT = 'LT',
  GT = 'GT',
  LTE = 'LTE',
  GTE = 'GTE',
  EQ = 'EQ',
  NEQ = 'NEQ',
  LIKE = 'LIKE',
  IN = 'IN',
}

export enum SortDirections {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ValueOperators {
  FALSE = 'false',
  TRUE = 'true',
}

export enum FilterTypes {
  SELECT = 'select',
  MULTI_SELECT = 'multiselect',
  TEXT = 'text',
  DATE_RANGE = 'daterange',
  DATE = 'date',
}

/* Used for removing values */
export const EMPTY_STRING = ''
