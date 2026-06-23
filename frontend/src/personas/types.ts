/** Capability catalog entry bundled with every persona export */
export interface PersonaCapabilityCatalogItem {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  order: number;
}

export interface PersonaCapability {
  id: string;
  personaId: string;
  capabilityId: string;
  whatItDoes: string;
  copyLine: string | null;
  capability: {
    id: string;
    name: string;
    description: string | null;
  };
  evidence: unknown[];
  productSupport: unknown[];
}

export interface PersonaUseCase {
  id: string;
  personaId: string;
  title: string;
  relevantRole: string | null;
  whatMondayDoes: string;
  outcome: string | null;
  copyLine: string | null;
  mediaType: string | null;
  mediaUrl: string | null;
  figmaUrl: string | null;
  challenge: string | null;
  challengeLabel: string | null;
  order: number;
  evidence: unknown[];
}

export interface PersonaProofPoint {
  id: string;
  personaId: string;
  type: string;
  proof: string;
  sourceAndLink: string | null;
  quote: string | null;
  quotedBy: string | null;
  quotedCompany: string | null;
  order: number;
}

export interface PersonaPainPoint {
  id: string;
  personaId: string;
  pain: string;
  context: string | null;
  copyLine: string | null;
  order: number;
  evidence: unknown[];
}

export interface PersonaValuePoint {
  id: string;
  personaId: string;
  value: string;
  context: string | null;
  copyLine: string | null;
  order: number;
  evidence: unknown[];
  productSupport: unknown[];
}

export interface PersonaRole {
  id: string;
  personaId: string;
  name: string;
  bucket: string | null;
  whoTheyAre: string | null;
  whatTheyCareAbout: string | null;
  painOverride: string | null;
  valueOverride: string | null;
}

export interface PersonaExampleAgent {
  id: string;
  personaId: string;
  name: string;
  whatItDoes: string;
  order: number;
  triggerExample: string | null;
  imageUrl: string | null;
  figmaUrl: string | null;
  learnMoreUrl: string | null;
}

export interface PersonaExampleVibe {
  id: string;
  personaId: string;
  name: string;
  whatItDoes: string;
  imageUrl: string | null;
  figmaUrl: string | null;
  order: number;
}

export interface PersonaGlossaryItem {
  id: string;
  personaId: string;
  theirTerm: string;
  avoid: boolean;
  order: number;
  whatItMeans: string | null;
}

export interface PersonaWorkCycleStage {
  id: string;
  workCycleId: string;
  stageName: string;
  howMondaySupports: string;
  order: number;
}

export interface PersonaWorkCycle {
  id: string;
  personaId: string;
  cycleName: string;
  order: number;
  stages: PersonaWorkCycleStage[];
}

export interface PersonaRecord {
  id: string;
  name: string;
  description: string | null;
  overarchingPromise: string | null;
  personaOverview: string | null;
  departmentIcp: string | null;
  painFramingLine: string | null;
  painOneLiner: string | null;
  valueFramingLine: string | null;
  valueOneLiner: string | null;
  status: string;
  parentPersonaId: string | null;
  createdAt: string;
  updatedAt: string;
  capabilities: PersonaCapability[];
  useCases: PersonaUseCase[];
  objections: unknown[];
  proofPoints: PersonaProofPoint[];
  painPoints: PersonaPainPoint[];
  valuePoints: PersonaValuePoint[];
  roles: PersonaRole[];
  workCycles: PersonaWorkCycle[];
  exampleAgents: PersonaExampleAgent[];
  exampleVibes: PersonaExampleVibe[];
  glossaryItems: PersonaGlossaryItem[];
  sectionGuidance: Array<{
    id: string;
    personaId: string;
    sectionKey: string;
    guidance: string;
    title: string | null;
  }>;
  [key: string]: unknown;
}

/** Full export shape: one JSON file per persona */
export interface PersonaExport {
  persona: PersonaRecord;
  guidanceMap: {
    capabilities?: {
      id: string;
      title: string | null;
      guidance: string;
    };
    [key: string]: unknown;
  };
  allCapabilities: PersonaCapabilityCatalogItem[];
}

export interface PersonaSummary {
  slug: string;
  fileName: string;
  id: string;
  name: string;
  departmentIcp: string;
  status: string;
  updatedAt: string;
  counts: {
    useCases: number;
    painPoints: number;
    valuePoints: number;
    proofPoints: number;
    capabilities: number;
    roles: number;
    exampleAgents: number;
    exampleVibes: number;
    glossaryItems: number;
  };
}

export interface PersonaSectionDef {
  id: string;
  title: string;
  description: string;
  getItems: (exportData: PersonaExport) => unknown[];
  getLabel: (item: unknown) => string;
}
