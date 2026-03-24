import ProfileHeader from "./profile/ProfileHeader"
import ProfileInfoCard from "./profile/ProfileInfoCard"
import DocumentsSection from "./profile/DocumentsSection"

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SIDEBAR FIJO */}
        <div className="lg:sticky lg:top-6 h-fit">
          <ProfileInfoCard />
        </div>

        {/* CONTENIDO */}
        <div className="lg:col-span-2">
          <DocumentsSection />
        </div>

      </div>
    </div>
  )
}