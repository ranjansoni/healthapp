
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model daily_logs
 * 
 */
export type daily_logs = $Result.DefaultSelection<Prisma.$daily_logsPayload>
/**
 * Model routine_items
 * 
 */
export type routine_items = $Result.DefaultSelection<Prisma.$routine_itemsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Daily_logs
 * const daily_logs = await prisma.daily_logs.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Daily_logs
   * const daily_logs = await prisma.daily_logs.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.daily_logs`: Exposes CRUD operations for the **daily_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Daily_logs
    * const daily_logs = await prisma.daily_logs.findMany()
    * ```
    */
  get daily_logs(): Prisma.daily_logsDelegate<ExtArgs>;

  /**
   * `prisma.routine_items`: Exposes CRUD operations for the **routine_items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Routine_items
    * const routine_items = await prisma.routine_items.findMany()
    * ```
    */
  get routine_items(): Prisma.routine_itemsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    daily_logs: 'daily_logs',
    routine_items: 'routine_items'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "daily_logs" | "routine_items"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      daily_logs: {
        payload: Prisma.$daily_logsPayload<ExtArgs>
        fields: Prisma.daily_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.daily_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.daily_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload>
          }
          findFirst: {
            args: Prisma.daily_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.daily_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload>
          }
          findMany: {
            args: Prisma.daily_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload>[]
          }
          create: {
            args: Prisma.daily_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload>
          }
          createMany: {
            args: Prisma.daily_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.daily_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload>
          }
          update: {
            args: Prisma.daily_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload>
          }
          deleteMany: {
            args: Prisma.daily_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.daily_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.daily_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_logsPayload>
          }
          aggregate: {
            args: Prisma.Daily_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDaily_logs>
          }
          groupBy: {
            args: Prisma.daily_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Daily_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.daily_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Daily_logsCountAggregateOutputType> | number
          }
        }
      }
      routine_items: {
        payload: Prisma.$routine_itemsPayload<ExtArgs>
        fields: Prisma.routine_itemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.routine_itemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.routine_itemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload>
          }
          findFirst: {
            args: Prisma.routine_itemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.routine_itemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload>
          }
          findMany: {
            args: Prisma.routine_itemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload>[]
          }
          create: {
            args: Prisma.routine_itemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload>
          }
          createMany: {
            args: Prisma.routine_itemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.routine_itemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload>
          }
          update: {
            args: Prisma.routine_itemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload>
          }
          deleteMany: {
            args: Prisma.routine_itemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.routine_itemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.routine_itemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$routine_itemsPayload>
          }
          aggregate: {
            args: Prisma.Routine_itemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoutine_items>
          }
          groupBy: {
            args: Prisma.routine_itemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Routine_itemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.routine_itemsCountArgs<ExtArgs>
            result: $Utils.Optional<Routine_itemsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Routine_itemsCountOutputType
   */

  export type Routine_itemsCountOutputType = {
    daily_logs: number
  }

  export type Routine_itemsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    daily_logs?: boolean | Routine_itemsCountOutputTypeCountDaily_logsArgs
  }

  // Custom InputTypes
  /**
   * Routine_itemsCountOutputType without action
   */
  export type Routine_itemsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine_itemsCountOutputType
     */
    select?: Routine_itemsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Routine_itemsCountOutputType without action
   */
  export type Routine_itemsCountOutputTypeCountDaily_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: daily_logsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model daily_logs
   */

  export type AggregateDaily_logs = {
    _count: Daily_logsCountAggregateOutputType | null
    _avg: Daily_logsAvgAggregateOutputType | null
    _sum: Daily_logsSumAggregateOutputType | null
    _min: Daily_logsMinAggregateOutputType | null
    _max: Daily_logsMaxAggregateOutputType | null
  }

  export type Daily_logsAvgAggregateOutputType = {
    id: number | null
    routine_item_id: number | null
  }

  export type Daily_logsSumAggregateOutputType = {
    id: number | null
    routine_item_id: number | null
  }

  export type Daily_logsMinAggregateOutputType = {
    id: number | null
    date: Date | null
    routine_item_id: number | null
    status: boolean | null
    notes: string | null
  }

  export type Daily_logsMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    routine_item_id: number | null
    status: boolean | null
    notes: string | null
  }

  export type Daily_logsCountAggregateOutputType = {
    id: number
    date: number
    routine_item_id: number
    status: number
    notes: number
    _all: number
  }


  export type Daily_logsAvgAggregateInputType = {
    id?: true
    routine_item_id?: true
  }

  export type Daily_logsSumAggregateInputType = {
    id?: true
    routine_item_id?: true
  }

  export type Daily_logsMinAggregateInputType = {
    id?: true
    date?: true
    routine_item_id?: true
    status?: true
    notes?: true
  }

  export type Daily_logsMaxAggregateInputType = {
    id?: true
    date?: true
    routine_item_id?: true
    status?: true
    notes?: true
  }

  export type Daily_logsCountAggregateInputType = {
    id?: true
    date?: true
    routine_item_id?: true
    status?: true
    notes?: true
    _all?: true
  }

  export type Daily_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which daily_logs to aggregate.
     */
    where?: daily_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_logs to fetch.
     */
    orderBy?: daily_logsOrderByWithRelationInput | daily_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: daily_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned daily_logs
    **/
    _count?: true | Daily_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Daily_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Daily_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Daily_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Daily_logsMaxAggregateInputType
  }

  export type GetDaily_logsAggregateType<T extends Daily_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateDaily_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDaily_logs[P]>
      : GetScalarType<T[P], AggregateDaily_logs[P]>
  }




  export type daily_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: daily_logsWhereInput
    orderBy?: daily_logsOrderByWithAggregationInput | daily_logsOrderByWithAggregationInput[]
    by: Daily_logsScalarFieldEnum[] | Daily_logsScalarFieldEnum
    having?: daily_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Daily_logsCountAggregateInputType | true
    _avg?: Daily_logsAvgAggregateInputType
    _sum?: Daily_logsSumAggregateInputType
    _min?: Daily_logsMinAggregateInputType
    _max?: Daily_logsMaxAggregateInputType
  }

  export type Daily_logsGroupByOutputType = {
    id: number
    date: Date | null
    routine_item_id: number | null
    status: boolean | null
    notes: string | null
    _count: Daily_logsCountAggregateOutputType | null
    _avg: Daily_logsAvgAggregateOutputType | null
    _sum: Daily_logsSumAggregateOutputType | null
    _min: Daily_logsMinAggregateOutputType | null
    _max: Daily_logsMaxAggregateOutputType | null
  }

  type GetDaily_logsGroupByPayload<T extends daily_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Daily_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Daily_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Daily_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Daily_logsGroupByOutputType[P]>
        }
      >
    >


  export type daily_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    routine_item_id?: boolean
    status?: boolean
    notes?: boolean
    routine_items?: boolean | daily_logs$routine_itemsArgs<ExtArgs>
  }, ExtArgs["result"]["daily_logs"]>


  export type daily_logsSelectScalar = {
    id?: boolean
    date?: boolean
    routine_item_id?: boolean
    status?: boolean
    notes?: boolean
  }

  export type daily_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routine_items?: boolean | daily_logs$routine_itemsArgs<ExtArgs>
  }

  export type $daily_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "daily_logs"
    objects: {
      routine_items: Prisma.$routine_itemsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date | null
      routine_item_id: number | null
      status: boolean | null
      notes: string | null
    }, ExtArgs["result"]["daily_logs"]>
    composites: {}
  }

  type daily_logsGetPayload<S extends boolean | null | undefined | daily_logsDefaultArgs> = $Result.GetResult<Prisma.$daily_logsPayload, S>

  type daily_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<daily_logsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Daily_logsCountAggregateInputType | true
    }

  export interface daily_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['daily_logs'], meta: { name: 'daily_logs' } }
    /**
     * Find zero or one Daily_logs that matches the filter.
     * @param {daily_logsFindUniqueArgs} args - Arguments to find a Daily_logs
     * @example
     * // Get one Daily_logs
     * const daily_logs = await prisma.daily_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends daily_logsFindUniqueArgs>(args: SelectSubset<T, daily_logsFindUniqueArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Daily_logs that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {daily_logsFindUniqueOrThrowArgs} args - Arguments to find a Daily_logs
     * @example
     * // Get one Daily_logs
     * const daily_logs = await prisma.daily_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends daily_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, daily_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Daily_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_logsFindFirstArgs} args - Arguments to find a Daily_logs
     * @example
     * // Get one Daily_logs
     * const daily_logs = await prisma.daily_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends daily_logsFindFirstArgs>(args?: SelectSubset<T, daily_logsFindFirstArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Daily_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_logsFindFirstOrThrowArgs} args - Arguments to find a Daily_logs
     * @example
     * // Get one Daily_logs
     * const daily_logs = await prisma.daily_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends daily_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, daily_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Daily_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Daily_logs
     * const daily_logs = await prisma.daily_logs.findMany()
     * 
     * // Get first 10 Daily_logs
     * const daily_logs = await prisma.daily_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const daily_logsWithIdOnly = await prisma.daily_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends daily_logsFindManyArgs>(args?: SelectSubset<T, daily_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Daily_logs.
     * @param {daily_logsCreateArgs} args - Arguments to create a Daily_logs.
     * @example
     * // Create one Daily_logs
     * const Daily_logs = await prisma.daily_logs.create({
     *   data: {
     *     // ... data to create a Daily_logs
     *   }
     * })
     * 
     */
    create<T extends daily_logsCreateArgs>(args: SelectSubset<T, daily_logsCreateArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Daily_logs.
     * @param {daily_logsCreateManyArgs} args - Arguments to create many Daily_logs.
     * @example
     * // Create many Daily_logs
     * const daily_logs = await prisma.daily_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends daily_logsCreateManyArgs>(args?: SelectSubset<T, daily_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Daily_logs.
     * @param {daily_logsDeleteArgs} args - Arguments to delete one Daily_logs.
     * @example
     * // Delete one Daily_logs
     * const Daily_logs = await prisma.daily_logs.delete({
     *   where: {
     *     // ... filter to delete one Daily_logs
     *   }
     * })
     * 
     */
    delete<T extends daily_logsDeleteArgs>(args: SelectSubset<T, daily_logsDeleteArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Daily_logs.
     * @param {daily_logsUpdateArgs} args - Arguments to update one Daily_logs.
     * @example
     * // Update one Daily_logs
     * const daily_logs = await prisma.daily_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends daily_logsUpdateArgs>(args: SelectSubset<T, daily_logsUpdateArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Daily_logs.
     * @param {daily_logsDeleteManyArgs} args - Arguments to filter Daily_logs to delete.
     * @example
     * // Delete a few Daily_logs
     * const { count } = await prisma.daily_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends daily_logsDeleteManyArgs>(args?: SelectSubset<T, daily_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Daily_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Daily_logs
     * const daily_logs = await prisma.daily_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends daily_logsUpdateManyArgs>(args: SelectSubset<T, daily_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Daily_logs.
     * @param {daily_logsUpsertArgs} args - Arguments to update or create a Daily_logs.
     * @example
     * // Update or create a Daily_logs
     * const daily_logs = await prisma.daily_logs.upsert({
     *   create: {
     *     // ... data to create a Daily_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Daily_logs we want to update
     *   }
     * })
     */
    upsert<T extends daily_logsUpsertArgs>(args: SelectSubset<T, daily_logsUpsertArgs<ExtArgs>>): Prisma__daily_logsClient<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Daily_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_logsCountArgs} args - Arguments to filter Daily_logs to count.
     * @example
     * // Count the number of Daily_logs
     * const count = await prisma.daily_logs.count({
     *   where: {
     *     // ... the filter for the Daily_logs we want to count
     *   }
     * })
    **/
    count<T extends daily_logsCountArgs>(
      args?: Subset<T, daily_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Daily_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Daily_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Daily_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Daily_logsAggregateArgs>(args: Subset<T, Daily_logsAggregateArgs>): Prisma.PrismaPromise<GetDaily_logsAggregateType<T>>

    /**
     * Group by Daily_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends daily_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: daily_logsGroupByArgs['orderBy'] }
        : { orderBy?: daily_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, daily_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDaily_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the daily_logs model
   */
  readonly fields: daily_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for daily_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__daily_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    routine_items<T extends daily_logs$routine_itemsArgs<ExtArgs> = {}>(args?: Subset<T, daily_logs$routine_itemsArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the daily_logs model
   */ 
  interface daily_logsFieldRefs {
    readonly id: FieldRef<"daily_logs", 'Int'>
    readonly date: FieldRef<"daily_logs", 'DateTime'>
    readonly routine_item_id: FieldRef<"daily_logs", 'Int'>
    readonly status: FieldRef<"daily_logs", 'Boolean'>
    readonly notes: FieldRef<"daily_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * daily_logs findUnique
   */
  export type daily_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * Filter, which daily_logs to fetch.
     */
    where: daily_logsWhereUniqueInput
  }

  /**
   * daily_logs findUniqueOrThrow
   */
  export type daily_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * Filter, which daily_logs to fetch.
     */
    where: daily_logsWhereUniqueInput
  }

  /**
   * daily_logs findFirst
   */
  export type daily_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * Filter, which daily_logs to fetch.
     */
    where?: daily_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_logs to fetch.
     */
    orderBy?: daily_logsOrderByWithRelationInput | daily_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for daily_logs.
     */
    cursor?: daily_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of daily_logs.
     */
    distinct?: Daily_logsScalarFieldEnum | Daily_logsScalarFieldEnum[]
  }

  /**
   * daily_logs findFirstOrThrow
   */
  export type daily_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * Filter, which daily_logs to fetch.
     */
    where?: daily_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_logs to fetch.
     */
    orderBy?: daily_logsOrderByWithRelationInput | daily_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for daily_logs.
     */
    cursor?: daily_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of daily_logs.
     */
    distinct?: Daily_logsScalarFieldEnum | Daily_logsScalarFieldEnum[]
  }

  /**
   * daily_logs findMany
   */
  export type daily_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * Filter, which daily_logs to fetch.
     */
    where?: daily_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_logs to fetch.
     */
    orderBy?: daily_logsOrderByWithRelationInput | daily_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing daily_logs.
     */
    cursor?: daily_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_logs.
     */
    skip?: number
    distinct?: Daily_logsScalarFieldEnum | Daily_logsScalarFieldEnum[]
  }

  /**
   * daily_logs create
   */
  export type daily_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a daily_logs.
     */
    data?: XOR<daily_logsCreateInput, daily_logsUncheckedCreateInput>
  }

  /**
   * daily_logs createMany
   */
  export type daily_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many daily_logs.
     */
    data: daily_logsCreateManyInput | daily_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * daily_logs update
   */
  export type daily_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a daily_logs.
     */
    data: XOR<daily_logsUpdateInput, daily_logsUncheckedUpdateInput>
    /**
     * Choose, which daily_logs to update.
     */
    where: daily_logsWhereUniqueInput
  }

  /**
   * daily_logs updateMany
   */
  export type daily_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update daily_logs.
     */
    data: XOR<daily_logsUpdateManyMutationInput, daily_logsUncheckedUpdateManyInput>
    /**
     * Filter which daily_logs to update
     */
    where?: daily_logsWhereInput
  }

  /**
   * daily_logs upsert
   */
  export type daily_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the daily_logs to update in case it exists.
     */
    where: daily_logsWhereUniqueInput
    /**
     * In case the daily_logs found by the `where` argument doesn't exist, create a new daily_logs with this data.
     */
    create: XOR<daily_logsCreateInput, daily_logsUncheckedCreateInput>
    /**
     * In case the daily_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<daily_logsUpdateInput, daily_logsUncheckedUpdateInput>
  }

  /**
   * daily_logs delete
   */
  export type daily_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    /**
     * Filter which daily_logs to delete.
     */
    where: daily_logsWhereUniqueInput
  }

  /**
   * daily_logs deleteMany
   */
  export type daily_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which daily_logs to delete
     */
    where?: daily_logsWhereInput
  }

  /**
   * daily_logs.routine_items
   */
  export type daily_logs$routine_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    where?: routine_itemsWhereInput
  }

  /**
   * daily_logs without action
   */
  export type daily_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
  }


  /**
   * Model routine_items
   */

  export type AggregateRoutine_items = {
    _count: Routine_itemsCountAggregateOutputType | null
    _avg: Routine_itemsAvgAggregateOutputType | null
    _sum: Routine_itemsSumAggregateOutputType | null
    _min: Routine_itemsMinAggregateOutputType | null
    _max: Routine_itemsMaxAggregateOutputType | null
  }

  export type Routine_itemsAvgAggregateOutputType = {
    id: number | null
  }

  export type Routine_itemsSumAggregateOutputType = {
    id: number | null
  }

  export type Routine_itemsMinAggregateOutputType = {
    id: number | null
    time_of_day: string | null
    description: string | null
    category: string | null
    created_at: Date | null
    valid_from: Date | null
    valid_to: Date | null
    series_id: string | null
  }

  export type Routine_itemsMaxAggregateOutputType = {
    id: number | null
    time_of_day: string | null
    description: string | null
    category: string | null
    created_at: Date | null
    valid_from: Date | null
    valid_to: Date | null
    series_id: string | null
  }

  export type Routine_itemsCountAggregateOutputType = {
    id: number
    time_of_day: number
    description: number
    category: number
    created_at: number
    valid_from: number
    valid_to: number
    series_id: number
    _all: number
  }


  export type Routine_itemsAvgAggregateInputType = {
    id?: true
  }

  export type Routine_itemsSumAggregateInputType = {
    id?: true
  }

  export type Routine_itemsMinAggregateInputType = {
    id?: true
    time_of_day?: true
    description?: true
    category?: true
    created_at?: true
    valid_from?: true
    valid_to?: true
    series_id?: true
  }

  export type Routine_itemsMaxAggregateInputType = {
    id?: true
    time_of_day?: true
    description?: true
    category?: true
    created_at?: true
    valid_from?: true
    valid_to?: true
    series_id?: true
  }

  export type Routine_itemsCountAggregateInputType = {
    id?: true
    time_of_day?: true
    description?: true
    category?: true
    created_at?: true
    valid_from?: true
    valid_to?: true
    series_id?: true
    _all?: true
  }

  export type Routine_itemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which routine_items to aggregate.
     */
    where?: routine_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of routine_items to fetch.
     */
    orderBy?: routine_itemsOrderByWithRelationInput | routine_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: routine_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` routine_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` routine_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned routine_items
    **/
    _count?: true | Routine_itemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Routine_itemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Routine_itemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Routine_itemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Routine_itemsMaxAggregateInputType
  }

  export type GetRoutine_itemsAggregateType<T extends Routine_itemsAggregateArgs> = {
        [P in keyof T & keyof AggregateRoutine_items]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoutine_items[P]>
      : GetScalarType<T[P], AggregateRoutine_items[P]>
  }




  export type routine_itemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: routine_itemsWhereInput
    orderBy?: routine_itemsOrderByWithAggregationInput | routine_itemsOrderByWithAggregationInput[]
    by: Routine_itemsScalarFieldEnum[] | Routine_itemsScalarFieldEnum
    having?: routine_itemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Routine_itemsCountAggregateInputType | true
    _avg?: Routine_itemsAvgAggregateInputType
    _sum?: Routine_itemsSumAggregateInputType
    _min?: Routine_itemsMinAggregateInputType
    _max?: Routine_itemsMaxAggregateInputType
  }

  export type Routine_itemsGroupByOutputType = {
    id: number
    time_of_day: string | null
    description: string | null
    category: string | null
    created_at: Date | null
    valid_from: Date | null
    valid_to: Date | null
    series_id: string | null
    _count: Routine_itemsCountAggregateOutputType | null
    _avg: Routine_itemsAvgAggregateOutputType | null
    _sum: Routine_itemsSumAggregateOutputType | null
    _min: Routine_itemsMinAggregateOutputType | null
    _max: Routine_itemsMaxAggregateOutputType | null
  }

  type GetRoutine_itemsGroupByPayload<T extends routine_itemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Routine_itemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Routine_itemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Routine_itemsGroupByOutputType[P]>
            : GetScalarType<T[P], Routine_itemsGroupByOutputType[P]>
        }
      >
    >


  export type routine_itemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    time_of_day?: boolean
    description?: boolean
    category?: boolean
    created_at?: boolean
    valid_from?: boolean
    valid_to?: boolean
    series_id?: boolean
    daily_logs?: boolean | routine_items$daily_logsArgs<ExtArgs>
    _count?: boolean | Routine_itemsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routine_items"]>


  export type routine_itemsSelectScalar = {
    id?: boolean
    time_of_day?: boolean
    description?: boolean
    category?: boolean
    created_at?: boolean
    valid_from?: boolean
    valid_to?: boolean
    series_id?: boolean
  }

  export type routine_itemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    daily_logs?: boolean | routine_items$daily_logsArgs<ExtArgs>
    _count?: boolean | Routine_itemsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $routine_itemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "routine_items"
    objects: {
      daily_logs: Prisma.$daily_logsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      time_of_day: string | null
      description: string | null
      category: string | null
      created_at: Date | null
      valid_from: Date | null
      valid_to: Date | null
      series_id: string | null
    }, ExtArgs["result"]["routine_items"]>
    composites: {}
  }

  type routine_itemsGetPayload<S extends boolean | null | undefined | routine_itemsDefaultArgs> = $Result.GetResult<Prisma.$routine_itemsPayload, S>

  type routine_itemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<routine_itemsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Routine_itemsCountAggregateInputType | true
    }

  export interface routine_itemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['routine_items'], meta: { name: 'routine_items' } }
    /**
     * Find zero or one Routine_items that matches the filter.
     * @param {routine_itemsFindUniqueArgs} args - Arguments to find a Routine_items
     * @example
     * // Get one Routine_items
     * const routine_items = await prisma.routine_items.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends routine_itemsFindUniqueArgs>(args: SelectSubset<T, routine_itemsFindUniqueArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Routine_items that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {routine_itemsFindUniqueOrThrowArgs} args - Arguments to find a Routine_items
     * @example
     * // Get one Routine_items
     * const routine_items = await prisma.routine_items.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends routine_itemsFindUniqueOrThrowArgs>(args: SelectSubset<T, routine_itemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Routine_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {routine_itemsFindFirstArgs} args - Arguments to find a Routine_items
     * @example
     * // Get one Routine_items
     * const routine_items = await prisma.routine_items.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends routine_itemsFindFirstArgs>(args?: SelectSubset<T, routine_itemsFindFirstArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Routine_items that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {routine_itemsFindFirstOrThrowArgs} args - Arguments to find a Routine_items
     * @example
     * // Get one Routine_items
     * const routine_items = await prisma.routine_items.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends routine_itemsFindFirstOrThrowArgs>(args?: SelectSubset<T, routine_itemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Routine_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {routine_itemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routine_items
     * const routine_items = await prisma.routine_items.findMany()
     * 
     * // Get first 10 Routine_items
     * const routine_items = await prisma.routine_items.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routine_itemsWithIdOnly = await prisma.routine_items.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends routine_itemsFindManyArgs>(args?: SelectSubset<T, routine_itemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Routine_items.
     * @param {routine_itemsCreateArgs} args - Arguments to create a Routine_items.
     * @example
     * // Create one Routine_items
     * const Routine_items = await prisma.routine_items.create({
     *   data: {
     *     // ... data to create a Routine_items
     *   }
     * })
     * 
     */
    create<T extends routine_itemsCreateArgs>(args: SelectSubset<T, routine_itemsCreateArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Routine_items.
     * @param {routine_itemsCreateManyArgs} args - Arguments to create many Routine_items.
     * @example
     * // Create many Routine_items
     * const routine_items = await prisma.routine_items.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends routine_itemsCreateManyArgs>(args?: SelectSubset<T, routine_itemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Routine_items.
     * @param {routine_itemsDeleteArgs} args - Arguments to delete one Routine_items.
     * @example
     * // Delete one Routine_items
     * const Routine_items = await prisma.routine_items.delete({
     *   where: {
     *     // ... filter to delete one Routine_items
     *   }
     * })
     * 
     */
    delete<T extends routine_itemsDeleteArgs>(args: SelectSubset<T, routine_itemsDeleteArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Routine_items.
     * @param {routine_itemsUpdateArgs} args - Arguments to update one Routine_items.
     * @example
     * // Update one Routine_items
     * const routine_items = await prisma.routine_items.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends routine_itemsUpdateArgs>(args: SelectSubset<T, routine_itemsUpdateArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Routine_items.
     * @param {routine_itemsDeleteManyArgs} args - Arguments to filter Routine_items to delete.
     * @example
     * // Delete a few Routine_items
     * const { count } = await prisma.routine_items.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends routine_itemsDeleteManyArgs>(args?: SelectSubset<T, routine_itemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routine_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {routine_itemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routine_items
     * const routine_items = await prisma.routine_items.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends routine_itemsUpdateManyArgs>(args: SelectSubset<T, routine_itemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Routine_items.
     * @param {routine_itemsUpsertArgs} args - Arguments to update or create a Routine_items.
     * @example
     * // Update or create a Routine_items
     * const routine_items = await prisma.routine_items.upsert({
     *   create: {
     *     // ... data to create a Routine_items
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Routine_items we want to update
     *   }
     * })
     */
    upsert<T extends routine_itemsUpsertArgs>(args: SelectSubset<T, routine_itemsUpsertArgs<ExtArgs>>): Prisma__routine_itemsClient<$Result.GetResult<Prisma.$routine_itemsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Routine_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {routine_itemsCountArgs} args - Arguments to filter Routine_items to count.
     * @example
     * // Count the number of Routine_items
     * const count = await prisma.routine_items.count({
     *   where: {
     *     // ... the filter for the Routine_items we want to count
     *   }
     * })
    **/
    count<T extends routine_itemsCountArgs>(
      args?: Subset<T, routine_itemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Routine_itemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Routine_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Routine_itemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Routine_itemsAggregateArgs>(args: Subset<T, Routine_itemsAggregateArgs>): Prisma.PrismaPromise<GetRoutine_itemsAggregateType<T>>

    /**
     * Group by Routine_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {routine_itemsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends routine_itemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: routine_itemsGroupByArgs['orderBy'] }
        : { orderBy?: routine_itemsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, routine_itemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoutine_itemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the routine_items model
   */
  readonly fields: routine_itemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for routine_items.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__routine_itemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    daily_logs<T extends routine_items$daily_logsArgs<ExtArgs> = {}>(args?: Subset<T, routine_items$daily_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_logsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the routine_items model
   */ 
  interface routine_itemsFieldRefs {
    readonly id: FieldRef<"routine_items", 'Int'>
    readonly time_of_day: FieldRef<"routine_items", 'String'>
    readonly description: FieldRef<"routine_items", 'String'>
    readonly category: FieldRef<"routine_items", 'String'>
    readonly created_at: FieldRef<"routine_items", 'DateTime'>
    readonly valid_from: FieldRef<"routine_items", 'DateTime'>
    readonly valid_to: FieldRef<"routine_items", 'DateTime'>
    readonly series_id: FieldRef<"routine_items", 'String'>
  }
    

  // Custom InputTypes
  /**
   * routine_items findUnique
   */
  export type routine_itemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * Filter, which routine_items to fetch.
     */
    where: routine_itemsWhereUniqueInput
  }

  /**
   * routine_items findUniqueOrThrow
   */
  export type routine_itemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * Filter, which routine_items to fetch.
     */
    where: routine_itemsWhereUniqueInput
  }

  /**
   * routine_items findFirst
   */
  export type routine_itemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * Filter, which routine_items to fetch.
     */
    where?: routine_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of routine_items to fetch.
     */
    orderBy?: routine_itemsOrderByWithRelationInput | routine_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for routine_items.
     */
    cursor?: routine_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` routine_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` routine_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of routine_items.
     */
    distinct?: Routine_itemsScalarFieldEnum | Routine_itemsScalarFieldEnum[]
  }

  /**
   * routine_items findFirstOrThrow
   */
  export type routine_itemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * Filter, which routine_items to fetch.
     */
    where?: routine_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of routine_items to fetch.
     */
    orderBy?: routine_itemsOrderByWithRelationInput | routine_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for routine_items.
     */
    cursor?: routine_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` routine_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` routine_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of routine_items.
     */
    distinct?: Routine_itemsScalarFieldEnum | Routine_itemsScalarFieldEnum[]
  }

  /**
   * routine_items findMany
   */
  export type routine_itemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * Filter, which routine_items to fetch.
     */
    where?: routine_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of routine_items to fetch.
     */
    orderBy?: routine_itemsOrderByWithRelationInput | routine_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing routine_items.
     */
    cursor?: routine_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` routine_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` routine_items.
     */
    skip?: number
    distinct?: Routine_itemsScalarFieldEnum | Routine_itemsScalarFieldEnum[]
  }

  /**
   * routine_items create
   */
  export type routine_itemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * The data needed to create a routine_items.
     */
    data?: XOR<routine_itemsCreateInput, routine_itemsUncheckedCreateInput>
  }

  /**
   * routine_items createMany
   */
  export type routine_itemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many routine_items.
     */
    data: routine_itemsCreateManyInput | routine_itemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * routine_items update
   */
  export type routine_itemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * The data needed to update a routine_items.
     */
    data: XOR<routine_itemsUpdateInput, routine_itemsUncheckedUpdateInput>
    /**
     * Choose, which routine_items to update.
     */
    where: routine_itemsWhereUniqueInput
  }

  /**
   * routine_items updateMany
   */
  export type routine_itemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update routine_items.
     */
    data: XOR<routine_itemsUpdateManyMutationInput, routine_itemsUncheckedUpdateManyInput>
    /**
     * Filter which routine_items to update
     */
    where?: routine_itemsWhereInput
  }

  /**
   * routine_items upsert
   */
  export type routine_itemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * The filter to search for the routine_items to update in case it exists.
     */
    where: routine_itemsWhereUniqueInput
    /**
     * In case the routine_items found by the `where` argument doesn't exist, create a new routine_items with this data.
     */
    create: XOR<routine_itemsCreateInput, routine_itemsUncheckedCreateInput>
    /**
     * In case the routine_items was found with the provided `where` argument, update it with this data.
     */
    update: XOR<routine_itemsUpdateInput, routine_itemsUncheckedUpdateInput>
  }

  /**
   * routine_items delete
   */
  export type routine_itemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
    /**
     * Filter which routine_items to delete.
     */
    where: routine_itemsWhereUniqueInput
  }

  /**
   * routine_items deleteMany
   */
  export type routine_itemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which routine_items to delete
     */
    where?: routine_itemsWhereInput
  }

  /**
   * routine_items.daily_logs
   */
  export type routine_items$daily_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_logs
     */
    select?: daily_logsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_logsInclude<ExtArgs> | null
    where?: daily_logsWhereInput
    orderBy?: daily_logsOrderByWithRelationInput | daily_logsOrderByWithRelationInput[]
    cursor?: daily_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Daily_logsScalarFieldEnum | Daily_logsScalarFieldEnum[]
  }

  /**
   * routine_items without action
   */
  export type routine_itemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the routine_items
     */
    select?: routine_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: routine_itemsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Daily_logsScalarFieldEnum: {
    id: 'id',
    date: 'date',
    routine_item_id: 'routine_item_id',
    status: 'status',
    notes: 'notes'
  };

  export type Daily_logsScalarFieldEnum = (typeof Daily_logsScalarFieldEnum)[keyof typeof Daily_logsScalarFieldEnum]


  export const Routine_itemsScalarFieldEnum: {
    id: 'id',
    time_of_day: 'time_of_day',
    description: 'description',
    category: 'category',
    created_at: 'created_at',
    valid_from: 'valid_from',
    valid_to: 'valid_to',
    series_id: 'series_id'
  };

  export type Routine_itemsScalarFieldEnum = (typeof Routine_itemsScalarFieldEnum)[keyof typeof Routine_itemsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type daily_logsWhereInput = {
    AND?: daily_logsWhereInput | daily_logsWhereInput[]
    OR?: daily_logsWhereInput[]
    NOT?: daily_logsWhereInput | daily_logsWhereInput[]
    id?: IntFilter<"daily_logs"> | number
    date?: DateTimeNullableFilter<"daily_logs"> | Date | string | null
    routine_item_id?: IntNullableFilter<"daily_logs"> | number | null
    status?: BoolNullableFilter<"daily_logs"> | boolean | null
    notes?: StringNullableFilter<"daily_logs"> | string | null
    routine_items?: XOR<Routine_itemsNullableRelationFilter, routine_itemsWhereInput> | null
  }

  export type daily_logsOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrderInput | SortOrder
    routine_item_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    routine_items?: routine_itemsOrderByWithRelationInput
  }

  export type daily_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    date_routine_item_id?: daily_logsDateRoutine_item_idCompoundUniqueInput
    AND?: daily_logsWhereInput | daily_logsWhereInput[]
    OR?: daily_logsWhereInput[]
    NOT?: daily_logsWhereInput | daily_logsWhereInput[]
    date?: DateTimeNullableFilter<"daily_logs"> | Date | string | null
    routine_item_id?: IntNullableFilter<"daily_logs"> | number | null
    status?: BoolNullableFilter<"daily_logs"> | boolean | null
    notes?: StringNullableFilter<"daily_logs"> | string | null
    routine_items?: XOR<Routine_itemsNullableRelationFilter, routine_itemsWhereInput> | null
  }, "id" | "date_routine_item_id">

  export type daily_logsOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrderInput | SortOrder
    routine_item_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: daily_logsCountOrderByAggregateInput
    _avg?: daily_logsAvgOrderByAggregateInput
    _max?: daily_logsMaxOrderByAggregateInput
    _min?: daily_logsMinOrderByAggregateInput
    _sum?: daily_logsSumOrderByAggregateInput
  }

  export type daily_logsScalarWhereWithAggregatesInput = {
    AND?: daily_logsScalarWhereWithAggregatesInput | daily_logsScalarWhereWithAggregatesInput[]
    OR?: daily_logsScalarWhereWithAggregatesInput[]
    NOT?: daily_logsScalarWhereWithAggregatesInput | daily_logsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"daily_logs"> | number
    date?: DateTimeNullableWithAggregatesFilter<"daily_logs"> | Date | string | null
    routine_item_id?: IntNullableWithAggregatesFilter<"daily_logs"> | number | null
    status?: BoolNullableWithAggregatesFilter<"daily_logs"> | boolean | null
    notes?: StringNullableWithAggregatesFilter<"daily_logs"> | string | null
  }

  export type routine_itemsWhereInput = {
    AND?: routine_itemsWhereInput | routine_itemsWhereInput[]
    OR?: routine_itemsWhereInput[]
    NOT?: routine_itemsWhereInput | routine_itemsWhereInput[]
    id?: IntFilter<"routine_items"> | number
    time_of_day?: StringNullableFilter<"routine_items"> | string | null
    description?: StringNullableFilter<"routine_items"> | string | null
    category?: StringNullableFilter<"routine_items"> | string | null
    created_at?: DateTimeNullableFilter<"routine_items"> | Date | string | null
    valid_from?: DateTimeNullableFilter<"routine_items"> | Date | string | null
    valid_to?: DateTimeNullableFilter<"routine_items"> | Date | string | null
    series_id?: StringNullableFilter<"routine_items"> | string | null
    daily_logs?: Daily_logsListRelationFilter
  }

  export type routine_itemsOrderByWithRelationInput = {
    id?: SortOrder
    time_of_day?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    valid_from?: SortOrderInput | SortOrder
    valid_to?: SortOrderInput | SortOrder
    series_id?: SortOrderInput | SortOrder
    daily_logs?: daily_logsOrderByRelationAggregateInput
  }

  export type routine_itemsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: routine_itemsWhereInput | routine_itemsWhereInput[]
    OR?: routine_itemsWhereInput[]
    NOT?: routine_itemsWhereInput | routine_itemsWhereInput[]
    time_of_day?: StringNullableFilter<"routine_items"> | string | null
    description?: StringNullableFilter<"routine_items"> | string | null
    category?: StringNullableFilter<"routine_items"> | string | null
    created_at?: DateTimeNullableFilter<"routine_items"> | Date | string | null
    valid_from?: DateTimeNullableFilter<"routine_items"> | Date | string | null
    valid_to?: DateTimeNullableFilter<"routine_items"> | Date | string | null
    series_id?: StringNullableFilter<"routine_items"> | string | null
    daily_logs?: Daily_logsListRelationFilter
  }, "id">

  export type routine_itemsOrderByWithAggregationInput = {
    id?: SortOrder
    time_of_day?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    valid_from?: SortOrderInput | SortOrder
    valid_to?: SortOrderInput | SortOrder
    series_id?: SortOrderInput | SortOrder
    _count?: routine_itemsCountOrderByAggregateInput
    _avg?: routine_itemsAvgOrderByAggregateInput
    _max?: routine_itemsMaxOrderByAggregateInput
    _min?: routine_itemsMinOrderByAggregateInput
    _sum?: routine_itemsSumOrderByAggregateInput
  }

  export type routine_itemsScalarWhereWithAggregatesInput = {
    AND?: routine_itemsScalarWhereWithAggregatesInput | routine_itemsScalarWhereWithAggregatesInput[]
    OR?: routine_itemsScalarWhereWithAggregatesInput[]
    NOT?: routine_itemsScalarWhereWithAggregatesInput | routine_itemsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"routine_items"> | number
    time_of_day?: StringNullableWithAggregatesFilter<"routine_items"> | string | null
    description?: StringNullableWithAggregatesFilter<"routine_items"> | string | null
    category?: StringNullableWithAggregatesFilter<"routine_items"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"routine_items"> | Date | string | null
    valid_from?: DateTimeNullableWithAggregatesFilter<"routine_items"> | Date | string | null
    valid_to?: DateTimeNullableWithAggregatesFilter<"routine_items"> | Date | string | null
    series_id?: StringNullableWithAggregatesFilter<"routine_items"> | string | null
  }

  export type daily_logsCreateInput = {
    date?: Date | string | null
    status?: boolean | null
    notes?: string | null
    routine_items?: routine_itemsCreateNestedOneWithoutDaily_logsInput
  }

  export type daily_logsUncheckedCreateInput = {
    id?: number
    date?: Date | string | null
    routine_item_id?: number | null
    status?: boolean | null
    notes?: string | null
  }

  export type daily_logsUpdateInput = {
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    routine_items?: routine_itemsUpdateOneWithoutDaily_logsNestedInput
  }

  export type daily_logsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routine_item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type daily_logsCreateManyInput = {
    id?: number
    date?: Date | string | null
    routine_item_id?: number | null
    status?: boolean | null
    notes?: string | null
  }

  export type daily_logsUpdateManyMutationInput = {
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type daily_logsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routine_item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type routine_itemsCreateInput = {
    time_of_day?: string | null
    description?: string | null
    category?: string | null
    created_at?: Date | string | null
    valid_from?: Date | string | null
    valid_to?: Date | string | null
    series_id?: string | null
    daily_logs?: daily_logsCreateNestedManyWithoutRoutine_itemsInput
  }

  export type routine_itemsUncheckedCreateInput = {
    id?: number
    time_of_day?: string | null
    description?: string | null
    category?: string | null
    created_at?: Date | string | null
    valid_from?: Date | string | null
    valid_to?: Date | string | null
    series_id?: string | null
    daily_logs?: daily_logsUncheckedCreateNestedManyWithoutRoutine_itemsInput
  }

  export type routine_itemsUpdateInput = {
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    series_id?: NullableStringFieldUpdateOperationsInput | string | null
    daily_logs?: daily_logsUpdateManyWithoutRoutine_itemsNestedInput
  }

  export type routine_itemsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    series_id?: NullableStringFieldUpdateOperationsInput | string | null
    daily_logs?: daily_logsUncheckedUpdateManyWithoutRoutine_itemsNestedInput
  }

  export type routine_itemsCreateManyInput = {
    id?: number
    time_of_day?: string | null
    description?: string | null
    category?: string | null
    created_at?: Date | string | null
    valid_from?: Date | string | null
    valid_to?: Date | string | null
    series_id?: string | null
  }

  export type routine_itemsUpdateManyMutationInput = {
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    series_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type routine_itemsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    series_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Routine_itemsNullableRelationFilter = {
    is?: routine_itemsWhereInput | null
    isNot?: routine_itemsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type daily_logsDateRoutine_item_idCompoundUniqueInput = {
    date: Date | string
    routine_item_id: number
  }

  export type daily_logsCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    routine_item_id?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type daily_logsAvgOrderByAggregateInput = {
    id?: SortOrder
    routine_item_id?: SortOrder
  }

  export type daily_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    routine_item_id?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type daily_logsMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    routine_item_id?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type daily_logsSumOrderByAggregateInput = {
    id?: SortOrder
    routine_item_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Daily_logsListRelationFilter = {
    every?: daily_logsWhereInput
    some?: daily_logsWhereInput
    none?: daily_logsWhereInput
  }

  export type daily_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type routine_itemsCountOrderByAggregateInput = {
    id?: SortOrder
    time_of_day?: SortOrder
    description?: SortOrder
    category?: SortOrder
    created_at?: SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    series_id?: SortOrder
  }

  export type routine_itemsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type routine_itemsMaxOrderByAggregateInput = {
    id?: SortOrder
    time_of_day?: SortOrder
    description?: SortOrder
    category?: SortOrder
    created_at?: SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    series_id?: SortOrder
  }

  export type routine_itemsMinOrderByAggregateInput = {
    id?: SortOrder
    time_of_day?: SortOrder
    description?: SortOrder
    category?: SortOrder
    created_at?: SortOrder
    valid_from?: SortOrder
    valid_to?: SortOrder
    series_id?: SortOrder
  }

  export type routine_itemsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type routine_itemsCreateNestedOneWithoutDaily_logsInput = {
    create?: XOR<routine_itemsCreateWithoutDaily_logsInput, routine_itemsUncheckedCreateWithoutDaily_logsInput>
    connectOrCreate?: routine_itemsCreateOrConnectWithoutDaily_logsInput
    connect?: routine_itemsWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type routine_itemsUpdateOneWithoutDaily_logsNestedInput = {
    create?: XOR<routine_itemsCreateWithoutDaily_logsInput, routine_itemsUncheckedCreateWithoutDaily_logsInput>
    connectOrCreate?: routine_itemsCreateOrConnectWithoutDaily_logsInput
    upsert?: routine_itemsUpsertWithoutDaily_logsInput
    disconnect?: routine_itemsWhereInput | boolean
    delete?: routine_itemsWhereInput | boolean
    connect?: routine_itemsWhereUniqueInput
    update?: XOR<XOR<routine_itemsUpdateToOneWithWhereWithoutDaily_logsInput, routine_itemsUpdateWithoutDaily_logsInput>, routine_itemsUncheckedUpdateWithoutDaily_logsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type daily_logsCreateNestedManyWithoutRoutine_itemsInput = {
    create?: XOR<daily_logsCreateWithoutRoutine_itemsInput, daily_logsUncheckedCreateWithoutRoutine_itemsInput> | daily_logsCreateWithoutRoutine_itemsInput[] | daily_logsUncheckedCreateWithoutRoutine_itemsInput[]
    connectOrCreate?: daily_logsCreateOrConnectWithoutRoutine_itemsInput | daily_logsCreateOrConnectWithoutRoutine_itemsInput[]
    createMany?: daily_logsCreateManyRoutine_itemsInputEnvelope
    connect?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
  }

  export type daily_logsUncheckedCreateNestedManyWithoutRoutine_itemsInput = {
    create?: XOR<daily_logsCreateWithoutRoutine_itemsInput, daily_logsUncheckedCreateWithoutRoutine_itemsInput> | daily_logsCreateWithoutRoutine_itemsInput[] | daily_logsUncheckedCreateWithoutRoutine_itemsInput[]
    connectOrCreate?: daily_logsCreateOrConnectWithoutRoutine_itemsInput | daily_logsCreateOrConnectWithoutRoutine_itemsInput[]
    createMany?: daily_logsCreateManyRoutine_itemsInputEnvelope
    connect?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
  }

  export type daily_logsUpdateManyWithoutRoutine_itemsNestedInput = {
    create?: XOR<daily_logsCreateWithoutRoutine_itemsInput, daily_logsUncheckedCreateWithoutRoutine_itemsInput> | daily_logsCreateWithoutRoutine_itemsInput[] | daily_logsUncheckedCreateWithoutRoutine_itemsInput[]
    connectOrCreate?: daily_logsCreateOrConnectWithoutRoutine_itemsInput | daily_logsCreateOrConnectWithoutRoutine_itemsInput[]
    upsert?: daily_logsUpsertWithWhereUniqueWithoutRoutine_itemsInput | daily_logsUpsertWithWhereUniqueWithoutRoutine_itemsInput[]
    createMany?: daily_logsCreateManyRoutine_itemsInputEnvelope
    set?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    disconnect?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    delete?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    connect?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    update?: daily_logsUpdateWithWhereUniqueWithoutRoutine_itemsInput | daily_logsUpdateWithWhereUniqueWithoutRoutine_itemsInput[]
    updateMany?: daily_logsUpdateManyWithWhereWithoutRoutine_itemsInput | daily_logsUpdateManyWithWhereWithoutRoutine_itemsInput[]
    deleteMany?: daily_logsScalarWhereInput | daily_logsScalarWhereInput[]
  }

  export type daily_logsUncheckedUpdateManyWithoutRoutine_itemsNestedInput = {
    create?: XOR<daily_logsCreateWithoutRoutine_itemsInput, daily_logsUncheckedCreateWithoutRoutine_itemsInput> | daily_logsCreateWithoutRoutine_itemsInput[] | daily_logsUncheckedCreateWithoutRoutine_itemsInput[]
    connectOrCreate?: daily_logsCreateOrConnectWithoutRoutine_itemsInput | daily_logsCreateOrConnectWithoutRoutine_itemsInput[]
    upsert?: daily_logsUpsertWithWhereUniqueWithoutRoutine_itemsInput | daily_logsUpsertWithWhereUniqueWithoutRoutine_itemsInput[]
    createMany?: daily_logsCreateManyRoutine_itemsInputEnvelope
    set?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    disconnect?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    delete?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    connect?: daily_logsWhereUniqueInput | daily_logsWhereUniqueInput[]
    update?: daily_logsUpdateWithWhereUniqueWithoutRoutine_itemsInput | daily_logsUpdateWithWhereUniqueWithoutRoutine_itemsInput[]
    updateMany?: daily_logsUpdateManyWithWhereWithoutRoutine_itemsInput | daily_logsUpdateManyWithWhereWithoutRoutine_itemsInput[]
    deleteMany?: daily_logsScalarWhereInput | daily_logsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type routine_itemsCreateWithoutDaily_logsInput = {
    time_of_day?: string | null
    description?: string | null
    category?: string | null
    created_at?: Date | string | null
    valid_from?: Date | string | null
    valid_to?: Date | string | null
    series_id?: string | null
  }

  export type routine_itemsUncheckedCreateWithoutDaily_logsInput = {
    id?: number
    time_of_day?: string | null
    description?: string | null
    category?: string | null
    created_at?: Date | string | null
    valid_from?: Date | string | null
    valid_to?: Date | string | null
    series_id?: string | null
  }

  export type routine_itemsCreateOrConnectWithoutDaily_logsInput = {
    where: routine_itemsWhereUniqueInput
    create: XOR<routine_itemsCreateWithoutDaily_logsInput, routine_itemsUncheckedCreateWithoutDaily_logsInput>
  }

  export type routine_itemsUpsertWithoutDaily_logsInput = {
    update: XOR<routine_itemsUpdateWithoutDaily_logsInput, routine_itemsUncheckedUpdateWithoutDaily_logsInput>
    create: XOR<routine_itemsCreateWithoutDaily_logsInput, routine_itemsUncheckedCreateWithoutDaily_logsInput>
    where?: routine_itemsWhereInput
  }

  export type routine_itemsUpdateToOneWithWhereWithoutDaily_logsInput = {
    where?: routine_itemsWhereInput
    data: XOR<routine_itemsUpdateWithoutDaily_logsInput, routine_itemsUncheckedUpdateWithoutDaily_logsInput>
  }

  export type routine_itemsUpdateWithoutDaily_logsInput = {
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    series_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type routine_itemsUncheckedUpdateWithoutDaily_logsInput = {
    id?: IntFieldUpdateOperationsInput | number
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    series_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type daily_logsCreateWithoutRoutine_itemsInput = {
    date?: Date | string | null
    status?: boolean | null
    notes?: string | null
  }

  export type daily_logsUncheckedCreateWithoutRoutine_itemsInput = {
    id?: number
    date?: Date | string | null
    status?: boolean | null
    notes?: string | null
  }

  export type daily_logsCreateOrConnectWithoutRoutine_itemsInput = {
    where: daily_logsWhereUniqueInput
    create: XOR<daily_logsCreateWithoutRoutine_itemsInput, daily_logsUncheckedCreateWithoutRoutine_itemsInput>
  }

  export type daily_logsCreateManyRoutine_itemsInputEnvelope = {
    data: daily_logsCreateManyRoutine_itemsInput | daily_logsCreateManyRoutine_itemsInput[]
    skipDuplicates?: boolean
  }

  export type daily_logsUpsertWithWhereUniqueWithoutRoutine_itemsInput = {
    where: daily_logsWhereUniqueInput
    update: XOR<daily_logsUpdateWithoutRoutine_itemsInput, daily_logsUncheckedUpdateWithoutRoutine_itemsInput>
    create: XOR<daily_logsCreateWithoutRoutine_itemsInput, daily_logsUncheckedCreateWithoutRoutine_itemsInput>
  }

  export type daily_logsUpdateWithWhereUniqueWithoutRoutine_itemsInput = {
    where: daily_logsWhereUniqueInput
    data: XOR<daily_logsUpdateWithoutRoutine_itemsInput, daily_logsUncheckedUpdateWithoutRoutine_itemsInput>
  }

  export type daily_logsUpdateManyWithWhereWithoutRoutine_itemsInput = {
    where: daily_logsScalarWhereInput
    data: XOR<daily_logsUpdateManyMutationInput, daily_logsUncheckedUpdateManyWithoutRoutine_itemsInput>
  }

  export type daily_logsScalarWhereInput = {
    AND?: daily_logsScalarWhereInput | daily_logsScalarWhereInput[]
    OR?: daily_logsScalarWhereInput[]
    NOT?: daily_logsScalarWhereInput | daily_logsScalarWhereInput[]
    id?: IntFilter<"daily_logs"> | number
    date?: DateTimeNullableFilter<"daily_logs"> | Date | string | null
    routine_item_id?: IntNullableFilter<"daily_logs"> | number | null
    status?: BoolNullableFilter<"daily_logs"> | boolean | null
    notes?: StringNullableFilter<"daily_logs"> | string | null
  }

  export type daily_logsCreateManyRoutine_itemsInput = {
    id?: number
    date?: Date | string | null
    status?: boolean | null
    notes?: string | null
  }

  export type daily_logsUpdateWithoutRoutine_itemsInput = {
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type daily_logsUncheckedUpdateWithoutRoutine_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type daily_logsUncheckedUpdateManyWithoutRoutine_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use Routine_itemsCountOutputTypeDefaultArgs instead
     */
    export type Routine_itemsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Routine_itemsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use daily_logsDefaultArgs instead
     */
    export type daily_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = daily_logsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use routine_itemsDefaultArgs instead
     */
    export type routine_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = routine_itemsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}