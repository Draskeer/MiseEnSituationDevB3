export const ClassSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option>1ère section maternelle</option>
      <option>2ème section maternelle</option>
      <option>3ème section maternelle</option>
      <option>CP</option>
      <option>CE1</option>
      <option>CE2</option>
      <option>CM1</option>
      <option>CM2</option>
    </select>
  );
};
