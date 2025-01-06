import './styles.css';

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}

const Input = ({ id, label, placeholder, value, onChange, type = "text", error }: InputProps) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <small className="error-message">{error}</small>}
    </div>
  );
};

export default Input;
