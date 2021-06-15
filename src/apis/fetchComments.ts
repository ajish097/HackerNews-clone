import { Item } from "../Models/Item";
import axios from "./base";
import ENDPOINTS from "./endpoints";

const fetchComments = async (Id: number, setComments) => {
  let comments: Array<Item> = [];
  await makeCall(comments, [Id], setComments);
};

const makeCall = async (comments: Array<Item>, list: number[], setComments) => {
  if (!list || list.length == 0) return;

  for (let i = 0; i < list.length; i++) {
    let response: any = await getPostData(list[i]);
    if(response?.data) {
      comments.push(response.data);
      makeCall(comments, response.data.kids, setComments);
      setComments([...comments])
    }
  }
};

const getPostData = (postId: number) => {
  return axios.get(ENDPOINTS.baseUrl + ENDPOINTS.item + postId + ".json");
};

export { fetchComments };
