const Mustache = require("mustache");
const resume = require("./src/data/resume.json");
const fs = require("node:fs/promises");
const { glob } = require("glob");

async function compileMustache() {
    const indexPromise = fs.readFile("./src/views/index.mustache", { encoding: "utf-8" });
    const resumePrintPromise = fs.readFile("./src/views/resume-print.mustache", { encoding: "utf-8" });

    // get all mustache files
    const sectionsPromise = new Promise((resolve, reject) => {
        glob("./src/views/sections/**/*.mustache")
            .then((filenames) => {
                // after all filenames are gotten, read all of the files
                const sectionPromises = [];
                const sections = {};
                filenames.forEach((filename) => {
                    // get filename without path or .mustache extension
                    let startPos = "src/views/sections/".length;
                    let endPos = filename.length - ".mustache".length;
                    let fname = filename.substring(startPos, endPos);
                    // store promise to store file text in sections object
                    sectionPromises.push(fs.readFile(filename, { encoding: "utf-8" })
                        .then((fileText) => {
                            sections[fname] = fileText;
                        }));
                });

                // resolve outer promise with sections object once all of the files have been read
                Promise.all(sectionPromises).then(() => { resolve(sections) });
            });
    });

    Promise.all([indexPromise, resumePrintPromise, sectionsPromise])
        .then(([indexText, resumePrintText, sectionsText]) => {
            fs.writeFile("./public/index.html", Mustache.render(indexText, resume, sectionsText));
            fs.writeFile("./public/resumePrint.html", Mustache.render(resumePrintText, resume, sectionsText));
        });
}

compileMustache();