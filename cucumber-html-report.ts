const report = require("multiple-cucumber-html-reporter");
const fs = require("fs");

const jsonDir = "reports/json/";
const jsonFiles = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));

jsonFiles.forEach(file => {
    console.log("Checking file:", file);
    if (file.toLowerCase().includes("android") || file.toLowerCase().includes("andriod")) {
      const jsonPath = `${jsonDir}${file}`;
      console.log("Processing android file:", jsonPath);
      if (fs.existsSync(jsonPath)) {
        const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        let updated = false;
        if (Array.isArray(data)) {
          data.forEach(feature => {
            feature.metadata = {
              browser: { name: "NA", version: "NA" },
              device: "Google Pixel 9",
              platform: { name: "Android", version: "16" }
            };
            updated = true;
          });
        }
        if (updated) {
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
          console.log("Patched metadata for:", jsonPath);
        } else {
          console.log("No update needed for:", jsonPath);
        }
      } else {
        console.log("File does not exist:", jsonPath);
      }
    }
});

report.generate({
  jsonDir: "reports/json/",
  reportPath: "reports/html/",
  metadata: {
    browser: {
      name: "Edge",
      version: "140",
    },
    device: "Windows 11 PC",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Hackathon Test Automation Results" },
      { label: "Report Generation Time", value: new Date().toLocaleString() },
    ],
  },
});
