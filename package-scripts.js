/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, rimraf } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'nps start',
    /**
     * Starts the builded app from the dist directory.
     */
    start: {
      script: 'cross-env NODE_ENV=production node dist/src/app.js',
      description: 'Starts the builded app',
    },
    /**
     * Serves the current app and watches for changes to restart it
     */
    serve: {
      inspector: {
        script: series(
          'nps banner.serve',
          'cross-env NODE_ENV=development nodemon --watch src --watch .env.development --inspect',
        ),
        description:
          'Serves the current app and watches for changes to restart it, you may attach inspector to it.',
      },
      script: series(
        'nps banner.serve',
        'cross-env NODE_ENV=development nodemon --watch src --watch .env.development',
      ),
      description:
        'Serves the current app and watches for changes to restart it',
    },
    /**
     * Creates the needed configuration files
     */
    config: {
      script: series(runFast('./commands/tsconfig.ts')),
      hiddenFromHelp: true,
    },
    /**
     * Builds the app into the dist directory
     */
    build: {
      script: series(
        'nps banner.build',
        'nps config',
        // "nps lint",
        'nps clean.dist',
        'nps transpile',
        'nps copy',
        'nps copy.tmp',
        'nps clean.tmp',
      ),
      description: 'Builds the app into the dist directory',
    },
    build_dev: {
      script: series(
        'nps banner.build_dev',
        'nps config',
        // 'nps lint',
        'nps clean.dist',
        'nps transpile',
        'nps copyDev',
        'nps copy.tmp',
        'nps clean.tmp',
      ),
      description: 'Developent builds the app into the dist directory',
    },
    build_uat: {
      script: series(
        'nps banner.build_uat',
        'nps config',
        // 'nps lint',
        'nps clean.dist',
        'nps transpile',
        'nps copyUAT',
        'nps copy.tmp',
        'nps clean.tmp',
      ),
      description: 'UAT builds the app into the dist directory',
    },
    build_prod: {
      script: series(
        'nps banner.build_prd',
        'nps config',
        // 'nps lint',
        'nps clean.dist',
        'nps transpile',
        'nps copyPRD',
        'nps copy.tmp',
        'nps clean.tmp',
      ),
      description: 'PRD builds the app into the dist directory',
    },
    /**
     * Runs TSLint over your project
     */
    // lint: {
    //   script: tslint(`./src/**/*.ts`),
    //   hiddenFromHelp: true,
    // },
    /**
     * Transpile your app into javascript
     */
    transpile: {
      script: `tsc --project ./tsconfig.build.json`,
      hiddenFromHelp: true,
    },
    /**
     * Clean files and folders
     */
    clean: {
      default: {
        script: series(`nps banner.clean`, `nps clean.dist`),
        description: 'Deletes the ./dist folder',
      },
      dist: {
        script: rimraf('./dist'),
        hiddenFromHelp: true,
      },
      tmp: {
        script: rimraf('./.tmp'),
        hiddenFromHelp: true,
      },
    },
    /**
     * Copies static files to the build folder
     */
    copy: {
      default: {
        script: series(`nps copy.addNodeModules`, `nps copy.addEnv`),
        hiddenFromHelp: true,
      },
      addNodeModules: {
        script: move('node_modules', './dist/node_modules'),
        hiddenFromHelp: true,
      },
      addEnv: {
        script: copyEnv('./.env.production', './dist/.env'),
        hiddenFromHelp: true,
      },
      addDevEnv: {
        script: copyEnv('./.env.development', './dist/.env'),
        hiddenFromHelp: true,
      },
      addUatEnv: {
        script: copyEnv('./.env.uat', './dist/.env'),
        hiddenFromHelp: true,
      },
      tmp: {
        script: copyDir('./.tmp/', './dist'),
        hiddenFromHelp: true,
      },
    },
    /**
     * Copies static files to the build folder
     */
    copyDev: {
      default: {
        script: series(`nps copyDev.addEnv`),
        hiddenFromHelp: true,
      },
      addNodeModules: {
        script: move('node_modules', './dist/node_modules'),
        hiddenFromHelp: true,
      },
      addEnv: {
        script: copyEnv('./.env.development', './.tmp/.env'),
        hiddenFromHelp: true,
      },
      tmp: {
        script: copyDir('./.tmp/', './dist'),
        hiddenFromHelp: true,
      },
    },
    copyUAT: {
      default: {
        script: series(`nps copy.addNodeModules`, `nps copy.addUatEnv`),
        hiddenFromHelp: true,
      },
      addNodeModules: {
        script: move('node_modules', './dist/node_modules'),
        hiddenFromHelp: true,
      },
      addEnv: {
        script: copyEnv('./.env.uat', './dist/.env'),
        hiddenFromHelp: true,
      },
      tmp: {
        script: copyDir('./.tmp/', './dist'),
        hiddenFromHelp: true,
      },
    },
    copyPRD: {
      default: {
        script: series(`nps copyPRD.addEnv`),
        hiddenFromHelp: true,
      },
      addNodeModules: {
        script: move('node_modules', './dist/node_modules'),
        hiddenFromHelp: true,
      },
      addEnv: {
        script: copyEnv('./.env.production', './.tmp/.env'),
        hiddenFromHelp: true,
      },
      tmp: {
        script: copyDir('./.tmp/', './dist'),
        hiddenFromHelp: true,
      },
    },
    /**
     * This creates pretty banner to the terminal
     */
    banner: {
      build: banner('build'),
      build_dev: banner('build_dev'),
      build_uat: banner('build_uat'),
      build_prd: banner('build_prd'),
      serve: banner('redefine_2.0_DEV'),
      testUnit: banner('test.unit'),
      testIntegration: banner('test.integration'),
      testE2E: banner('test.e2e'),
      migrate: banner('migrate'),
      seed: banner('seed'),
      revert: banner('revert'),
      clean: banner('clean'),
    },
  },
};

function banner(name) {
  return {
    hiddenFromHelp: true,
    silent: true,
    description: `Shows ${name} banners to the console`,
    script: runFast(`./commands/banner.ts ${name}`),
  };
}

function move(source, target) {
  return `mkdir -p ${target}`;
}

function copyEnv(source, target) {
  return `cp ${source} ${target}`;
}

function copyDir(source, target) {
  return `ncp ${source} ${target}`;
}

function runFast(path) {
  return `ts-node --transpileOnly ${path}`;
}
