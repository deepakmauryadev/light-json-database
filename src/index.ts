import { existsSync, mkdir, readFileSync, writeFileSync } from "fs";
import path from "path";

function writeDataInFile(pathLike: string, data: any) {
  const paths = pathLike.split("/");
  const bufferPath: string[] = [];

  paths.forEach((p) => {
    bufferPath.push(p);
    const doesFileExists = existsSync(path.join(...bufferPath));
    if (!doesFileExists) {
      const isFileRegex = /^(.*).\./g;
      if (!isFileRegex.test(p)) {
        mkdir(path.join(...bufferPath), (err) => {
          if (err) console.error(err);
        });
      }
    }
  });
  writeFileSync(path.join(...bufferPath), JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });
}

function readDataFromFile(pathLike: string) {
  const paths = pathLike.split("/");
  const doesFileExists = existsSync(path.join(...paths));
  if (!doesFileExists) writeDataInFile(pathLike, {});
  const data = readFileSync(path.join(...paths), { encoding: "utf-8" });
  return JSON.parse(data);
}

export class JsonDatabase {
  private name: string;
  private filePath: string;

  constructor(name: string) {
    this.name = name;
    this.filePath = `database/${name}.json`;
  }

  public get<T>(key: string) {
    return readDataFromFile(this.filePath)[key] as T;
  }

  public getAll<T>() {
    return readDataFromFile(this.filePath) as T;
  }

  public set(key: string, value: any) {
    const data = readDataFromFile(this.filePath);
    data[key] = value;
    writeDataInFile(this.filePath, data);
  }

  public setAll(data: any) {
    writeDataInFile(this.filePath, data);
  }

  public remove(key: string) {
    const data = readDataFromFile(this.filePath);
    delete data[key];
    writeDataInFile(this.filePath, data);
  }

  public removeAll() {
    writeDataInFile(this.filePath, {});
  }
}
