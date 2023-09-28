import React from 'react'

const p = ({ children, className = '' }) => (
  <p className={`text-base text-gray-700 ${className}`}>
    {children}
  </p>
)

const h2 = ({ children }) => (
  <h2 className="mt-5 text-3xl font-bold text-center">
    {children}
  </h2>
)

const h3 = ({ children }) => (
  <h3 className="mt-5 text-3xl font-bold text-center">
    {children}
  </h3>
)

const table = ({ children }) => (
  <table className="min-w-full divide-y divide-gray-200">
    {children}
  </table>
)

const tbody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
)

const input = ({
  id,
  value,
  onChange,
  placeholder,
  className = '',
  type = 'text',
}) => (
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`block w-70 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
  />
)

const button = ({ onClick, type, className = '', children }) => (
  <button
    type={type}
    onClick={onClick}
    className={`rounded-md bg-sky-600 px-3.5 py-2.5 text-center mt-4 mb-4 ml-4 mr-4 ${className}`}
  >
    {children}
  </button>
)

const form = ({ onSubmit, children }) => (
  <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={onSubmit}>
    {children}
  </form>
)

const div = ({ children, className = '', style = {} }) => (
  <div className={`flex flex-col items-center mb-4 ${className}`}>
    {children}
  </div>
)

const th = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
)

const tr = ({ children }) => (
  <tr>
    {children}
  </tr>
)

const td = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-center">
    {children}
  </td>
)

const ul = ({ children }) => (
  <ul className="list-disc pl-4">
    {children}
  </ul>
)

const li = ({ children }) => (
  <li className="mb-2">
    {children}
  </li>
)

const Tail = {
  p,
  h2,
  h3,
  input,
  button,
  form,
  div,
  table,
  tbody,
  th,
  tr,
  td,
  ul,
  li
}

export default Tail