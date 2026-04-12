import type { Nullable, Params, PostOrPage } from "@tryghost/content-api";
import { env } from "./env";
import * as jwt from "jsonwebtoken";

export interface GhostClientOptions {
  url: string;
  key: string;
  adminKey: string;
}

type PostOrPageResponse = {
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
      next: number | null;
      prev: number | null;
    };
  };
};

type PagesRespnose = {
  pages: PostOrPage[];
} & PostOrPageResponse;

type PostsRespnose = {
  posts: PostOrPage[];
} & PostOrPageResponse;

interface GhostClient {
  getPosts(size?: number): Promise<PostOrPage[]>;
  getPost(slug: string): Promise<PostOrPage | undefined>;
  getPage(slug: string): Promise<PostOrPage | undefined>;
  getNewerPost(publishedAt?: Nullable<string>): Promise<PostOrPage | undefined>;
  getOlderPost(publishedAt?: Nullable<string>): Promise<PostOrPage | undefined>;
  getDraft(uuid: string): Promise<PostOrPage | undefined>;
}

export class GhostClientImpl implements GhostClient {
  readonly #version = "v6.0";
  readonly #fetch: typeof global.fetch;
  readonly #options: GhostClientOptions;
  constructor(fetch: typeof global.fetch, options: GhostClientOptions) {
    this.#fetch = fetch;
    this.#options = options;
  }

  async getPosts(size: number = Infinity): Promise<PostOrPage[]> {
    const posts: PostOrPage[] = [];
    let page: number | null = 1;
    while (page && posts.length < size) {
      const limit = Math.min(size - posts.length, 100);
      const res: PostsRespnose = await this.#contentRequest<PostsRespnose>({
        path: "/posts/",
        params: {
          limit,
          page: page,
          fields: ["title", "slug", "published_at", "id"],
        },
      });
      posts.push(...res.posts);
      page = res.meta.pagination.next;
    }
    return posts;
  }

  async getPost(slug: string): Promise<PostOrPage | undefined> {
    return this.#contentRequest<PostsRespnose>({
      path: `/posts/slug/${slug}/`,
    }).then((res) => res.posts[0]);
  }
  async getPage(slug: string): Promise<PostOrPage | undefined> {
    return this.#contentRequest<PagesRespnose>({
      path: `/pages/slug/${slug}/`,
    }).then((res) => res.pages[0]);
  }
  async getNewerPost(
    publishedAt?: Nullable<string>,
  ): Promise<PostOrPage | undefined> {
    const filter = `published_at:>${encodeURIComponent(publishedAt || "")}`;
    return this.#contentRequest<PostsRespnose>({
      path: `/posts/`,
      params: {
        fields: ["title", "slug", "id", "published_at"],
        filter,
        limit: 1,
        page: 1,
        order: "published_at asc",
      },
    }).then((res) => res.posts[0]);
  }

  async getOlderPost(
    publishedAt?: Nullable<string>,
  ): Promise<PostOrPage | undefined> {
    const filter = `published_at:<${encodeURIComponent(publishedAt || "")}`;
    return this.#contentRequest<PostsRespnose>({
      path: "/posts/",
      params: {
        fields: ["title", "slug", "id", "published_at"],
        filter,
        limit: 1,
        page: 2,
        order: "published_at desc",
      },
    }).then((res) => res.posts[0]);
  }
  async getDraft(uuid: string): Promise<PostOrPage | undefined> {
    const filter = `uuid:${uuid}+status:draft`;
    const [posts, pages] = await Promise.all([
      this.#adminRequest<PostsRespnose>({
        path: "/posts/",
        params: { limit: 1, filter, formats: ["html"] },
      }).then((res) => res.posts),
      this.#adminRequest<PagesRespnose>({
        path: "/pages/",
        params: { limit: 1, filter, formats: ["html"] },
      }).then((res) => res.pages),
    ]);
    return posts[0] ?? pages[0];
  }

  async #adminRequest<T>(options: { path: string; params?: Params }) {
    const url = new URL(this.#options.url);
    url.pathname = `/ghost/api/admin${options.path}`;
    Object.entries(options.params || {}).forEach(([key, value]) =>
      url.searchParams.append(key, `${value}`),
    );
    // from https://ghost.org/docs/admin-api/#token-generation-examples
    const [id, secret] = this.#options.adminKey.split(":");
    const token = jwt.sign({}, Buffer.from(secret, "hex"), {
      keyid: id,
      algorithm: "HS256",
      expiresIn: "5m",
      audience: `/admin/`,
    });
    const headers = new Headers({
      "Accept-Version": this.#version,
      Authorization: `Ghost ${token}`,
    });
    return this.#fetch(url, {
      headers,
      method: "GET",
    }).then((res) => res.json() as T);
  }

  async #contentRequest<T>(options: { path: string; params?: Params }) {
    const url = new URL(this.#options.url);
    url.pathname = `/ghost/api/content${options.path}`;
    url.searchParams.append("key", this.#options.key);
    Object.entries(options.params || {}).forEach(([key, value]) =>
      url.searchParams.append(key, `${value}`),
    );
    const headers = new Headers({
      "Accept-Version": this.#version,
    });
    return this.#fetch(url.toString(), {
      headers,
      method: "GET",
    })
      .then((res) => res.json() as T)
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }
}

export const ghostRepo = new GhostClientImpl(fetch, {
  adminKey: env.adminKey,
  key: env.key,
  url: env.url,
});
