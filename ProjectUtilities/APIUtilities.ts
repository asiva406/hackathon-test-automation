/// <reference types="cypress" />

import {BearerToken,BasicAuth} from "../secrets.json"
import { expect } from 'chai';
// importing AJV npm package for JSON Schema Validation 
const Ajv = require('ajv')
const avj = new Ajv()

export default class OrbitalAPIUtilities {

  getOAuthToken(){
    return cy.request({
      url: BearerToken.TOKEN_URL,
      form: true,
      body: {
        grant_type: 'client_credentials', 
        client_id: BearerToken.CLIENT_ID,
        client_secret: BearerToken.CLIENT_SECRET,
        scope: BearerToken.SCOPE,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const token = response.body.access_token;
     
      return new Promise(resolve => {
          resolve(token);
      });
    });
  }
  

  get_api_request(url: any) {
  
    return this.getOAuthToken().then((newaccessToken) => {
      return cy.request({
        method: 'GET',
        url: url,
        form: true,
        headers: {
          'Authorization': `Bearer ${newaccessToken}`,
          'Content-Type': 'application/json'
        },
      })
    })
  }

  po_get_api_request(url: any) {
    return this.getOAuthToken().then((newaccessToken) => {
      return cy.request({
        method: 'GET',
        url: url,
        form: true,
        headers: {
          'Authorization': `Bearer ${newaccessToken}`,
          'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        },
      })
    })
  }


  put_api_request(url: any, payload: any) {
    cy.log("put url is: " + url)
    return this.getOAuthToken().then((newaccessToken) => {
      return cy.request({
        method: 'PUT',
        url: url,
        body: payload,
        headers: {
          'Authorization': `Bearer ${newaccessToken}`,
          'Content-Type': 'application/json',
        },
      })
    })
  }

  post_api_request(url: any, payload: any) {
    cy.log("post url is: " + url)
    return this.getOAuthToken().then((newaccessToken) => {
      return cy.request({
        method: 'POST',
        url: url,
        body: payload,
        headers: {
          'Authorization': `Bearer ${newaccessToken}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        return response;
      });
    });
  }

  delete_api_request(url: any, payload: any) {
    return this.getOAuthToken().then((newaccessToken) => {
      return cy.request({
        method: 'DELETE',
        url: url,
        body: payload,
        headers: {
          'Authorization': `Bearer ${newaccessToken}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        return response;
      });
    });
  }

  get_api_schema_validation(response: any, schema: any) {
    cy.fixture(schema).then((apiSchema) => {
      const validate = avj.compile(apiSchema);
      const isValid = validate(response);

      // Log validation errors and details
      const validationErrors = validate.errors;
      console.log(typeof (validate.errors))
      console.log(JSON.stringify(validate.errors))
      cy.log("type of error: " + typeof (validate.errors))
      cy.log("validate error: " + JSON.stringify(validate.errors))

      if (validationErrors) {
        console.log('Validation Errors:');
        validationErrors.forEach((error: { dataPath: any; message: any; keyword: any; }, index: number) => {
          cy.log(`Error #${index + 1}`);
          cy.log('Data Path: ', error.dataPath);
          cy.log('Message: ', error.message);
          cy.log('Keyword: ', error.keyword);
          cy.log(`Error #${index + 1}`);
          cy.log('Data Path: ', error.dataPath);
          cy.log('Message: ', error.message);
          console.log('Keyword: ', error.keyword);
          console.log(`Error #${index + 1}`);
          console.log('Data Path: ', error.dataPath);
          console.log('Message: ', error.message);
          console.log('Keyword: ', error.keyword);
          console.log(`Error #${index + 1}`);
          console.log('Data Path: ', error.dataPath);
          console.log('Message: ', error.message);
          console.log('Keyword: ', error.keyword);
        });
      }
      // Expectation assertion
      expect(isValid, 'API response should be valid against the schema').to.be.true;
    });
  }
}