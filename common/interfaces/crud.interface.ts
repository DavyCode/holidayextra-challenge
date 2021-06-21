export interface CRUD {
  create: (resource: any) => Promise<any>;
  updateById: (id: string, resource: any) => Promise<any>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<void>;
  patchById: (id: string, resource: any) => Promise<any>;
}
