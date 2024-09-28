import {useLocale} from 'next-intl';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';

export default function LanguageSwitcher() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    router.push(`/${newLocale}`);
  };

  return (
    <button onClick={toggleLocale}>
      {t('languageSwitcher')}
    </button>
  );
}