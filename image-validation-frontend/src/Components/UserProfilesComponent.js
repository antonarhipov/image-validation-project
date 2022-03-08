import React from "react";
import UserProfilesService from "../Services/UserProfilesService";
import Dropzone from "./Dropezone";

class UserProfilesComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userProfiles: []
        };
    }

    componentDidMount() {
        UserProfilesService.getUserProfiles().then((response) => {
            this.setState({
                userProfiles: response.data
            });
        });
    }

    render () {

        return this.state.userProfiles.map((userProfile, index) => {
            return (

                <div key={index}>

                    <br/>

                    <div class="card">
                        <br/>
                        <br/>
                        <img src={UserProfilesService.getImageUrl(userProfile.userProfId)} alt="Avatar" ></img>
                                            
                        <div class="container">
                            <h4><b>{userProfile.userName}</b></h4>
                            <p><Dropzone{...userProfile}/></p>
                        </div>
                    </div>

                    <br/>
                    
                </div>

                
            )
        })

    }

}

export default UserProfilesComponent;