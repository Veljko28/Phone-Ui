import Head from 'next/head';

const TitleChange = ({title}: {title: string}) => {
  return (
    <Head>
      <title>{title}</title>  
    </Head>
  )
}

export default TitleChange;