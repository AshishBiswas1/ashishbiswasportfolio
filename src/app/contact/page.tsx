export default function ContactPage() {
 return (
  <div className="max-w-2xl mx-auto space-y-8">
   <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
   <p className="text-gray-600">
    [ Placeholder text inviting the visitor to reach out for opportunities or
    networking. ]
   </p>

   <form className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
    <div>
     <label className="block text-sm font-medium text-gray-700 mb-2">
      Name
     </label>
     <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder="Your Name"
     />
    </div>
    <div>
     <label className="block text-sm font-medium text-gray-700 mb-2">
      Email
     </label>
     <input
      type="email"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder="your@email.com"
     />
    </div>
    <div>
     <label className="block text-sm font-medium text-gray-700 mb-2">
      Message
     </label>
     <textarea
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      placeholder="How can I help you?"
     ></textarea>
    </div>
    <button
     type="button"
     className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors"
    >
     Send Message
    </button>
   </form>
  </div>
 );
}
