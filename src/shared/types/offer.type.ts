import { User } from './user.type.js';
import { CityType } from './city-type.enum.js';
import { HousingType } from './housing-type.enum.js';
import { FacilityType } from './facility-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityType;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: string;
  housingType: HousingType;
  roomsQuantity: number;
  guestsQuantity: number;
  price: number;
  facilities: FacilityType | FacilityType[];
  author: User;
  commentsQuantity: number;
  coordinates: string;
}
