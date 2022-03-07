declare module "@tryghost/admin-api" {
  import { GhostAPI, PostOrPage } from "@tryghost/content-api";
  class GhostAdminAPI {
    constructor(options: { url: string; key: string; version: "v3" }) {}

    readonly posts: GhostAPI["posts"];
    readonly pages: GhostAPI["pages"];
  }

  export default GhostAdminAPI;
}
