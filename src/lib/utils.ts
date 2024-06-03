import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind classes where necessary.
 *
 * This function uses `clsx` to conditionally join class names and `twMerge` to intelligently merge
 * Tailwind CSS classes. This helps avoid class name conflicts and ensures that the final class string
 * is optimized for use with Tailwind CSS.
 *
 * @param {...ClassValue[]} inputs - A spread of class values to be combined. These can be strings,
 * objects, arrays, or any other valid input for `clsx`.
 * @returns {string} - A single string of combined class names.
 *
 * @example
 * Combining multiple class names conditionally
 * const classes = cn('p-4', 'bg-blue-500', isActive && 'text-white');
 * Output: 'p-4 bg-blue-500 text-white' if isActive is true
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
