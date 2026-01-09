// --- ICONS LIBRARY (SVG STRINGS) ---
const ICONS = {
    basic: '<path d="M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4A2,2 0 0,0 20,2M20,20H4V4H20V20M8.5,11L6.5,13L7.91,14.41L11.83,10.5L7.91,6.59L6.5,8L8.5,10H6V11H8.5M12,13H17V14H12V13Z" />',
    files: '<path d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" />',
    system: '<path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />',
    network: '<path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" />',
    batch: '<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12V14H16V12H8M8,16V18H13V16H8Z" />',
    repair: '<path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.3C23.1,19.9 23.1,19.3 22.7,19Z" />',
    users: '<path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />',
    disk: '<path d="M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12,16A6,6 0 0,0 18,10C18,6.69 15.31,4 12,4M12,14A4,4 0 0,1 8,10A4,4 0 0,1 12,6A4,4 0 0,1 16,10A4,4 0 0,1 12,14M16,20H8V18H16V20Z" />',
    copy: '<path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />',
    warning: '<path d="M13,14H11V9H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />',
    info: '<path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />',
};

// --- DATA SOURCE ---
// Initializes as empty, will be populated by fetch()
let cmdData = []; 

// --- DOM ELEMENTS ---
const contentArea = document.getElementById('contentArea');
const navLinks = document.getElementById('navLinks');
const searchInput = document.getElementById('searchInput');
const backToTopBtn = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.querySelector(".icon-sun");
const moonIcon = document.querySelector(".icon-moon");

// --- HELPER FUNCTIONS ---
function getIcon(name) {
    return `<svg class="category-icon" viewBox="0 0 24 24">${ICONS[name] || ICONS.basic}</svg>`;
}

