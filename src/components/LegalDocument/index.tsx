import React from 'react'

type LegalDocumentProps = {
  title: string
  updatedAt: string
  children: React.ReactNode
}

export function LegalDocument({ title, updatedAt, children }: LegalDocumentProps) {
  return (
    <main className="pb-20 pt-8 md:pb-24 md:pt-12">
      <article className="container max-w-3xl">
        <header className="mb-8 border-b border-border pb-6 md:mb-10">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Última actualización: {updatedAt}</p>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-primary">
          {children}
        </div>
      </article>
    </main>
  )
}
