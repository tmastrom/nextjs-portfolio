import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts'
import { getChessStats } from '../lib/chess'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const chessStats = await getChessStats();
  return {
    props: {
      allPostsData,
      chessStats
    }
  }
}


export default function Home({ allPostsData, chessStats }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Developer @ Audette</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
          </li>
          ))}
        </ul>
      </section>
      <section>

        <h3 className={utilStyles.headingMd}> {chessStats["chess_rapid"]["last"]["rating"]}</h3>
      </section>


    </Layout>
  )
}