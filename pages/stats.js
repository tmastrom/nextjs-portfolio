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
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
      <h3 className={utilStyles.headingMd}>Blitz Chess Rating: {chessStats["chess_blitz"]["last"]["rating"]}</h3>
      <h3 className={utilStyles.headingMd}>Rapid Chess Rating: {chessStats["chess_rapid"]["last"]["rating"]}</h3>
      <p className={utilStyles.iconcolour}> These stats are updated live using the Chess.com API</p>
    </section>

    </ Layout>
  )
}