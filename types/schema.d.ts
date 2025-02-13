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
  post: Array<{}>;
}

interface GetPost {
  id: number;
  author: {
    id: number;
    username: string;
    profile_picture: string;
  };
  created_date: string;
  description: string;
  post: Array<{
    id: number;
    img: string;
  }>;
}

interface UserById {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string;
  status_acc: string;
  age: string;
  bio: string;
  gender: string;
  network: Array<{
    id: number;
    network_name: string;
    network_link: string;
    user_connect: number;
  }>;
}
