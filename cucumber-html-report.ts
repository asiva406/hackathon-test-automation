
import report from "multiple-cucumber-html-reporter";

report.generate({
  jsonDir: "reports/json/",
  reportPath: "reports/html/",
  metadata: {
    browser: {
      name: "chrome",
      version: "136",
    },
    device: "Local test machine",
    platform: {
      name: "ubuntu",
      version: "16.04",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Orbital Test Automation" },
      { label: "Report Generation Time", value: new Date().toLocaleString() },
    ],
  },
});
