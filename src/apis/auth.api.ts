import type { TLoginPayload, TLoginResponse } from '@/types/auth.type'
import http from '@/utils/http'

export const login = (body: TLoginPayload) => http.post<TLoginResponse>('/auth/login', body)

export const getMe = () => http.get('/auth/account')
