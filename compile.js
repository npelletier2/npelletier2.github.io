const Mustache = require("mustache");
const resume = require("./src/data/resume.json");
const fs = require("node:fs/promises");
const { glob } = require("glob");

async function compileMustache(destFile) {
    const indexPromise = fs.readFile("./src/views/index.mustache", { encoding: "utf-8" });
    const resumePrintPromise = fs.readFile("./src/views/resume-print.mustache", { encoding: "utf-8" });

    // get all files matching glob
    const sectionsPromise = new Promise((resolve, reject) => {
        glob("./src/views/sections/**/*.mustache")
            .then((filenames) => {
                const sectionPromises = [];
                const sections = {};
                filenames.forEach((filename) => {
                    let startPos = "src/views/sections/".length;
                    let endPos = filename.length - ".mustache".length;
                    let fname = filename.substring(startPos, endPos);
                    sectionPromises.push(fs.readFile(filename, { encoding: "utf-8" })
                        .then((fileText) => {
                            sections[fname] = fileText;
                        }));
                });

                Promise.all(sectionPromises).then(() => { resolve(sections) });
            });
    });

    Promise.all([indexPromise, resumePrintPromise, sectionsPromise])
        .then(([indexText, resumePrintText, sectionsText]) => {
            fs.writeFile(destFile, Mustache.render(indexText, resume, sectionsText));
        });
}



compileMustache("./public/index.html");