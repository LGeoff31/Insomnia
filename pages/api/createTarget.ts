import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //verification
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed, only POST is allowed." });
  }

  //extract data
  try {
    let { targetSleep, user_id } = req.body;
    console.log("POO", targetSleep);
    const client = await clientPromise;
    const myDB = client.db("Cluster0");
    const myColl = myDB.collection("insomniaTarget");
    const doc = {
      targetSleep,
      user_id,
    };
    const result = await myColl.insertOne(doc);
    console.log("Inserted", result);
    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: { myMsg: "error inserting", error } });
  }

  //validate data

  //add to database
}
