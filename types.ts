// types.ts

export interface Client {
  id: string;
  orgId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
  createdAt: Date;
  updatedAt: Date;
}
