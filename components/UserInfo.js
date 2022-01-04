export default class UserInfo{
  constructor({nameSelector, jobSelector}){
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo(){
    const userProfile = {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
  };
   return userProfile;
  }

  setUserInfo = (nameInput, jobInput) => {
    this._nameSelector.textContent = nameInput.value;;
    this._jobSelector.textContent = jobInput.value;
  }
}
