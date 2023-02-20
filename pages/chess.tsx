import Head from "next/head";
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import getLichessData from '../lib/lichess';
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
    const stats = await getLichessData();
    return {
        props: {
            stats
        }
    }
}

export default function Chess({ stats }) {
    return (
        <Layout>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <section className={utilStyles.headingMd}>
            <p className={utilStyles.centerText}>Blitz Chess Rating <strong>{stats["perfs"]["blitz"]["rating"]}</strong></p>
            <p className={utilStyles.centerText}>Rapid Chess Rating: <strong>{stats["perfs"]["rapid"]["rating"]}</strong></p>
            <p className={`${utilStyles.lightText} ${utilStyles.centerText}`}> These stats are updated live using the Lichess API</p>
          </section>

        </ Layout>
      )
}
