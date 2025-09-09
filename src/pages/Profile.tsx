import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileSection } from "@/components/ProfileSection";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile | Supplier Panel";
  }, []);

  return (
    <DashboardLayout activeSection="profile">
      {/* Inject custom CSS to hide Edit Profile button */}
      <style>
        {`
          button:contains("Edit Profile"),
          .edit-profile-button {
            display: none !important;
          }
        `}
      </style>

      <ProfileSection />
    </DashboardLayout>
  );
};

export default Profile;
