import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const{title,image,address,description} = data;

    const client = await MongoClient.connect(
      "mongodb+srv://ATIQURRAHMAN:yAP2S54kd6GktAKb@cluster0.ceo0cji.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    // mongoclint is use for connect data with database
    const db = client.db();
    const meetupCollection = db.collection("ateeq"); //collection is use for data collection

    const result = await meetupCollection.insertOne(data); // insert one is use for insert a data at a time

    console.log(result);

    client.close(); //close the database once connection done

    //  afer that we use respose when connection stablish and data add succesfully
    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
