import { existsSync, mkdir, readFileSync, writeFileSync } from "fs";
import path from "path";
function writeDataInFile(pathLike, data) {
    var paths = pathLike.split("/");
    var bufferPath = [];
    paths.forEach(function (p) {
        bufferPath.push(p);
        var doesFileExists = existsSync(path.join.apply(path, bufferPath));
        if (!doesFileExists) {
            var isFileRegex = /^(.*).\./g;
            if (!isFileRegex.test(p)) {
                mkdir(path.join.apply(path, bufferPath), function (err) {
                    if (err)
                        console.error(err);
                });
            }
        }
    });
    writeFileSync(path.join.apply(path, bufferPath), JSON.stringify(data, null, 2), {
        encoding: "utf-8",
    });
}
function readDataFromFile(pathLike) {
    var paths = pathLike.split("/");
    var doesFileExists = existsSync(path.join.apply(path, paths));
    if (!doesFileExists)
        writeDataInFile(pathLike, {});
    var data = readFileSync(path.join.apply(path, paths), { encoding: "utf-8" });
    return JSON.parse(data);
}
var JsonDatabase = /** @class */ (function () {
    function JsonDatabase(name) {
        this.name = name;
        this.filePath = "database/".concat(name, ".json");
    }
    JsonDatabase.prototype.get = function (key) {
        return readDataFromFile(this.filePath)[key];
    };
    JsonDatabase.prototype.getAll = function () {
        return readDataFromFile(this.filePath);
    };
    JsonDatabase.prototype.set = function (key, value) {
        var data = readDataFromFile(this.filePath);
        data[key] = value;
        writeDataInFile(this.filePath, data);
    };
    JsonDatabase.prototype.setAll = function (data) {
        writeDataInFile(this.filePath, data);
    };
    JsonDatabase.prototype.remove = function (key) {
        var data = readDataFromFile(this.filePath);
        delete data[key];
        writeDataInFile(this.filePath, data);
    };
    JsonDatabase.prototype.removeAll = function () {
        writeDataInFile(this.filePath, {});
    };
    return JsonDatabase;
}());
export { JsonDatabase };
