import fs from "fs";
import path from "path";

export function getAllJSFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllJSFiles(full));
    } else if (full.endsWith(".js")) {
      results.push(full);
    }
  });
  return results;
}
