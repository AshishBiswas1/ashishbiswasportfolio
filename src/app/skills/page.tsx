export default function SkillsPage() {
 return (
  <div className="space-y-8">
   <h1 className="text-4xl font-bold text-gray-900">Technical Skills</h1>

   <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Core Stack</h3>
    <div className="flex flex-wrap gap-3">
     {[
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Next.js",
      "Tailwind CSS",
     ].map((skill) => (
      <span
       key={skill}
       className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md font-medium"
      >
       {skill}
      </span>
     ))}
    </div>
   </div>
  </div>
 );
}
