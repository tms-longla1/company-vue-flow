export type TLoginPayload = {
  username: string
  password: string
}

export type TLoginResponse = {
  token: string
  code: number
}
