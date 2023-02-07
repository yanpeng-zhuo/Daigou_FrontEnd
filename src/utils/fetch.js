/*
 * @Author: Yanpeng Zhuo
 * @Github: https://github.com/zhuoyanpeng
 * @Date: 2023-01-30 23:03:03
 * @LastEditors: Yanpeng Zhuo
 * @Description: file content
 */

function fetchUrl(url, method, body){
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization-Token": localStorage.getItem("JWT") || "", // 从localStorageStorage中获取access token
    },
    method,
    body: body == null ? null : JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const postFetch = (url, body) => {
  return fetchUrl(url, "POST", body);
};

const getFetch = (url) => {
  return fetchUrl(url, "GET", null);
};

const deleteFetch = (url) => {
  return fetchUrl(url, "DELETE", null);
};

export { postFetch, getFetch, deleteFetch };
