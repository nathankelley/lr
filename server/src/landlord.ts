import * as mongodb from "mongodb";

export interface Landlord {
    landlordName: string;
    landlordAddress: string; 
    landlordThumb: "Thumbs Up" | "Thumbs Down";
    landlordTextReview: string;
    _id?: mongodb.ObjectId;
}
