export default class UserInfo{
  constructor({name, job}){
    this._name = name;
    this._job = job;
  }

  getUserInfo(){
    const userProfile = {
      name: this._name.textContent,
      job: this._job.textContent,
  };
   return userProfile;
  }

  setUserInfo = ({name, job}) => {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
