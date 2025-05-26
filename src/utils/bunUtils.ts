/**
 * BUN-specific utility functions for optimized performance
 * This file demonstrates features specific to BUN as a runtime
 */

import { file } from "bun";

/**
 * Fast file operations using BUN's native APIs
 * @param filePath Path to the file to read
 * @returns The file contents as string
 */
export const readFileAsync = async (filePath: string): Promise<string> => {
  try {
    const f = file(filePath);
    return await f.text();
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
};

/**
 * Write to a file using BUN's optimized file API
 * @param filePath Path to write the file
 * @param content Content to write
 * @returns A promise that resolves when the file is written
 */
export const writeFileAsync = async (
  filePath: string,
  content: string
): Promise<void> => {
  try {
    await Bun.write(filePath, content);
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
    throw error;
  }
};

/**
 * Fetch data with BUN's optimized fetch implementation
 * @param url URL to fetch from
 * @returns The response data
 */
export const fetchDataWithBun = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

/**
 * Execute a shell command using BUN's subprocess API
 * @param command Command to execute
 * @returns The result of the command execution
 */
export const execCommand = async (command: string): Promise<string> => {
  try {
    const proc = Bun.spawn(command.split(" "));
    const output = await new Response(proc.stdout).text();
    return output;
  } catch (error) {
    console.error(`Error executing command "${command}":`, error);
    throw error;
  }
};

/**
 * Create a simple HTTP server using BUN's built-in server
 * @param port Port number
 * @param handler Request handler function
 * @returns The server instance
 */
export const createBunServer = (
  port: number,
  handler: (req: Request) => Response
) => {
  return Bun.serve({
    port,
    fetch: handler,
  });
};

/**
 * Performance measurement utility using BUN's performance APIs
 * @param fn Function to measure
 * @param iterations Number of iterations
 * @returns Average execution time in ms
 */
export const measurePerformance = async <T>(
  fn: () => Promise<T> | T,
  iterations = 100
): Promise<number> => {
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    await fn();
  }

  const end = performance.now();
  return (end - start) / iterations;
};
