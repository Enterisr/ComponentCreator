#!/usr/bin/env node
const fs = require("fs").promises;
const path = require("path");
const yargs = require("yargs/yargs")(process.argv.slice(2));
require("dotenv").config();
const colors = require("colors");
const argv = yargs
  .option("folder", {
    default: "./",
    alias: "D",
    alias: "F",
    describe:
      "The folder you want to create the component it- By default it will try to create in CWD",
  })
  .option("name", {
    alias: "n",
    describe: "component's name",
  })
  .option("template", { alias: "t", describe: "template" })
  .positional("name", { describe: "component's name" })
  .demandOption(["name"])
  .showHelpOnFail(true)
  .env("componentCreator")
  .help().argv;

async function copyFile({ templateFile, templateDir, newDirPath }) {
  const templateFilePath = path.join(templateDir, templateFile);
  const templateFileStat = await fs.lstat(templateFilePath);

  if (templateFileStat.isFile()) {
    const newFileName = templateFile
      .replace("__Comp__", argv.name)
      .replace(".template", "");
    const newLocation = path.join(newDirPath, newFileName);
    const fileContent = await fs.readFile(templateFilePath, "utf8");
    const newFileContent = fileContent.replaceAll("__Comp__", argv.name);
    await fs.writeFile(newLocation, newFileContent);
  }
}
async function copyTemplateFiles(templateName, destPath) {
  try {
    const newDirPath = path.join(destPath, argv.name);
    await fs.mkdir(newDirPath, { recursive: true });

    const templateDir = path.join(__dirname, "templates", templateName);
    const templateFiles = await fs.readdir(templateDir);
    templateFiles.forEach(
      async (templateFile) =>
        await copyFile({ templateFile, templateDir, newDirPath })
    );
  } catch (ex) {
    console.error(ex);
  }
}

(async function CreateComponent() {
  console.log("\n" + "chosen template: " + argv.template + "\n");

  const componentName = argv.name;
  const folderPath = argv.folder;
  try {
    const folderName = path.join(folderPath, componentName);
    console.log(`Creating ${componentName} in path: ${folderName} \n`);
    await copyTemplateFiles(argv.template, folderPath);
    console.log("component created successfully! \n".bold);
  } catch (ex) {
    console.error("cant create component: " + ex);
  }
})();
