import {
  componentEntryPattern,
  isComponentDefinition,
  pageEntryPattern,
  viewFilePattern,
} from "./utils.mjs";

const componentEntryFile = {
  meta: {
    type: "problem",
    docs: { description: "Keep React components in their own directory index.tsx" },
    schema: [],
    messages: {
      entry:
        "React components in views must use the views/{page}/{component}/index.tsx structure.",
    },
  },
  create(context) {
    if (!viewFilePattern.test(context.filename)) return {};
    const checkComponent = (node) => {
      if (
        isComponentDefinition(node) &&
        !pageEntryPattern.test(context.filename) &&
        !componentEntryPattern.test(context.filename)
      ) {
        context.report({ node, messageId: "entry" });
      }
    };
    return {
      FunctionDeclaration: checkComponent,
      VariableDeclarator: checkComponent,
      ClassDeclaration: checkComponent,
    };
  },
};

export default componentEntryFile;
