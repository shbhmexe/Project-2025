import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MongoDB URI is missing in environment variables!");
}

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export { clientPromise };  // ✅ Named export
