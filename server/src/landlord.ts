import * as mongodb from "mongodb";

export interface Landlord {
    landlordFirstName: string;
    landlordLastName: string;
    landlordAddress: string; 
    landlordThumb: "Thumbs Up" | "Thumbs Down";
    landlordTextReview: string;
    _id?: mongodb.ObjectId;
}