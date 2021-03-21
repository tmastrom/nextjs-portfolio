import Head from 'next/head'

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons' 
import { faEnvelope } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.centerText} >Developer @ <a href="https://audette.io/">Audette</a></p>
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
    </Layout>
  )
}