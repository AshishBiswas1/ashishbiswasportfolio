export default function InternshipsPage() {
 return (
  <div className="max-w-4xl space-y-8">
   <h1 className="text-4xl font-bold text-gray-900">Experience</h1>

   <div className="space-y-6">
    {[1, 2].map((item) => (
     <div
      key={item}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
     >
      <div className="flex justify-between items-start mb-4">
       <div>
        <h3 className="text-2xl font-bold text-gray-900">
         Software Engineering Intern
        </h3>
        <h4 className="text-lg text-blue-600">[ Company Name ]</h4>
       </div>
       <span className="text-gray-500 font-medium">
        [ Start Date ] - [ End Date ]
       </span>
      </div>
      <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
       <li>
        [ Bullet point detailing a specific technical achievement or
        responsibility. ]
       </li>
       <li>
        [ Bullet point highlighting a problem solved or efficiency gained. ]
       </li>
       <li>
        [ Bullet point regarding teamwork, agile methodologies, or tools used. ]
       </li>
      </ul>
     </div>
    ))}
   </div>
  </div>
 );
}
