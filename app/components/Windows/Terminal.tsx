"use client";
import { launchpadApps } from '@/constants';
import { useState, useRef, useEffect } from 'react';
import { getUptimeOutput } from '@/util';
import { useKeyboardShortcut } from '@/util/Hooks/useShortcut';
import useAppWindows from '@/store/useAppWindows';

interface Line {
  command: string;
  output?: string;
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const { removeWindow } = useAppWindows();

  // Handle Arrow Up key for command history navigation
  useKeyboardShortcut({
    shortcuts: [
      {
        key: 'ArrowUp',
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        isSpecialKey: true,
      },
    ],
    onTrigger: () => {
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setCurrent(commandHistory[commandHistory.length - 1 - newIndex]);
    },
  });

  // Handle Arrow Down key for command history navigation
  useKeyboardShortcut({
    shortcuts: [
      {
        key: 'ArrowDown',
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        isSpecialKey: true,
      },
    ],
    onTrigger: () => {
      if (historyIndex <= 0) {
        setCurrent('');
        setHistoryIndex(-1);
        return;
      }
      
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      
      if (newIndex === 0) {
        setCurrent('');
      } else {
        setCurrent(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = current.trim();
      if (command) {
        const fakeOutput = getOutputForCommand(command);
        setCommandHistory(prev => [...prev, command]);
        setLines(prev => [...prev, { command, output: fakeOutput }]);
        setCurrent('');
        setHistoryIndex(-1); // Reset history index after command execution
      }
    }
  };  

  const getOutputForCommand = (cmd: string): string | undefined => {
    cmd = cmd.toLocaleLowerCase();
    if (cmd === 'whoami') return 'Favour Tochukwu Ajokobi';
    if (cmd === 'date') return new Date().toString();
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    if (cmd === 'say hi') return '👋 Hello from Terminal!';
    if (cmd === 'pwd') return '/Users/favour';
    if (cmd === 'ls') return (
        launchpadApps.map((app) => app.title).join('    ')
    );
    if (cmd === 'cd ..') return ''; // assume directory change, no output
    if (cmd.startsWith('cd ') && launchpadApps.find((app) => app.title.toLocaleLowerCase() === cmd.split('cd ')[1].toLocaleLowerCase())) {
      const app = launchpadApps.find((app) => app.title.toLocaleLowerCase() === cmd.split('cd ')[1].toLocaleLowerCase());
      window.open(app?.url || '', '_blank', 'noopener,noreferrer');
      return `Opening ${app?.title}...`;
    }; // no output for default home
    if (cmd === 'echo hclello') return 'Hello';
    if (cmd === 'who') return 'Favour Tochukwu Ajokobi  console  May  5 10:00';
    if (cmd === 'uptime') return getUptimeOutput();
    if (cmd === 'top') return 'PID    COMMAND      %CPU TIME\n1012   node         5.1  00:10:12\n1001   Google Chrome  3.2  00:04:32';
    if (cmd === 'ps') return 'PID TTY           TIME CMD\n1012 ttys000    0:00.10 bash\n1003 ttys001    0:00.45 node';
    if (cmd === 'ifconfig') return 'en0: inet 127.0.0.1 netmask 0xffffff00 broadcast 127.0.0.1';
    if (cmd === 'hostname') return 'MacBook-Pro.local';
    if (cmd === 'uname') return 'Fabiconcept';
    if (cmd === 'uname -a') return 'Fabiconcept MacBook-Pro.local 23.4.0 Fabiconcept Kernel Version 23.4.0: ... x86_64';
    if (cmd === 'df -h') return 'Fisystem      Size   Used  Avail Capacity Mounted on\n/dev/disk1s5   500Gi  250Gi  250Gi    50%   /';
    if (cmd === 'du -sh *') return '20M Documents\n50M Downloads\n10M Projects';
    if (cmd === 'history') return commandHistory.join('\n');
    if (cmd === 'env') return 'ssshhhh!!!';
    if (cmd === 'man ls') return 'LS(1) User Commands LS(1)\n\nNAME\n       ls - list directory contents\n\nSYNOPSIS\n       ls [OPTION]... [FILE]...';
    if (cmd === 'touch test.txt') return 'Sorry you do not have permission to create a file'; // simulate file creation
    if (cmd === 'mkdir test') return 'Sorry you do not have permission to create a directory'; // simulate directory creation
    if (cmd === 'rm test.txt') return 'Sorry you do not have permission to delete a file'; // simulate file deletion
    
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    if (cmd === 'exit') {
        removeWindow('icon-4');
        setTimeout(() => {
            return 'logout\n[Process completed]';
        }, 1000);
    };
    if (cmd === 'say i love macos') return '🗣️ I love macOS';
  
    return `zsh: command not found: ${cmd}`;
  };
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, terminalRef]);

  useEffect(() => {
    if (!terminalRef.current || !inputRef.current) return;

    terminalRef.current.addEventListener("click", () => {
      inputRef.current?.focus();
    });
    
    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener("click", () => {
          inputRef.current?.focus();
        });
      }
    };
  }, [terminalRef, inputRef]);

  return (
    <div ref={terminalRef} className="flex-1 font-mono text-white text-sm rounded-lg p-2 overflow-y-auto">
      {lines.map((line, idx) => (
        <div key={idx} className="mb-1">
          <span className="text-green-400 select-none">macbook@Fabiconcepts-Machine ~ %</span> {line.command}
          {line.output && (
            <div className="text-gray-300 whitespace-pre-wrap">{line.output}</div>
          )}
        </div>
      ))}

      {/* Current prompt */}
      <div className="flex items-center">
        <span className="text-green-400">macbook@Fabiconcepts-Machine ~ %</span>
        <input
          autoFocus
          type="text"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none ml-2 flex-1 text-white placeholder-gray-500"
          placeholder=""
          ref={inputRef}
        />
      </div>
    </div>
  );
}