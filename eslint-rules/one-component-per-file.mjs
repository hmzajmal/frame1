import { isComponentDefinition, tsxFilePattern } from "./utils.mjs";

const oneComponentPerFile = {
  meta: {
    type: "problem",
    docs: { description: "Allow at most one React component definition per TSX file" },
    schema: [],
    messages: {
      multiple:
        "This file contains more than one React component. Move each component into its own component directory and index.tsx file.",
    },
  },
  create(context) {
    if (!tsxFilePattern.test(context.filename)) return {};
    let componentCount = 0;
    const reportComponent = (node) => {
      componentCount += 1;
      if (componentCount > 1) context.report({ node, messageId: "multiple" });
    };
    return {
      FunctionDeclaration(node) {
        if (isComponentDefinition(node)) reportComponent(node);
      },
      VariableDeclarator(node) {
        if (isComponentDefinition(node)) reportComponent(node);
      },
      ClassDeclaration(node) {
        if (isComponentDefinition(node)) reportComponent(node);
      },
    };
  },
};

export default oneComponentPerFile;
