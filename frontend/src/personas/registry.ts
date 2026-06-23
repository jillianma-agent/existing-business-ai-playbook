import type { AccountSignals } from "../signals/types";
import type { PersonaExport, PersonaSectionDef, PersonaSummary } from "./types";

const personaFiles = import.meta.glob("../../personas/*.json", {
  eager: true,
  import: "default",
}) as Record<string, PersonaExport>;

function slugFromPath(path: string): string {
  const fileName = path.split("/").pop() ?? path;
  return fileName.replace(/\.json$/i, "");
}

const registry: PersonaExport[] = Object.entries(personaFiles).map(([path, data]) => {
  void path;
  return data;
});

const bySlug = new Map<string, PersonaExport>();
const byId = new Map<string, PersonaExport>();
const byName = new Map<string, PersonaExport>();

for (const [path, data] of Object.entries(personaFiles)) {
  const slug = slugFromPath(path);
  bySlug.set(slug, data);
  byId.set(data.persona.id, data);
  byName.set(data.persona.name.toLowerCase(), data);
}

export const PERSONA_SECTIONS: PersonaSectionDef[] = [
  {
    id: "overview",
    title: "Overview",
    description: "Department promise, overview, and framing lines",
    getItems: (e) => [
      {
        name: e.persona.name,
        departmentIcp: e.persona.departmentIcp,
        overarchingPromise: e.persona.overarchingPromise,
        personaOverview: e.persona.personaOverview,
        painFramingLine: e.persona.painFramingLine,
        valueFramingLine: e.persona.valueFramingLine,
        painOneLiner: e.persona.painOneLiner,
        valueOneLiner: e.persona.valueOneLiner,
      },
    ],
    getLabel: () => "Overview",
  },
  {
    id: "pain-points",
    title: "Pain points",
    description: "Department pains with context for discovery and talk tracks",
    getItems: (e) => e.persona.painPoints,
    getLabel: (item) => String((item as { pain?: string }).pain ?? "Pain"),
  },
  {
    id: "value-points",
    title: "Value points",
    description: "Outcome framing for messaging and exec conversations",
    getItems: (e) => e.persona.valuePoints,
    getLabel: (item) => String((item as { value?: string }).value ?? "Value"),
  },
  {
    id: "use-cases",
    title: "Use cases",
    description: "Workflow stories — maps to demo use cases and tee-up content",
    getItems: (e) => e.persona.useCases,
    getLabel: (item) => String((item as { title?: string }).title ?? "Use case"),
  },
  {
    id: "capabilities",
    title: "Capabilities",
    description: "Product capabilities with persona-specific copy",
    getItems: (e) => e.persona.capabilities,
    getLabel: (item) =>
      String(
        (item as { capability?: { name?: string } }).capability?.name ??
          (item as { whatItDoes?: string }).whatItDoes?.slice(0, 40) ??
          "Capability"
      ),
  },
  {
    id: "proof-points",
    title: "Proof points",
    description: "Customer proof and links for the Proof page",
    getItems: (e) => e.persona.proofPoints,
    getLabel: (item) => String((item as { proof?: string }).proof ?? "Proof"),
  },
  {
    id: "roles",
    title: "Roles",
    description: "Sub-roles within the department for talk track targeting",
    getItems: (e) => e.persona.roles,
    getLabel: (item) => String((item as { name?: string }).name ?? "Role"),
  },
  {
    id: "example-agents",
    title: "Example agents",
    description: "Agent templates to reference in demos",
    getItems: (e) => e.persona.exampleAgents,
    getLabel: (item) => String((item as { name?: string }).name ?? "Agent"),
  },
  {
    id: "example-vibes",
    title: "Example Vibe apps",
    description: "Vibe app examples for the department",
    getItems: (e) => e.persona.exampleVibes,
    getLabel: (item) => String((item as { name?: string }).name ?? "Vibe"),
  },
  {
    id: "work-cycles",
    title: "Work cycles",
    description: "How work runs and how monday supports each stage",
    getItems: (e) => e.persona.workCycles,
    getLabel: (item) => String((item as { cycleName?: string }).cycleName ?? "Cycle"),
  },
  {
    id: "glossary",
    title: "Glossary",
    description: "Department vocabulary — terms to use and avoid",
    getItems: (e) =>
      e.persona.glossaryItems.filter(
        (g) => g.theirTerm.trim() || (g.whatItMeans && g.whatItMeans.trim())
      ),
    getLabel: (item) =>
      String((item as { theirTerm?: string }).theirTerm || (item as { whatItMeans?: string }).whatItMeans || "Term"),
  },
  {
    id: "capability-catalog",
    title: "Capability catalog",
    description: "Full product capability list bundled with the export",
    getItems: (e) => e.allCapabilities,
    getLabel: (item) => String((item as { name?: string }).name ?? "Capability"),
  },
];

export function listPersonaFiles(): string[] {
  return Object.keys(personaFiles).map(slugFromPath);
}

export function listPersonas(): PersonaSummary[] {
  return Object.entries(personaFiles)
    .map(([path, data]) => {
      const slug = slugFromPath(path);
      const p = data.persona;
      return {
        slug,
        fileName: `${slug}.json`,
        id: p.id,
        name: p.name,
        departmentIcp: p.departmentIcp ?? p.name,
        status: p.status,
        updatedAt: p.updatedAt,
        counts: {
          useCases: p.useCases.length,
          painPoints: p.painPoints.length,
          valuePoints: p.valuePoints.length,
          proofPoints: p.proofPoints.length,
          capabilities: p.capabilities.length,
          roles: p.roles.length,
          exampleAgents: p.exampleAgents.length,
          exampleVibes: p.exampleVibes.length,
          glossaryItems: p.glossaryItems.length,
        },
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPersonaBySlug(slug: string): PersonaExport | null {
  return bySlug.get(slug) ?? null;
}

export function getPersonaById(id: string): PersonaExport | null {
  return byId.get(id) ?? null;
}

export function getPersonaByName(name: string): PersonaExport | null {
  return byName.get(name.toLowerCase()) ?? null;
}

/** Best-effort match from account industry / pains / board name */
export function matchPersonaForAccount(account: AccountSignals): PersonaSummary | null {
  const personas = listPersonas();
  if (personas.length === 0) return null;

  const haystack = [
    account.industry,
    account.accountName,
    ...account.pains,
    account.usage.topBoardByVolume ?? "",
    account.pilotDraft.workflow ?? "",
  ]
    .join(" ")
    .toLowerCase();

  let best: { persona: PersonaSummary; score: number } | null = null;

  for (const persona of personas) {
    let score = 0;
    const dept = persona.departmentIcp.toLowerCase();
    const name = persona.name.toLowerCase();

    if (haystack.includes(dept)) score += 10;
    if (haystack.includes(name)) score += 8;
    if (dept === "marketing" && /marketing|creative|campaign|brand|content/.test(haystack)) {
      score += 6;
    }

    if (!best || score > best.score) {
      best = { persona, score };
    }
  }

  return best && best.score > 0 ? best.persona : null;
}

export function getAllPersonaExports(): PersonaExport[] {
  return registry;
}
