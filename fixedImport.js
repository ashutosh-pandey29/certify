import fs from "fs";
import path from "path";

const folder = "./";

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) fixImports(fullPath);
    else if (file.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      content = content.replace(
        /from\s+["'](\..*?)(["'])/g,
        (match, p1, p2) => (p1.endsWith(".js") ? match : `from "${p1}.js"${p2}`)
      );
      fs.writeFileSync(fullPath, content, "utf-8");
    }
  }
}

fixImports(folder);
console.log("✅ All missing .js extensions fixed!");
