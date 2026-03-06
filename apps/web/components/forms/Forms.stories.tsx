import { useState } from 'react';
import { Label } from './Label';
import { Input } from './Input';
import { Select } from './Select';
import { ErrorMessage } from './ErrorMessage';
import { FormGroup } from './FormGroup';

export default {
  title: 'Forms/Components',
};

export const Inputs = () => (
  <div className="space-y-4">
    <Input placeholder="Default input" />
    <Input placeholder="Disabled input" disabled />
    <Input variant="error" placeholder="Error input" />
    <Input variant="success" placeholder="Success input" />
  </div>
);

export const InputSizes = () => (
  <div className="space-y-4">
    <Input size="sm" placeholder="Small input" />
    <Input size="md" placeholder="Medium input" />
    <Input size="lg" placeholder="Large input" />
  </div>
);

export const Labels = () => (
  <div className="space-y-4">
    <Label>Normal label</Label>
    <Label required>Required label</Label>
  </div>
);

export const Selects = () => (
  <div className="space-y-4">
    <Select
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
    />
    <Select
      error
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
    />
    <Select
      disabled
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
    />
  </div>
);

export const ErrorMessages = () => (
  <div className="space-y-4">
    <ErrorMessage>Dies ist eine Fehlermeldung</ErrorMessage>
    <ErrorMessage icon={false}>Fehlertext ohne Icon</ErrorMessage>
  </div>
);

export const FormGroups = () => (
  <div className="space-y-6">
    <FormGroup label="Email" required>
      <Input type="email" placeholder="your@email.com" />
    </FormGroup>

    <FormGroup label="Password" required error="Passwort ist zu kurz">
      <Input variant="error" type="password" placeholder="Passwort" />
    </FormGroup>

    <FormGroup
      label="Objekt"
      required
      helperText="Wähle das Objekt aus, das bearbeitet werden soll"
    >
      <Select
        options={[
          { value: 'obj1', label: 'Objekt 1' },
          { value: 'obj2', label: 'Objekt 2' },
          { value: 'obj3', label: 'Objekt 3' },
        ]}
      />
    </FormGroup>

    <FormGroup label="Name" required>
      <Input placeholder="Dein Name" />
    </FormGroup>
  </div>
);

export const CompleteForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    propertyType: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email ist erforderlich';
    if (!formData.password) newErrors.password = 'Passwort ist erforderlich';
    if (!formData.propertyType) newErrors.propertyType = 'Objekttyp ist erforderlich';
    if (!formData.address) newErrors.address = 'Adresse ist erforderlich';

    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <FormGroup label="Email" required error={errors.email}>
        <Input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          variant={errors.email ? 'error' : 'default'}
        />
      </FormGroup>

      <FormGroup label="Passwort" required error={errors.password}>
        <Input
          type="password"
          name="password"
          placeholder="Passwort"
          value={formData.password}
          onChange={handleChange}
          variant={errors.password ? 'error' : 'default'}
        />
      </FormGroup>

      <FormGroup label="Objekttyp" required error={errors.propertyType}>
        <Select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          error={!!errors.propertyType}
          options={[
            { value: '', label: '-- Wähle Objekttyp --' },
            { value: 'wohnung', label: 'Wohnung' },
            { value: 'haus', label: 'Haus' },
            { value: 'gewerblich', label: 'Gewerblich' },
          ]}
        />
      </FormGroup>

      <FormGroup label="Adresse" required error={errors.address}>
        <Input
          name="address"
          placeholder="Straße und Hausnummer"
          value={formData.address}
          onChange={handleChange}
          variant={errors.address ? 'error' : 'default'}
        />
      </FormGroup>

      <button
        type="submit"
        className="w-full px-4 py-2.5 bg-primary-500 text-slate-950 font-semibold rounded-lg hover:bg-primary-600 transition-colors"
      >
        Absenden
      </button>
    </form>
  );
};