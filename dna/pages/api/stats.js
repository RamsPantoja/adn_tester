import dbConnect from "../../lib/dbConnect";
import Dna from "../../lib/dna";

const getStats = (req, res) =>  {
    if (req.method === 'GET') {
        await dbConnect();

        const count_mutations = await Dna.find({hasMutation: true});
        const count_no_mutation = await Dna.find({hasMutation: false});
        const ratio = count_mutations.length/count_no_mutation.length;

        const stats = {
            count_mutations: count_mutations.length,
            count_no_mutation: count_no_mutation.length,
            ratio: ratio,
        }

        return res.status(200).send(stats); 
    }
}

export default getStats;