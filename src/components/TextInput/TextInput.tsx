export const TextInput = (props) => {
  const { placeholder, value, onInput } = props;
  return (
    <input
      style={{ padding: '10px', margin: '0.3rem', borderRadius: '8px' }}
      value={value}
      type="text"
      placeholder={placeholder}
      onInput={onInput}
    />
  );
};
