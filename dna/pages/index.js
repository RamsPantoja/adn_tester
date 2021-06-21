import React, { useCallback, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { motion } from 'framer-motion';
import SendIcon from '@material-ui/icons/Send';
import { useHandleDnaSequence } from '../hook/useHandleDnaSequence';
import { stateSchema, validationSchema, disableSchema } from '../hook/useHandleDnaSequence';
import cn from 'classnames';
import axios from 'axios';


export default function Home() {
  const [state, disable, handleOnChange] = useHandleDnaSequence(stateSchema, validationSchema, disableSchema);
  const [apiResults, setApiResults] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [stats, setStats ] = useState(null);

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault();

    axios({
        method: 'post',
        url: 'https://adn-tester.vercel.app/api/mutation',
        data: {
            dna: state.dna.value.split(',')
        }
    }).then((res) => {
        setApiResults(res.data)
        setStatusCode(res.status)
    }).catch((error) => {
      if (error.response) {
        setApiResults(error.response.data);
        setStatusCode(error.response.status)
      }
    })
  }, [state]);

  const getStats = async () => {
    const res = await fetch('https://adn-tester.vercel.app/api/stats');
    const stats = await res.json();
    setStats(stats);
  }

  const hasMutationTrue = apiResults !== null && apiResults.hasMutation === true ? <span className={styles.hasMutationTrue}>True -- {statusCode}</span> : null;
  const hasMutationFalse = apiResults !== null && apiResults.hasMutation === false ? <span className={styles.hasMutationFalse}>False -- {statusCode}</span> : null;

  return (
    <div className={styles.container}>
      <Head>
        <title>DNA Tester</title>
        <meta name="description" content="Check if the dna secuence has a mutation..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div className={styles.dnaTestingContainer}
      animate={{scale: 1.1}}
      transition={{duration: 0.5}}>
        <h2>Mutation DNA Tester</h2>
        <p>Type the DNA sequence separate by , comma & no spaces.</p>
        <span className={styles.warningNote}>Note: The DNA sequence just must include A, T, C, or G characters.</span>
        <form className={styles.formToSendDnaSequence} onSubmit={(e) => {handleOnSubmit(e)}}>
          <input type='text' value={state.dna.value} name='dna' placeholder='Type DNA Sequence' onChange={(e) => {handleOnChange(e)}} className={
            cn({
              [styles.dnaSuccess]: state.dna.errorfield === 'success',
              [styles.dnaFailed]: state.dna.errorfield === 'failed'
            })
          }/>
          <button className={styles.buttonToSendAdn} type='submit' disabled={disable.status}>
            <SendIcon/>
          </button>
        </form>
        <div className={styles.hasMutation}>
          <span>HasMutation: {hasMutationTrue || hasMutationFalse}</span>
        </div>
        <div className={styles.getStats}>
          <button onClick={getStats}>Get stats</button>
          <div>
            <span>count_mutations: {stats ? stats.count_mutations : null}</span>
            <span>count_no_mutation: {stats ? stats.count_no_mutation : null}</span>
            <span>ratio: {stats ? stats.ratio : null}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
