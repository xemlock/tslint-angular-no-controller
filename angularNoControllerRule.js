"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new RuleWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.metadata = {
        ruleName: 'angular-no-controller',
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      Disallows declaration of AngularJS controllers.\n    "], ["\n      Disallows declaration of AngularJS controllers.\n    "]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      More often than not controllers in AngularJS applications ended up being\n      a god-objects having too many responsibilities.\n\n      With the advent of components in AngularJS 1.5+ the usage of controllers\n      became de facto an anti-pattern.\n    "], ["\n      More often than not controllers in AngularJS applications ended up being\n      a god-objects having too many responsibilities.\n\n      With the advent of components in AngularJS 1.5+ the usage of controllers\n      became de facto an anti-pattern.\n    "]))),
        optionsDescription: 'Not configurable.',
        options: null,
        optionExamples: [true],
        type: 'functionality',
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING = 'controller declaration is not allowed, use component instead';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var RuleWalker = (function (_super) {
    __extends(RuleWalker, _super);
    function RuleWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.PropertyAccessExpression) {
            this.checkPropertyAccessExpression(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    RuleWalker.prototype.checkPropertyAccessExpression = function (node) {
        var propertyName = node.name;
        if (propertyName.escapedText !== 'controller') {
            return;
        }
        var parentNode = node.parent;
        if (!parentNode || parentNode.kind !== ts.SyntaxKind.CallExpression) {
            return;
        }
        if (!Array.isArray(parentNode.arguments) || parentNode.arguments.length !== 2) {
            return;
        }
        var start = propertyName.pos;
        var end = parentNode.end;
        this.addFailureAt(start, end - start, Rule.FAILURE_STRING);
    };
    return RuleWalker;
}(Lint.RuleWalker));
var templateObject_1, templateObject_2;
