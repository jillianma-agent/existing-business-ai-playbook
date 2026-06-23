import type { PilotPathId } from "../content/migrationPaths";
import type { DemoWalkthrough } from "./demoRecommendations";
import type { MessagingBrief } from "./messagingRecommendations";
import type { WhyNowBrief } from "./whyNowBrief";

import type { ParsedVibeAccount } from "./vibeWebhook";

export type ReadinessLevel = "high" | "medium" | "not_yet";
export type SignalSource = "salesforce" | "snowflake" | "gong" | "manual";

export interface Signal {
  id: string;
  label: string;
  source: SignalSource;
  strength: "high" | "medium" | "low";
}

export interface AccountContact {
  name: string;
  role: string;
  source: SignalSource;
}

export interface AccountUsage {
  seats: number;
  activeUsers30d: number;
  boards: number;
  automations: number;
  aiFeaturesUsed: string[];
  topBoardByVolume?: string;
  avgCycleTimeHours?: number;
}

export interface GongInsights {
  recentThemes: string[];
  competitorMentions: string[];
  lastCallSummary?: string;
}

export interface AccountSignals {
  accountId: string;
  accountName: string;
  segment: "SMB" | "Mid-market" | "Enterprise";
  industry: string;
  products: string[];
  renewalDate?: string;
  nextCallDate?: string;

  readiness: ReadinessLevel;
  readinessScore: number;
  readinessReasons: string[];

  signals: Signal[];
  pains: string[];
  sponsors: AccountContact[];
  champions: AccountContact[];
  usage: AccountUsage;
  gong: GongInsights;

  /** Pre-filled pilot fields from signals */
  pilotDraft: {
    workflow?: string;
    sponsor?: string;
    champion?: string;
    baselineMetric?: string;
    targetMetric?: string;
    aiCapability?: string;
  };

  /** Raw BigBrain / Snowflake payload when loaded via webhook */
  vibe?: ParsedVibeAccount;
  dataSources?: ("snowflake" | "salesforce" | "gong")[];
}

export interface PlaybookRecommendations {
  reasons: Record<string, string[]>;
  talkTrackId: string;
  demoScenarioId: string;
  pilotPathId: PilotPathId;
  proofStoryIds: string[];
  discoveryQuestionIds: string[];
  objectionIds: string[];
  featureLadderTier: number;
  demoUseCaseIds: string[];
  demoWalkthrough: DemoWalkthrough;
  messagingBrief: MessagingBrief;
  whyNowBrief: WhyNowBrief;
}

export interface PersonalizedPlaybook {
  account: AccountSignals;
  recommendations: PlaybookRecommendations;
}
