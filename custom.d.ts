declare module "@tryghost/admin-api" {
  import { GhostAPI } from "@tryghost/content-api";
  class GhostAdminAPI {
    constructor(options: {
      url: string;
      key: string;
      version: `v${number}.${number}`;
    });

    readonly posts: GhostAPI["posts"];
    readonly pages: GhostAPI["pages"];
  }

  export default GhostAdminAPI;
}
