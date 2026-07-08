import { LanguageProvider, useLanguage } from '../i18n/LanguageProvider'
import { LanguageSwitcher } from './LanguageSwitcher'
import { SkipToContent } from './SkipToContent'
import { t } from '../i18n/t'

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <header className="border-b border-gray-200 bg-white px-4 py-3" role="banner">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{t('app.name', language)}</h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main id="main-content" className="flex-1 px-4 py-6" role="main">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-3" role="contentinfo">
        <div className="mx-auto max-w-4xl text-center text-sm text-gray-500">
          {t('footer.privacy', language)}
        </div>
      </footer>
    </div>
  )
}

export interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <LanguageProvider>
      <AppShellInner>{children}</AppShellInner>
    </LanguageProvider>
  )
}
