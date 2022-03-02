
import styles from './navbar.module.css'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.container}>
            <section className={`${styles.centerElement}`}>
                <ul>
                <li className={styles.element}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                {/* <li className={styles.element}>
                    <Link href="/blog"> 
                        Blog
                    </Link>
                </li> */}
                <li className={styles.element}>
                    <Link href="/stats"> 
                        Stats
                    </Link>
                </li>
                <li className={styles.element}>
                    <Link href="/photography"> 
                        Photography
                    </Link>
                </li>
                </ul>
            </section>
        </div>
    )
}

