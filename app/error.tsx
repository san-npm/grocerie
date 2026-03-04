"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="relative z-[1] min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-playfair text-3xl text-ink mb-4">Une erreur est survenue</h1>
        <p className="text-warmgray mb-8">Quelque chose s&apos;est mal passé. Veuillez réessayer.</p>
        <button onClick={reset} className="btn-mustard">
          Réessayer
        </button>
      </div>
    </main>
  );
}
