import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    return mongoose.connect(process.varibles.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
}


export default dbConnect;