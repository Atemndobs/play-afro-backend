import { baseUrl } from "../common/constants/config-constant";

export default class UserResource {
  constructor(data) {
    this.userId = data.id;
    this.fullname = data.fullname;
    this.copmanyname = data.copmanyname;
    this.email = data.email;
    this.country = data.country;
    this.profileImage = data.profileImage ? baseUrl(data.profileImage) : null;
    this.address = data.address;
    this.contact = data.contact;
    this.telephone = data.telephone;
    this.type = data.type;
    this.role = data.type;
  }
}
