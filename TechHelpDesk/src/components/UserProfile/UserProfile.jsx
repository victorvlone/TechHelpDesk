import "./UserProfile.css";

function UserProfile({ setShowUserProfile }) {

  return (
    <div className="user-profile-container">
      <div className="user-profise-banner">
        <img src="../assets/images/userProfile.png" alt="" />
      </div>
      <div className="user-profile-content">
        <h4>João Victor</h4>
        <p>Cliente</p>
      </div>
      <div
        className="user-profile-back"
        onClick={() => setShowUserProfile(false)}
      >
        <i className="fi fi-sr-arrow-circle-left"></i>
        <p>voltar</p>
      </div>
    </div>
  );
}

export default UserProfile;
