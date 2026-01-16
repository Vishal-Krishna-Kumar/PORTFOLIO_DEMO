const Skills = () => {
  return (
    <div className="flex gap-4 text-green-400 font-mono my-2 text-sm sm:text-base">
      {/* Left Side: ASCII Art (The Logo) */}
      <div className="hidden sm:block text-blue-400">
        <pre>
{`
    .\\^/.
  . | ^ | .   
  | | - | |  
   '|___|'   
    '---'    
`}
        </pre>
      </div>

      {/* Right Side: The Info */}
      <div className="flex flex-col justify-center">
        <div><span className="text-yellow-400 font-bold">User:</span> Vishal@MacbookPro</div>
        <div><span className="text-yellow-400 font-bold">OS:</span>  MacOS / PortfolioOS v1.0</div>
        <div><span className="text-yellow-400 font-bold">Shell:</span> zsh 5.8</div>
        <div className="mt-2"><span className="text-purple-400 font-bold">Langs:</span> Python, TypeScript, C++, SQL</div>
        <div><span className="text-purple-400 font-bold">Frameworks:</span> React, PyTorch, TensorFlow, FastAPI</div>
        <div><span className="text-purple-400 font-bold">Tools:</span> Docker, Kubernetes, Git, Vercel</div>
        <div className="mt-2 text-gray-500">----------------------------------</div>
      </div>
    </div>
  );
};

export default Skills;