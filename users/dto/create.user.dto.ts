export interface CreateUserDto {
  email: string;
  password: string;
  givenName?: string;
  familyName?: string;
}
