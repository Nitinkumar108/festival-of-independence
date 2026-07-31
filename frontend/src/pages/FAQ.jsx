const faqs = [
  {
    q: "Who can register for the Festival of Independence programs?",
    a: "Any student or youth interested in participating is welcome to register through the Register page.",
  },
  {
    q: "Is there a registration fee?",
    a: "Yes, a nominal registration fee applies and can be paid securely online after you log in.",
  },
  {
    q: "How do I get my class/program joining link?",
    a: "Once logged in, your dashboard shows the upcoming program schedule along with joining links or venue details.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. All payments are processed through Razorpay; we never store your card details on our servers.",
  },
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <details key={i} className="border rounded-lg p-4 group">
            <summary className="font-medium text-navy cursor-pointer">{item.q}</summary>
            <p className="text-sm text-gray-600 mt-2">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
