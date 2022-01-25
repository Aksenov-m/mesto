export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userProfile = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
    return userProfile;
  }

  setUserInfo = ({ name, about }) => {
    this._name.textContent = name;
    this._about.textContent = about;
    // this._avatar.src = avatar;
  };

  setUserAvatar = ({ avatar }) => {
    this._avatar.value = avatar;
  };
}
