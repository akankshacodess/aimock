/** @type { import( "drizzle-kit" ).Config} */
export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://aimock_owner:bs7DUe4tRJFY@ep-weathered-surf-a1aatojs.ap-southeast-1.aws.neon.tech/aimock?sslmode=require",
  },
});
