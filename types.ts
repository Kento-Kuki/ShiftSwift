// types.ts

export interface Client {
  id: string;
  orgId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  imageId: string;
  imageUrl: string;
  imageUserName?: string;
  imageLinkHTML?: string;
  createdAt: Date;
  updatedAt: Date;
}
