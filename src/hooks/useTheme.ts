/**
 * Re-exports the `useTheme` hook from the `ThemeProvider`.
 * This allows for a cleaner import path in other parts of the application.
 *
 * For example, instead of importing from ` "@/providers/ThemeProvider"`,
 * components can import directly from ` "@/hooks/useTheme"`.
 */
export { useTheme } from "@/providers/ThemeProvider";
