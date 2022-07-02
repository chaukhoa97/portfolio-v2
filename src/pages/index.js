import React from 'react'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

import styles from './index.module.css'

function HomepageHeader() {
  return (
    <header className={styles.header}>
      <img className={styles.avatar} src="img/avatar.png"></img>
      <h1 className={styles.heading}>Hi, I'm Finn</h1>
      <p className={styles.subHeading}>
        React.js Developer with a passion in building modern and elegant
        websites
      </p>
    </header>
  )
}

export default function Home() {
  return (
    <Layout
      title="My personal page"
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
