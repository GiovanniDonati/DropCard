export interface CollectionDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCollectionDto {
  name: string;
}