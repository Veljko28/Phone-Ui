import { useTranslation } from 'react-i18next';
import NotFound from '../components/NotFound';

const Page404 = () => {
  const { t } = useTranslation();
  return <NotFound t={t}/>
}

export default Page404;
