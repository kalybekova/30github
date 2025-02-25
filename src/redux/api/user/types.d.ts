namespace Post {
  type UserByIdRes = UserById;
  type UserByIdReq = number;

  type EditRes = PatchUser;
  type EditReq = {
    data: PatchUser;
    id: number;
  };
}
