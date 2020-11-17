import React from "react";
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";


const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
    return (
        <div >
            <div className={classes.content__img_box}>
                <img className={classes.content__img}
                     src="https://images.ctfassets.net/hrltx12pl8hq/hXPLBHmnfgxw58CeaaADd/34e2f72481af47c654279ba6d4e18044/shutterstock_1469674187.jpg?fit=fill&w=800&h=400"
                     alt="Profile logo"/>
            </div>
          <ProfileStatus status="Hello, friends!"/>
            <div className={classes.descriptionBlock}>
              <img src={props.profile.photos.large} alt="Avatar"/>
              <div>{props.profile.aboutMe}</div>
            </div>
        </div>
    )
}
export default ProfileInfo
