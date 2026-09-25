import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      // New in the Next 16 preset. The codebase's mount / matchMedia
      // effects are intentional one-time syncs, so surface these as
      // warnings rather than failing lint.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // Ported third-party scroll-lock code that relies on loose DOM typing.
    files: ["hooks/usePreventScroll.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
