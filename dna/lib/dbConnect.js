import mongoose from 'mongoose';
import envJSON from '../env.varibles.json';

var node_env = process.env.NODE_ENV || 'development';

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    return mongoose.connect(envJSON[node_env].MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
}


export default dbConnect;