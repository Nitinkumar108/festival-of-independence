const placeholderImages = new Array(6).fill(null);

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-6">Gallery</h1>
      <p className="text-gray-600 mb-8">
        {/* TODO: Replace with real photos/videos from past festivals and events. */}
        Photos and videos from IYF Kolkata's festivals and events will appear here.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {placeholderImages.map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-cream border rounded-lg flex items-center justify-center text-gray-400 text-sm"
          >
            Image {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
