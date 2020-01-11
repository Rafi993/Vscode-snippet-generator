const fs = require("fs").promises;
const path = require("path");

const { getLabelValue } = require("./utils.js");

const listFiles = async ({ folderName, isChild }) => {
  const children = await fs.readdir(folderName, { withFileTypes: true });
  const markDownFiles = children
    .filter(file => file.name.includes(".md"))
    .map(file => file.name);
  const folders = children.filter(
    child => !child.isFile() && child.name[0] !== "."
  );
  let snippet = {};

  for (const folder of folders) {
    listFiles({
      folderName: path.join(folderName, folder.name),
      isChild: true
    });
  }

  for (const fileName of markDownFiles) {
    const fileContent = (
      await fs.readFile(path.join(folderName, fileName), "utf8")
    ).split("\n");

    /*
      -----------------------------------------
      Name: Poorly named snippet
      Prefix: pns
      Description: This snippet does something
      -----------------------------------------
      This is the actual snippet body
    */

    const snippetName = getLabelValue(fileContent[1], "Name:");
    const prefix = getLabelValue(fileContent[2], "Prefix:");
    const body = fileContent.slice(5, fileContent.length - 1);
    const description = getLabelValue(fileContent[3], "Description:");

    snippet = {
      ...snippet,
      [snippetName]: {
        prefix,
        body,
        description
      }
    };
  }

  if (isChild && Object.keys(snippet).length !== 0) {
    console.log(`* ${folderName}.json`);
    await fs.writeFile(`${folderName}.json`, JSON.stringify(snippet, null, 2));
  }
};

console.log("Writing snippets to\n");
listFiles({ folderName: path.resolve(), isChild: false });
