export default function Footer() {
  return (
    <footer className="py-8 text-center text-neutral-500 text-sm border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 mt-12">
      <div className="max-w-2xl mx-auto px-6">
        <p>© {new Date().getFullYear()} Aditya Singh. All rights reserved.</p>
        <p className="mt-2 text-xs">
          Built with Next.js, Rust (spiritually), and Caffeine.
        </p>
      </div>
    </footer>
  );
}
