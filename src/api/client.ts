const createClient = (rootUrl: string) => {
  return {
    getUsers: () => `${rootUrl}/users`,
    getUser: (userId?: number) => (userId ? `${rootUrl}/users/${userId}` : undefined),
    getPosts: () => `${rootUrl}/posts`,
    getPost: (postId: string) => `${rootUrl}/posts/${postId}`,
    getPostComments: (postId: number) => `${rootUrl}/posts/${postId}/comments`
  };
};

export default createClient(process.env['API_URL'] as string);
