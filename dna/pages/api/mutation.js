import HasMutation from "../../algorithm/dna_algorithm";
import dbConnect from "../../lib/dbConnect";
import Dna from "../../lib/dna";

const dnaHasMutation = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    
    const newHasMutation = new HasMutation(data.dna);

    const getResults= newHasMutation.getResults();
    const hasMutation = newHasMutation.hasMutation();
    
    const objectResults = {
      hasMutation: hasMutation,
      mutationsSequence: getResults
    }

    await dbConnect();

    const sequenceToString = await data.dna.toString();

    const alreadyExistDnaSequence = await Dna.findOne({adnSequence: sequenceToString});

    if (!alreadyExistDnaSequence) {
      try {
        const newDna = await new Dna({
          adnSequence: sequenceToString,
          hasMutation: hasMutation
        });
        newDna.save();
      } catch (error) {
        if (error) {
          return res.status(403).send('We can´t save the dna. Try again');
        }
      }
    }

    if (hasMutation) {
      return res.status(200).send(objectResults);
    } else {
      return res.status(403).send(objectResults);
    }

    //return res.status(200).send(data.dna)
  }
}

export default dnaHasMutation;