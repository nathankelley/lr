export interface Landlord {
  landlordFirstName: string;
  landlordLastName: string;
  landlordAddress: string; // string for now, eventually make this an Object
  landlordThumb: "Thumbs Up" | "Thumbs Down";
  landlordTextReview: string;
  _id?: string;
}

// change landlord address to propertyAddress
// Thumbs up/down needs to display total of both