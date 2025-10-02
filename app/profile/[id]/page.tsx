"use client";

import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { profileDetails, connections } from "@/lib/data";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const profile = profileDetails[id] || connections.find((c) => c.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const fullProfile = profileDetails[id];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchPlaceholder="Search customer" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#1a1f4d] rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-4xl md:text-5xl">
                {profile.name.charAt(0)}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {fullProfile?.name || profile.name}
            </h1>

            <p className="text-gray-500 mb-4">
              {fullProfile?.city && fullProfile?.country
                ? `${fullProfile.city}, ${fullProfile.country}`
                : profile.location}
            </p>

            {fullProfile?.bio && (
              <p className="text-gray-700 max-w-2xl mb-8 leading-relaxed">
                {fullProfile.bio}
              </p>
            )}

            <button className="bg-[#1a1f4d] text-white px-6 py-3 rounded-md font-medium hover:bg-[#252b5f] transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
