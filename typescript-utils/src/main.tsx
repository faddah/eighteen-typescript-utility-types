import { useState } from 'react';
import { createRoot } from "react-dom/client";

export default function TruthyFalsyDemo() {
  const [input, setInput] = useState('');
  const [number, setNumber] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // Example 1: Basic truthy/falsy checking
  const checkValue = (value: any): string => {
    if (value) {
      return `"${value}" is truthy`;
    } else {
      return `"${value}" is falsy`;
    }
  };

  // Example 2: Default values using ||
  const greetUser = (name?: string): string => {
    const userName = name || 'Guest';
    return `Hello, ${userName}!`;
  };

  // Example 3: Optional chaining with truthy check
  interface User {
    name?: string;
    age?: number;
    email?: string;
  }

  const displayUserInfo = (user?: User): string => {
    if (user && user.name) {
      return `User: ${user.name}, Age: ${user.age || 'unknown'}`;
    }
    return 'No user data';
  };

  // Example 4: Array filtering with truthy values
  const filterTruthy = (arr: any[]): any[] => {
    return arr.filter(item => item);
  };

  // Example 5: Nullish coalescing (??) vs OR (||)
  const demonstrateNullishCoalescing = (value: number | null | undefined): string => {
    const withOr = value || 10;
    const withNullish = value ?? 10;
    return `Value: ${value}, with ||: ${withOr}, with ??: ${withNullish}`;
  };

  const runExamples = () => {
    const newResults: string[] = [];

    // Test various values
    const testValues = [true, false, 0, 1, '', 'hello', null, undefined, [], {}];
    testValues.forEach(value => {
      newResults.push(checkValue(value));
    });

    newResults.push('---');
    newResults.push(greetUser());
    newResults.push(greetUser('Alice'));

    newResults.push('---');
    newResults.push(displayUserInfo());
    newResults.push(displayUserInfo({ name: 'Bob' }));
    newResults.push(displayUserInfo({ name: 'Carol', age: 30 }));

    newResults.push('---');
    const mixedArray = [1, 0, 'test', '', null, 'hello', undefined, false, true];
    newResults.push(`Original: [${mixedArray.map(v => JSON.stringify(v)).join(', ')}]`);
    newResults.push(`Truthy only: [${filterTruthy(mixedArray).map(v => JSON.stringify(v)).join(', ')}]`);

    newResults.push('---');
    newResults.push(demonstrateNullishCoalescing(0));
    newResults.push(demonstrateNullishCoalescing(null));
    newResults.push(demonstrateNullishCoalescing(5));

    setResults(newResults);
  };

  const testCustomInput = () => {
    const newResults: string[] = [];
    
    if (input) {
      newResults.push(`String "${input}" is truthy`);
    } else {
      newResults.push(`String "${input}" is falsy (empty)`);
    }

    const numValue = Number(number);
    if (numValue) {
      newResults.push(`Number ${numValue} is truthy`);
    } else {
      newResults.push(`Number ${numValue} is falsy`);
    }

    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">
          TypeScript Truthy/Falsy Demo
        </h1>
        <p className="text-gray-600 mb-6">
          Explore how truthy and falsy values work in TypeScript
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Run All Examples
          </h2>
          <button
            onClick={runExamples}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Run Examples
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Test Your Own Values
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                String Input:
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter any text (or leave empty)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number Input:
              </label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter a number (try 0, 1, etc.)"
              />
            </div>
            <button
              onClick={testCustomInput}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Values
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Results:</h2>
            <div className="bg-gray-50 rounded p-4 font-mono text-sm space-y-1">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={result === '---' ? 'border-t border-gray-300 my-2' : 'text-gray-700'}
                >
                  {result !== '---' && result}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">
            Key Concepts:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Falsy values:</strong> false, 0, "", null, undefined, NaN</li>
            <li>• <strong>Truthy values:</strong> Everything else (including [], {}, "0", "false")</li>
            <li>• <strong>|| operator:</strong> Returns first truthy value (treats 0 and "" as falsy)</li>
            <li>• <strong>?? operator:</strong> Returns right side only if left is null/undefined</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<TruthyFalsyDemo />);