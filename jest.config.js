module.exports = {
    coverageReporters: ["json", "text", "lcov", "clover", "cobertura"],
    reporters: [
        "default", ["jest-junit", { outputDirectory: "coverage", "usePathForSuiteName": "true" }],
    ],
}