import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

/****************************************************************************
**                                                                         **
**                  Simple String Manipulation Types                        **
**                                                                         **
****************************************************************************/

// Lowercase<Type>, Uppercase<Type>, Capitalize<Type>, Uncapitalize<Type>
type S = "Hello World!";

/* The line `// type T = Lowercase<S>;` is a TypeScript type declaration that demonstrates the use of
the `Lowercase` utility type. */
// type T = Lowercase<S>;
// type T = Uppercase<S>;
// type T = Capitalize<S>;
// type T = Uncapitalize<S>;


/****************************************************************************
**                                                                         **
**                         Types with Objects                              **
**                                                                         **
****************************************************************************/


type User = {
  id: string;
  name: string;
  age: number;
  address?: {
    street: string;
    city: string;
  }
}
// The Omit<Type, Keys> utility type is a TypeScript type that allows you to 
// create a new type by excluding certain properties from an existing type.
function createUser(user: Omit<User, "id">): void {}

// The Required<Type> utility type is a TypeScript type that transforms all 
// optional properties of a given type into required properties.
function createUserWithAddress(user: Required<User>): void {}

// The Partial<Type> utility type is a TypeScript type that makes all properties
// of a given type optional.
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

// The Pick<Type, Keys> utility type is a TypeScript type that allows you to
// create a new type by selecting a subset of properties from an existing type.
function renderUserDetails(user: Pick<User, "name" | "age">): void {
  console.log(`Rendering details for user — Name: ${user.name}, Age: ${user.age}.`);
}

const newUser: User = {
  name: "Faddah",
  age: 65,
  address: {
    street: "Belmont Street",
    city: "Portland"
  },
  id: "123",
}

createUser({
  name: "Alice",
  age: 28,
  address: {
    street: "123 Main St",
    city: "Springfield"
  }
})

createUserWithAddress({
  id: "abc123",
  name: "Oscar",
  age: 37,
  address: {
    street: "456 Main St",
    city: "Springfield"
  }
})

updateUser(newUser, { name: "Faddah", age: 65 })

renderUserDetails({ name: "John Doe", age: 30 })

// To make all Types in an Object READ ONLY
// type T = Readonly<User>;

// The Record<Keys, Type> utility type is a TypeScript type that allows you
// to create a Type with specific keys and their Types
// type T = Record<string, User>;

// type T = Record<"admin" | "user" | "moderator ", { test: string}>

// type T = Record<PropertyKey, { test: string}>;

// const newRecord: T = { 
//   admin: {  test: "test1" },
//   user: {  test: "test2" },
//   moderator: {  test: "test3" },
// }

type Role = "admin" | "user" | "moderator";
type OtherRole = "testing" | "admin" | "user" | "security";

// Type Extract<Type, Union> constructs a type by extracting from Type
// all union members that are assignable to Union, so it produces a Union
// of the common Types between the two Types.
// type T = Extract<Role, "admin" | "user" | "testing">;
// Produces a Union of the two Types
// type T = Extract<Role, OtherRole>;


// Type Exclude<Type, Union> constructs a type by excluding from Type
// all union members that are assignable to Union; so it removes everything
// that is common between the two Types from the first Type.
// Longer explanation:
// Takes what is common to both, excludes everything but "moderator" — not common to both)
// and completely excludes the second argument. Since "admin" & "user" are common
// to both, they are excluded and only "moderator" remains.
// type T = Exclude<Role, OtherRole>;
// type T = Exclude<Role, "admin"> // Removes "admin", leaves "user" | "moderator"

// Typically, you just list the known Types you want to Exclude
// type T = Exclude<Role, "user" | "moderator">;

// const role1: T = "moderator";


/****************************************************************************
**                                                                         **
**                         Types with Classes                              **
**                                                                         **
****************************************************************************/


class UserClass {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
} 

// Use ConstructorParameters<Type> to extract the parameter Types
// of a class constructor to use elsewhere in your TypeScript code.
// type T = ConstructorParameters<typeof UserClass>
// type T = InstanceType<typeof UserClass> is not necessary here since we have access to the class definition
// It is the same as if we did type T = UserClass, so it's redundant. Save InstanceType
// for when you don't have access to the class definition itself.
// const x: T = ["Faddah"];


/****************************************************************************
**                                                                         **
**                         Removing Null(s)                                **
**                                                                         **
****************************************************************************/


type A = string | null | undefined;

type TNonNull = NonNullable<A>;

const b: TNonNull = "Hello";

// Does this overlap with the functionality of Required<Type>? Not exactly. Required<Type>
// makes all Types in the Type required. NonNullable<Type> makes all Types in the Type non-nullable.  
// Also, Required<Type> only works on Objects, whereas NonNullable<Type> works on any Type(s).

/****************************************************************************
**                                                                         **
**                         Types with Functions                            **
**                                                                         **
****************************************************************************/

