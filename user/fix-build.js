const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'build', 'server', 'assets');
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const serverBuildFile = files.find(f => f.startsWith('server-build-') && f.endsWith('.js'));
  if (serverBuildFile) {
    const filePath = path.join(assetsDir, serverBuildFile);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/build\\\\client/g, 'build/client');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('==========================================');
    console.log('✅ Fixed build paths for Linux/Production!');
    console.log('==========================================');
  } else {
    console.log('⚠️ Could not find server-build file in build/server/assets/');
  }
} else {
  console.log('⚠️ build/server/assets directory not found');
}
