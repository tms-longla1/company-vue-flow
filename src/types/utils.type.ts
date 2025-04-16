export type TErrorResponseApi<Data> = {
  message: string
  data?: Data
}

export type TSuccessResponseApi<Data> = {
  code: number
  msg?: string
  data: Data
}

export type TPagination = {
  pageable: {
    pageNumber: number
  }
  size: number
  totalElements: number
  totalPages: number
}
