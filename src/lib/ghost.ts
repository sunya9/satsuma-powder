import GhostContentAPI, {
  GhostAPI,
  Nullable,
  Settings,
} from "@tryghost/content-api";
import { env } from "./env";

class GhostRepository {
  private contentApi: GhostAPI;
  private settings!: Settings;
  url: string;

  constructor() {
    this.url = env.url;
    this.contentApi = new GhostContentAPI({
      url: this.url,
      key: env.key,
      version: "v3",
    });
    this.getSettings();
  }

  getPosts(limit: number | "all" = "all") {
    return this.contentApi.posts.browse({
      limit,
      fields: ["title", "slug", "published_at", "id"],
    });
  }

  getPages(limit: number | "all" = "all") {
    return this.contentApi.pages.browse({
      limit,
      fields: ["title", "slug", "id"],
    });
  }

  getPost(slug: string) {
    return this.contentApi.posts.read({ slug });
  }

  getPage(slug: string) {
    return this.contentApi.pages.read({ slug });
  }

  async getNewerPost(publishedAt?: Nullable<string>) {
    const filter = `published_at:>${encodeURIComponent(publishedAt || "")}`;
    const res = await this.contentApi.posts.browse({
      fields: ["title", "slug", "id", "published_at"],
      filter,
      limit: 1,
      page: 1,
      order: "published_at asc",
    });
    return res[0];
  }

  async getOlderPost(publishedAt?: Nullable<string>) {
    const filter = `published_at:<${encodeURIComponent(publishedAt || "")}`;
    const res = await this.contentApi.posts.browse({
      fields: ["title", "slug", "id", "published_at"],
      filter,
      limit: 1,
      page: 2,
      order: "published_at desc",
    });
    return res[0];
  }

  async getSettings() {
    if (!this.settings) this.settings = await this.contentApi.settings.browse();
    return this.settings;
  }
}

export const ghostRepo = new GhostRepository();
