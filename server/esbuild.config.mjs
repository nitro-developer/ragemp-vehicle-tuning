import * as esbuild from 'esbuild';

esbuild
	.build({
		entryPoints: ['index.ts'],
		bundle: true,
		platform: 'node',
		target: 'node14',
		outdir: '../../packages/roleplay/',
		minify: true,
	})
	.catch(() => process.exit(1));
