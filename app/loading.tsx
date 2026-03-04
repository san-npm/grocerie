export default function Loading() {
  return (
    <main className="relative z-[1] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-mustard/30 border-t-mustard rounded-full animate-spin mx-auto mb-4" />
        <p className="text-warmgray text-sm">Chargement...</p>
      </div>
    </main>
  );
}
