import { useTranslations } from 'next-intl';
import Layout from '../components/Layout';
import { Typography } from '@mui/material';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <Typography variant="h2" component="h1" className="text-center">
          {t('greeting')}
        </Typography>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}