import dbConnect from "../../lib/dbConnect";
import Dna from "../../lib/dna";

export default async function getStats(req, res) {
        await dbConnect();

        const count_mutations = await Dna.find({hasMutation: true});
        const count_no_mutation = await Dna.find({hasMutation: false});
        const ratio = count_mutations.length/count_no_mutation.length;

        stats = {
            count_mutations: count_mutations.length,
            count_no_mutation: count_no_mutation.length,
            ratio: ratio,
        }

        return res.status(200).send(stats); 
}