
import utilStyles from '../styles/utils.module.css'
import styles from './layout.module.css'

import Link from 'next/link'


export default function NavBar() {
    return (
        <div className={styles.container}>

            <section className={`${utilStyles.centerText}`}>
                <ul>
                <li className={`${utilStyles.icon}`}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className={utilStyles.icon}>
                    <Link href="/blog"> 
                        Blog
                    </Link>
                </li>
                <li className={utilStyles.icon}>
                    <Link href="/stats"> 
                        Stats
                    </Link>
                </li>
                </ul>
            </section>
        </div>
    )
}

