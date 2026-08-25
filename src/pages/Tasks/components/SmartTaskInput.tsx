import { SmartDraftForm } from '../../../components/smart/SmartDraftForm';

// Version carte inline de la saisie intelligente (page Tâches).
// Toute la logique vit dans SmartDraftForm, partagé avec la modale globale.
export function SmartTaskInput() {
  return (
    <div className="card card-padded">
      <SmartDraftForm />
    </div>
  );
}
