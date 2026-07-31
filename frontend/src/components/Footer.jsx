export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} ISKCON Youth Forum, Kolkata — Festival of Independence.</p>
        <p>80th Independence Day tribute — Bharat Varsha</p>
      </div>
    </footer>
  );
}
