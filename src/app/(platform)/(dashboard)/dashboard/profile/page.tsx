import { PageHeader } from "~/components/new/page-header";
import { ProfileForm } from "~/components/new/profile-form";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Profile"
        text="Manage your personal information and settings."
      />
      <ProfileForm />
    </div>
  );
}
