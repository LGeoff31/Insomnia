import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { SleepEntry } from "..";

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
    const user_id = req.body.user_id;
    const client = await clientPromise;
    const myDB = client.db("Cluster0");
    const myColl = myDB.collection("insomnia");
    const dataEntry = (await myColl
      .find({ user_id: user_id })
      .toArray()) as unknown as SleepEntry[];

    dataEntry.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    //return data
    return res.status(200).json({ dataEntry: dataEntry });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
