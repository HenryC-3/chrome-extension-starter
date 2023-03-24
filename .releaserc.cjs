const zipName = "Extension_v${nextRelease.version}.zip";
const zipGlob = "./Extension_v*.zip";

module.exports = {
	branches: ["master", { name: "semantic-release-integration" }],
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				preset: "angular",
				releaseRules: [
					{ type: "docs", release: "patch" },
					{ type: "refactor", release: "patch" },
					{ type: "style", release: "patch" },
					// { type: "chore", release: "patch" },
					// { type: "ci", release: "patch" },
					{ type: "build", release: "minor" },
				],
				parserOpts: {
					noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
				},
			},
		],
		"@semantic-release/release-notes-generator",
		[
			"semantic-release-chrome",
			{
				asset: zipName,
				target: "local",
			},
		],
		[
			"@semantic-release/github",
			{
				assets: { path: zipGlob },
			},
		],
		// "@semantic-release/npm", // enable this when you have to publish to npm registry
		[
			"@semantic-release/npm",
			{
				npmPublish: false, // enable this when you don't have to publish to npm registry
			},
		],
		[
			"@semantic-release/git",
			{
				assets: ["package.json"],
				message:
					"chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
	],
};
