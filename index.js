#!/usr/bin/env node
const fs = require("fs").promises;
const path = require("path");
const GeneratecomponentJS = require("./GeneratecomponentJS");
const componentName = process.argv[2];
let folderPath = process.argv[3] || "./";
(async function CreateComponent() {
  try {
    console.log("creating component!");
    const jsString = GeneratecomponentJS(componentName);
    const folderName = path.join(folderPath, componentName);
    console.log(`in path: ${folderName}`);
    const jsFile = path.join(folderName, componentName + ".js");
    const scssFile = path.join(folderName, componentName + ".scss");
    await fs.mkdir(folderName, { recursive: true });
    await fs.writeFile(jsFile, jsString);
    await fs.writeFile(scssFile, "");
    console.log("finished creating component...");
  } catch (ex) {
    console.error("cant create component: " + ex);
  }
})();
