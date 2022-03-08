import axios from "axios";
import {isHumanImage} from "ImageValidationLib";

const USER_PROFILE_REST_URL_PREFIX = `http://localhost:8080/api/v1/userprofile`;
const IMAGE_UPLOAD_URL_SUFFIX = `image/upload`;
const IMAGE_DOWNLOAD_URL_SUFFIX = `image/download`;

class UserProfilesService {

    getUserProfiles() {
        return axios.get(`${USER_PROFILE_REST_URL_PREFIX}/list`);
    }

    getImageUrl(userProfId) {
        return `${USER_PROFILE_REST_URL_PREFIX}/${userProfId}/${IMAGE_DOWNLOAD_URL_SUFFIX}`;
    }

    isHuman(file) {
        const reader = new FileReader();
        const im = new Image();

        return new Promise((resolve) => {

            reader.onload = function () {
                im.src = reader.result;
            };
            reader.readAsDataURL(file);

            im.onload = () => {
                isHumanImage(im).then((result) => {

                    resolve(result);

                });
            };

        });
    }

    uploadImage(file, userProfId) {

        const formData = new FormData();
        formData.append("file", file);

        return axios.post(`${USER_PROFILE_REST_URL_PREFIX}/${userProfId}/${IMAGE_UPLOAD_URL_SUFFIX}`,
        formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        });
    }

}

export default new UserProfilesService();