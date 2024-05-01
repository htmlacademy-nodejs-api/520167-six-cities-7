import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.js';
import { CityType, FacilityType, HousingType, Offer, User, UserType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly fileName: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
      preview,
      photos,
      isPremium,
      isFavorites,
      rating,
      housingType,
      roomsQuantity,
      guestsQuantity,
      price,
      facilities,
      name,
      email,
      password,
      type,
      avatar,
      commentsQuantity,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: CityType[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
      preview,
      photos: this.parsePhotos(photos),
      isPremium: JSON.parse(isPremium.toLowerCase()),
      isFavorites: JSON.parse(isFavorites.toLowerCase()),
      rating,
      housingType: HousingType[housingType as 'Apartment' | 'House' | 'Room' | 'Hotel'],
      roomsQuantity: parseInt(roomsQuantity),
      guestsQuantity: parseInt(guestsQuantity),
      price: this.parseInt(price),
      facilities: this.parseFacilities(facilities),
      author: this.parseUser(name, email, password, UserType[type as 'Common' | 'Pro'], avatar),
      commentsQuantity: parseInt(commentsQuantity),
      coordinates,
    };
  }

  private parsePhotos(photosString: string): string[] {
    return photosString.split(';');
  }

  private parseFacilities(facilitiesString: string): FacilityType | FacilityType[] {
    if (!facilitiesString.includes(';')) {
      return facilitiesString as FacilityType;
    }
    return facilitiesString.split(';').map((facility) => facility as FacilityType);
  }

  private parseInt(intString: string): number {
    return Number.parseInt(intString, 10);
  }

  private parseUser(name: string, email: string, password: string, type: UserType, avatar?: string): User {
    return { name, email, password, type, avatar };
  }


  public read() {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
