import mongoose from 'mongoose';

const dnaSchema = new mongoose.Schema({
    adnSequence: String,
    hasMutation: Boolean,
});


export default mongoose.models.Dna|| mongoose.model('Dna', dnaSchema);

