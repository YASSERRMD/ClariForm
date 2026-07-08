export interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">ClariForm</h1>
        </div>
      </header>
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="mx-auto max-w-4xl text-center text-sm text-gray-500">
          Your data stays in your browser. No information is sent to the cloud.
        </div>
      </footer>
    </div>
  )
}
