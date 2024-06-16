import * as mongodb from "mongodb";
import { Landlord } from "./landlord";

export const collections: {
    landlords?: mongodb.Collection<Landlord>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const landlordsCollection = db.collection<Landlord>("landlords");
    collections.landlords = landlordsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Landlord model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["landlordFirstName", "LandlordLastName", "landlordAddress", "landlordThumb", "landlordTextReview"],
            additionalProperties: false,
            properties: {
                _id: {},
                landlordFirstName: {
                    bsonType: "string",
                    description: "'Landlord First Name' is required and is a string",
                },
                landlordLastName: {
                    bsonType: "string",
                    description: "'Landlord Last Name' is required and is a string",
                },
                landlordAddress: {
                    bsonType: "string",
                    description: "'Property Address' is required and is a string",
                    minLength: 5,
                },
                landlordThumb: {
                    bsonType: "string",
                    description: "'Thumbs Up' or 'Thumbs Down' is required",
                    enum: ["up", "down"],
                },
                landlordTextReview: {
                    bsonType: "string",
                    description: "'Review' is required and is a string",
                    minLength: 10,
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "landlords",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("landlords", {validator: jsonSchema});
        }
    });
}
