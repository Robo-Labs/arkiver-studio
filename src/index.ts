import pino from "pino";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { Arkiver, PgDrizzleProvider } from '../arkiver/src/index.ts'


const path = '/Users/mac/robo/arkiver-studio/examples/basic/manifest.ts'
const arkive = await import(path)
const { manifest, schema } = arkive.default


const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  level: "debug",
});

const client = postgres("postgres://postgres:postgres@localhost:5432/postgres");

const db = drizzle(client, { schema });

const dbProvider = new PgDrizzleProvider({ db, logger });

const arkiver = new Arkiver({
  dbProvider,
  manifest,
  context: { db },
  logger,
  record: {
    deployment: {
      id: 1,
      stage: "local",
    },
    id: 1,
  },
});

arkiver.start();


