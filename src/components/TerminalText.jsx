import React from "react";
import { Icon } from 'astro-icon/components';

function TerminalText() {
  const [output, setOutput] = React.useState([]);
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef(null);


  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const processCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    
    if (command === 'help') {
      return [
        <div className="ml-2">
          <span className="text-white"><b>Available commands</b></span>
          <div className="text-white">help - The command you just used</div>
          <div className="text-white">about - Information about me!</div>
          <div className="text-white"><del>projects - Some projects I'm proud of</del></div>
          <div className="text-white">links - Useful socials or links of mine</div>
          <div className="text-white">siteinfo - Information about this website</div>
        </div>
      ];

    } else if (command === "about" || command === "abt") {
      return [
        <div className="ml-2">
          <div><span className="text-white"><b>About Me</b></span></div>
          <div><span className="text-white">Hi! I am muchtek on most platforms. I am proficient in many different programming languages, but my personal favorites are <span className="text-blue-500">C++</span> and <span className="text-orange-400">javascript</span>. I enjoy building web applications and embedded systems, and hope to make projects that combine those two interests one day! I fw cats and dogs heavy.</span></div>
        </div>
      ];

    } else if (command === "links" || command === "ls") {
      return [
        <div className="ml-2">
          <div><span className="text-white">links/</span></div>
          <div><span className="text-white">├ </span><a href="https://github.com/muchtek" className="text-blue-300 hover:underline"><b>github/</b></a></div>
          <div><span className="text-white">└ </span><a href="https://cataas.com/cat" className="text-blue-300 hover:underline"><b>Test 3</b></a></div>
        </div>
      ];

    } else if (command === "siteinfo" || command === "si") {
      return [
        <div className="ml-2">
          <div><span className="text-white"><b>About The Website</b></span></div>
          <div><span className="text-white">I used this site as an excuse to learn about <a href="https://astro.build/" className="text-blue-300 hover:underline"><b>Astro</b></a>, and used <a href="https://react.dev/" className="text-blue-300 hover:underline"><b>React</b></a> components to update the terminal as you enter new commands. It is currently being hosted on github for free!</span></div>
        </div>
      ]
    } else if (command === '') {
      return null;

    } else {
      return [
        <div className="text-white">
          <div>Command not found: <b>{cmd}</b></div>
          <div>Type "help" for a list of available commands</div>
        </div>
      ];
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.trim()) {
      const newLines = [...output];
      

      newLines.push({ type: 'command', text: input });
      

      const outputFinal = processCommand(input);
      

      if (outputFinal) {
        outputFinal.forEach((line, idx) => {
          newLines.push({ 
            type: 'output', 
            content: line,
            id: `${Date.now()}-${idx}`
          });
        });
      }
      
      setOutput(newLines);
      setInput("");
    }

    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const Prompt = () => (
    <b>
      <span className="text-green-400">user@Muchtek-Site</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-white">$ </span>
    </b>
  );


  return (

    <div className="p-2">
      <span className="text-gray-300 italic">Unsure of what to do? Type 'help' for a list of commands.</span>
      
      {
        output.map((line, index) => (
          <div key={line.id || index}>
            {line.type === 'command' && (
              <>
                <Prompt />
                <span className="text-white">{line.text}</span>
              </>
            )}
            {line.type === 'output' && (
              <div>{line.content}</div>
            )}
          </div>
        ))
      }

      <form onSubmit={handleSubmit}>
        <b>
          <span className="text-green-400">user@Muchtek-Site</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$ </span>
        </b>
        <input
          ref={inputRef}
          type="text" 
          id="terminalInput"
          placeholder="" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          className="focus:outline-none focus:ring-0 text-white"
          />
      </form>
    </div>
  );
}

export default TerminalText;


// return fetch("https://dog.ceo/api/breeds/image/random")
//         .then(response => response.json())
//         .then(data => {
//           return [
//             <div>
//               <img src={data.message} />
//             </div>
//           ];
//         })
//         .catch(error => {
//           return [
//             <span className="text-red-400">Could not fetch dog :(</span>
//           ];
//         });