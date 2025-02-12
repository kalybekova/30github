interface LogIn {
  username: string;
  password: string;
}

interface Register {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status_acc: string;
  age: string;
}

interface UserList {
  id: number;
  username: string;
  profile_picture: string;
}

interface Post {
  description: string;
  author: number;
  post: {
    id: number;
    img: string;
  }[];
}
