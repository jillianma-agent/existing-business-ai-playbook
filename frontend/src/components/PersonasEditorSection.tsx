import PersonaRegistryList from "./PersonaRegistryList";

export default function PersonasEditorSection() {
  return (
    <div className="editor-personas">
      <p className="editor-intro">
        Persona JSON files in <code>frontend/personas/</code>. Add a new file and restart dev
        to load it.
      </p>
      <PersonaRegistryList showPathHint />
    </div>
  );
}
