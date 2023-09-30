import { arkiveMetadata, buildSchema, chainMetadata, childSource, createTable } from "../../arkiver/src";


export const _balance = createTable("balance", {
  id: "string",
  address: "string",
  token: "string",
  amount: "number",
});

export const schema = buildSchema([
  _balance,
  arkiveMetadata,
  chainMetadata,
  childSource,
]);

export const { arkive_metadata, balance, chain_metadata, child_source } = schema;
