/** Sample documents behind the "Load sample" button on each tool. */

export const SAMPLE_DOCUMENT = `{
  "service": "checkout-api",
  "version": "2.4.1",
  "region": "eu-west-1",
  "healthy": true,
  "replicas": 3,
  "lastDeploy": "2026-07-28T09:14:22Z",
  "limits": { "cpu": "500m", "memory": "512Mi", "timeoutSeconds": 30 },
  "features": { "applePay": true, "giftCards": false, "splitPayment": null },
  "endpoints": [
    { "id": "ep-1", "path": "/v2/checkout", "method": "POST", "p99Ms": 184, "public": true },
    { "id": "ep-2", "path": "/v2/checkout/{id}", "method": "GET", "p99Ms": 46, "public": true },
    { "id": "ep-3", "path": "/internal/metrics", "method": "GET", "p99Ms": 12, "public": false }
  ],
  "owners": ["payments-team", "sre"]
}`;

export const SAMPLE_MINIFIED =
  '{"service":"checkout-api","version":"2.4.1","healthy":true,"replicas":3,"limits":{"cpu":"500m","memory":"512Mi"},"owners":["payments-team","sre"]}';

/** Deliberately broken: a trailing comma and a single-quoted string. */
export const SAMPLE_BROKEN = `{
  "service": "checkout-api",
  "version": '2.4.1',
  "replicas": 3,
  "owners": ["payments-team", "sre"],
}`;

export const SAMPLE_DIFF_LEFT = `{
  "service": "checkout-api",
  "version": "2.4.0",
  "healthy": true,
  "replicas": 3,
  "limits": { "cpu": "500m", "memory": "512Mi" },
  "features": { "applePay": true, "giftCards": false },
  "endpoints": [
    { "id": "ep-1", "path": "/v2/checkout", "p99Ms": 184 },
    { "id": "ep-2", "path": "/v2/checkout/{id}", "p99Ms": 46 }
  ],
  "owners": ["payments-team", "sre"]
}`;

export const SAMPLE_DIFF_RIGHT = `{
  "healthy": true,
  "service": "checkout-api",
  "version": "2.4.1",
  "replicas": 5,
  "limits": { "cpu": "1000m", "memory": "512Mi" },
  "features": { "applePay": true, "giftCards": false, "splitPayment": true },
  "endpoints": [
    { "id": "ep-2", "path": "/v2/checkout/{id}", "p99Ms": 46 },
    { "id": "ep-1", "path": "/v2/checkout", "p99Ms": 211 },
    { "id": "ep-3", "path": "/internal/metrics", "p99Ms": 12 }
  ],
  "owners": ["payments-team"]
}`;

export const SAMPLE_SCHEMA = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["service", "version", "replicas"],
  "additionalProperties": true,
  "properties": {
    "service": { "type": "string", "minLength": 1 },
    "version": { "type": "string", "pattern": "^\\\\d+\\\\.\\\\d+\\\\.\\\\d+$" },
    "healthy": { "type": "boolean" },
    "replicas": { "type": "integer", "minimum": 1, "maximum": 10 },
    "lastDeploy": { "type": "string", "format": "date-time" },
    "owners": {
      "type": "array",
      "minItems": 1,
      "items": { "type": "string" }
    },
    "endpoints": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "path", "method"],
        "properties": {
          "id": { "type": "string" },
          "path": { "type": "string" },
          "method": { "enum": ["GET", "POST", "PUT", "PATCH", "DELETE"] },
          "p99Ms": { "type": "number", "minimum": 0 }
        }
      }
    }
  }
}`;
