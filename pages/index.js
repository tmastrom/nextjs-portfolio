import Head from 'next/head'
import Link from 'next/link'

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons' 
import { faEnvelope } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <p className={utilStyles.centerText} >Developer @ <a className={utilStyles.iconcolour} href="https://audette.io/">Audette</a></p>
      </section>
      <section className={`${utilStyles.centerText}`}>
        <ul>
          <li className={`${utilStyles.icon}`}>
            <a href="https://github.com/tmastrom" target="_blank">
              <FontAwesomeIcon className={utilStyles.iconcolour} icon={faGithub} />
            </a>
          </li>
          <li className={utilStyles.icon}>
            <a href="https://www.linkedin.com/in/tmastro/" target="_blank">
              <FontAwesomeIcon className={utilStyles.iconcolour} icon={faLinkedin}/>
            </a>
          </li>
          <li className={utilStyles.icon}>
            <a href="thomas.mastromonaco@gmail.com" target="_blank">
              <FontAwesomeIcon className={utilStyles.iconcolour} icon={faEnvelope}/>
            </a>
          </li>
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a >{title}</a>
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