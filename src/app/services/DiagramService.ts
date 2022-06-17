import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";

const outputPrefix = "tmp";

const rootDir = path.resolve(__dirname, "../../../");
const tmpDir = path.resolve(rootDir, "tmp");
const pyagramDir = path.join(rootDir, "pyagram");

export const genDiagram = async (filecontent: string) => {
  let pythonFile
  let outputFilename

  try {
    const name = parseName(filecontent);
    const format = parseFormat(filecontent);
    const filename = parseFilename(filecontent) || name || "diagram";
    const renderer = parseRenderer(filecontent);  

    const slugifiedFilename = `${slugify(filename, {
      remove: /[*+~.()'"!:@]/g,
      replacement: "_",
      lower: true,
    })}`;
  
    let args = `"${name}", show=False, filename="${slugifiedFilename}"`;
  
    const TB = parseTB(filecontent);
    if (TB) args += `, direction="${TB}"`;
  
    const content = filecontent.replace(
      /Diagram\((.*?)\)\:/g,
      `Diagram(${args}):`
    );
  
    const slugifiedPyFilename = `${slugifiedFilename}.py`;
  
    pythonFile = path.join(pyagramDir, slugifiedPyFilename);
    await fs.promises.writeFile(pythonFile, content);
  
    outputFilename = `${outputPrefix}/${slugifiedFilename}.${renderer ? renderer + "." : ""}${format}`;
    } catch(e) {
      console.error("error pre-processing", e)
      return Promise.reject(e)
  }

  return new Promise((resolve: (output: string) => void, reject) => {
    exec(
      `python3 ${pythonFile}`,
      {
        cwd: tmpDir,
      },
      (error, _, stderr) => {
        if (error) {
          console.error("error in command", error)
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error("stderror in command", stderr)
          reject(stderr);
          return;
        }
        console.log("successfully generated diagram",outputFilename)
        resolve(outputFilename);
      }
    );
  });
};

const parseFilename = (filecontent: string) => {
  const reg = /Diagram\(([\S\s]*)filename="(.*?)"/g;
  const matches = reg.exec(filecontent);

  return matches?.[2] || "";
};

const parseRenderer = (filecontent: string) => {
  const reg = /diagram\.dot\.renderer\s=\s"(.*?)"/g;
  const matches = reg.exec(filecontent);

  return matches?.[1] || "";
};

const parseFormat = (filecontent: string) => {
  const reg = /Diagram\(([\S\s]*)outformat="(.*?)"((.|\s)*?)\)/g;
  const matches = reg.exec(filecontent);

  return matches?.[2] || "png";
};

const parseName = (filecontent: string) => {
  const reg = /Diagram\((\sname=)?"(.*?)"/g;
  
  const matches = reg.exec(filecontent);

  return matches?.[2] || "";
};

const parseTB = (filecontent: string) => {
  const reg = /Diagram\(([\S\s]*)direction="(.*?)"/g;
  const matches = reg.exec(filecontent);

  return matches?.[2] || "LR";
};
