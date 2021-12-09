import { default as MyHead } from 'next/head';
import React from 'react';

const Head: React.FC<{
  title?: string,
  description?: string
}> = ({children, title, description}) => {
  return (
    <MyHead>
      <title>{title}{title && ' | '}CSS Modules DEMO | LaunchCart.jp</title>
      <meta name="description" content={ description ? description : `Generated by create next app` } />
      <link rel="icon" href="https://launchcart.jp/favicon.ico" />
      {children}
    </MyHead>
  )
}

export default Head;