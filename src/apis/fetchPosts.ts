import { Item } from "./../Models/Item";
import axios from "./base";
import ENDPOINTS from "./endpoints";

const pagePerPost: number = 20;

const fetchPosts = async (pageID: number = 1) => {
  let postsData: Array<Item> = [];
  let getPostsPromiseArray: Array<Promise<Item>> = [];
  const topPostIds: any = await axios.get(ENDPOINTS.topStories);
  const { start, end } = getRange(pageID, topPostIds.data);
  const postIDs: number[] = topPostIds.data.slice(start, end);
  postIDs.forEach((postID) => {
    getPostsPromiseArray.push(getPostData(postID));
  });

  await Promise.all(getPostsPromiseArray)
    .then((response: Item[]) => {
      response.forEach((post: any, idx: number) => {
        post.data.postId = idx + 1;
        postsData.push(post.data);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return postsData;
};

const getPostData = (postId: number): Promise<Item> => {
  return axios.get(ENDPOINTS.baseUrl + ENDPOINTS.item + postId + ".json");
};

const getRange = (pageID: number, topPostIds: number[]) => {
  let start = pagePerPost * (pageID - 1);
  let end =
    topPostIds.length < pagePerPost * pageID
      ? topPostIds.length
      : pagePerPost * pageID;
  return { start, end };
};

export { fetchPosts };
