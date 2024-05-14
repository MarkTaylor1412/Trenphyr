import { Models } from "appwrite";

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
}

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
}

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
}

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
}

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
}

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
}

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export type PostProps = {
  post?: Models.Document;
  action: "Create" | "Update";
}

export type CardProps = {
  post: Models.Document;
}

export type StatsProps = {
  post: Models.Document;
  userId: string;
}

export type GridListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
}

export type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}
