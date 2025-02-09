namespace Auth {
  type LogInRes = {
    access: string;
    refresh: string;
  };
  type LogInReq = LogIn;

  type RegisterRes = {
    access: string;
    refresh: string;
  };
  type RegistenReq = Register;

  type UserListRes = UserList[];
  type UserListReq = void;
}
