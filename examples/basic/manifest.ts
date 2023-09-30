import pino from "pino";
import { ERC20_ABI } from "./erc20";
import { onTransfer } from "./transfer";
import { schema } from "./schema";
import { Manifest } from "../../arkiver/src";

const manifest = new Manifest(schema).chain("mainnet", (chain) => {
  chain
    .setOptions({
      rpcUrls: ["https://rpc.ankr.com/eth", "https://eth.llamarpc.com"],
      blockRange: 100n,
    })
    .contract({
      name: "ERC20",
      abi: ERC20_ABI,
      sources: { "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": 18230000n },
      eventHandlers: { Transfer: onTransfer },
    });
});

export default { manifest: manifest.manifest, schema };
