import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import { GetStaticProps } from 'next';


export default function Home({
  allPostsData
 }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
 }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.centerText}>
          Full Stack Developer based in Vancouver, BC
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.centerText}`}>
        <ul>
          <li className={`${utilStyles.icon}`}>
            <a href="https://github.com/tmastrom" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
          <li className={utilStyles.icon}>
            <a href="https://www.linkedin.com/in/tmastro/" target="_blank" rel="noreferrer">
              Linkedin
            </a>
          </li>
          <li className={utilStyles.icon}>
            <a href="thomas.mastromonaco@gmail.com" target="_blank" rel="noreferrer">
              Email
            </a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    },
  };
}
