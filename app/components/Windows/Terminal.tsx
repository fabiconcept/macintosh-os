"use client";
import { launchpadApps } from '@/constants';
import { useState, useRef, useEffect } from 'react';
import { getUptimeOutput } from '@/util';
import { useKeyboardShortcut } from '@/util/Hooks/useShortcut';
import useAppWindows from '@/store/useAppWindows';
import clsx from 'clsx';
import useAppStore from '@/store';

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
  const { theme } = useAppStore();

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
    // Convert to lowercase for case-insensitive matching
    const normalizedCmd = cmd.trim().toLowerCase();
    const args = normalizedCmd.split(/\s+/);
    const baseCmd = args[0];

    // Command history and state management (would be defined elsewhere)
    // const commandHistory: string[] = [...]; // Reference to command history
    // const setLines = (lines: string[]) => {...}; // Function to update terminal lines

    // Basic system commands
    if (normalizedCmd === 'whoami') return 'Favour Tochukwu Ajokobi';
    if (normalizedCmd === 'date') return new Date().toString();
    if (normalizedCmd === 'pwd') return '/Users/favour';
    if (normalizedCmd === 'hostname') return 'MacBook-Pro.local';
    if (normalizedCmd === 'uname') return 'Fabiconcept';
    if (normalizedCmd === 'who') return `Favour Tochukwu Ajokobi  console  ${new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}`;

    // Different variations of uname
    if (normalizedCmd === 'uname -a') return 'Fabiconcept MacBook-Pro.local 23.4.0 Fabiconcept Kernel Version 23.4.0: ... x86_64';
    if (normalizedCmd === 'uname -s') return 'Fabiconcept';
    if (normalizedCmd === 'uname -n') return 'MacBook-Pro.local';
    if (normalizedCmd === 'uname -r') return '23.4.0';
    if (normalizedCmd === 'uname -m') return 'x86_64';

    // Terminal control commands
    if (normalizedCmd === 'clear') {
      setLines([]);
      return undefined;
    }
    if (normalizedCmd === 'exit' || normalizedCmd === 'logout') {
      setTimeout(() => {
        removeWindow('icon-4');
      }, 500);
      return 'logout\n[Process completed]';
    }

    // Directory and file operations
    if (normalizedCmd === 'ls' || normalizedCmd === 'dir') {
      return launchpadApps.map((app) => app.title).join('    ');
    }
    if (normalizedCmd === 'ls -l' || normalizedCmd === 'ls -la') {
      return launchpadApps.map((app, i) =>
        `drwxr-xr-x  2 favour  staff  ${i * 100 + 64}  May  7 09:${i * 10 % 60}  ${app.title}`
      ).join('\n');
    }
    if (normalizedCmd === 'cd ..' || normalizedCmd === 'cd..') return ''; // assume directory change, no output
    if (normalizedCmd === 'cd ~' || normalizedCmd === 'cd') return ''; // go to home directory

    // Dynamic cd command to open apps
    if (baseCmd === 'cd' && args.length > 1) {
      const targetApp = args.slice(1).join(' ');
      const app = launchpadApps.find(
        (app) => app.title.toLowerCase() === targetApp
      );

      if (app) {
        window.open(app.url || '', '_blank', 'noopener,noreferrer');
        return `Opening ${app.title}...`;
      }
      return `cd: no such directory: ${args.slice(1).join(' ')}`;
    }
    
    if (baseCmd === 'open' && args.length > 1) {
      const targetApp = args.slice(1).join(' ');
      const app = launchpadApps.find(
        (app) => app.title.toLowerCase() === targetApp
      );

      if (app) {
        window.open(app.url || '', '_blank', 'noopener,noreferrer');
        return `Opening ${app.title}...`;
      }
      return `open: no such file or directoryc: ${args.slice(1).join(' ')}`;
    }

    // File operations (simulated)
    if (normalizedCmd.startsWith('touch ')) return 'Sorry you do not have permission to create a file';
    if (normalizedCmd.startsWith('mkdir ')) return 'Sorry you do not have permission to create a directory';
    if (normalizedCmd.startsWith('rm ')) return 'Sorry you do not have permission to delete a file';
    if (normalizedCmd.startsWith('rmdir ')) return 'Sorry you do not have permission to delete a directory';

    // System information
    if (normalizedCmd === 'uptime') {
      return getUptimeOutput();
    }
    if (normalizedCmd === 'top') {
      return 'Processes: 342 total, 2 running, 340 sleeping, 1514 threads\n' +
        'Load Avg: 1.20, 1.30, 1.45  CPU usage: 3.50% user, 2.11% sys, 94.39% idle\n' +
        'SharedLibs: 269M resident, 46M data, 18M linkedit.\n' +
        'MemRegions: 59822 total, 1259M resident, 146M private, 456M shared.\n' +
        'PhysMem: 8043M used (1233M wired), 8M unused.\n' +
        'VM: 1993G vsize, 1442M framework vsize, 0(0) swapins, 0(0) swapouts.\n' +
        'Networks: packets: 10521/8M in, 8673/4M out.\n' +
        'Disks: 12387/339M read, 4735/105M written.\n\n' +
        'PID    COMMAND      %CPU TIME     #TH   #WQ  #PORT MEM    USER\n' +
        '1012   node         5.1  00:10:12 15    2    37    145M   favour\n' +
        '1001   Google Chrome 3.2 00:04:32 32    1    89    485M   favour\n' +
        '1045   Terminal     0.7  00:01:23 5     1    31    28M    favour\n' +
        '988    Finder       0.5  00:03:13 7     2    42    68M    favour';
    }
    if (normalizedCmd === 'ps') return 'PID TTY           TIME CMD\n1012 ttys000    0:00.10 bash\n1003 ttys001    0:00.45 node\n1045 ttys002    0:01.23 zsh';
    if (normalizedCmd === 'ps aux') {
      return 'USER       PID  %CPU %MEM      VSZ    RSS   TT  STAT STARTED      TIME COMMAND\n' +
        'favour    1012   5.1  1.8  4528236  297392   ??  S    09:00   0:10.12 node\n' +
        'favour    1001   3.2  5.9  5726344  983812   ??  S    08:45   0:04.32 Google Chrome\n' +
        'favour    1045   0.7  0.3  3156892   51284   ??  S    09:15   0:01.23 Terminal';
    }

    // Network commands
    if (normalizedCmd === 'ifconfig') return 'en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500\n\tinet 127.0.0.1 netmask 0xffffff00 broadcast 127.0.0.1\n\tether aa:bb:cc:dd:ee:ff';
    if (normalizedCmd === 'ping google.com') return 'PING google.com (142.250.190.78): 56 data bytes\n64 bytes from 142.250.190.78: icmp_seq=0 ttl=56 time=18.321 ms\n64 bytes from 142.250.190.78: icmp_seq=1 ttl=56 time=19.531 ms\n^C\n--- google.com ping statistics ---\n2 packets transmitted, 2 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 18.321/18.926/19.531/0.605 ms';
    if (normalizedCmd === 'traceroute google.com') return 'traceroute to google.com (142.250.190.78), 64 hops max, 52 byte packets\n 1  192.168.1.1 (192.168.1.1)  3.253 ms  2.115 ms  2.212 ms\n 2  10.0.0.1 (10.0.0.1)  11.791 ms  12.816 ms  12.209 ms\n 3  * * *\n 4  142.250.190.78 (142.250.190.78)  19.421 ms  20.543 ms  19.005 ms';

    // Storage commands
    if (normalizedCmd === 'df -h') return 'Filesystem      Size   Used  Avail Capacity  Mounted on\n/dev/disk1s5   500Gi  250Gi  250Gi    50%    /\n/dev/disk1s4   500Gi   5.0Gi  250Gi     2%    /System/Volumes/VM\n/dev/disk1s3   500Gi   1.2Gi  250Gi     1%    /System/Volumes/Preboot';
    if (normalizedCmd === 'du -sh *') return '20M  Documents\n50M  Downloads\n10M  Projects\n5M   Applications\n2M   Music\n15M  Pictures';

    // History and environment
    if (normalizedCmd === 'history') return commandHistory.join('\n');
    if (normalizedCmd === 'env' || normalizedCmd === 'printenv') {
      return 'TERM=xterm-256color\nSHELL=/bin/zsh\nUSER=favour\nPATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin\nPWD=/Users/favour\nHOME=/Users/favour\n';
    }

    // Manual pages
    if (normalizedCmd === 'man ls') return 'LS(1) User Commands LS(1)\n\nNAME\n       ls - list directory contents\n\nSYNOPSIS\n       ls [OPTION]... [FILE]...';

    // Fun commands
    if (normalizedCmd === 'say hi') return '👋 Hello from Terminal!';
    if (normalizedCmd.startsWith('say ')) {
      const message = cmd.substring(4).trim();
      return `🗣️ ${message}`;
    }
    if (normalizedCmd === 'echo hello') return 'Hello';
    if (normalizedCmd.startsWith('echo ')) {
      const message = cmd.substring(5).trim();
      return message;
    }
    if (normalizedCmd === 'fortune') return 'You will find happiness in unexpected places.';
    if (normalizedCmd === 'cowsay hello') {
      return ' _______\n< Hello >\n -------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||';
    }

    // Calendar and time
  if (normalizedCmd === 'cal' || normalizedCmd.startsWith('cal ')) {
    let targetDate: Date;
    
    if (normalizedCmd === 'cal') {
      // Use current month if no arguments
      targetDate = new Date();
    } else {
      // Parse month and year if provided (format: cal MM YYYY)
      const calArgs = normalizedCmd.split(/\s+/).slice(1);
      if (calArgs.length === 2) {
        const month = parseInt(calArgs[0]) - 1; // JavaScript months are 0-indexed
        const year = parseInt(calArgs[1]);
        targetDate = new Date(year, month, 1);
      } else if (calArgs.length === 1) {
        // If only one argument, assume it's the year
        const year = parseInt(calArgs[0]);
        targetDate = new Date(year, new Date().getMonth(), 1);
      } else {
        targetDate = new Date();
      }
    }
    
    // Get month properties
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const monthName = targetDate.toLocaleString('default', { month: 'long' });
    
    // Calculate days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Calculate first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Build the calendar header
    let calendarOutput = `     ${monthName} ${year}\n`;
    calendarOutput += `Su Mo Tu We Th Fr Sa\n`;
    
    // Add initial spaces for the first week
    let currentDay = 1;
    let weekLine = '';
    
    // Add leading spaces before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      weekLine += '    ';
    }
    
    // Generate calendar body
    while (currentDay <= daysInMonth) {
      // Calculate day position in the week (0-6)
      const dayPosition = (firstDayOfMonth + currentDay - 1) % 7;
      
      // Format day with proper spacing (single digit days need a leading space)
      weekLine += currentDay < 10 ? ` ${currentDay} ` : `${currentDay} `;
      
      // Move to next day
      currentDay++;
      
      // End of week or month, add line break
      if (dayPosition === 6 || currentDay > daysInMonth) {
        calendarOutput += weekLine.trimEnd() + '\n';
        weekLine = '';
      }
    }
    
    return calendarOutput.trimEnd();
  }

    // Version information for common tools
    if (normalizedCmd === 'git --version') return 'git version 2.39.2';
    if (normalizedCmd === 'node --version') return 'v20.5.0';
    if (normalizedCmd === 'npm --version') return '9.8.1';
    if (normalizedCmd === 'python --version' || normalizedCmd === 'python3 --version') return 'Python 3.11.4';

    // Advanced system utilities (simplified output)
    if (normalizedCmd === 'netstat -an') return 'Active Internet connections (including servers)\nProto Recv-Q Send-Q  Local Address          Foreign Address        (state)\ntcp4       0      0  127.0.0.1.54932       127.0.0.1.8080        ESTABLISHED';
    if (normalizedCmd === 'lsof') return 'COMMAND     PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nnode      1012 favour  cwd    DIR  1,4    6144    2 /Users/favour\nChrome    1001 favour  txt    REG  1,4  8392704    3 /Applications/Google Chrome.app';

    // Default response for unrecognized commands
    return `zsh: command not found: ${args[0]}`;
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
    <div ref={terminalRef} className="flex-1 font-mono text-sm rounded-lg p-2 overflow-y-auto">
      {lines.map((line, idx) => (
        <div key={idx} className="mb-1">
          <span className={clsx(
            "select-none",
            theme === "dark" ? "text-green-400" : "text-green-700"
          )}>macbook@Fabiconcepts-Machine ~ %</span> {line.command}
          {line.output && (
            <div className={clsx(
              "whitespace-pre-wrap",
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            )}>{line.output}</div>
          )}
        </div>
      ))}

      {/* Current prompt */}
      <div className="flex items-center">
        <span className={clsx(
            "select-none",
            theme === "dark" ? "text-green-400" : "text-green-700"
        )}>macbook@Fabiconcepts-Machine ~ %</span>
        <input
          autoFocus
          type="text"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          onKeyDown={handleKeyDown}
          className={clsx(
            "bg-transparent outline-none ml-2 flex-1 placeholder-gray-500",
            theme === "dark" ? "placeholder-gray-500 text-white" : "placeholder-gray-500 text-black"
          )}
          placeholder=""
          ref={inputRef}
        />
      </div>
    </div>
  );
}