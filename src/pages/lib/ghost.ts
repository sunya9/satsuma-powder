
import GhostContentAPI, { GhostAPI } from '@tryghost/content-api'
import { env } from './env';

class GhostRepository {
  private api: GhostAPI;
  constructor() {
    this.api = new GhostContentAPI({
      url:env.url,
      key: env.key,
      version: "v3"
    });
  }

  getPosts(limit: number = -1) {
    return this.api.posts.browse({
      limit,
    })
  }

  getPost(id :string) {
    return this.api.posts.read({
      id
    })
  }

  getPage(slug: string) {
    return this.api.pages.read({ slug })
  }
}

export const ghostRepo = new GhostRepository()
