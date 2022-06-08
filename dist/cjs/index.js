"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDatabase = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
function writeDataInFile(pathLike, data) {
    var paths = pathLike.split("/");
    var bufferPath = [];
    paths.forEach(function (p) {
        bufferPath.push(p);
        var doesFileExists = (0, fs_1.existsSync)(path_1.default.join.apply(path_1.default, bufferPath));
        if (!doesFileExists) {
            var isFileRegex = /^(.*).\./g;
            if (!isFileRegex.test(p)) {
                (0, fs_1.mkdir)(path_1.default.join.apply(path_1.default, bufferPath), function (err) {
                    if (err)
                        console.error(err);
                });
            }
        }
    });
    (0, fs_1.writeFileSync)(path_1.default.join.apply(path_1.default, bufferPath), JSON.stringify(data, null, 2), {
        encoding: "utf-8",
    });
}
function readDataFromFile(pathLike) {
    var paths = pathLike.split("/");
    var doesFileExists = (0, fs_1.existsSync)(path_1.default.join.apply(path_1.default, paths));
    if (!doesFileExists)
        writeDataInFile(pathLike, {});
    var data = (0, fs_1.readFileSync)(path_1.default.join.apply(path_1.default, paths), { encoding: "utf-8" });
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
exports.JsonDatabase = JsonDatabase;