function highlightSyntax(text) {
    return escapeHtml(text)
        .replace(/(\s)([\/-][a-zA-Z0-9?:]+)/g, '$1<span class="syn-flag">$2</span>')
        .replace(/(%[\w]+%|%%[\w]+)/g, '<span class="syn-var">$1</span>')
        .replace(/([a-zA-Z]:\\[\w\\]+)/g, '<span class="syn-path">$1</span>');
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// --- RENDER FUNCTIONS ---
function renderNav() {
    navLinks.innerHTML = cmdData.map(cat => 
        `<li id="nav-item-${cat.id}">
            <a href="#${cat.id}">
                <svg class="nav-icon" viewBox="0 0 24 24">${ICONS[cat.icon]}</svg>
                ${cat.category}
            </a>
        </li>`
    ).join('');
}

function createCommandCard(cmd) {
    let badgesHtml = '';
    if (cmd.adminRequired) badgesHtml += `<span class="badge badge-admin"><svg style="width:10px;height:10px;fill:currentColor" viewBox="0 0 24 24">${ICONS.repair}</svg> Admin</span>`;
    if (cmd.dangerLevel === 'high') badgesHtml += `<span class="badge badge-danger"><svg style="width:10px;height:10px;fill:currentColor" viewBox="0 0 24 24">${ICONS.warning}</svg> Destructive</span>`;
    else if (cmd.dangerLevel === 'moderate') badgesHtml += `<span class="badge badge-danger"><svg style="width:10px;height:10px;fill:currentColor" viewBox="0 0 24 24">${ICONS.warning}</svg> Warning</span>`;

    let notesHtml = cmd.notes ? `<div class="cmd-notes"><svg class="info-icon" viewBox="0 0 24 24">${ICONS.info}</svg><div><strong>Note:</strong> ${cmd.notes}</div></div>` : '';

    let relatedHtml = '';
    if (cmd.related && cmd.related.length > 0) {
        const links = cmd.related.map(r => `<button class="related-btn" onclick="triggerSearch('${r}')">${r}</button>`).join('');
        relatedHtml = `<div class="related-cmds">See also: ${links}</div>`;
    }

    // Progressive Disclosure (Blur)
    let exampleClass = 'code-container';
    let overlayHtml = '';
    if (cmd.dangerLevel === 'high') {
        exampleClass += ' blurred-code';
        overlayHtml = `<button class="blurred-btn" aria-label="Reveal hidden code" onclick="this.parentElement.classList.add('revealed')"><span><svg style="width:16px;height:16px;fill:white" viewBox="0 0 24 24">${ICONS.warning}</svg> Click to reveal</span></button>`;
    }

    // Visual Preview Logic
    let previewHtml = '';
    if (cmd.preview) {
        previewHtml = `
            <button class="preview-toggle" onclick="togglePreview(this)">
                <svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19M5,19V5H19V19H5Z" /></svg>
                Show Output
            </button>
            <div class="terminal-window">
                <div class="term-header"><span class="term-dot" style="background:#ff5f56"></span><span class="term-dot" style="background:#ffbd2e"></span><span class="term-dot" style="background:#27c93f"></span> Command Prompt</div>
                <pre style="padding:0;color:#ccc">${escapeHtml(cmd.preview)}</pre>
            </div>
        `;
    }

    return `
        <div class="command-card">
            <div class="cmd-header">
                <span class="cmd-name">${cmd.name}</span>
                <div class="badge-container">${badgesHtml}</div>
            </div>
            <p class="cmd-desc">${cmd.desc}</p>
            ${notesHtml}
            
            <div class="code-container">
                <span class="code-label">Syntax</span>
                <button class="copy-btn" aria-label="Copy syntax" data-copy="${escapeHtml(cmd.syntax)}"><svg viewBox="0 0 24 24">${ICONS.copy}</svg> Copy</button>
                <pre><code>${highlightSyntax(cmd.syntax)}</code></pre>
            </div>

            <div class="${exampleClass}">
                ${overlayHtml}
                <span class="code-label">Example</span>
                <button class="copy-btn" aria-label="Copy example" data-copy="${escapeHtml(cmd.example)}"><svg viewBox="0 0 24 24">${ICONS.copy}</svg> Copy</button>
                <pre><code><span class="highlight">C:\\></span> ${highlightSyntax(cmd.example)}</code></pre>
            </div>
            ${previewHtml}
            ${relatedHtml}
        </div>
    `;
}

function togglePreview(btn) {
    const term = btn.nextElementSibling;
    if (term.classList.contains('show')) {
        term.classList.remove('show');
        btn.innerHTML = `<svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19M5,19V5H19V19H5Z" /></svg> Show Output`;
    } else {
        term.classList.add('show');
        btn.innerHTML = `Hide Output`;
    }
}

function renderContent(filterText = '') {
    contentArea.innerHTML = '';
    const lowerFilter = filterText.toLowerCase();
    const visibleCategoryIds = new Set();

    cmdData.forEach(cat => {
        const filteredCommands = cat.commands.filter(cmd => 
            cmd.name.toLowerCase().includes(lowerFilter) || 
            cmd.desc.toLowerCase().includes(lowerFilter) ||
            (cmd.notes && cmd.notes.toLowerCase().includes(lowerFilter))
        );

        if (filteredCommands.length > 0) {
            visibleCategoryIds.add(cat.id);
            const section = document.createElement('section');
            section.className = 'category-section';
            section.id = cat.id;
            
            let commandsHtml = filteredCommands.map(cmd => createCommandCard(cmd)).join('');

            section.innerHTML = `
                <div class="category-header">
                    ${getIcon(cat.icon)}
                    <h2 class="category-title">${cat.category}</h2>
                </div>
                ${commandsHtml}
            `;
            contentArea.appendChild(section);
        }
    });

    if (contentArea.innerHTML === '') {
        contentArea.innerHTML = `<p style="text-align:center; color:#888; margin-top:3rem;">No commands found matching "${filterText}"</p>`;
    }

    updateNavState(visibleCategoryIds);
    attachCopyListeners();
}

function updateNavState(visibleIds) {
    cmdData.forEach(cat => {
        const navItem = document.getElementById(`nav-item-${cat.id}`);
        if (navItem) {
            if (visibleIds.has(cat.id)) {
                navItem.classList.remove('nav-disabled');
            } else {
                navItem.classList.add('nav-disabled');
            }
        }
    });
}

function triggerSearch(term) {
    searchInput.value = term;
    updateUrlState(term);
    renderContent(term);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUrlState(term) {
    if(term) {
        history.replaceState(null, null, '#search=' + encodeURIComponent(term));
    } else {
        history.replaceState(null, null, window.location.pathname);
    }
}

function checkUrlState() {
    if(window.location.hash.includes('search=')) {
        try {
            const term = decodeURIComponent(window.location.hash.split('search=')[1]);
            searchInput.value = term;
            renderContent(term);
        } catch(e) {}
    }
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function attachCopyListeners() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const text = btn.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(text);
                const originalHtml = btn.innerHTML;
                btn.innerHTML = "Copied!";
                btn.classList.add('copy-success');
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('copy-success');
                }, 2000);
            } catch (err) {
                btn.innerText = "Error";
            }
        };
    });
}

// --- THEME TOGGLE LOGIC ---
function toggleTheme() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    
    if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
}

// --- INIT (Fetch Data First) ---
fetch('data.json')
    .then(response => {
        if (!response.ok) throw new Error("HTTP error " + response.status);
        return response.json();
    })
    .then(data => {
        cmdData = data; // Assign data to variable
        renderNav();
        renderContent();
        checkUrlState();
    })
    .catch(error => {
        console.error('Error loading commands:', error);
        contentArea.innerHTML = `<p style="text-align:center; color:var(--badge-danger-text);">Error loading command data. Please ensure data.json is present.</p>`;
    });

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);

searchInput.addEventListener('input', debounce((e) => {
    const val = e.target.value;
    updateUrlState(val);
    renderContent(val);
}, 150));

document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        updateUrlState('');
        renderContent(); 
    }
});

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});