"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.run = void 0;
const core_1 = require("@actions/core");
const util_1 = require("util");
const input_1 = __importDefault(require("./input"));
const run = async () => {
    const inputs = new input_1.default().inputs;
    core_1.info(`Inputs: ${util_1.inspect(inputs)}`);
    core_1.debug(new Date().toTimeString());
    await exports.execute(10);
    core_1.debug(new Date().toTimeString());
    core_1.setOutput('time', new Date().toTimeString());
};
exports.run = run;
const execute = (milliseconds) => {
    return new Promise((resolve) => setTimeout(() => resolve(), milliseconds));
};
exports.execute = execute;
exports.run()
    .then(() => { })
    .catch((error) => {
    core_1.setFailed(error.message);
});
