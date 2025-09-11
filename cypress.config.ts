import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { runSql } from './ProjectUtilities/runSql';
import {createFolder,moveFile,checkfilestatus, deleteFile,createFile,checkFileStatusWithTimeout} from './ProjectUtilities/fileUtilities';

export default defineConfig({
  video: true,
  videosFolder: './reports/video/',
  e2e: {
    baseUrl: 'https://twitter.com/login',
    specPattern: 'cypress/e2e/**/**/*.feature',
    excludeSpecPattern: '*.ts',
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 120000,
    responseTimeout: 240000,
    taskTimeout: 480000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    numTestsKeptInMemory: 5,  
    chromeWebSecurity: false,
    retries: 0,

    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      
      // Register the all required task
      on('task', { runSql });
      on('task', { createFolder })
      on('task', { moveFile })
      on('task', { deleteFile })
      on('task', { createFile })
      on('task', { checkfilestatus })
      on('task', { checkFileStatusWithTimeout })      
      allureWriter(on, config);
      return config;
    },
  },
});
