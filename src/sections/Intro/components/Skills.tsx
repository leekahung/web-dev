const developmentList = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Bash",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "React.js",
  "React Router",
];

const toolsList = ["GitHub", "VS Code", "Netlify", "Supabase"];

export default function Skills() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">Development</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {developmentList.map((item) => (
          <div
            key={item}
            className="p-2 rounded-lg border-1 hover:cursor-default dark:hover:bg-orange-300 dark:hover:text-black hover:text-slate-200 hover:bg-blue-500"
          >
            {item}
          </div>
        ))}
      </div>
      <h2 className="text-lg">Tools</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {toolsList.map((item) => (
          <div
            key={item}
            className="p-2 rounded-lg border-1 hover:cursor-default dark:hover:bg-orange-300 dark:hover:text-black hover:text-slate-200 hover:bg-blue-500"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
