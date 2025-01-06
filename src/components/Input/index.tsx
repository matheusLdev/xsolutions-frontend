import { InputText } from 'primereact/inputtext';
import './styles.css';

interface InputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string | number) => void;
  type?: string;
}

export default function Input({
  id,
  label,
  value,
  placeholder,
  onChange,
  type = 'text',
}: InputProps) {
  return (
    <div className="p-field container" >
      <label htmlFor={id} style={{ marginBottom: '0.5rem' }}>
        {label}
      </label>
      <InputText
        id={id}
        type={type}
        value={value.toString()}
        placeholder={placeholder}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );
}
