export type UserRole = 'user' | 'elevated' | 'admin'

export type User = {
  user_id: string | number,
  username: string,
  role: UserRole
}