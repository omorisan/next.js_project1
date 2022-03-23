import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Header(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
        crossorigin="anonymous"></link>
    </Head>
  )
}