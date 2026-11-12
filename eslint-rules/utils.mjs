export const tsxFilePattern = /\.tsx$/;
export const viewFilePattern = /(?:^|\/)views\//;
export const pageEntryPattern = /(?:^|\/)views\/(?:[^/]+|mcp\/tool-kit)\/index\.tsx$/;
export const componentEntryPattern = /(?:^|\/)views\/[^/]+\/.+\/index\.tsx$/;

export const isComponentName = (name) => /^[A-Z][A-Za-z0-9]*[a-z][A-Za-z0-9]*$/.test(name ?? "");

export const containsJsx = (node) => {
  const seen = new Set();
  const visit = (value) => {
    if (!value || typeof value !== "object" || seen.has(value)) return false;
    seen.add(value);
    if (value.type === "JSXElement" || value.type === "JSXFragment") return true;
    return Object.entries(value).some(
      ([key, child]) =>
        key !== "parent" &&
        (Array.isArray(child) ? child.some(visit) : visit(child)),
    );
  };
  return visit(node);
};

export const isComponentDefinition = (node) => {
  if (node.type === "FunctionDeclaration" || node.type === "ClassDeclaration") {
    return isComponentName(node.id?.name) && containsJsx(node);
  }
  return (
    node.type === "VariableDeclarator" &&
    node.id.type === "Identifier" &&
    isComponentName(node.id.name) &&
    containsJsx(node.init)
  );
};
