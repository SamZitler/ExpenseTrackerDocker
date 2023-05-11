import mongoose from "mongoose";

const connect = async () => {   

    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;

    const CONNECTION_URL = `mongodb://${username}:${password}@${url}/?ssl=true&replicaSet=atlas-nculeh-shard-0&authSource=admin&retryWrites=true&w=majority`;
    await mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true, useUnifiedTopology: true
    })

}

export default connect;