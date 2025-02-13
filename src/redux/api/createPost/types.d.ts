namespace Post {
  export interface PostCreateReq {
    description: string;
    author: number;
    img: File; // File, потому что это бинарный файл
  }

  export interface PostCreateRes {
    description: string;
    author: number;
    post: {
      id: number;
      img: string; // URL файла в ответе
    }[];
  }
}
