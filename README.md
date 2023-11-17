# @bjorkhaug/surl

A simple path segment router parser for Deno, part of another module, but
published separately for use in other projects.

## Usage

The `route` function is used to parse URL paths and extract parameters based on
a provided pattern. It returns a `Map` of parameter names to their values, or
`null` if the URL does not match the pattern.

```typescript
import { route } from 'npm:@bjorkhaug/surl'

const match = route(
  '/users/{id:number}/{name}',
  'https://localhost:3000/users/123/john',
)

if (match) {
  console.log(match.get('id')) // Outputs: 123
  console.log(match.get('name')) // Outputs: john
}
```

## API

`route(path: string, url: string | URL): Map<string, string | number | boolean | undefined> | null`
Parses the `url` based on the path pattern and returns a Map of parameter names
to their values. If the `url` does not match the path pattern, it returns
`null`.

The `path` pattern can include parameters in the format `{paramName:paramType}`,
where `paramType` can be `string`, `number`, or `boolean`. If `paramType` is not
provided, it defaults to `string`.