// function getUser(id: string): Omit<User, "address"> {
//   return {
//     id,
//     name: "Faddah",
//     age: 65,
//   };
// }

// function getUser(id: string, age: number): Omit<User, "address"> {
//   return {
//       id,
//       name: "Faddah",
//       age: 65,
//     };
// }

// Returns just the Types in the Return statement of the function
// type T = ReturnType<typeof getUser>;

// type T = Parameters<typeof getUser>;

// You'll now get a TypeScript error if the array doesn't match the parameter Types of [string, number]
// const a: T = ["Schlemmy", 26];


// function getUser(id: string): { name: string, id: string, age: number } { 
//   return { name: "Faddah", id, age: 65 }; 
// }

// function getUserWrapper(id: string, other: boolean) {
//   return getUser(id);
// }

// Hover over T to see that what Type it infers
// type T = ReturnType<typeof getUserWrapper>;

// function getUser(id: string): { name: string, id: string, age: number } { 
//   return { name: "Faddah", id, age: 65}; 
// }

// Use this type T = ReturnType<typeof getUser>; when you're dealing with a lib
// where you don't have access to the function definition or return Type(s), and you
// just have access to the parameters and wish to use it in your TypeScript code.
// function getUser(id: string, age: number) {
//   return { name: "Faddah", id, age}; 
// }

// type T = ReturnType<typeof getUser>;

// const a: T = ["Schlemmy", 26];

// Use Parameters<typeof ...> for when you want to extract the parameter Types
// of a function to use elsewhere in your TypeScript code.
// function getUser(id: string) {
//   return { name: "Faddah" }; 
// }

// function getUserWrapper(id: Parameters<typeof getUser>[0], other: boolean) {
//   return getUser(id);
// }

// type T = Parameters<typeof getUser>;

// const a: T = ["zyx098"]; 


// With async/await Promises
// async function getUser(id: string) {
//   return Promise.resolve({ name: "Faddah"});
// }

// type T = Awaited<ReturnType<typeof getUser>>;

// const a: T = { name: "Faddah" };
// Awaited Will work even with many nested levels of Promises or async/await.


// function logMessage(message: string): void {
//   console.log(message);
// }

// logMessage("Hi Mom!");


/****************************************************************************
**                                                                         **
**                         TypeScript Generic Types                        **
**                                                                         **
****************************************************************************/

// ========================================
// Example 1: Basic Generic Function
// ========================================

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]); // type: number | undefined
const firstString = getFirstElement(["a", "b"]); // type: string | undefined

// ========================================
// Example 2: Generic Interface
// ========================================

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface UserIF {
  id: number;
  name: string;
}

const userResponse: ApiResponse<UserIF> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success"
};

const numberResponse: ApiResponse<number[]> = {
  data: [1, 2, 3],
  status: 200,
  message: "Success"
};

// ========================================
// Example 4: Multiple Type Parameters
// ========================================

function mapPair<T, U>(value: T, transformer: (val: T) => U): U {
  return transformer(value);
}

const length = mapPair("hello", (str) => str.length); // number
const upper = mapPair("hello", (str) => str.toUpperCase()); // string


// ========================================
// Example 5: Constraints (extends keyword)
// ========================================

interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("hello"); // works: string has length
logLength([1, 2, 3]); // works: array has length
// logLength(42); // ERROR: number doesn't have length

// ========================================
// Example 6: Real-World Example - Fetch Wrapper
// ========================================

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as T;
}

// Usage (in an async context):
// const user = await fetchData<User>('/api/user/1');
// TypeScript now knows user is of type User


// ========================================
// Example 7: When NOT to use generics
// ========================================

// BAD - unnecessary generic:
function addBad<T>(a: T, b: T): T {
  return (a as any) + (b as any); // defeats type safety
}

// GOOD - specific types:
function addGood(a: number, b: number): number {
  return a + b;
}

// BAD - generic used only once:
function printValueBad<T>(value: T): void {
  console.log(value);
}

// GOOD - no need for generic:
function printValueGood(value: unknown): void {
  console.log(value);
}

// ========================================
// Example 8: Default Type Parameters
// ========================================
interface Container<T = string> {
  value: T;
}

const stringContainer: Container = { value: "hello" }; // defaults to string
const numberContainer: Container<number> = { value: 42 };


// ========================================
// Example 9: Generic Utility Type
// ========================================

type Nullable<T> = T | null;

let name: Nullable<string> = "Alice";
name = null; // allowed

let age: Nullable<number> = 30;
age = null; // allowed


/****************************************************************************
**                                                                         **
**                         TypeScript Decorators (@)                       **
**                                                                         **
****************************************************************************/


// There are five types of decorators in TypeScript:

// 1. **Class Decorators**
// 2. **Method Decorators**
// 3. **Accessor Decorators**
// 4. **Property Decorators**
// 5. **Parameter Decorators**


