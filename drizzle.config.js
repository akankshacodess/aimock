import fs from "fs";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./utils/schema.js",
  // driver: "pglite",
  dbCredentials: {
    url: "postgresql://aimock_owner:bs7DUe4tRJFY@ep-weathered-surf-a1aatojs.ap-southeast-1.aws.neon.tech/aimock?sslmode=require",
  },
  ssl: {
    ca: fs.readFileSync("./path/to/ca-certificate.pem").toString(),
  },
});
