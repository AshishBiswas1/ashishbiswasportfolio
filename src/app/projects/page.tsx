export default function ProjectsPage() {
 return (
  <div className="space-y-12">
   <h1 className="text-4xl font-bold text-gray-900">Projects</h1>

   <div className="grid md:grid-cols-2 gap-8">
    {/* Project Card Placeholder */}
    {[1, 2, 3, 4].map((item) => (
     <div
      key={item}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
     >
      <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
       <span className="text-gray-400">[ Project Image ]</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
       Project Title {item}
      </h3>
      <p className="text-gray-600 mb-4">
       [ Short description of the project, the problem it solved, and the
       technologies utilized. ]
      </p>
      <div className="flex gap-2 text-sm text-blue-600 font-medium">
       <span>Next.js</span> • <span>Node.js</span> • <span>MongoDB</span>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
