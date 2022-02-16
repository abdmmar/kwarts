import { Compiler, Stats } from 'webpack';

export const compilerListener = (name: string, compiler: Compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      console.log(`[SERVER] Compiling ${name} please wait...`);
    });

    compiler.hooks.failed.tap(name, (error) => {
      reject(error);
    });
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        resolve('[SERVER] Success compiling');
      }
      if (stats.hasErrors()) {
        stats.compilation.errors.forEach((error) => {
          reject(error);
        });
      }
      if (stats.hasWarnings()) {
        stats.compilation.warnings.forEach((warning) => {
          console.warn(warning);
        });
      }
    });
  });
};

export const compilation = (err: Error | undefined | null, stats: Stats | undefined, format: string) => {
  if (err) {
    console.error(err.stack || err);
    return;
  }

  if (stats) {
    console.log(stats.toString(format));
  } else {
    console.log('Hmmm');
  }
};