// ========================================
// 1. Class Decorators
// ========================================

// Simple class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}


// ========================================
// Decorator Factory (with parameters)
// ========================================

function component(options: { selector: string; template: string }) {
  return function (constructor: Function) {
    console.log(`Registering component: ${options.selector}`);
    // Possibly register this component in a registry with
    // further code here
  };
}

@component({
  selector: "app-user",
  template: `<div>User Component For: ${name}</div>`
})
class UserComponent {
  name = "User";
}


// ========================================
// 2. Method Decorators
// 
// Method decorators are applied to methods and receive three parameters:

// * target: The prototype of the class (for instance methods) or the constructor (for static methods)
// * propertyKey: The name of the method
// * descriptor: The Property Descriptor for the method
// ========================================

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);
// Logs: Calling add with args: [2, 3]
// Logs: Result: 5


// ========================================
// 3. Property Decorators
// 
// Property decorators receive two parameters:
// 
// * target: The prototype of the class
// * propertyKey: The name of the property
// ========================================

function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
    configurable: false
  });
}

class Person {
  @readonly
  name: string = "John";
}

const person = new Person();
// person.name = "Jane"; // This won't work in strict mode


// ========================================
// 4. Accessor Decorators
// 
// Similar to method decorators but applied to getters/setters:
// ========================================

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number = 0;

  @configurable(false)
  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }
}

// 2nd Example of Accessor Decorators

function logParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log(
    `Parameter at index ${parameterIndex} in method ${propertyKey} has been decorated`
  );
}

class Greeter {
  greet(@logParameter message: string): void {
    console.log(message);
  }
}

const greeter = new Greeter();
greeter.greet("Hello, world!");


// ========================================
// 5. Parameter Decorators
// 
// Parameter decorators receive three parameters:
// 
// * target: The prototype of the class
// * propertyKey: The name of the method
// * parameterIndex: The index of the parameter
// ========================================

function required(target: any, propertyKey: string, parameterIndex: number) {
  const existingRequiredParameters: number[] =
    Reflect.getMetadata("required", target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    "required",
    existingRequiredParameters,
    target,
    propertyKey
  );
}

class GreeterAgain {
  greet(@required name: string) {
    return `Hello, ${name}`;
  }
}


/****************************************************************************
**                                                                         **
**              ETAGs in TypeScript & Node.JS / Express.JS                 **
**                                                                         **
****************************************************************************/


// ========================================
// 
// A complete Express.js server with 
// TypeScript demonstrating ETags
// 
// ========================================



import express, { Request, Response } from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// Simulated database
interface User {
  id: number;
  name: string;
  email: string;
  updatedAt: Date;
}

const users: Map<number, User> = new Map([
  [1, { id: 1, name: 'Alice', email: 'alice@example.com', updatedAt: new Date() }],
  [2, { id: 2, name: 'Bob', email: 'bob@example.com', updatedAt: new Date() }],
]);

// Generate ETag from content
function generateETag(content: string): string {
  return crypto
    .createHash('md5')
    .update(content)
    .digest('hex');
}

// Alternative: Use timestamp-based ETag (weak ETag)
function generateWeakETag(user: User): string {
  return `W/"${user.updatedAt.getTime()}"`;
}

// GET user with ETag support
app.get('/api/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Serialize user data
  const userJson = JSON.stringify(user);
  
  // Generate ETag (strong ETag based on content)
  const etag = generateETag(userJson);
  
  // Check if client's cached version matches
  const clientETag = req.headers['if-none-match'];
  
  if (clientETag === etag) {
    // Resource hasn't changed - send 304
    return res.status(304).end();
  }

  // Resource changed or first request - send full response
  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', 'private, must-revalidate');
  res.json(user);
});

// PUT user with ETag for optimistic locking
app.put('/api/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Generate current ETag
  const currentETag = generateETag(JSON.stringify(user));
  
  // Check if client has the latest version
  const clientETag = req.headers['if-match'];
  
  if (!clientETag) {
    return res.status(428).json({ 
      error: 'Precondition Required: If-Match header is required' 
    });
  }

  if (clientETag !== currentETag) {
    // Resource was modified by someone else - reject update
    return res.status(412).json({ 
      error: 'Precondition Failed: Resource was modified by another user',
      currentETag 
    });
  }

  // Update the user
  const updatedUser: User = {
    ...user,
    ...req.body,
    id: userId, // Prevent ID change
    updatedAt: new Date()
  };

  users.set(userId, updatedUser);

  // Send new version with new ETag
  const newETag = generateETag(JSON.stringify(updatedUser));
  res.setHeader('ETag', newETag);
  res.json(updatedUser);
});

// Example endpoint without ETag (for comparison)
app.get('/api/time', (req: Request, res: Response) => {
  // Don't use ETag for always-changing data
  res.json({ timestamp: new Date().toISOString() });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




