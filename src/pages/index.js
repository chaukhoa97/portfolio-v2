import React from 'react'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import s from './index.module.css'
import ReactIcon from '../components/icons/ReactIcon'
import NextJsIcon from '../components/icons/NextJsIcon'
import TypeScriptIcon from '../components/icons/TypeScriptIcon'
import ReactQueryIcon from '../components/icons/ReactQueryIcon'
import CSSIcon from '../components/icons/CSSIcon'
import TailwindIcon from '../components/icons/TailwindIcon'
import SupabaseIcon from '../components/icons/SupabaseIcon'

export default function Home() {
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <Layout title="My personal page" description="Finn Chau's personal page">
      <div className={s.homepage}>
        <header className={s.header}>
          <div className={s.avatarContainer}>
            <img className={s.avatar} src="img/avatar.png"></img>
          </div>
          <div className={s.textContainer}>
            <h1 className={s.heading}>
              Hi, I'm{' '}
              <span className={s.highlightContainer}>
                <span className={s.highlight}>Finn</span>
              </span>
            </h1>
            <em className={s.subHeading}>Front-end Developer</em>
          </div>
        </header>
        <div className={s.skills}>
          <h2 className={s.h2}>Things I specialize in</h2>
          <div className={s.icons}>
            <Link href="https://reactjs.org/" style={{ lineHeight: 0 }}>
              <ReactIcon isMobile={isMounted && window.innerWidth < 1024} />
            </Link>
            <Link href="https://nextjs.org/" style={{ lineHeight: 0 }}>
              <NextJsIcon />
            </Link>
            <Link
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
              style={{ lineHeight: 0 }}
            >
              <TypeScriptIcon
                isMobile={isMounted && window.innerWidth < 1024}
              />
            </Link>
            <Link href="https://tailwindcss.com/" style={{ lineHeight: 0 }}>
              <TailwindIcon isMobile={isMounted && window.innerWidth < 1024} />
            </Link>
            <Link
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              style={{ lineHeight: 0 }}
            >
              <CSSIcon isMobile={isMounted && window.innerWidth < 1024} />
              {/* <SupabaseIcon isMobile={isMounted && window.innerWidth < 1024} /> */}
            </Link>
            <Link
              href="https://tanstack.com/query/v4"
              style={{ lineHeight: 0 }}
            >
              <ReactQueryIcon
                isMobile={isMounted && window.innerWidth < 1024}
              />
            </Link>
          </div>
          <div className={s.more}>
            Want to work with me? Connect with me via{' '}
            <Link href="https://www.linkedin.com/in/khoa-ch%C3%A2u-4701b5233/">
              LinkedIn
            </Link>{' '}
            or have a look at my{' '}
            <Link href="https://drive.google.com/file/d/1igui_PElYY8y6IJgyfSOPN4oYEDfg-wX/view?usp=sharing">
              Resume
            </Link>{' '}
            for more details.
          </div>
        </div>
      </div>
    </Layout>
  )
}
