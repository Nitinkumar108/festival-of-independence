const sequelize = require("../config/db");

/**
 * Ensures the 'clusters' table and 'colleges.clusterId' / 'colleges.isPending' columns
 * exist directly in PostgreSQL / SQLite without depending entirely on Sequelize sync(alter).
 */
async function migrateClusterSchema() {
  try {
    const dialect = sequelize.getDialect();

    if (dialect === "postgres") {
      // 1. Create clusters table if not exists
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS "clusters" (
          "id" UUID PRIMARY KEY,
          "code" VARCHAR(255) NOT NULL UNIQUE,
          "facilitatorName" VARCHAR(255),
          "accessToken" VARCHAR(64) UNIQUE,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // 2. Ensure columns exist on colleges table
      await sequelize.query(`
        ALTER TABLE "colleges" 
        ADD COLUMN IF NOT EXISTS "clusterId" UUID;
      `);

      await sequelize.query(`
        ALTER TABLE "colleges" 
        ADD COLUMN IF NOT EXISTS "isPending" BOOLEAN DEFAULT FALSE;
      `);

      console.log("✅ Database schema migration verified: clusters and colleges columns ready.");
    } else if (dialect === "sqlite") {
      const [collegesInfo] = await sequelize.query(`PRAGMA table_info(colleges);`);
      const hasClusterId = collegesInfo.some((c) => c.name === "clusterId");
      const hasIsPending = collegesInfo.some((c) => c.name === "isPending");

      if (!hasClusterId) {
        await sequelize.query(`ALTER TABLE colleges ADD COLUMN clusterId TEXT;`);
      }
      if (!hasIsPending) {
        await sequelize.query(`ALTER TABLE colleges ADD COLUMN isPending INTEGER DEFAULT 0;`);
      }
      console.log("✅ SQLite schema migration verified.");
    }
  } catch (err) {
    console.error("⚠️ Schema migration check note:", err.message);
  }
}

module.exports = migrateClusterSchema;
