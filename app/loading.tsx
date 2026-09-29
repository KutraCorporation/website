export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 border-4 border-owt1/30 border-t-owt1 rounded-full animate-spin"
          aria-hidden
        />
        <p className="text-muted-foreground text-sm animate-pulse">
          Loading...
          <span className="sr-only">, please wait</span>
        </p>
      </div>
    </div>
  );
}
