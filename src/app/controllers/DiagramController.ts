import { promises as fsPromises } from "fs";
import * as DiagramService from "../services/DiagramService";

export const create = async (req, res) => {
  try {
    const { filecontent } = req.body;
    const output = await DiagramService.genDiagram(filecontent);
    const file = await fsPromises.readFile(output);
    var fileExt = output.split('.').pop();

    res.writeHead(200, {
      "Content-Type": fileExt == "svg" ? "image/svg+xml" : "image/png",
      "Content-Length": file.length,
    });
    res.end(file);
  } catch (e) {
    console.error("error in diagram controller", e)
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    const msg = e && typeof e === "string" ? e?.split("line")?.[1] : "error";
    res.end(msg ? "line " + msg : "error");
  }
};
