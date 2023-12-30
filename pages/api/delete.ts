import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: "Method not allowed, only POST is allowed." });
    }

    // Write the actual logic

    // Delete a todo from database
    const data = req.body;
    const id = data.id;

    if (id === undefined) {
      return res.status(400).json({ error: "DID NOT PASS ID" });
    }
    const user_id = req.body.user_id;
    const client = await clientPromise;
    const myDB = client.db("Cluster0");
    const myColl = myDB.collection("insomnia");
    const arrayLists = await myColl.find({}).toArray();

    let isValidId = false;
    for (const entry of arrayLists) {
      console.log(entry._id, id);
      if (entry._id.toString() === id && entry.user_id == user_id) {
        isValidId = true;
      }
    }
    if (isValidId === false) {
      return res.status(404).json({ error: `Not valid ID in database: ${id}` });
    }

    const result = await myColl.deleteOne({ _id: new ObjectId(id) });
    console.log("Deleted", result);

    // 4. Return the it has been created successfully.
    return res.status(200).json({ status: "success", is: result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: JSON.stringify(e) });
  }
}
