export interface WishItem {
  id: string;
  name: string;
  msg: string;
  time: string;
  likes: number;
  attended?: 'hadir' | 'tidak' | 'ragu';
}

export interface GalleryPhoto {
  id: number;
  src: string;
  caption: string;
  title: string;
  category: 'all' | 'intimate' | 'portrait' | 'landscape';
  spanClass?: string;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  holderName: string;
  icon?: string;
  color?: string;
}

export interface RsvpRecord {
  id: string;
  name: string;
  pax: number;
  status: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  message?: string;
  timestamp: string;
}
