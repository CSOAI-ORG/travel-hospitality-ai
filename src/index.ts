/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/travel-hospitality-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleTravelAiCompliance } from "./tools/travel-ai-compliance.js";

const server = new McpServer({
  name: "csoai-travel-hospitality-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const TravelAiComplianceShape = {
  system_name: z.string().describe("Name of travel AI system"),
  ai_function: z.string().describe("Function (dynamic pricing, guest profiling, booking recommendation, border control, loyalty optimization)"),
  pricing_model: z.string().describe("Pricing model (dynamic, personalized, surge, opaque, bundled)"),
  data_collection: z.string().describe("Data collected (booking history, location, preferences, passport/ID, biometric)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU/PRA, US/DOT, UK/CAA, IATA, etc.)"),
};

// ─── Tool 1: travel_ai_compliance ───
(server.tool as any)(
  "travel_ai_compliance",
  "Assess compliance for AI in travel. Covers dynamic pricing, guest profiling, border AI, loyalty programs, and discrimination in booking.",
  TravelAiComplianceShape,
  async (args: any) => {
    const result = handleTravelAiCompliance(args.system_name, args.ai_function, args.pricing_model, args.data_collection, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
