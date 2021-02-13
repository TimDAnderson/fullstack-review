const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Tim925:mongo1566@cluster0.ay9l3.mongodb.net/fetchers?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  if (err) {
    console.log(err)
  }
  const collection = client.db("test").collection("devices");
  console.log('connected')
  // perform actions on the collection object
  client.close();
});