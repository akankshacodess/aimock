import React, { useState } from "react";

export function Tabs({ children, defaultValue, className = "", ...props }) {
  const [active, setActive] = useState(defaultValue);
  const context = { active, setActive };
  return (
    <div className={className} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { context })
          : child
      )}
    </div>
  );
}

export function TabsList({ children, context, className = "", ...props }) {
  return (
    <div className={`flex border-b ${className}`} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { context })
          : child
      )}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  context,
  className = "",
  ...props
}) {
  const isActive = context?.active === value;
  return (
    <button
      className={`px-4 py-2 -mb-px border-b-2 font-medium focus:outline-none transition-colors ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600"
      } ${className}`}
      onClick={() => context?.setActive(value)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  context,
  children,
  className = "",
  ...props
}) {
  if (context?.active !== value) return null;
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default Tabs;
