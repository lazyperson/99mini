const config = {
  "envId": "wxappclound666",
  "alias":"wxappclound"
};

let openId = null;
let avatarUrl = '';
let nickName = '';

const setOpenId = value => {
  openId = value;
};

const getOpenId = () => openId;

const setAvatarUrl = value => {
  avatarUrl = value;
};

const getAvatarUrl = () => avatarUrl;

const setNickName = value => {
  nickName = value;
};

const getNickName = () => nickName;


export {
  getOpenId,
  setOpenId,
  getAvatarUrl,
  setAvatarUrl,
  getNickName,
  setNickName
}

export default config;
