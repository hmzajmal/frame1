import { isComponentDefinition, tsxFilePattern } from "./utils.mjs";

const isConstantName = (node) =>
  node.type === "Identifier" && /^[A-Z][A-Z0-9_]*$/.test(node.name);

const noDeclarationsInTsx = {
  meta: {
    type: "problem",
    docs: { description: "Keep constants and type declarations out of TSX files" },
    schema: [],
    messages: {
      declaration:
        "Move constants to a colocated .constants.ts file and types, interfaces, or enums to a colocated .types.ts file.",
    },
  },
  create(context) {
    if (
      !tsxFilePattern.test(context.filename) ||
      /(?:^|\/)app\//.test(context.filename) ||
      context.filename.endsWith(".constants.tsx")
    ) {
      return {};
    }
    const isTopLevelVariable = (node) => {
      let declaration = node.parent.parent;
      if (
        declaration.type === "ExportNamedDeclaration" ||
        declaration.type === "ExportDefaultDeclaration"
      ) {
        declaration = declaration.parent;
      }
      return declaration.type === "Program";
    };
    return {
      VariableDeclarator(node) {
        if (
          isTopLevelVariable(node) &&
          isConstantName(node.id) &&
          !isComponentDefinition(node)
        ) {
          context.report({ node, messageId: "declaration" });
        }
      },
      TSInterfaceDeclaration(node) {
        if (node.parent.type === "Program") {
          context.report({ node, messageId: "declaration" });
        }
      },
      TSTypeAliasDeclaration(node) {
        if (node.parent.type === "Program") {
          context.report({ node, messageId: "declaration" });
        }
      },
      TSEnumDeclaration(node) {
        if (node.parent.type === "Program") {
          context.report({ node, messageId: "declaration" });
        }
      },
    };
  },
};

export default noDeclarationsInTsx;
