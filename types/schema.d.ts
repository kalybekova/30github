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
  post_img1: string;
  post_img2: string;
  post_img3: string;
  post_img4: string;
  post_img5: string;
  post_img6: string;
  post_img7: string;
  post_img8: string;
  post_img9: string;
  post_img10: string;
  author: number;
}

interface PostText {
  post_connect: number;
  text: string;
}

interface GetPost {
  id: number;
  post_connect: {
    id: number;
    post_img1: string;
    post_img2: any;
    post_img3: any;
    post_img4: any;
    post_img5: any;
    post_img6: any;
    post_img7: any;
    post_img8: any;
    post_img9: any;
    post_img10: any;
    author: number;
  };
  text: string;
  created_date: string;
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
