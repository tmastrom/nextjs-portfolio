import Head from 'next/head'

import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getChessStats } from '../lib/chess'

export async function getStaticProps() {
  const chessStats = await getChessStats();
  return {
    props: {
      chessStats
    }
  }
}

export default function Stats({  chessStats }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <p className={utilStyles.centerText}>Blitz Chess Rating: {chessStats["chess_blitz"]["last"]["rating"]}</p>
        <p className={utilStyles.centerText}>Rapid Chess Rating: {chessStats["chess_rapid"]["last"]["rating"]}</p>
        <p className={`${utilStyles.lightText} ${utilStyles.centerText}`}> These stats are updated live using the Chess.com API</p>
      </section>

    </ Layout>
  )
}