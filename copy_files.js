const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    const elements = fs.readdirSync(from);
    for (const element of elements) {
        if (element === 'node_modules' || element === '.next') continue;
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        const stat = fs.lstatSync(fromPath);
        if (stat.isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else if (stat.isDirectory()) {
            copyFolderSync(fromPath, toPath);
        }
    }
}

try {
    copyFolderSync('C:\\Users\\Abhin\\saudi_tech_nextjs', 'C:\\Users\\Abhin\\OneDrive\\Documents\\zerodot\\saudi_tech_website');
    console.log('Copy successful!');
} catch (e) {
    console.error('Error copying:', e);
}
