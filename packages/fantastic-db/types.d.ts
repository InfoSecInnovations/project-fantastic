import SQLite3 from 'sqlite3'

export type QueryCondition = {
  columns: Object.<string, *>|[string, *][], 
  combine?: 'AND'|'OR', 
  compare?: '='|'<'|'<='|'>'|'>='|'IN'
}

export type Query = {
  table: string,
  conditions: QueryCondition|{groups: QueryCondition[], combine: 'AND'|'OR'},
  order_by: string|string[]|Object.<string, string>,
  pagination: {page_size: number, page: number},
  columns: string[],
  row: Object.<string, *>
}

export type Operations = {
  run: (queries: string[]) => Promise,
  insert: (table: string, row: {}) => Promise<number>,
  update: (query: Query) => Promise,
  remove: (query: Query) => Promise,
  all: (query: Query) => Promise<*[]>,
  get: (query: Query) => Promise<{} | undefined>
}

export type DB = {
  transaction: (mode: number) => Promise<{
    sqlite: (func: (db: SQLite3.Database) => Promise) => Promise
  } & Operations>,
  sqlite: (func: (db: SQLite3.Database, mode: number) => Promise) => Promise
} & Operations