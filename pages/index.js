import Head from 'next/head'

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons' 
import { faEnvelope } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'


export default function Home() {
  return (
    <html lang="en">
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.centerText} >Developer @ <a href="https://audette.io/" alt="Audette homepage" target="_blank" rel="noreferrer">Audette</a></p>
      </section>
      <section className={`${utilStyles.centerText}`}>
        <ul>
          <li className={`${utilStyles.icon}`}>
            <a href="https://github.com/tmastrom" alt="github profile link" target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={utilStyles.iconcolour} icon={faGithub} />
            </a>
          </li>
          <li className={utilStyles.icon}>
            <a href="https://www.linkedin.com/in/tmastro/" alt="linkedin profile link" target="_blank" target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={utilStyles.iconcolour} icon={faLinkedin}/>
            </a>
          </li>
          <li className={utilStyles.icon}>
            <a href="thomas.mastromonaco@gmail.com" alt="email link" target="_blank" target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={utilStyles.iconcolour} icon={faEnvelope}/>
            </a>
          </li>
        </ul>
      </section>
    </Layout>
    </html>
  )
}