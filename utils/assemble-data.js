const fs = require("fs").promises;
const dir = "./datas/";

const read = async () => {
  try {
    const files = await fs.readdir(dir);
    const filesContent = await Promise.all(
      files.map((filename) => fs.readFile(dir + filename, "utf-8"))
    );

    return filesContent.reduce((acc, fileContent, i) => {
      const content = JSON.parse(fileContent);

      acc[files[i].replace(".json", "")] = content;
      return acc;
    }, {});
  } catch (error) {
    return {};
  }
};

exports.read = read;
