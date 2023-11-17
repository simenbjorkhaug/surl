import { assertThrows } from 'https://deno.land/std@0.206.0/assert/assert_throws.ts'
import { route } from '../mod.ts'
import {
  assert,
  assertEquals,
  assertExists,
} from 'https://deno.land/std@0.206.0/assert/mod.ts'

Deno.test('Should parse /', () => {
  const url = new URL('https://localhost:3000/')
  assertEquals(route('/', url), null)
})

Deno.test('Should parse /users', () => {
  const url = new URL('https://localhost:3000/users/123/john')
  const match = route('/users/{id:number}/{name}', url)

  assert(match?.has('id'))
  assert(match?.has('name'))
  assert(match?.get('id') === 123)
  assert(match?.get('name') === 'john')
})

Deno.test('Empty path and URL', () => {
  const url = new URL('https://localhost:3000/')
  assertEquals(route('', url), null)
})

// Test for Path without Parameters
Deno.test('Path without parameters', () => {
  const url = new URL('https://localhost:3000/about')
  assertEquals(route('/about', url), null)
})

// Test for Mismatched URL and Path
Deno.test('Mismatched URL and path', () => {
  const url = new URL('https://localhost:3000/users/abc')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for Parameter with Incorrect Type
Deno.test('Incorrect type for parameter', () => {
  const url = new URL('https://localhost:3000/users/abc')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for Multiple Parameters
Deno.test('Multiple parameters', () => {
  const url = new URL('https://localhost:3000/products/123/description')
  const match = route('/products/{id:number}/{desc}', url)

  assertExists(match)
  assertEquals(match?.get('id'), 123)
  assert(match?.get('desc'), 'description')
})

// Test for Non-Existent Parameters in URL
Deno.test('Non-existent parameters in URL', () => {
  const url = new URL('https://localhost:3000/users')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for URL with Query Parameters
Deno.test('URL with query parameters', () => {
  const url = new URL('https://localhost:3000/users/123?active=true')
  const match = route('/users/{id:number}', url)
  assertExists(match)
  assert(match?.get('id') === 123)
})

// Test for URL with Hash
Deno.test('URL with hash', () => {
  const url = new URL('https://localhost:3000/users/123#section')
  const match = route('/users/{id:number}', url)
  assertExists(match)
  assert(match?.get('id') === 123)
})

// Test for Path with Extra Slashes
Deno.test('Path with extra slashes', () => {
  const url = new URL('https://localhost:3000//users//123')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for Incorrect Path Structure
Deno.test('Incorrect path structure', () => {
  const url = new URL('https://localhost:3000/123/users')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for URL with Encoded Values
Deno.test('URL with encoded values', () => {
  const url = new URL('https://localhost:3000/users/123/john%20doe')
  const match = route('/users/{id:number}/{name}', url)

  assertExists(match)
  assert(match?.get('id') === 123)
  assert(match?.get('name') === 'john doe')
})

// Test for Path with Multiple Parameters of Same Name
Deno.test('Multiple parameters with same name', () => {
  const url = new URL('https://localhost:3000/123/456')
  assertThrows(() => route('/{id:number}/{id:number}', url))
})

// Test for Path with Mixed Parameter Types
Deno.test('Mixed parameter types', () => {
  const url = new URL('https://localhost:3000/123/true')
  const match = route('/{id:number}/{active:boolean}', url)
  assertExists(match)
  assert(match?.get('id') === 123)
  // Assuming your function can handle boolean types
  assert(match?.get('active'))
})

// Test for URL with Missing Path Segment
Deno.test('Missing path segment in URL', () => {
  const url = new URL('https://localhost:3000/users/')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for URL with Extra Path Segment
Deno.test('Extra path segment in URL', () => {
  const url = new URL('https://localhost:3000/users/123/extra')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for URL with Non-Numeric Parameter where Number Expected
Deno.test('Non-numeric parameter where number expected', () => {
  const url = new URL('https://localhost:3000/users/abc')
  assertEquals(route('/users/{id:number}', url), null)
})

// Test for Path with Unmatched Braces
Deno.test('Path with unmatched braces', () => {
  const url = new URL('https://localhost:3000/users/123')
  assertEquals(route('/users/{id:number', url), null)
})

// Test for URL with Special Characters
Deno.test('URL with special characters', () => {
  const url = new URL('https://localhost:3000/users/123/special%40char')
  const match = route('/users/{id:number}/{name}', url)
  assertExists(match)
  assert(match?.get('id') === 123)
  assert(match?.get('name') === 'special@char')
})

// Test for Path and URL with No Parameters
Deno.test('Path and URL with no parameters', () => {
  const url = new URL('https://localhost:3000/about')
  assertEquals(route('/about', url), null)
})

Deno.test('Path and URL with a lot of spaces should be valid', () => {
  const url = new URL(
    'https://localhost:3000/about _ 3ijojioo1je1 ojwijio   diojdjoiwq ',
  )

  const match = route('/{name}', url)

  assertExists(match)
  assertEquals(match?.get('name'), 'about _ 3ijojioo1je1 ojwijio   diojdjoiwq')
})

Deno.test('Trailing whitespace should be trimmed', () => {
  const url = new URL('https://localhost:3000/about ')

  const match = route('/{name}', url)

  assertExists(match)
  assertEquals(match?.get('name'), 'about')
})
