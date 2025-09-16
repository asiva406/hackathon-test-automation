import * as secrets from "../secrets.json";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

// Utility function to create OAuth 1.0a instance
async function getOauth1({url, method}:{url: string, method: string}): Promise<any> {
  const oauth = new OAuth({
    consumer: {
      key: secrets.oauth1.consumer_key,
      secret: secrets.oauth1.consumer_secret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string: string, key: string) {
      return crypto.createHmac('sha1',key).update(base_string).digest('base64');
    },
  });
  
  const token = {
    key: secrets.oauth1.access_token,
    secret: secrets.oauth1.access_token_secret,
  };

  const request_data = { url, method };
  return oauth.toHeader(oauth.authorize(request_data, token));
}

export { getOauth1 };

