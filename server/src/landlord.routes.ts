import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const landlordRouter = express.Router();
landlordRouter.use(express.json());

landlordRouter.get("/", async (_req, res) => {
    try {
        const landlords = await collections?.landlords?.find({}).toArray();
        res.status(200).send(landlords);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

landlordRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const landlord = await collections?.landlords?.findOne(query);

        if (landlord) {
            res.status(200).send(landlord);
        } else {
            res.status(404).send(`Failed to find a Landlord: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an Landlord: ID ${req?.params?.id}`);
    }
});

landlordRouter.post("/", async (req, res) => {
    try {
        const landlord = req.body;
        const result = await collections?.landlords?.insertOne(landlord);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new Landlord: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new Landlord.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

landlordRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const landlord = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.landlords?.updateOne(query, { $set: landlord });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a Landlord: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a Landlord: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a Landlord: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

landlordRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.landlords?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a Landlord: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a Landlord: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a Landlord: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
