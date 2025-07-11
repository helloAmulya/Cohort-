### 0-1/week10/postgres/.gitignore

node_modules
dist
---

### 0-1/week10/postgres/README.md



> # Creating a Postgres Database

## 1. Using Neon DB
Make an account on [Neon](https://neon.tech/) and create a fresh project.

1. Initialise TypeScript Project
```
npm init -y
npm tsc --init
```
2. Create `src` and `dist` folder and inside `src` folder create `index.ts` file.

2. Change the `rootDir` and `outDir` in `tsconfig.json` file
```
"rootDir": "./src",
"outDir": "./dist",
```
3. Install the `pg` library and it’s types (because we’re using TS)

```
npm install pg
npm install @types/pg
```

4. Add follwing code to `src/index.ts` 

```js
import { Client } from 'pg';

const client = new Client({
  connectionString: "ADD_NEON_DB_URL"
});


async function createUserTable(){
  await client.connect();
  const result = await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log(result);
}

createUserTable();
```

5. Build `ts` file to `js` 
```
tsc -b
```

6. Run `js` file
```
node dist/index.js
```

Table is created Check on neon website














## 2. Install and Run using Docker
- `docker pull postgres`

  - To download the latest PostgreSQL image from Docker Hub:

- `docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`

  - `--name my-postgres`: Assigns the name “my-postgres” to the container.
  - `-e POSTGRES_PASSWORD=mysecretpassword`: Sets the PostgreSQL superuser password to “mysecretpassword”.
  - `-d`: Runs the container in detached mode (in the background).
  - `-p` 5432:5432: Maps port 5432 on your host machine to port 5432 inside the container (the default PostgreSQL port).

- `docker exec -it my-postgres psql -U postgres`

  - To interact with the container, you can use the `docker exec` command.This command connects you to the PostgreSQL instance running in the container as the “postgres” user

- CTRL + D
- `docker stop my-postgres`
    - To stop the postgres 
- `docker start my-postgres`
    - To start the postgres container
- `docker exec -it my-postgres psql -U postgres`





---

### 0-1/week10/postgres/package-lock.json

{
  "name": "postgres",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "postgres",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "@types/pg": "^8.11.2",
        "pg": "^8.11.3"
      }
    },
    "node_modules/@types/node": {
      "version": "20.11.28",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.11.28.tgz",
      "integrity": "sha512-M/GPWVS2wLkSkNHVeLkrF2fD5Lx5UC4PxA0uZcKc6QqbIQUJyW1jVjueJYi1z8n0I5PxYrtpnPnWglE+y9A0KA==",
      "dependencies": {
        "undici-types": "~5.26.4"
      }
    },
    "node_modules/@types/pg": {
      "version": "8.11.2",
      "resolved": "https://registry.npmjs.org/@types/pg/-/pg-8.11.2.tgz",
      "integrity": "sha512-G2Mjygf2jFMU/9hCaTYxJrwdObdcnuQde1gndooZSOHsNSaCehAuwc7EIuSA34Do8Jx2yZ19KtvW8P0j4EuUXw==",
      "dependencies": {
        "@types/node": "*",
        "pg-protocol": "*",
        "pg-types": "^4.0.1"
      }
    },
    "node_modules/@types/pg/node_modules/pg-types": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/pg-types/-/pg-types-4.0.2.tgz",
      "integrity": "sha512-cRL3JpS3lKMGsKaWndugWQoLOCoP+Cic8oseVcbr0qhPzYD5DWXK+RZ9LY9wxRf7RQia4SCwQlXk0q6FCPrVng==",
      "dependencies": {
        "pg-int8": "1.0.1",
        "pg-numeric": "1.0.2",
        "postgres-array": "~3.0.1",
        "postgres-bytea": "~3.0.0",
        "postgres-date": "~2.1.0",
        "postgres-interval": "^3.0.0",
        "postgres-range": "^1.1.1"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@types/pg/node_modules/postgres-array": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/postgres-array/-/postgres-array-3.0.2.tgz",
      "integrity": "sha512-6faShkdFugNQCLwucjPcY5ARoW1SlbnrZjmGl0IrrqewpvxvhSLHimCVzqeuULCbG0fQv7Dtk1yDbG3xv7Veog==",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@types/pg/node_modules/postgres-bytea": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/postgres-bytea/-/postgres-bytea-3.0.0.tgz",
      "integrity": "sha512-CNd4jim9RFPkObHSjVHlVrxoVQXz7quwNFpz7RY1okNNme49+sVyiTvTRobiLV548Hx/hb1BG+iE7h9493WzFw==",
      "dependencies": {
        "obuf": "~1.1.2"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@types/pg/node_modules/postgres-date": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/postgres-date/-/postgres-date-2.1.0.tgz",
      "integrity": "sha512-K7Juri8gtgXVcDfZttFKVmhglp7epKb1K4pgrkLxehjqkrgPhfG6OO8LHLkfaqkbpjNRnra018XwAr1yQFWGcA==",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@types/pg/node_modules/postgres-interval": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/postgres-interval/-/postgres-interval-3.0.0.tgz",
      "integrity": "sha512-BSNDnbyZCXSxgA+1f5UU2GmwhoI0aU5yMxRGO8CdFEcY2BQF9xm/7MqKnYoM1nJDk8nONNWDk9WeSmePFhQdlw==",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/buffer-writer": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/buffer-writer/-/buffer-writer-2.0.0.tgz",
      "integrity": "sha512-a7ZpuTZU1TRtnwyCNW3I5dc0wWNC3VR9S++Ewyk2HHZdrO3CQJqSpd+95Us590V6AL7JqUAH2IwZ/398PmNFgw==",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/obuf": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/obuf/-/obuf-1.1.2.tgz",
      "integrity": "sha512-PX1wu0AmAdPqOL1mWhqmlOd8kOIZQwGZw6rh7uby9fTc5lhaOWFLX3I6R1hrF9k3zUY40e6igsLGkDXK92LJNg=="
    },
    "node_modules/packet-reader": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/packet-reader/-/packet-reader-1.0.0.tgz",
      "integrity": "sha512-HAKu/fG3HpHFO0AA8WE8q2g+gBJaZ9MG7fcKk+IJPLTGAD6Psw4443l+9DGRbOIh3/aXr7Phy0TjilYivJo5XQ=="
    },
    "node_modules/pg": {
      "version": "8.11.3",
      "resolved": "https://registry.npmjs.org/pg/-/pg-8.11.3.tgz",
      "integrity": "sha512-+9iuvG8QfaaUrrph+kpF24cXkH1YOOUeArRNYIxq1viYHZagBxrTno7cecY1Fa44tJeZvaoG+Djpkc3JwehN5g==",
      "dependencies": {
        "buffer-writer": "2.0.0",
        "packet-reader": "1.0.0",
        "pg-connection-string": "^2.6.2",
        "pg-pool": "^3.6.1",
        "pg-protocol": "^1.6.0",
        "pg-types": "^2.1.0",
        "pgpass": "1.x"
      },
      "engines": {
        "node": ">= 8.0.0"
      },
      "optionalDependencies": {
        "pg-cloudflare": "^1.1.1"
      },
      "peerDependencies": {
        "pg-native": ">=3.0.1"
      },
      "peerDependenciesMeta": {
        "pg-native": {
          "optional": true
        }
      }
    },
    "node_modules/pg-cloudflare": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/pg-cloudflare/-/pg-cloudflare-1.1.1.tgz",
      "integrity": "sha512-xWPagP/4B6BgFO+EKz3JONXv3YDgvkbVrGw2mTo3D6tVDQRh1e7cqVGvyR3BE+eQgAvx1XhW/iEASj4/jCWl3Q==",
      "optional": true
    },
    "node_modules/pg-connection-string": {
      "version": "2.6.2",
      "resolved": "https://registry.npmjs.org/pg-connection-string/-/pg-connection-string-2.6.2.tgz",
      "integrity": "sha512-ch6OwaeaPYcova4kKZ15sbJ2hKb/VP48ZD2gE7i1J+L4MspCtBMAx8nMgz7bksc7IojCIIWuEhHibSMFH8m8oA=="
    },
    "node_modules/pg-int8": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/pg-int8/-/pg-int8-1.0.1.tgz",
      "integrity": "sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw==",
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/pg-numeric": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/pg-numeric/-/pg-numeric-1.0.2.tgz",
      "integrity": "sha512-BM/Thnrw5jm2kKLE5uJkXqqExRUY/toLHda65XgFTBTFYZyopbKjBe29Ii3RbkvlsMoFwD+tHeGaCjjv0gHlyw==",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/pg-pool": {
      "version": "3.6.1",
      "resolved": "https://registry.npmjs.org/pg-pool/-/pg-pool-3.6.1.tgz",
      "integrity": "sha512-jizsIzhkIitxCGfPRzJn1ZdcosIt3pz9Sh3V01fm1vZnbnCMgmGl5wvGGdNN2EL9Rmb0EcFoCkixH4Pu+sP9Og==",
      "peerDependencies": {
        "pg": ">=8.0"
      }
    },
    "node_modules/pg-protocol": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/pg-protocol/-/pg-protocol-1.6.0.tgz",
      "integrity": "sha512-M+PDm637OY5WM307051+bsDia5Xej6d9IR4GwJse1qA1DIhiKlksvrneZOYQq42OM+spubpcNYEo2FcKQrDk+Q=="
    },
    "node_modules/pg-types": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/pg-types/-/pg-types-2.2.0.tgz",
      "integrity": "sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==",
      "dependencies": {
        "pg-int8": "1.0.1",
        "postgres-array": "~2.0.0",
        "postgres-bytea": "~1.0.0",
        "postgres-date": "~1.0.4",
        "postgres-interval": "^1.1.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/pgpass": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/pgpass/-/pgpass-1.0.5.tgz",
      "integrity": "sha512-FdW9r/jQZhSeohs1Z3sI1yxFQNFvMcnmfuj4WBMUTxOrAyLMaTcE1aAMBiTlbMNaXvBCQuVi0R7hd8udDSP7ug==",
      "dependencies": {
        "split2": "^4.1.0"
      }
    },
    "node_modules/postgres-array": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postgres-array/-/postgres-array-2.0.0.tgz",
      "integrity": "sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA==",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postgres-bytea": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/postgres-bytea/-/postgres-bytea-1.0.0.tgz",
      "integrity": "sha512-xy3pmLuQqRBZBXDULy7KbaitYqLcmxigw14Q5sj8QBVLqEwXfeybIKVWiqAXTlcvdvb0+xkOtDbfQMOf4lST1w==",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-date": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/postgres-date/-/postgres-date-1.0.7.tgz",
      "integrity": "sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q==",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-interval": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/postgres-interval/-/postgres-interval-1.2.0.tgz",
      "integrity": "sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==",
      "dependencies": {
        "xtend": "^4.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-range": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/postgres-range/-/postgres-range-1.1.4.tgz",
      "integrity": "sha512-i/hbxIE9803Alj/6ytL7UHQxRvZkI9O4Sy+J3HGc4F4oo/2eQAjTSNJ0bfxyse3bH0nuVesCk+3IRLaMtG3H6w=="
    },
    "node_modules/split2": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
      "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==",
      "engines": {
        "node": ">= 10.x"
      }
    },
    "node_modules/undici-types": {
      "version": "5.26.5",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-5.26.5.tgz",
      "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA=="
    },
    "node_modules/xtend": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
      "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==",
      "engines": {
        "node": ">=0.4"
      }
    }
  }
}

