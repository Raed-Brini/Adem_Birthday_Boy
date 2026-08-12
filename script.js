const terminalBody = document.getElementById('terminal-body');
const inputRow = document.getElementById('input-row');
const userInput = document.getElementById('user-input');

const FRIEND_NAME = "Engineer";

const HELP_TEXT = `Available Commands:
• <span class="accent">help / menu</span>: Display this menu
• <span class="accent">cake</span>: Render ASCII Birthday Cake & Banner
• <span class="accent">wish</span>: Read your birthday message
• <span class="accent">party</span>: Trigger confetti protocol
• <span class="accent">stats</span>: View current MIT life metrics
• <span class="accent">clear</span>: Clear terminal window`;

const COMMANDS = {
'help': HELP_TEXT,
'menu': HELP_TEXT,

      'cake': `                                 (
                    (
            )                    )             (
                    )           (o)    )
            (      (o)    )     ,|,            )
           (o)     ,|,          |~\\    (      (o)
           ,|,     |~\\    (     \\ |   (o)     ,|,
           \\~|     \\ |   (o)    |\`\\   ,|,     |~\\
           |\`\\     |\`\\@@@,|,@@@@\\ |@@@\\~|     \\ |
           \\ | o@@@\\ |@@@\\~|@@@@|\`\\@@@|\`\\@@@o |\`\\
          o|\`\\@@@@@|\`\\@@@|\`\\@@@@\\ |@@@\\ |@@@@@\\ |o
        o@@\\ |@@@@@\\ |@@@\\ |@@@@@@@@@@|\`\\@@@@@|\`\\@@o
       @@@@|\`\\@@@@@@@@@@@|\`\\@@@@@@@@@@\\ |@@@@@\\ |@@@@
       p@@@@@@@@@@@@@@@@@\\ |@@@@@@@@@@|\`\\@@@@@@@@@@@q
       @@o@@@@@@@@@@@@@@@|\`\\@@@@@@@@@@@@@@@@@@@@@@o@@
       @:@@@o@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@o@@::@
       ::@@::@@o@@@@@@@@@@@@@@@@@@@@@@@@@@@@o@@:@@::@
       ::@@::@@@@::oo@@@@oo@@@@@ooo@@@@@:::@@@::::::
       %::::::@::::::@@@@:::@@@:::::@@@@:::::@@:::::%
       %%::::::::::::@@::::::@:::::::@@::::::::::::%%
       ::%%%::::::::::@::::::::::::::@::::::::::%%%::
     .#::%::%%%%%%:::::::::::::::::::::::::%%%%%::%::#.
   .###::::::%%:::%:%%%%%%%%%%%%%%%%%%%%%:%:::%%:::::###.
 .#####::::::%:::::%%::::::%%%%:::::%%::::%::::::::::#####.
.######\`:::::::::::%:::::::%:::::::::%::::%:::::::::'######.
.#########\`\`::::::::::::::::::::::::::::::::::::''#########.
\`.#############\`\`\`::::::::::::::::::::::::'''#############.'
 \`.######################################################.'
   \`.##################################################.'
      \`.#############################################.'
         \`.########################################.'
            \`.##################################.' 


-----------------------------------------------------------


   ,-.
   | |
   | "--.  ,--.-.,-.--. ,-.--. ,-. ,-.
   | ,-. \\/ ,-. || ,-. \\| ,-. \\| | | |
   | | | |\\ \`-' || \`-' /| \`-' /| \`-' |
   \`-' \`-' \`--'-'| .--' | .--'  \`--. |
                 | |    | |        | |
                 \`-'    \`-'        \`-'
,-.     _       ,-.  ,-.        ,-.
| |    (_)      | |_ | |        | |
| "--. ,-.,-.--.|  _)| "--.  ,--" | ,--.-.,-. ,-.
| ,-. \\| || ,-./| |  | ,-. \\/ ,-. |/ ,-. || | | |
| \`-' /| || |   | |  | | | |\\ \`-' |\\ \`-' || \`-' |
"-'--' \`-'\`-'   \`-'  \`-' \`-' \`--'-' \`--'-' \`--. |
                                              | | 
                                              \`-'
                  _                
         /\\      | |               
        /  \\   __| | ___ _ __ ___  
       / /\\ \\ / _' |/ _ \\ '_ ' _ \\ 
      / ____ \\ (_| |  __/ | | | | |
     /_/    \\_\\__,_|\\___|_| |_| |_|
                               
                               
                            
                                                                         
------------------------------------------------`,

      'wish': `Happy Birthday, ${FRIEND_NAME}! 🎉
Hope you survive next year's P-sets and get some actual sleep.
Keep crushing it! 🚀`,

      'stats': `[ADEM] - [SYSTEM TELEMETRY]
-----------------------------
Department:      Course 6-3 (CS & Engineering)
Class Year:      Class of 2028
Coffee Level:    98%
Sleep Deficit:   344 hrs
Intellect:       Over 9000
Age:             21 [Level Unlocked! 🥂] -obviously joking-
Current Status:  Older & Smarter #surviving`,

      'party': 'CELEBRATION PROTOCOL LAUNCHED! 🥳'
    };

document.addEventListener('click', () => userInput.focus());

userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
    const command = this.value.trim().toLowerCase();
    this.value = '';

    if (!command) return;

    createLine(`<span class="prompt-symbol">adem@mit-node:~$</span> ${command}`);

    if (command === 'clear') {
        const lines = terminalBody.querySelectorAll('.line, .ascii-art-wrapper');
        lines.forEach(line => line.remove());
    } else if (command === 'party') {
        createLine(COMMANDS['party']);
        triggerConfetti();
    } else if (command === 'cake') {
        createAsciiArt(COMMANDS['cake']);
        triggerConfetti();
    } else if (COMMANDS[command]) {
        createLine(COMMANDS[command]);
    } else {
        createLine(`command not found: ${command}. Type <span class="accent">'help'</span> for a list of commands.`);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

function createLine(htmlContent) {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = htmlContent;
    terminalBody.insertBefore(line, inputRow);
}

// Auto-scales ASCII art for narrow screen sizes
function createAsciiArt(artString) {
    const wrapper = document.createElement('div');
    wrapper.className = 'ascii-art-wrapper';
    
    const pre = document.createElement('pre');
    pre.className = 'ascii-art';
    pre.textContent = artString;
    
    wrapper.appendChild(pre);
    terminalBody.insertBefore(wrapper, inputRow);

    requestAnimationFrame(() => {
    const containerWidth = terminalBody.clientWidth - 30;
    const artWidth = pre.scrollWidth;
    if (artWidth > containerWidth) {
        const scale = containerWidth / artWidth;
        pre.style.transform = `scale(${scale})`;
        wrapper.style.height = `${pre.offsetHeight * scale}px`;
    }
    });
}

function triggerConfetti() {
    if (typeof confetti === 'function') {
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
    });
    }
}

console.log(
"%c [MIT COURSE 6-3 DETECTED] %c \n\nHey Adem! I know you're inspecting the source code. 👁️\nStop debugging and go celebrate turning 21! 🍻",
"background: #39ff14; color: #000; font-size: 16px; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
"color: #58a6ff; font-size: 14px; font-weight: normal;"
);