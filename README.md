# TSLint Rule: angular-no-controller

TSLint rule that disallows declaring controllers in AngularJS applications.

More often than not controllers in AngularJS applications ended up being a god-objects having too many responsibilities.

With the advent of components in AngularJS 1.5+ the usage of controllers became de facto an anti-pattern.

## Usage

Install with NPM or Yarn to your dev dependencies:

```
npm install --save-dev tslint-angular-no-controller
```

and include it in your project's `tslint.json` file. You can do it either by adding the package name to `extends` field:

```json
  "extends": [
    "tslint-angular-no-controller"
  ]
```

or by adding the package location to `rulesDirectory` field:

```json
  "rulesDirectory": [
    "node_modules/tslint-angular-no-controller"
  ]
```

Both approaches are equivalent, use whichever suits your project the most.

## Configuration

Rule is not configurable.

## License

MIT