---

### 0-1/week10/postgres/package.json

{
  "name": "postgres",
  "version": "1.0.0",
  "description": "> # Creating a Postgres Database",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/pg": "^8.11.2",
    "pg": "^8.11.3"
  }
}

---

### 0-1/week10/postgres/src/index.ts

import { Client } from 'pg';

const client = new Client({
  connectionString: "ADD_YOUR_CONNECTION_STRING_HERE"
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

// 1. create a new table in the database Run this only once
async function createUserTable(){
  await client.connect();
  const result = await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await client.end();   // Close the connection
  console.log(result);
}
createUserTable();


// 2.  insert a new user into the database
async function insertUser(username: string, name: string, email: string, password: string) {
  try {
    const result = await client.query(`
      INSERT INTO users (username, name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [username, name, email, password]);

    console.log("User inserted:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting user:", error);
  }
}


// 3. Delete a user in the database
async function deleteUser(email: string) {
  try {
    const result = await client.query(`
      DELETE FROM users
      WHERE email = $1
      RETURNING *
    `, [email]);

    console.log("User deleted:", result.rows[0]);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}


// 4. get all users from the database
async function getUsers() {
  try {
    const result = await client.query(`
      SELECT * FROM users
    `);

    console.log("Users:", result.rows);
  } catch (error) {
    console.error("Error getting users:", error);
  }
}


connectToDatabase()
  .then(async () => {
    await insertUser("anshu2", "anshu", "anshu2@gmail.com", "12345")    // You can add more users here by calling this function multiple times with different values
    // await deleteUser("anshu2@gmail.com")
    // await getUsers()

    await client.end(); 
  }) 
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

---

### 0-1/week10/postgres/tsconfig.json

{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "./src",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

---

