export type TLoginPayload = {
  username: string
  password: string
  rememberMe: boolean
}

export type TLoginResponse = {
  token: string
  code: number
}
