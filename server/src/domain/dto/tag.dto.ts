export interface TagDto {
  id: string;
  name: string;
  createdAt: Date;
}

export interface CreateTagDto {
  name: string;
}