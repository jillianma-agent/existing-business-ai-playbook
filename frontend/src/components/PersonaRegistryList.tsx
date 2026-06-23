import { listPersonas } from "../personas/registry";
import type { PersonaSummary } from "../personas/types";
import "./PersonaRegistryList.css";

function formatVersion(updatedAt: string) {
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return updatedAt;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function PersonaRow({ persona }: { persona: PersonaSummary }) {
  return (
    <tr>
      <td>
        <code className="persona-file-name">{persona.fileName}</code>
      </td>
      <td className="persona-version">{formatVersion(persona.updatedAt)}</td>
      <td>
        <span className={`persona-status persona-status--${persona.status}`}>
          {persona.status}
        </span>
      </td>
    </tr>
  );
}

interface PersonaRegistryListProps {
  showPathHint?: boolean;
}

export default function PersonaRegistryList({ showPathHint = false }: PersonaRegistryListProps) {
  const personas = listPersonas();

  if (personas.length === 0) {
    return (
      <p className="persona-registry-empty">
        No persona files loaded. Add <code>*.json</code> exports to{" "}
        <code>frontend/personas/</code> and restart the dev server.
      </p>
    );
  }

  return (
    <div className="persona-registry">
      {showPathHint && (
        <p className="persona-registry-hint">
          Loaded from <code>frontend/personas/</code>
        </p>
      )}
      <table className="persona-registry-table">
        <thead>
          <tr>
            <th>File</th>
            <th>Version</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <PersonaRow key={persona.slug} persona={persona} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
