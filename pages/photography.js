import React, { useState } from "react";
import Head from 'next/head'
import Image from "next/image";

import Layout, { siteTitle } from '../components/layout'

const imageList = [
  <Image src="/images/gallery/bangkok.jpg" alt="me" width="64" height="64" />,
  <Image src="/images/gallery/cotopaxi.jpg" alt="me" width="64" height="64" />,
  <Image src="/images/gallery/erawan.jpg" alt="me" width="64" height="64" />,
  <Image src="/images/gallery/malpaso.jpeg" alt="me" width="64" height="64" />,
  <Image src="/images/gallery/tofino.jpg" alt="me" width="64" height="64" />,
  <Image src="/images/gallery/whistler.jpg" alt="me" width="64" height="64" />
];

export default function Photography({data}) {

  return (
    
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <ul>
          {imageList}
        </ul>

      </Layout>
        
  )
}
