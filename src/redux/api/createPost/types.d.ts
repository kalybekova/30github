namespace Post {
  type PostCreateRes = PostText;
  type PostCreateReq = PostText;

  type GetPostRes = GetPost[];
  type GetPostReq = GetPost;

  type GetPostImgRes = {
    id: number;
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
  };

  type GetPostImgReq = {
    // author: number;
  };

  type UserByIdRes = UserById;
  type UserByIdReq = number;

  type DetailPostRes = DetailPost;
  type DetailPostReq = number;
}
