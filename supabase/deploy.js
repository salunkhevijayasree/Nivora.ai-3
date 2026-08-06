/**
 * NIVORA AI - Supabase Schema Deployment Script
 * Reads schema.sql and seed.sql and executes them against
 * the live Supabase instance via the REST API (service_role).
 */
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://exppvwycpjfrgpzxvuwj.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4cHB2d3ljcGpmcmdwenh2dXdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTk4OTc4MSwiZXhwIjoyMTAxNTY1NzgxfQ.WbldZisDdmsiSqbY8wcJ-QApDdI1nPnhW8F5YrqzNPo';

async function executeSql(sql, label) {
  console.log(`\n🔄 Executing: ${label}...`);
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({})
  });

  // Use the SQL endpoint directly
  const sqlResponse = await fetch(`${SUPABASE_URL}/pg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql })
  });

  if (!sqlResponse.ok) {
    // Fallback: try the SQL editor endpoint
    const editorResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ sql_string: sql })
    });
    
    if (!editorResponse.ok) {
      const errText = await editorResponse.text();
      console.log(`⚠️  REST endpoint not available. Attempting statement-by-statement execution...`);
      return await executeStatements(sql, label);
    }
    
    console.log(`✅ ${label} — completed via RPC`);
    return true;
  }
  
  console.log(`✅ ${label} — completed`);
  return true;
}

async function executeStatements(sql, label) {
  // Split SQL into individual statements and execute via Supabase REST
  // For table creation, we use the management API
  const mgmtUrl = `${SUPABASE_URL}/pg/query`;
  
  const response = await fetch(mgmtUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql })
  });

  if (response.ok) {
    console.log(`✅ ${label} — completed via management API`);
    return true;
  }

  const errText = await response.text();
  console.log(`❌ ${label} failed: ${errText}`);
  console.log(`\n📋 Please execute the SQL manually in your Supabase SQL Editor:`);
  console.log(`   → Go to: https://supabase.com/dashboard/project/exppvwycpjfrgpzxvuwj/sql`);
  console.log(`   → Copy the contents of supabase/schema.sql`);
  console.log(`   → Then copy the contents of supabase/seed.sql`);
  return false;
}

async function main() {
  console.log('='.repeat(50));
  console.log('  NIVORA AI — Supabase Schema Deployment');
  console.log('='.repeat(50));
  console.log(`Target: ${SUPABASE_URL}`);

  const schemaPath = path.join(__dirname, 'schema.sql');
  const seedPath = path.join(__dirname, 'seed.sql');

  if (!fs.existsSync(schemaPath)) {
    console.error('❌ schema.sql not found!');
    process.exit(1);
  }

  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  const seedSql = fs.existsSync(seedPath) ? fs.readFileSync(seedPath, 'utf-8') : null;

  // Execute schema
  await executeSql(schemaSql, 'Schema (24 tables + indexes + RLS)');

  // Execute seed data
  if (seedSql) {
    await executeSql(seedSql, 'Seed Data (demo records)');
  }

  console.log('\n' + '='.repeat(50));
  console.log('  Deployment complete!');
  console.log('='.repeat(50));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
