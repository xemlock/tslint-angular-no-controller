import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'angular-no-controller',
    description: Lint.Utils.dedent`
      Disallows declaration of AngularJS controllers.
    `,
    rationale: Lint.Utils.dedent`
      More often than not controllers in AngularJS applications ended up being
      a god-objects having too many responsibilities.

      With the advent of components in AngularJS 1.5+ the usage of controllers
      became de facto an anti-pattern.
    `,
    optionsDescription: 'Not configurable.',
    options: null,
    optionExamples: [true],
    type: 'functionality',
    typescriptOnly: false,
  };

  public static FAILURE_STRING = 'controller declaration is not allowed, use component instead';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.RuleWalker {
  /*
    Walker matches the following AST subtree:

    CallExpression {
      expression: PropertyAccessExpression { name: Identifier('controller') }
      arguments: [Node, Node]
    }
  */

  public visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.PropertyAccessExpression) {
      this.checkPropertyAccessExpression(node as ts.PropertyAccessExpression);
    }
    super.visitNode(node);
  }

  private checkPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    const propertyName: ts.Identifier = node.name;
    if (propertyName.escapedText !== 'controller') {
      return;
    }

    const parentNode = node.parent as ts.CallExpression;
    if (!parentNode || parentNode.kind !== ts.SyntaxKind.CallExpression) {
      return;
    }

    if (!Array.isArray(parentNode.arguments) || parentNode.arguments.length !== 2) {
      return;
    }

    const start = propertyName.pos;
    const end = parentNode.end;

    this.addFailureAt(start, end - start, Rule.FAILURE_STRING);
  }
}
